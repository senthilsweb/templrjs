package controller

import (
	"bytes"
	"context"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"
	"templrjs/pkg/config"

	"github.com/gin-gonic/gin"
	log "github.com/sirupsen/logrus"
	"golang.org/x/oauth2/jwt"
)

// ServiceAccountInfo represents the necessary fields from the service account JSON file.
type ServiceAccountInfo struct {
	Type         string `json:"type"`
	ProjectID    string `json:"project_id"`
	PrivateKeyID string `json:"private_key_id"`
	PrivateKey   string `json:"private_key"`
	ClientEmail  string `json:"client_email"`
	ClientID     string `json:"client_id"`
	AuthURI      string `json:"auth_uri"`
	TokenURI     string `json:"token_uri"`
	AuthProvider string `json:"auth_provider_x509_cert_url"`
	ClientCert   string `json:"client_x509_cert_url"`
}

// NotificationPayload represents the payload to send to Firebase.
type NotificationPayload struct {
	Message struct {
		Token        string `json:"token"`
		Notification struct {
			Title string `json:"title"`
			Body  string `json:"body"`
		} `json:"notification"`
	} `json:"message"`
}

func Notify(c *gin.Context) {
	var payload NotificationPayload

	// Parse the request body into the payload struct
	if err := c.ShouldBindJSON(&payload); err != nil {
		// Handle error here; for example:
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	log.Debug("Calling Scrape")

	serviceAccountFile := config.Config.Firebase.Service_account_file
	projectID := config.Config.Firebase.Project_id

	accessToken, err := getAccessToken(serviceAccountFile)
	if err != nil {
		log.Error("Error getting access token:", err)
		return
	}

	response, err := sendFirebaseNotification(accessToken, projectID, payload)
	if err != nil {
		// Log and respond with the error if the notification sending failed
		log.Error("Error sending Firebase notification:", err)
		c.JSON(http.StatusInternalServerError, gin.H{"message": "Failed to send notification", "error": err.Error()})
		return
	}

	// Check if the response contains an error message from Firebase
	if errorInfo, ok := response["error"]; ok {
		// If the response contains an "error" field, handle it as a failure
		c.JSON(http.StatusBadRequest, gin.H{
			"message": "Failed to send notification",
			"error":   errorInfo,
		})
		return
	}

	// If there's no error, handle it as a successful operation
	c.JSON(http.StatusOK, gin.H{"message": "Notification sent successfully", "response": response})
}

func getAccessToken(serviceAccountFile string) (string, error) {
	data, err := ioutil.ReadFile(serviceAccountFile)
	if err != nil {
		return "", err
	}

	var serviceAccount ServiceAccountInfo
	if err := json.Unmarshal(data, &serviceAccount); err != nil {
		return "", err
	}

	conf := &jwt.Config{
		Email:      serviceAccount.ClientEmail,
		PrivateKey: []byte(serviceAccount.PrivateKey),
		Scopes:     []string{"https://www.googleapis.com/auth/firebase.messaging"},
		TokenURL:   serviceAccount.TokenURI,
	}

	token, err := conf.TokenSource(context.Background()).Token()
	if err != nil {
		return "", err
	}

	return token.AccessToken, nil
}

func sendFirebaseNotification(accessToken, projectID string, payload NotificationPayload) (map[string]interface{}, error) {
	url := fmt.Sprintf("https://fcm.googleapis.com/v1/projects/%s/messages:send", projectID)
	log.Info("URL: ", url)
	jsonPayload, err := json.Marshal(payload)
	if err != nil {
		return nil, err
	}

	req, err := http.NewRequest("POST", url, bytes.NewBuffer(jsonPayload))
	if err != nil {
		return nil, err
	}

	req.Header.Add("Authorization", "Bearer "+accessToken)
	req.Header.Add("Content-Type", "application/json; UTF-8")

	client := &http.Client{}
	resp, err := client.Do(req)
	if err != nil {
		return nil, err
	}
	defer resp.Body.Close()

	responseData, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		return nil, err
	}

	var responseJSON map[string]interface{}
	if err := json.Unmarshal(responseData, &responseJSON); err != nil {
		return nil, err
	}

	return responseJSON, nil
}
