#!/bin/bash

pandoc -t revealjs --slide-level=2 -s src/index.md -o dist/index.html
