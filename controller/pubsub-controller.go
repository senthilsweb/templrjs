package controller

import (
	"context"
	"io/ioutil"
	"templrjs/pkg/config"

	"github.com/gin-gonic/gin"
	"github.com/go-redis/redis/v8"
	log "github.com/sirupsen/logrus"
)

// Publish performs shell command execution and returns the output as string array list
func Publish(c *gin.Context) {
	log.Info("Inside Publish")

	/*query := &model.Query{}

	if err := c.BindJSON(query); err != nil {
		log.Fatal(err)
		c.AbortWithStatus(500)
		return
	}
	//c.JSON(200, query.Statement+" "+strings.Join(query.Args, " "))
	*/

	body, _ := ioutil.ReadAll(c.Request.Body)

	//opt, _ := redis.ParseURL("rediss://:b3cd263ba8f14f32b7dee9907577d089@us1-deciding-kodiak-34245.upstash.io:34245")
	opt, _ := redis.ParseURL(config.Config.Queue.Uri)
	client := redis.NewClient(opt)

	// Publish a generated user to the new_users channel
	ctx := context.Background()
	err := client.Publish(ctx, "templrjs_github", body).Err()
	if err != nil {
		log.Fatal(err)
		panic(err)
	}
	c.JSON(200, "Message published")
	return
}
