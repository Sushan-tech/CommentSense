const express = require("express");
const cors = require("cors");

const app = express();

/* -------------------- MIDDLEWARE -------------------- */
app.use(cors());
app.use(express.json());

/* -------------------- ROOT ROUTE -------------------- */
/* This fixes "Cannot GET /" */
app.get("/", (req, res) => {
  res.status(200).send(`
    <h2>CommentSense API is running</h2>
    <p>This is an API-based service.</p>
    <h3>Available Endpoints:</h3>
    <ul>
      <li><b>GET</b> /v1/health</li>
      <li><b>POST</b> /v1/analyze</li>
    </ul>
    <p>Check the GitHub repository for full documentation.</p>
  `);
});

/* -------------------- HEALTH CHECK -------------------- */
app.get("/v1/health", (req, res) => {
  res.json({
    status: "ok",
    service: "CommentSense API",
    timestamp: new Date().toISOString(),
  });
});

/* -------------------- ANALYZE COMMENT -------------------- */
app.post("/v1/analyze", (req, res) => {
  const { text } = req.body;

  if (!text || typeof text !== "string") {
    return res.status(400).json({
      error: "Invalid input. Please provide a text string.",
    });
  }

  const lowerText = text.toLowerCase();

  let sentiment = "neutral";
  let category = "general";

  // Simple keyword-based logic (can be improved by contributors)
  if (
    lowerText.includes("bad") ||
    lowerText.includes("stupid") ||
    lowerText.includes("hate")
  ) {
    sentiment = "negative";
    category = "toxic";
  } else if (
    lowerText.includes("good") ||
    lowerText.includes("great") ||
    lowerText.includes("awesome") ||
    lowerText.includes("love")
  ) {
    sentiment = "positive";
    category = "appreciation";
  }

  res.json({
    originalText: text,
    sentiment,
    category,
  });
});

/* -------------------- START SERVER -------------------- */
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`CommentSense API running on port ${PORT}`);
});
