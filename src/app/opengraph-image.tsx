import { ImageResponse } from "next/og";

export const alt = "URL Shortener";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Open Graph thumbnail shown in link previews
 * (the default font has no Korean glyphs, so keep text in English)
 */
export default function OpengraphImage() {
    return new ImageResponse(
        (
            <div
                style={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    background: "linear-gradient(135deg, #e0e7ff 0%, #f0f9ff 50%, #fae8ff 100%)",
                }}
            >
                <div
                    style={{
                        width: 120,
                        height: 120,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        borderRadius: 32,
                        background: "#000",
                        marginBottom: 48,
                    }}
                >
                    <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                        <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
                    </svg>
                </div>
                <div style={{ fontSize: 96, fontWeight: 700, color: "#18181b", letterSpacing: -3 }}>
                    URL Shortener
                </div>
                <div style={{ fontSize: 40, color: "#52525b", marginTop: 20 }}>
                    s.kkoreng.com
                </div>
            </div>
        ),
        size
    );
}
