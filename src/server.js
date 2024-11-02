const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");
const { Octokit } = require("@octokit/rest");
const { createAppAuth } = require("@octokit/auth-app");
require("dotenv").config();

const app = express();
app.use(bodyParser.json());

app.post("/webhook", async (req, res) => {
  const event = req.headers["x-github-event"];
  const payload = req.body;

  if (event === "pull_request" && payload.action === "opened") {
    const pullRequest = payload.pull_request;
    const repo = payload.repository;

    const octokit = new Octokit({
      authStrategy: createAppAuth,
      auth: {
        appId: process.env.GITHUB_APP_ID,
        privateKey: process.env.GITHUB_PRIVATE_KEY,
        installationId: payload.installation.id,
      },
    });

    const files = await octokit.pulls.listFiles({
      owner: repo.owner.login,
      repo: repo.name,
      pull_number: pullRequest.number,
    });

    for (const file of files.data) {
      if (file.filename.endsWith(".js")) {
        const content = await axios.get(file.raw_url);
        // Perform ESLint check
        const { CLIEngine } = require("eslint");
        const cli = new CLIEngine();
        const report = cli.executeOnText(content.data, file.filename);
        const formatter = cli.getFormatter();
        const resultText = formatter(report.results);

        if (report.errorCount > 0 || report.warningCount > 0) {
          await octokit.issues.createComment({
            owner: repo.owner.login,
            repo: repo.name,
            issue_number: pullRequest.number,
            body: `ESLint found issues in \`${file.filename}\`:\n\`\`\`\n${resultText}\n\`\`\``,
          });
        }
      }
    }
  }

  res.status(200).send("OK");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
