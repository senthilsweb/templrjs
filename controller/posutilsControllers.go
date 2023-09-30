package controller

import (
	"encoding/json"
	"io/ioutil"
	"net/http"
	"templrjs/model"
	"templrjs/responses"

	"github.com/shirou/gopsutil/cpu"
	"github.com/shirou/gopsutil/disk"
	"github.com/shirou/gopsutil/host"
	log "github.com/sirupsen/logrus"
)

// DiskUsage returns the disk details or directory details for a given path
func DiskUsage(w http.ResponseWriter, r *http.Request) {
	log.Info("Inside DiskUsage (start)")
	query := &model.Query{}

	body, err := ioutil.ReadAll(r.Body)
	if err != nil {
		responses.ERROR(w, http.StatusBadRequest, err)
		log.Error(err)
		return
	}

	err = json.Unmarshal(body, &query)
	log.Info(body)
	log.Info(query)
	if err != nil {
		responses.ERROR(w, http.StatusBadRequest, err)
		log.Error(err)
		return
	}
	log.Info("query.DirectoryPath = " + query.DirectoryPath)
	UsageStat, err := disk.Usage(query.DirectoryPath)

	if err != nil {
		responses.ERROR(w, http.StatusInternalServerError, err)
		log.Error(err)
		return
	}
	responses.JSON(w, http.StatusOK, UsageStat)
	log.Info("Inside DiskUsage (end)")
	return
}

// HostInfo returns the HostInfo details
func HostInfo(w http.ResponseWriter, r *http.Request) {
	log.Info("Inside HostInfo (start)")

	info, err := host.Info()

	if err != nil {
		responses.ERROR(w, http.StatusInternalServerError, err)
		log.Error(err)
		return
	}
	responses.JSON(w, http.StatusOK, info)
	log.Info("Inside HostInfo (end)")
	return
}

// CPUInfo returns the Cpu details
func CPUInfo(w http.ResponseWriter, r *http.Request) {
	log.Info("Inside CPUInfo (start)")

	cpu, err := cpu.Info()

	if err != nil {
		responses.ERROR(w, http.StatusInternalServerError, err)
		log.Error(err)
		return
	}
	responses.JSON(w, http.StatusOK, cpu)
	log.Info("Inside CPUInfo (end)")
	return
}

// HostUsers returns the Users details
func HostUsers(w http.ResponseWriter, r *http.Request) {
	log.Info("Inside HostUsers (start)")

	users, err := host.Users()

	if err != nil {
		responses.ERROR(w, http.StatusInternalServerError, err)
		log.Error(err)
		return
	}
	responses.JSON(w, http.StatusOK, users)
	log.Info("Inside HostUsers (end)")
	return
}
