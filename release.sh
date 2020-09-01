#!/usr/bin/env sh
set -e
echo "Enter release version: "
read VERSION
read -p "is beta - are you sure? (y/n)" -n 1 -r TAG_BETA
echo  # (optional) move to a new line
read -p "Releasing $VERSION - are you sure? (y/n)" -n 1 -r RELEASE
echo  # (optional) move to a new line

if [[ $RELEASE =~ ^[Yy]$ ]]
then
  echo "Releasing $VERSION ..."

  # commit
  git add -A
  # git commit -m "[build] $VERSION"
  npm run commit
  npm version $VERSION --message "chore: [release] $VERSION"
  git push

  # publish
  if [[ $TAG_BETA =~ ^[Yy]$ ]]
  then
    echo "npm publish --tag beta ..."
    npm publish --tag beta
  else
    echo "npm publish"
    npm publish
  fi
fi
