"use client";

import { FormEvent, useState } from "react";
import Button from "@/components/Buttons";

export default function Home() {
    const [originalUrl, setOriginalUrl] = useState("");
    const [shortUrl, setShortUrl] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isCopied, setIsCopied] = useState(false);

    async function shortenUrl(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        if (!originalUrl.trim()) {
            setError("Please enter a URL.");
            return;
        }

        setIsLoading(true);
        setError("");
        setShortUrl("");
        setIsCopied(false);

        try {
            const response = await fetch("/api/urls", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    originalUrl: originalUrl.trim()
                })
            });

            const data = await response.json();

            if (!response.ok) {
                setError(data.error === "Invalid URL"
                    ? "That doesn't look like a valid URL."
                    : "Something went wrong. Please try again.");
                return;
            }

            setShortUrl(data.shortUrl);
        } catch {
            setError("Couldn't reach the server.");
        } finally {
            setIsLoading(false);
        }
    }

    async function copyShortUrl() {
        await navigator.clipboard.writeText(shortUrl);
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
    }

    return (
        <main className="relative flex flex-1 items-center justify-center overflow-hidden bg-zinc-50 px-4 py-16 dark:bg-zinc-950">
            {/* Background gradient */}
            <div className="pointer-events-none absolute -top-40 left-1/2 h-[480px] w-[720px] -translate-x-1/2 rounded-full bg-gradient-to-tr from-indigo-300 via-sky-200 to-fuchsia-200 opacity-50 blur-3xl dark:from-indigo-900 dark:via-sky-950 dark:to-fuchsia-950" />

            <div className="relative w-full max-w-xl">
                <header className="mb-8 text-center">
                    <span className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-black text-white shadow-lg dark:bg-white dark:text-black">
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                            <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                            <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
                        </svg>
                    </span>
                    <h1 className="text-4xl font-bold tracking-tight text-zinc-900 sm:text-5xl dark:text-zinc-50">
                        URL Shortener
                    </h1>
                    <p className="mt-3 text-zinc-600 dark:text-zinc-400">
                        Turn long links into short, clean ones.
                    </p>
                </header>

                <section className="rounded-2xl border border-zinc-200 bg-white/80 p-6 shadow-xl shadow-zinc-200/50 backdrop-blur sm:p-8 dark:border-zinc-800 dark:bg-zinc-900/80 dark:shadow-black/30">
                    <form onSubmit={shortenUrl} className="flex flex-col gap-3 sm:flex-row">
                        <label htmlFor="original-url" className="sr-only">
                            Original URL
                        </label>
                        <input
                            id="original-url"
                            type="text"
                            inputMode="url"
                            autoComplete="off"
                            placeholder="https://example.com/very/long/link"
                            value={originalUrl}
                            onChange={(event) => setOriginalUrl(event.target.value)}
                            className="min-w-0 flex-1 rounded-lg border border-zinc-300 bg-white px-4 py-2.5 text-zinc-900 outline-none transition placeholder:text-zinc-400 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/15 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-100 dark:placeholder:text-zinc-500"
                        />

                        <Button
                            type="submit"
                            disabled={isLoading}
                            className="dark:bg-white dark:text-black dark:hover:bg-zinc-200"
                        >
                            {isLoading ? "Shortening…" : "Shorten"}
                        </Button>
                    </form>

                    {error && (
                        <p role="alert" className="mt-4 rounded-lg bg-red-50 px-4 py-2.5 text-sm text-red-600 dark:bg-red-950/50 dark:text-red-400">
                            {error}
                        </p>
                    )}

                    {shortUrl && (
                        <div className="mt-6 rounded-xl border border-indigo-200 bg-indigo-50/70 p-4 dark:border-indigo-900 dark:bg-indigo-950/40">
                            <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                                Short URL
                            </p>
                            <div className="flex items-center gap-3">
                                <a
                                    href={shortUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="min-w-0 flex-1 truncate font-mono text-lg font-medium text-zinc-900 hover:underline dark:text-zinc-100"
                                >
                                    {shortUrl}
                                </a>
                                <button
                                    type="button"
                                    onClick={copyShortUrl}
                                    className="shrink-0 cursor-pointer rounded-lg border border-zinc-300 bg-white px-3 py-1.5 text-sm font-medium text-zinc-700 transition hover:bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-200 dark:hover:bg-zinc-800"
                                >
                                    {isCopied ? "Copied ✓" : "Copy"}
                                </button>
                            </div>
                        </div>
                    )}
                </section>

                <footer className="mt-8 text-center text-xs text-zinc-500">
                    s.kkoreng.com
                </footer>
            </div>
        </main>
    );
}
