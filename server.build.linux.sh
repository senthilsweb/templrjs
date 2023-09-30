#!/bin/bash

# Set the repository URL
REPO_NAME="https://github.com/senthilsweb/ai1.server.go.git"

# Set the operating system
OS="$(uname -s)"

# Get the Git commit hash
GIT_COMMIT=$(git rev-parse --short HEAD)

# Get the latest Git tag
TAG=$(git describe --exact-match --abbrev=0 --tags ${COMMIT} 2> /dev/null || true)
TAG=${TAG:="prod"}

# Set the date format
DATE=$(date +'%Y%m%d')

# Set the name of the Go binary
APP_NAME='templrjs'

echo 'Operating System = ['$OS']'

# Build the Go binary for Linux
echo "Building binaries"
export GOARCH="amd64"
export GOOS="linux"
export CGO_ENABLED=0
# Set the name of the binary with an underscore appended to it
BIN_NAME=$APP_NAME'_'$OS'_'
echo build -ldflags "-X $REPO_NAME/cmd.GitCommit=$GIT_COMMIT -X $REPO_NAME/cmd.Version=$TAG -X $REPO_NAME/cmd.BuildDate=$DATE" -o $BIN_NAME$DATE -v
go build -ldflags "-X $REPO_NAME/cmd.GitCommit=$GIT_COMMIT -X $REPO_NAME/cmd.Version=$TAG -X $REPO_NAME/cmd.BuildDate=$DATE" -o $BIN_NAME$DATE -v 
echo "Build complete"