package controller

import (
	"encoding/base64"
	"encoding/json"
	"log"
	"templrjs/model"

	machinery "github.com/RichardKnop/machinery/v1"
	"github.com/RichardKnop/machinery/v1/config"
	"github.com/RichardKnop/machinery/v1/tasks"
	"github.com/gin-gonic/gin"
)

func SayHello(c *gin.Context) {

	var cnf = config.Config{
		Broker:        "redis://127.0.0.1:6379",
		ResultBackend: "redis://127.0.0.1:6379",
	}

	server, err := machinery.NewServer(&cnf)
	if err != nil {
		log.Fatal(err, "Can not create server!")
	}

	sayTask := tasks.Signature{
		Name: "Say",
		Args: []tasks.Arg{
			{
				Type:  "string",
				Value: "masnun",
			},
		},
	}

	server.SendTask(&sayTask)
	c.JSON(200, "done")
}

// SendMail function
func SendMail(c *gin.Context) {

	var cnf = config.Config{
		Broker:        "redis://127.0.0.1:6379",
		ResultBackend: "redis://127.0.0.1:6379",
	}

	server, err := machinery.NewServer(&cnf)
	if err != nil {
		log.Fatal(err, "Can not create server!")
	}

	p := new(model.Email)
	if err := c.BindJSON(p); err != nil {
		log.Fatal(err)
	}

	reqJSON, err := json.Marshal(p)
	if err != nil {
		log.Fatal(err.Error())
	}

	b64EncodedReq := base64.StdEncoding.EncodeToString([]byte(reqJSON))
	task := tasks.Signature{
		Name: "send_email",
		Args: []tasks.Arg{
			{
				Type:  "string",
				Value: b64EncodedReq,
			},
		},
	}

	res, err := server.SendTask(&task)
	if err != nil {
		log.Fatal(err.Error())
	}
	log.Println(res)
	c.JSON(200, "Email has been sent")
}
