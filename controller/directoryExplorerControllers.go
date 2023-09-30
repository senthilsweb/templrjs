package controller

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"
	"os"
	"path/filepath"
	"strconv"
	"strings"
	"templrjs/model"
	"templrjs/responses"

	log "github.com/sirupsen/logrus"
)

// Inner Filesystem details
type Inner struct {
	ID      string `json:"id"`
	Parent  string `json:"parent"`
	Text    string `json:"text"`
	Summary string `json:"summary"`
	Size    string `json:"size"`
}

// Broswe directory
func Broswe(w http.ResponseWriter, r *http.Request) {
	query := &model.Query{}
	body, err := ioutil.ReadAll(r.Body)
	log.Printf("\nBound to body")
	if err != nil {
		responses.ERROR(w, http.StatusBadRequest, err)
		return
	}
	err = json.Unmarshal(body, &query)
	responses.JSON(w, http.StatusOK, GetFolderStructure(query.Statement))
	return
}

// GetAllDirectoriesWithSize returns
func GetAllDirectoriesWithSize(w http.ResponseWriter, r *http.Request) {
	linux := &model.Linux{}
	body, err := ioutil.ReadAll(r.Body)
	log.Info("Bound to body")
	if err != nil {
		responses.ERROR(w, http.StatusBadRequest, err)
		return
	}
	err = json.Unmarshal(body, &linux)
	log.Info("Printing arguements")
	log.Info(linux.Command + " " + strings.Join(linux.Args, " "))
	log.Info("Printed arguements")
	if err != nil {
		responses.ERROR(w, http.StatusBadRequest, err)
		return
	}
	result, err := linux.ExecuteBash()
	if err != nil {
		fmt.Println(err)
		return
	}

	if linux.RawOutput == true {
		responses.JSON(w, http.StatusOK, result)
	} else {
		s := strings.Split(result, "\n")
		var response []map[string]interface{}

		for i := range s {
			m := make(map[string]interface{})

			if strings.Contains(s[i], "\t") {
				d := strings.Split(s[i], "\t")
				m["Size"] = d[0]
				m["DirOrFile"] = d[1]
				log.Info(m)
				response = append(response, m)
			}
		}

		responses.JSON(w, http.StatusOK, response)
	}
	return
}

// GetFolderStructure returns files & folder inside a given directory
func GetFolderStructure(directoryLocation string) []Inner {

	dataArray := make([]Inner, 0)
	currentDir := directoryLocation
	root := strings.Split(directoryLocation, "/")
	filepath.Walk(directoryLocation, func(path string, info os.FileInfo, err error) error {

		if info.Mode().IsDir() {
			//damned bitsync
			if strings.Contains(path, ".sync") || strings.Contains(path, "Archive") {
				return nil
			}
			var inner1 Inner
			//dont show path directory as an explict directory
			if path != directoryLocation { //i.e its a sub directory
				absFileName := strings.Replace(path, currentDir, "", -1)
				//removes .md off the file name to display
				relFileName := strings.Split(absFileName, "/")
				//fmt.Println("rel file name: ", relFileName[len(relFileName)-1])

				/*

					THIS NEXT LINE IS ONLY CHECKING FOR MARKDOWN FILES - THIS IS UNECESSARY!

				*/
				filename := strings.Replace(relFileName[len(relFileName)-1], ".md", "", -1)
				//sorting out the parent directory:
				parent := strings.Split(path, "/")
				if parent[len(parent)-2] != root[len(root)-1] { //if its parent is not the root
					inner1 = Inner{filename, parent[len(parent)-2], filename, "directory", strconv.FormatInt(info.Size(), 10)}
				} else {
					inner1 = Inner{filename, "#", filename, "directory", strconv.FormatInt(info.Size(), 10)}
				}
				dataArray = append(dataArray, inner1)
			}

		} else { // This is a markdown file

			if strings.Contains(path, ".DS_Store") || strings.Contains(path, ".sync") || strings.Contains(path, "Archive") {
				return nil
			}
			absFileName := strings.Replace(path, currentDir, "", -1)
			//removes .md off the file name to display
			relFileName := strings.Split(absFileName, "/")
			filename := relFileName[len(relFileName)-1]

			var inner1 Inner
			parent := strings.Split(path, "/")
			if parent[len(parent)-2] != root[len(root)-1] {
				inner1 = Inner{filename, parent[len(parent)-2], strings.Split(filename, ".")[0], filename, strconv.FormatInt(info.Size(), 10)}
			} else {
				inner1 = Inner{filename, "#", strings.Split(filename, ".")[0], filename, strconv.FormatInt(info.Size(), 10)}
			}
			dataArray = append(dataArray, inner1)

		}

		return nil

	}) // end of filepath.Walk

	return dataArray
}
