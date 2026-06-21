# Jenkin-Demo

Simple Node.js project to practice Jenkins CI/CD. Push to GitHub and Jenkins runs the pipeline automatically.

## Project Structure

```
Jenkin-Demo/
├── index.js        # Simple HTTP server
├── test.js         # Basic tests
├── package.json
├── Jenkinsfile     # Jenkins pipeline definition
└── README.md
```

## Run Locally

```bash
npm install
npm test
npm start
```

Server runs at `http://localhost:3000`.

## Jenkins Setup (Interview Demo)

### 1. Install Jenkins

```bash
# Ubuntu/Debian
sudo apt update
sudo apt install openjdk-17-jdk -y
wget -q -O - https://pkg.jenkins.io/debian-stable/jenkins.io.key | sudo apt-key add -
sudo sh -c 'echo deb https://pkg.jenkins.io/debian-stable binary/ > /etc/apt/sources.list.d/jenkins.list'
sudo apt update
sudo apt install jenkins -y
sudo systemctl start jenkins
sudo systemctl enable jenkins
```

Open `http://localhost:8080` and complete the setup wizard.

### 2. Install Required Plugins

In Jenkins: **Manage Jenkins → Plugins → Available plugins**

Install:

- GitHub Integration
- Pipeline
- NodeJS Plugin
- Git plugin

### 3. Configure Node.js Tool

**Manage Jenkins → Tools → NodeJS installations**

- Name: `NodeJS-18`
- Version: NodeJS 18.x
- Save

### 4. Add GitHub Credentials

**Manage Jenkins → Credentials → System → Global credentials**

Add a credential with your GitHub username and Personal Access Token (PAT).

### 5. Create Pipeline Job

1. **New Item** → name: `Jenkin-Demo` → type: **Pipeline** → OK
2. Under **Pipeline**:
   - Definition: **Pipeline script from SCM**
   - SCM: **Git**
   - Repository URL: `https://github.com/Randipa/Jenkin-Demo.git`
   - Credentials: select your GitHub credential
   - Branch: `*/main`
   - Script Path: `Jenkinsfile`
3. Save

### 6. Connect GitHub Webhook (Auto Trigger on Push)

#### On GitHub

1. Repo → **Settings → Webhooks → Add webhook**
2. Payload URL: `http://YOUR_JENKINS_IP:8080/github-webhook/`
3. Content type: `application/json`
4. Events: **Just the push event**
5. Add webhook

#### On Jenkins

1. Job → **Configure**
2. Under **Build Triggers**, enable **GitHub hook trigger for GITScm polling**
3. Save

> If Jenkins runs locally, use [ngrok](https://ngrok.com/) to expose port 8080 so GitHub can reach your webhook.

### 7. Test the Pipeline

```bash
git add .
git commit -m "Add Node.js app and Jenkins pipeline"
git push origin main
```

Jenkins should start a new build automatically.

## Pipeline Stages

| Stage | What it does |
|-------|----------------|
| Checkout | Pulls code from GitHub |
| Install Dependencies | Runs `npm install` |
| Run Tests | Runs `npm test` |
| Build Info | Prints build details |

## Interview Talking Points

- **Pipeline as Code**: `Jenkinsfile` lives in the repo (version controlled).
- **SCM Polling vs Webhook**: Webhook is faster; polling checks Git periodically.
- **Declarative Pipeline**: Uses `pipeline { }` block — easier to read than scripted.
- **Agent any**: Runs on any available Jenkins agent/node.
- **Post actions**: `success`, `failure`, `always` — cleanup with `cleanWs()`.
- **Tools block**: Jenkins injects Node.js into PATH for pipeline steps.

## Troubleshooting

| Problem | Fix |
|---------|-----|
| Webhook not triggering | Check Jenkins URL is reachable from GitHub |
| `nodejs tool not found` | Match tool name in Jenkinsfile (`NodeJS-18`) with Jenkins config |
| npm not found | Install NodeJS plugin and configure Node installation |
| Permission denied on git | Add GitHub credentials in Jenkins |
