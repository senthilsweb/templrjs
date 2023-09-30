package controller

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"
	"os"
	"os/exec"

	"strings"
	"templrjs/model"

	"templrjs/responses"

	"github.com/gin-gonic/gin"
	log "github.com/sirupsen/logrus"
)

// ExecCommandShell performs shell command execution and returns the output as string array list
func ExecCommandShell(c *gin.Context) {
	log.Info("Inside ExecCommandShell")
	query := &model.Query{}

	if err := c.BindJSON(query); err != nil {
		log.Fatal(err)
		c.AbortWithStatus(500)
		return
	}

	log.Info(query)
	log.Info(query.Statement + " " + strings.Join(query.Args, " "))

	//c.JSON(200, query.Statement+" "+strings.Join(query.Args, " "))

	cmd := exec.Command(query.Statement, query.Args...)
	out, err := cmd.CombinedOutput()
	if err != nil {
		log.Info(fmt.Sprint(err) + ": " + string(out))
		//c.AbortWithStatus(500)
		c.JSON(500, string(out))
		return
	}

	if query.RawOutput == true {
		c.JSON(200, string(out))

	} else {
		s := strings.Split(string(out), "\n")
		c.JSON(200, s)
	}
	return
}

// ServiceStatus returns
func ServiceStatus(w http.ResponseWriter, r *http.Request) {
	log.Printf("\nInside service status")
	query := &model.Query{}
	body, err := ioutil.ReadAll(r.Body)
	log.Printf("\nBound to body")
	if err != nil {
		responses.ERROR(w, http.StatusBadRequest, err)
		return
	}

	err = json.Unmarshal(body, &query)
	log.Printf("\nPrinting arguements")
	log.Println(query.Statement + " " + strings.Join(query.Args, " "))
	log.Printf("\nPrinted arguements")
	if err != nil {
		responses.ERROR(w, http.StatusBadRequest, err)
		return
	}
	log.Printf("Executing linux command")
	//systemctl show shira-core -p ActiveState | grep ActiveState | cut -d "=" -f2
	cmd := exec.Command(query.Statement, query.Args...)
	//cmd := exec.Command("systemctl", "show", query.Statement)
	//log.Printf("\n %s %s %s", "systemctl", "show", query.Statement)
	log.Printf("\n Executed linux command")
	out, err := cmd.CombinedOutput()
	if err != nil {
		if exitErr, ok := err.(*exec.ExitError); ok {
			log.Printf("systemctl finished with non-zero: %v\n", exitErr)
			responses.JSON(w, http.StatusInternalServerError, exitErr)

		} else {
			log.Printf("failed to run systemctl: %v", err)
			responses.JSON(w, http.StatusInternalServerError, err)
			os.Exit(1)
		}
		return
	}

	log.Info(string(out))
	s := strings.Split(string(out), "\n")
	fmt.Printf("Status is: %s\n", string(out))
	responses.JSON(w, http.StatusOK, s)
	return
}
