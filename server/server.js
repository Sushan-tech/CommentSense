const express = require("express");
const cors = require("cors");
const analyzeComment = require("./api");

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Health check endpoint
app.get("/v1/health", (req, res) => {
  res.status(200).json({
    status: "ok",
    service: "CommentSense API"
  });
});

app.get("/", (req, res) => {
  res.send(`
    <h2>CommentSense API</h2>
    <p>The API is live and running.</p>
    <ul>
      <li><b>Health Check:</b> <code>/v1/health</code></li>
      <li><b>Analyze Comment:</b> <code>POST /v1/analyze</code></li>
    </ul>
    <p>Check the GitHub repository for usage details.</p>
  `);
});


// Core comment analysis endpoint
app.post("/v1/analyze", async (req, res) => {
  try {
    const { text, platform, content_type, language } = req.body;

    if (!text) {
      return res.status(400).json({
        error: "Text field is required"
      });
    }

    const result = await analyzeComment({
      text,
      platform,
      content_type,
      language
    });

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({
      error: "Internal server error"
    });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`CommentSense API running on http://localhost:${PORT}`);
});
