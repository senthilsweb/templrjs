package router

import (
	"io"
	"log"
	"os"
	"templrjs/controller"
	"templrjs/pkg/middleware"

	"github.com/gin-gonic/gin"
)

// Setup function
func Setup() *gin.Engine {
	r := gin.New()

	// Logging to a file.
	f, _ := os.Create("./logs/duckdb-studio-core.log")
	gin.DefaultWriter = io.MultiWriter(f, os.Stdout)

	log.Println("Bootstrapping gin middlewares")
	// Middlewares
	r.Use(gin.Logger())
	r.Use(gin.Recovery())
	r.Use(middleware.CORS())
	r.Use(middleware.GinContextToContextMiddleware())

	log.Println("Setting up routes")

	r.POST("/execute/bash/command", controller.ExecCommandShell)
	r.POST("/redis/publish", controller.Publish)
	r.POST("/redis/enqueue", controller.Enqueue)
	r.POST("/blogs/import", controller.PostBlogsFromDirectory)
	r.POST("/instagram/scrape", controller.Scrape)
	r.POST("/firebase/notify", controller.Notify)

	log.Println("Finished router setup")
	return r
}
