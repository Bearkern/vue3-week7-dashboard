#!/usr/bin/env sh

# 当发生错误时中止脚本
set -e

npm run build

cd dist

# 部署到自定义域域名
# echo 'www.example.com' > CNAME

git init
git add -A
git commit -m 'deploy'

git push -f git@github.com:Bearkern/vue3-week7-dashboard.git master:gh-pages

cd -