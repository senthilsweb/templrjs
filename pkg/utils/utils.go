package utils

import (
	"bytes"
	"context"
	"encoding/base64"
	"fmt"
	"os"
	"time"

	"github.com/aymerick/raymond"
	jwt "github.com/dgrijalva/jwt-go"
	"github.com/gin-gonic/gin"
	log "github.com/sirupsen/logrus"
)

// EncodeAuthToken creates authentication token
func EncodeAuthToken(uid uint) (string, error) {
	claims := jwt.MapClaims{}
	claims["userID"] = uid
	claims["IssuedAt"] = time.Now().Unix()
	claims["ExpiresAt"] = time.Now().Add(time.Hour * 24).Unix()
	token := jwt.NewWithClaims(jwt.GetSigningMethod("HS256"), claims)
	return token.SignedString([]byte(os.Getenv("SECRET")))
}

// contains
func contains(slice []string, item string) bool {
	set := make(map[string]struct{}, len(slice))
	for _, s := range slice {
		set[s] = struct{}{}
	}

	_, ok := set[item]
	return ok
}

// RenderFromTemplate returns  content
func RenderFromTemplate(filename string, data interface{}) string {
	var err error
	fp := AppExecutionPath() + "/data/templates/" + filename
	fmt.Println("\nTemplate Path " + fp)
	//tpl := raymond.MustParse("{{> myPartial name=hero }}")
	tpl, err := raymond.ParseFile(fp)
	result, err := tpl.Exec(data)
	if err != nil {
		log.Error(err)
		panic("Please report a bug :)")
	}
	log.Info(result)
	return result
}

//GinContextFromContext  from context
func GinContextFromContext(ctx context.Context) (*gin.Context, error) {
	ginContext := ctx.Value("GinContextKey")
	if ginContext == nil {
		err := fmt.Errorf("could not retrieve gin.Context")
		return nil, err
	}

	gc, ok := ginContext.(*gin.Context)
	if !ok {
		err := fmt.Errorf("gin.Context has wrong type")
		return nil, err
	}
	return gc, nil
}

// AppExecutionPath returns the relative path where the application is executing
func AppExecutionPath() string {
	mydir, err := os.Getwd()
	if err != nil {
		fmt.Println(err)
	}
	fmt.Println(mydir)
	return mydir
}

func DecodeAsStringFromBase64EncodedString(msg string) (output string) {
	decodedstg, err := base64.StdEncoding.DecodeString(msg)
	if err != nil {
		log.Fatal("Error during decode")
	}
	body := []byte(decodedstg)
	var strToConvert string
	strToConvert = bytes.NewBuffer(body).String()
	return strToConvert
}
