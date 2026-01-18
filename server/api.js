// Keyword lists (can be expanded by contributors)
const POSITIVE_WORDS = ["good", "great", "awesome", "love", "nice", "amazing"];
const NEGATIVE_WORDS = ["bad", "worst", "hate", "useless", "stupid"];
const TOXIC_WORDS = ["idiot", "stupid", "dumb", "nonsense"];
const VULGAR_WORDS = ["fuck", "shit", "bitch"];
const SPAM_PATTERNS = ["buy now", "free money", "click here"];

// Utility function
function containsAny(text, list) {
  return list.some(word => text.includes(word));
}

async function analyzeComment({ text, platform, content_type, language }) {
  const lowerText = text.toLowerCase();

  // Flags
  const flags = {
    toxic: containsAny(lowerText, TOXIC_WORDS),
    vulgar: containsAny(lowerText, VULGAR_WORDS),
    spam: containsAny(lowerText, SPAM_PATTERNS),
    hate_speech: false
  };

  // Sentiment detection
  let sentimentLabel = "neutral";
  let confidence = 0.5;

  if (containsAny(lowerText, POSITIVE_WORDS)) {
    sentimentLabel = "positive";
    confidence = 0.8;
  }

  if (containsAny(lowerText, NEGATIVE_WORDS)) {
    sentimentLabel = "negative";
    confidence = 0.8;
  }

  // Category mapping
  let category = "neutral";

  if (flags.spam) {
    category = "spam";
  } else if (flags.vulgar) {
    category = "vulgar";
  } else if (flags.toxic) {
    category = "toxic_insult";
  } else if (sentimentLabel === "positive") {
    category = "supportive";
  } else if (sentimentLabel === "negative") {
    category = "emotional_negative";
  }

  // Recommended action
  let recommended_action = "allow";

  if (flags.spam || flags.vulgar || flags.toxic) {
    recommended_action = "hide_or_review";
  }

  return {
    original_text: text,
    sentiment: {
      label: sentimentLabel,
      confidence
    },
    category,
    flags,
    recommended_action,
    metadata: {
      platform: platform || "unspecified",
      content_type: content_type || "comment",
      language: language || "en"
    }
  };
}

module.exports = analyzeComment;
