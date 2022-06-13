# GitHub Finder App [![Netlify Status](https://api.netlify.com/api/v1/badges/8d87cc13-2371-4d56-8a5b-8f5ef23a46fe/deploy-status)](https://app.netlify.com/sites/willowy-froyo-b09d0f/deploys)

GitHub Finder is a simple app which allows you to search for users on GitHub. App will display a list of user search results and allows you to click on each user. Users' public information and latest repositories will display.

### Setup

1. Create a personal access token in [GitHub](https://github.com/settings/apps).
2. Create a [Netlify](https://www.netlify.com/) account and start a new project from existing Git repo. (Choose from GitLab, GitHub, BitBucket or Azure DevOps)
3. Setup environment variable:
   | Key | Value |
   | ------- | -------- |
   | GITHUB_TOKEN | y0uR!t0k3N |
4. Create a .env file and create the same variable:

```bash
GITHUB_TOKEN='y0uR!t0k3N'
```

### Install dependencies

```bash
npm install
```

and you will need to install the Nelify CLI to run the project locally:

```bash
npm install netlify-cli -g
```

### Usage

```bash
netlify dev
```

Runs on :3000 & :8888
