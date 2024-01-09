console.log("Current Branch: " + process.env.CURRENT_BRANCH);
module.exports = {
    branches: [process.env.CURRENT_BRANCH || "main"],
    plugins: [
        "@semantic-release/commit-analyzer",
        "@semantic-release/release-notes-generator",
        [
            "@semantic-release/changelog",
            {
                "changelogFile": "CHANGELOG.md"
            }
        ],
        [
            "@semantic-release/exec",
            {
                "publishCmd": "./publish.sh"
            }
        ]
    ]
};
