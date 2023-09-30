package main

import (
	"encoding/json"
	"io"
	"net"
	"os"
	"runtime"
	"strconv"
	"strings"

	"embed"
	"errors"
	"flag"
	"io/fs"

	"net/http"
	"path/filepath"
	"time"

	"github.com/gorilla/mux"
	"github.com/natefinch/lumberjack"
	"github.com/rs/cors"
	log "github.com/sirupsen/logrus"
)

// Command-line flags
var (
	flagPort          int
	flagSource        string
	flagEnv           string
	flagStaticDirPath string
	flagIndexFileName string
)

func init() {
	log.Info("Application init function start")
	flag.IntVar(&flagPort, "p", 8080, "port number to use for web ui server")
	flag.StringVar(&flagStaticDirPath, "d", "./dist", "Website directory path")
	flag.StringVar(&flagIndexFileName, "f", "index.html", "Index document")
	flag.StringVar(&flagEnv, "e", "dev", "Development or Production stage")
	flag.StringVar(&flagSource, "s", "embed", "Host site from embedded source or local filesystem")

	initLogger()

	log.Info("Application init function end.")
}

// staticFileServer implements the http.Handler interface, so we can use it
// to respond to HTTP requests. The path to the static directory and
// path to the index file within that static directory are used to
// serve the SPA in the given static directory.
type staticFileServer struct {
	contents      embed.FS
	staticDirPath string
	indexFileName string
}

// ServeHTTP inspects the URL path to locate a file within the static dir
// on the SPA handler.
// If path '/' is requested, it will serve the index file, otherwise it will
// serve the file specified by the URL path.
func (srv *staticFileServer) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	// Get the absolute path to prevent directory traversal.
	path, err := filepath.Abs(r.URL.Path)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	if path == "/" {
		path = srv.indexFilePath()
	} else {
		path = filepath.Join(srv.staticDirPath, path)
	}

	bytes, err := srv.contents.ReadFile(path)
	// If path is error (e.g. file not exist, path is a directory), serve index file.
	var pathErr *fs.PathError
	if errors.As(err, &pathErr) {
		bytes, err = srv.contents.ReadFile(srv.indexFilePath())
	}
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	if _, err := w.Write(bytes); err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
}

func (srv *staticFileServer) indexFilePath() string {
	return filepath.Join(srv.staticDirPath, srv.indexFileName)
}

//go:embed dist/*
var staticContents embed.FS

// -----------------

// spaHandler implements the http.Handler interface, so we can use it
// to respond to HTTP requests. The path to the static directory and
// path to the index file within that static directory are used to
// serve the SPA in the given static directory.
type spaHandler struct {
	staticPath string
	indexPath  string
}

// ServeHTTP inspects the URL path to locate a file within the static dir
// on the SPA handler. If a file is found, it will be served. If not, the
// file located at the index path on the SPA handler will be served. This
// is suitable behavior for serving an SPA (single page application).
func (h spaHandler) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	// get the absolute path to prevent directory traversal
	path, err := filepath.Abs(r.URL.Path)
	if err != nil {
		// if we failed to get the absolute path respond with a 400 bad request
		// and stop
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	// prepend the path with the path to the static directory
	path = filepath.Join(h.staticPath, path)

	// check whether a file exists at the given path
	_, err = os.Stat(path)
	if os.IsNotExist(err) {
		// file does not exist, serve index.html
		http.ServeFile(w, r, filepath.Join(h.staticPath, h.indexPath))
		return
	} else if err != nil {
		// if we got an error (that wasn't that the file doesn't exist) stating the
		// file, return a 500 internal server error and stop
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	// otherwise, use http.FileServer to serve the static dir
	http.FileServer(http.Dir(h.staticPath)).ServeHTTP(w, r)
}

func main() {

	flag.Parse()

	router := mux.NewRouter()

	router.HandleFunc("/api/health", func(w http.ResponseWriter, r *http.Request) {
		// an example API handler
		json.NewEncoder(w).Encode(map[string]bool{"ok": true})
	})

	fs := &staticFileServer{
		contents:      staticContents,
		staticDirPath: "dist",
		indexFileName: "index.html",
	}

	if strings.ToLower(flagSource) == "embed" {
		//Embedded route
		router.PathPrefix("/").Handler(fs)

	} else {
		//dynamic filepath route
		spa := spaHandler{staticPath: flagStaticDirPath, indexPath: flagIndexFileName}
		log.Info("staticPath =", fs.staticDirPath)
		router.PathPrefix("/").Handler(spa)
	}

	c := cors.New(cors.Options{
		AllowedMethods: []string{"GET", "POST", "DELETE"},
	})
	handler := c.Handler(router)

	log.Info("Starting Server at port ", strconv.Itoa(flagPort))

	listener, err := net.Listen("tcp", ":"+strconv.Itoa(flagPort))
	if err != nil {
		log.Fatal(err)
	}
	done := make(chan bool)
	go http.Serve(listener, handler)
	log.Info("Started Server at port ", strconv.Itoa(flagPort))
	<-done
}

func initLogger() {
	logfilepath := AppExecutionPath() + "/" + os.Args[0] + ".log"
	log.Info("logfilepath = " + logfilepath)
	// Set the Lumberjack logger
	ljack := &lumberjack.Logger{
		Filename:   logfilepath,
		MaxSize:    1,
		MaxBackups: 3,
		MaxAge:     3,
		LocalTime:  true,
	}

	//log := logrus.New()
	//
	// Output to stdout instead of the default stderr
	// Can be any io.Writer, see below for File example

	// Only log the warning severity or above.
	log.SetLevel(log.InfoLevel)

	mWriter := io.MultiWriter(os.Stdout, ljack)
	log.SetOutput(mWriter)
	log.SetFormatter(&log.TextFormatter{})
	log.WithFields(log.Fields{
		"Runtime Version": runtime.Version(),
		"Number of CPUs":  runtime.NumCPU(),
		"Arch":            runtime.GOARCH,
	}).Info("Application Initializing")

	if strings.ToLower(flagEnv) == "dev" {
		log.SetFormatter(&log.TextFormatter{ForceColors: true, FullTimestamp: true, TimestampFormat: time.RFC1123Z})
	} else {
		log.SetFormatter(&log.JSONFormatter{})
	}
}

// AppExecutionPath returns the relative path where the application is executing
func AppExecutionPath() string {
	mydir, err := os.Getwd()
	if err != nil {
		log.Fatal(err)
	}
	return mydir
}
