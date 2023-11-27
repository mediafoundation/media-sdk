#!/bin/bash

# Log file and package.json paths
LOG_FILE="./CHANGELOG.md"
PACKAGE_JSON="./package.json"

# Function to compare semantic versions
# Returns 1 if $1 is greater than $2
compare_versions() {
    if [ "$1" = "$2" ]; then
        return 2 # Versions are equal
    fi
    IFS='.' read -ra VER1 <<< "$1"
    IFS='.' read -ra VER2 <<< "$2"
    for i in "${!VER1[@]}"; do
        if [[ -z "${VER2[i]}" ]]; then
            return 1 # First version is greater
        elif ((10#${VER1[i]} > 10#${VER2[i]})); then
            return 1 # First version is greater
        elif ((10#${VER1[i]} < 10#${VER2[i]})); then
            return 0 # Second version is greater
        fi
    done
    if [ "${#VER1[@]}" -lt "${#VER2[@]}" ]; then
        return 0 # Second version is greater
    fi
    return 1 # Versions are equal
}

# Extract the latest version from the log file
NEW_VERSION=$(grep -oP '(?<=## \[).+?(?=\])' "$LOG_FILE" | head -1)

if [ -z "$NEW_VERSION" ]; then
    echo "Unable to find the version in the log file."
    exit 1
fi

# Get the current version from package.json
CURRENT_VERSION=$(jq -r '.version' "$PACKAGE_JSON")

echo "Current version: $CURRENT_VERSION"
echo "Latest version found: $NEW_VERSION"

# Compare the current version with the new version
compare_versions "$NEW_VERSION" "$CURRENT_VERSION"
RESULT=$?

if [ $RESULT -eq 2 ]; then
    echo "The version in the log file is the same as the current one. No update required."
    exit 0
elif [ $RESULT -eq 0 ]; then
    echo "The version in the log file ($NEW_VERSION) is not greater than the current package.json version ($CURRENT_VERSION). No update required."
    exit 0
fi

# Update package.json with the new version
jq --arg v "$NEW_VERSION" '.version=$v' "$PACKAGE_JSON" > temp.json && mv temp.json "$PACKAGE_JSON"

echo "Updating package.json from version $CURRENT_VERSION to $NEW_VERSION"
echo "package.json updated to version $NEW_VERSION."
