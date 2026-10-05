"use client";

import { useState } from "react";

export default function Home() {
  const [originalUrl, setOriginalUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");

  async function shortenUrl() {
    const response = await fetch("/api/urls", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        originalUrl: originalUrl
      })
    });

    const data = await response.json();

    setShortUrl(data.shortUrl);
  }

  return (
      <main>
        <h1>SURL</h1>

        <input
            type="text"
            placeholder="Enter a URL"
            value={originalUrl}
            onChange={(event) => setOriginalUrl(event.target.value)}
        />

        <button onClick={shortenUrl}>
          Shorten
        </button>

        {shortUrl && (
            <p>
              Short URL: {shortUrl}
            </p>
        )}
      </main>
  );
}