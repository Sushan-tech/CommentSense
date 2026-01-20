/**
 * CommentSense API
 * ----------------
 * An API-based system for comment analysis and moderation.
 * Features:
 * - Sentiment detection
 * - Toxicity flags
 * - Moderation recommendation
 * - Metadata support
 */

const express = require("express");
const cors = require("cors");

const app = express();

/* =====================================================
   MIDDLEWARE
===================================================== */
app.use(cors());
app.use(express.json());

/* =====================================================
   ROOT ROUTE (API INFO PAGE)
===================================================== */
app.get("/", (req, res) => {
  res.status(200).send(`
    <h2>CommentSense API</h2>
    <p>The API is live and running.</p>
    <h3>Available Endpoints:</h3>
    <ul>
      <li><b>GET</b> /v1/health</li>
      <li><b>POST</b> /v1/analyze</li>
    </ul>
    <p>This is an API-first project. Please refer to the GitHub repository for usage details.</p>
  `);
});

/* =====================================================
   HEALTH CHECK
===================================================== */
app.get("/v1/health", (req, res) => {
  res.json({
    status: "ok",
    service: "CommentSense API",
    timestamp: new Date().toISOString()
  });
});

/* =====================================================
   COMMENT ANALYSIS ENDPOINT
===================================================== */
app.post("/v1/analyze", (req, res) => {
  const {
    text,
    platform = "unknown",
    content_type = "comment"
  } = req.body;

  // Input validation
  if (!text || typeof text !== "string") {
    return res.status(400).json({
      error: "Invalid input. Please provide a valid text string."
    });
  }

  const lowerText = text.toLowerCase();

  /* -----------------------------
     Default Analysis Values
  ------------------------------ */
  let sentimentLabel = "neutral";
  let confidence = 0.6;
  let category = "general";

  const flags = {
    toxic: false,
    vulgar: false,
    spam: false,
    hate_speech: false
  };

  /* -----------------------------
     Simple Keyword-Based Logic
     (Designed to be extended)
  ------------------------------ */
  if (
    lowerText.includes("stupid") ||
    lowerText.includes("idiot") ||
    lowerText.includes("hate") ||
    lowerText.includes("fool")
  ) {
    sentimentLabel = "negative";
    confidence = 0.8;
    category = "toxic_insult";
    flags.toxic = true;
  } else if (
    lowerText.includes("good") ||
    lowerText.includes("great") ||
    lowerText.includes("awesome") ||
    lowerText.includes("love")
  ) {
    sentimentLabel = "positive";
    confidence = 0.85;
    category = "appreciation";
  }

  /* -----------------------------
     Moderation Recommendation
  ------------------------------ */
  const recommended_action =
    sentimentLabel === "negative" && flags.toxic
      ? "hide_or_review"
      : "allow";

  /* -----------------------------
     Final Structured Response
  ------------------------------ */
  res.json({
    original_text: text,
    sentiment: {
      label: sentimentLabel,
      confidence: confidence
    },
    category: category,
    flags: flags,
    recommended_action: recommended_action,
    metadata: {
      platform: platform,
      content_type: content_type,
      language: "en"
    }
  });
});

/* =====================================================
   START SERVER
===================================================== */
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`CommentSense API running on port ${PORT}`);
});
