#!/bin/bash

pandoc -t revealjs --slide-level=2 -s index.md -o dist/index.html
