import { NextResponse } from "next/server";
import { generateShortCode } from "@/lib/code-generator";
import { supabase } from "@/database/supabase";

/**
 * Original URL을 받아 Short URL을 생성합니다.
 *
 * Request:
 * { "originalUrl": "google.com" }
 *
 * Response:
 * {
 *   "originalUrl": "https://0000.000",
 *   "shortCode": "000000",
 *   "shortUrl": "https://s.kkoreng.com/000000"
 * }
 */
export async function POST(request: Request) {
    let originalUrl: string;

    // Request JSON 읽기
    try {
        const body = await request.json();

        // originalUrl 타입 검사
        if (typeof body.originalUrl !== "string") {
            return NextResponse.json(
                { error: "Invalid URL" },
                { status: 400 }
            );
        }

        originalUrl = body.originalUrl;

    } catch {
        return NextResponse.json(
            { error: "Invalid JSON" },
            { status: 400 }
        );
    }

    // Protocol이 없으면 HTTPS 사용
    if (
        !originalUrl.startsWith("http://") &&
        !originalUrl.startsWith("https://")
    ) {
        originalUrl = "https://" + originalUrl;
    }

    // URL 형식 검사
    try {
        new URL(originalUrl);
    } catch {
        return NextResponse.json(
            { error: "Invalid URL" },
            { status: 400 }
        );
    }

    // Short Code 생성
    const shortCode = generateShortCode();

    // Supabase에 저장
    const { error } = await supabase
        .from("urls")
        .insert({
            original_url: originalUrl,
            short_code: shortCode
        });

    if (error) {
        console.error(error);

        return NextResponse.json(
            { error: "Database error" },
            { status: 500 }
        );
    }

    // Short URL 생성
    const shortUrl = `https://s.kkoreng.com/${shortCode}`;

    return NextResponse.json(
        {
            originalUrl,
            shortCode,
            shortUrl
        },
        { status: 201 }
    );
}