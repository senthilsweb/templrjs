package controller

import (
	"io/ioutil"
	"templrjs/pkg/broker"
	"time"

	machinery "github.com/RichardKnop/machinery/v1"
	"github.com/RichardKnop/machinery/v1/tasks"
	"github.com/gin-gonic/gin"
)

var server *machinery.Server

// Publish performs shell command execution and returns the output as string array list
func Enqueue(c *gin.Context) {

	server = broker.GetBroker()

	body, _ := ioutil.ReadAll(c.Request.Body)

	// Delay the task by 5 seconds
	eta := time.Now().UTC().Add(time.Second * 120)

	newsletterTask := tasks.Signature{
		Name:       "newsletter",
		ETA:        &eta,
		RetryCount: 3,
		Args: []tasks.Arg{
			{
				Type:  "string",
				Value: body,
			},
		},
	}
	server.SendTask(&newsletterTask)
	c.JSON(200, "Message enqueued")
	return
}
