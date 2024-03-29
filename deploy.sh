#!/bin/bash
set -e # exit with nonzero exit code if anything fails

# clear and re-create the build directory
rm -rf build || exit 0;
mkdir build;

# run our compile script, discussed above
gulp make-build

# go to the build directory and create a *new* Git repo
cd build
git init

# inside this git repo we'll pretend to be a new user
git config user.name "Travis CI"
git config user.email "jonatas.leon@gmail.com"

# The first and only commit to this new Git repo contains all the
# files present with the commit message "Deploy to GitHub Pages".
git add .
git commit -m "Deploy to Github Pages"

# Force push from the current repo's master branch to the remote
# repo's gh-pages branch. (All previous history on the gh-pages branch
# will be lost, since we are overwriting it.) We redirect any output to
# /dev/null to hide any sensitive credential data that might otherwise be exposed.
echo "pushing..."
git push --force --quiet "https://${GH_TOKEN}@${GH_REF}" master > /dev/null 2>&1
