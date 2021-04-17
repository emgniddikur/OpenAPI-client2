#!/bin/bash

curl -O -H "Authorization: token ${GITHUB_TOKEN}" https://raw.githubusercontent.com/emgniddikur/OpenAPI-api/develop/swagger.yml
docker run --rm -v "${PWD}:/local" \
  openapitools/openapi-generator-cli generate \
  -i /local/swagger.yml \
  -g typescript-fetch \
  -o /local/src/api/generated \
  --additional-properties=modelPropertyNaming=camelCase,supportsES6=true,withInterfaces=true,typescriptThreePlus=true

cd ~/project

git add -N .

if [ "`git diff --name-only`" != "" ]; then
  git checkout -b generate-api-client

  git add .

  git config --global user.email "you@example.com"
  git config --global user.name "Your Name"

  git commit -m "スキーマの変更によるAPIクライアントの自動生成"

  git push origin HEAD

  sudo apt-key adv --keyserver keyserver.ubuntu.com --recv-key C99B11DEB97541F0
  sudo apt-add-repository https://cli.github.com/packages
  sudo apt update
  sudo apt install gh

  echo ${GITHUB_TOKEN} | gh auth login -w

  gh pr create -f -B develop
fi
