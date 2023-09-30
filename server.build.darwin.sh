#!/bin/bash

REPO_NAME="https://github.com/senthilsweb/ai1.server.go.git"
OS="$(uname -s)"
GIT_COMMIT=$(git rev-parse --short HEAD)
TAG=$(git describe --exact-match --abbrev=0 --tags ${COMMIT} 2> /dev/null || true)
TAG=${TAG:="prod"}
DATE=$(date +'%Y-%m-%d')
APP_NAME='templrjs'
BIN_NAME=$APP_NAME'_'
DIST='./'
DEST='./'
INSTALL_BUNDLE=$APP_NAME'.tar.gz'
echo $INSTALL_BUNDLE
echo 'Operating System = ['$OS']'

echo "Building binaries"
echo Git commit: $GIT_COMMIT Version: $TAG Build date: $DATE


go generate

# MAC
export GOARCH="amd64"
export GOOS="darwin"
export CGO_ENABLED=0
echo build -o templrjs_darwin_amd64 -v .
go build -o templrjs_darwin_amd64 -v .
