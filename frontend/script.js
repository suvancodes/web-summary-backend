document.getElementById("summarize-btn").addEventListener("click", async () => {
  const url = document.getElementById("url-input").value.trim();
  const resultEl = document.getElementById("result");

  if (!url) {
    alert("Please enter a URL");
    return;
  }

  resultEl.textContent = "Loading summary...";

  try {
    const response = await fetch("https://web-summary-backend-1.onrender.com/summarize", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ url }),
    });

    if (!response.ok) {
      const err = await response.text();
      resultEl.textContent = `Error: ${response.status} - ${err}`;
      return;
    }

    const data = await response.json();
    resultEl.textContent = data.summary || "No summary available.";
  } catch (error) {
    resultEl.textContent = "Error: " + error.message;
  }
});

