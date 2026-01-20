# 🏆 This repository is part of the Open Source 101 organised by ISTE HIT SC

# CommentSense

CommentSense is an API-based comment moderation and chat segregation system designed to analyze, classify, and flag public comments or chat messages on social platforms.

The project focuses on sentiment analysis, toxicity detection, and content categorization, providing structured moderation insights that platforms can act upon.

---

## Problem Statement

Social media platforms receive millions of comments every day. Manual moderation is slow and inconsistent, while simple keyword filtering fails to understand context.

CommentSense addresses this problem by offering a backend moderation service that classifies comments into meaningful categories such as positive, neutral, negative, toxic, vulgar, or spam.

---

## Key Features

- Sentiment classification (Positive / Neutral / Negative)
- Toxic, vulgar, and spam detection
- Rule-based and explainable logic
- Platform-agnostic REST API
- JSON-based responses
- Frontend demo for visualization
- Open-source and contributor-friendly architecture

---

## What CommentSense Is (and Is Not)

### What It Is
- A backend moderation service
- An API that social platforms can integrate
- A decision-support system for content moderation

### What It Is Not
- A social media scraper
- A browser extension
- A manual comment-checking website

The frontend included in this project is only a demo interface to simulate how platforms interact with the API.

---

## How Platforms Use CommentSense

1. A user posts a comment on a platform
2. The platform sends the comment to CommentSense via API
3. CommentSense analyzes the text
4. The platform decides whether to allow, warn, limit, or hide the comment

CommentSense does not enforce actions. It only provides classification and recommendations.

---

## API Overview

### POST `/v1/analyze`

Analyzes a comment and returns moderation insights.

Example request:
```json
{
  "text": "This creator is stupid and useless",
  "platform": "instagram",
  "content_type": "comment"
}

## Example response:
{
  "sentiment": {
    "label": "negative",
    "confidence": 0.8
  },
  "category": "toxic_insult",
  "recommended_action": "hide_or_review"
}

GET /v1/health
"Health check endpoint to verify API availability."


## "Project Structure:"
    CommentSense/
    ├── server/
    │   ├── server.js
    │   └── api.js
    ├── frontend/
    │   ├── index.html
    │   ├── style.css
    │   └── script.js
    ├── docs/
    ├── README.md
    ├── LICENSE
    ├── CONTRIBUTING.md
    ├── package.json
    └── .gitignore

## "Technology Stack"
 • Backend: Node.js, Express.js
 • Frontend: HTML, CSS, JavaScript
 • Data Format: JSON
 • Architecture: REST API


## "How to Run the Project Locally"

# "Prerequisites:"
 • Node.js (LTS recommended)
 • npm (comes with Node.js)
 • A web browser (Chrome recommended)
# "Verify installation:"
    node -v
    npm -v

## "Steps to Run"
• Clone the repository:
    git clone https://github.com/<your-username>/CommentSense.git
    cd CommentSense
• Install dependencies:
    npm install


• Start the backend server:
    node server/server.js


• If successful, you will see:
    CommentSense API running on http://localhost:3000

• Keep this terminal running.

• Verify backend (optional):
    http://localhost:3000/v1/health


• Open the frontend demo:
    "Navigate to frontend/"
    "Open index.html in a browser"
• Test with sample comments such as:
   "This creator is stupid and useless"
   "This is an amazing video, great work!"
