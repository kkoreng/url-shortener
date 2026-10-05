import { ImageResponse } from "next/og";
import LinkIcon from "@/components/LinkIcon";

export const alt = "URL Shortener";
export const size = { width: 1200, height: 630 };

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
                    <LinkIcon size={64} color="#fff" />
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
