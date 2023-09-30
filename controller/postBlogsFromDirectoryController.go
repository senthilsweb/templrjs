package controller

import (
	"bytes"
	"encoding/json"
	"io/ioutil"
	"net/http"
	"path/filepath"
	"strings"

	"github.com/gin-gonic/gin"
	log "github.com/sirupsen/logrus"
)

type BlogPost struct {
	Content string `json:"content"`
	Title   string `json:"title"`
}

func PostBlogsFromDirectory(c *gin.Context) {
	directory := "./blogs"
	files, err := ioutil.ReadDir(directory)
	if err != nil {
		log.Fatalf("Error reading directory: %v", err)
	}

	for _, file := range files {
		if filepath.Ext(file.Name()) == ".md" {
			contentBytes, err := ioutil.ReadFile(filepath.Join(directory, file.Name()))
			if err != nil {
				log.Printf("Error reading file %s: %v", file.Name(), err)
				continue
			}
			content := string(contentBytes)

			// Extract the filename without the .md extension for the title
			filename := strings.TrimSuffix(file.Name(), filepath.Ext(file.Name()))
			slugTitle := slugify(filename)

			blogPost := BlogPost{
				Content: content,
				Title:   slugTitle,
			}

			payload, err := json.Marshal(blogPost)
			if err != nil {
				log.Printf("Error marshalling JSON for %s: %v", file.Name(), err)
				continue
			}

			resp, err := http.Post("http://localhost:8080/entities/blogs", "application/json", bytes.NewBuffer(payload))
			if err != nil {
				log.Printf("Error posting to API for %s: %v", file.Name(), err)
				continue
			}
			defer resp.Body.Close()

			// Here, you might want to handle the response further, check for errors, etc.
			if resp.StatusCode != http.StatusOK {
				log.Printf("Error response from server for %s: %s", file.Name(), resp.Status)
			}
		}
	}
}

func slugify(input string) string {
	return strings.ToLower(strings.ReplaceAll(input, " ", "-"))
}
