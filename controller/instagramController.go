package controller

import (
	"net/http"
	"templrjs/pkg/task"

	"github.com/gin-gonic/gin"
	log "github.com/sirupsen/logrus"
)

// Assuming you have imported the necessary packages

// Define your request payload structure
type ScrapeRequest struct {
	ProfileID string `json:"profile_id"`
	First     int    `json:"first"`
	Entity    string `json:"entity"`
}

func Scrape(c *gin.Context) {
	var payload ScrapeRequest

	// Parse the request body into the payload struct
	if err := c.ShouldBindJSON(&payload); err != nil {
		// Handle error here; for example:
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	log.Debug("Calling Scrape")
	// Call the Scrape function using values from the payload
	task.Scrape(payload.ProfileID, payload.First, payload.Entity)
	log.Debug("Called Scrape")
	// Send a response indicating the process was successful (or handle it your way)
	c.JSON(http.StatusOK, gin.H{"message": "Instagram posts scraped and persisted successfully"})
}
