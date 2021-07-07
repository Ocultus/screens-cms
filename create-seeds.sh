#!/bin/bash

yarn $1 -s CreateUser
yarn $1 -s CreateEvent
yarn $1 -s CreateScreen
yarn $1 -s CreatePlaylist
yarn $1 -s CreateContent
yarn $1 -s CreatePlaylistToContentGroup