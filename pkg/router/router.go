package router

import (
	"io"
	"log"
	"os"
	"templrjs/controller"
	"templrjs/pkg/config"
	"templrjs/pkg/duckdb"
	"templrjs/pkg/middleware"

	"github.com/gin-gonic/gin"
)

// Setup function
func Setup() *gin.Engine {
	r := gin.New()

	// Logging to a file.
	f, _ := os.Create("./logs/templrjs-core.log")
	gin.DefaultWriter = io.MultiWriter(f, os.Stdout)
	log.Println("Application Name = [" + config.Config.Database.Dbname + "]")

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
	r.POST("/entities/:entity", duckdb.CreateEntity)
	r.GET("/entities/:entity", duckdb.GetEntities)
	r.PUT("/entities/:entity/:id", duckdb.UpdateEntity)
	r.DELETE("/entities/:entity/:id", duckdb.DeleteEntity)
	r.POST("/instagram/scrape", controller.Scrape)
	r.POST("/firebase/notify", controller.Notify)
	r.POST("/execute-query", duckdb.ExecuteCustomQuery)

	log.Println("Finished router setup")
	return r
}
