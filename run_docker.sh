#!/bin/bash

#
# The script has been developed and tested on MacOS Ventura 13.2.1, so there could be some differences with other OSs
# Usage:
#
# The script accepts one optional arguments:
#   1) the first one controls whether the container image is first built or not. Set it to False in order not to
#      build an image, i.e. ./runner.sh False. Otherwise, an image would be built first.

#
# Examples:
#
# $ ./run_docker.sh - Default. Builds the docker image.
# $ ./run_docker.sh False - Don't build an image.
# $ ./run_docker.sh True - Build an image (default).
#

IMAGE_NAME='tourradar-ui-tests-image'
APP_NAME='tourradar-ui-tests-app'

if docker info ; then
  if [[ $1 != 'False' ]] ; then
    echo 'Starting the process of building a new docker image with the tests app...'
    docker build --tag $IMAGE_NAME .
    echo 'Successfully built the docker image!'
  fi
  docker run $IMAGE_NAME
  echo 'Ran the container in attached mode.'
  docker rm --force $CONTAINER_ID
  echo 'Forcefully removed the container.'
else
  echo 'The command "docker info" was unsuccessful! Please either start or install Docker.'
fi