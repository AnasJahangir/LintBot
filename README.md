
# LintBot Documentation

## Overview
**LintBot** is a GitHub App designed to automatically check JavaScript files in pull requests for code quality issues using ESLint. Whenever a pull request is opened, LintBot retrieves the JavaScript files, runs ESLint checks, and comments on the pull request with any issues found.

## Features
- **Automatic ESLint Checks:** On every pull request, LintBot checks for JavaScript code quality.
- **Detailed Feedback:** Provides feedback directly in the pull request comments, highlighting any errors or warnings.

## Technologies Used
- **Backend:** Node.js, Express
- **GitHub API:** Octokit
- **Linting:** ESLint
- **Environment Variables:** dotenv for managing sensitive information

## Getting Started

### Prerequisites
- Node.js (version 14 or higher)
- GitHub account and a GitHub App setup
- MongoDB (if you choose to store any data)

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/AnasJahangir/lintbot.git
   cd lintbot
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a .env file in the root of the project and add your GitHub App credentials:
   ```makefile
   GITHUB_APP_ID=your_app_id
   GITHUB_PRIVATE_KEY=your_private_key
   PORT=3000
   ```

### Running the Application
Start the server:
   ```bash
   npm start
   ```
The server will be listening on the port defined in your environment variables (default is 3000).

### How to Set Up GitHub App
1. Go to your GitHub account settings and navigate to "Developer settings."
2. Click on "GitHub Apps" and then "New GitHub App."
3. Fill in the required fields:
   - GitHub App Name: LintBot
   - Homepage URL: Your application's URL or GitHub repository URL
   - Callback URL: http://localhost:3000/webhook (or your deployed URL)
   - Webhook URL: http://localhost:3000/webhook
4. Set the necessary permissions:
   - Repository Permissions: Read and write access for issues and pull requests.
5. Generate a private key and add it to your .env file as GITHUB_PRIVATE_KEY.

## API Endpoints
### Webhook
**POST /webhook** - This endpoint listens for GitHub webhook events. When a pull request is opened, it triggers the ESLint checks on JavaScript files.

## Folder Structure
```bash
lintbot/
├── node_modules/
├── .env
├── package.json
├── index.js
└── README.md
```

## Contributing
If you would like to contribute to LintBot, please fork the repository and submit a pull request.

## License
This project is licensed under the MIT License.

### How to Use the Documentation
- Copy the markdown text above and paste it into a `README.md` file in your project repository.
- Customize any sections as needed to match your specific implementation or additional features.

Feel free to modify the name and features as per your application’s specifics or any additional functionality you may have!
