const analyzeBtn = document.getElementById("analyzeBtn");
const commentInput = document.getElementById("commentInput");
const resultBox = document.getElementById("result");
const resultContent = document.getElementById("resultContent");

analyzeBtn.addEventListener("click", async () => {
  const text = commentInput.value.trim();

  if (!text) {
    alert("Please enter a comment");
    return;
  }

  try {
    const response = await fetch(
      "https://commentsense-api.onrender.com/v1/analyze",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          text: text,
          platform: "demo_ui",
          content_type: "comment"
        })
      }
    );

    const data = await response.json();
    resultBox.classList.remove("hidden");
    resultContent.textContent = JSON.stringify(data, null, 2);

  } catch (error) {
    alert("Unable to connect to CommentSense API");
  }
});
