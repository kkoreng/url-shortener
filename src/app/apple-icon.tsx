import { ImageResponse } from "next/og";
import LinkIcon from "@/components/LinkIcon";

export const size = { width: 180, height: 180 };

export default function AppleIcon() {
    return new ImageResponse(
        (
            <div
                style={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: "#000",
                }}
            >
                <LinkIcon size={100} color="#fff" />
            </div>
        ),
        size
    );
}
