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

  curl -sSLf https://github.com/github/hub/releases/download/v2.8.3/hub-linux-amd64-2.8.3.tgz | \
  tar zxf - --strip-components=1 -C /tmp && \
  sudo mv /tmp/bin/hub /usr/local/bin/hub

  hub pull-request --no-edit -b emgniddikur:develop
fi
