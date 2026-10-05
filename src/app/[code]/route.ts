import {supabase} from "@/database/supabase";
import {NextResponse} from "next/server";

/**
 * Short URL에 해당하는 Original URL 조회 후 리다이렉트
 */
export async function GET(
    request: Request,
    { params }: { params: Promise<{ code: string }> }
) {
    const { code } = await params;

    // Supabase에서 short_code 검색
    const { data, error } = await supabase
        .from("urls")
        .select("original_url")
        .eq("short_code", code)
        .maybeSingle()

    // DB 오류 예외 처리
    if (error) {
        console.error("Supabase error:", error);
        return NextResponse.json(
            { error: "Database error" },
            { status: 500 }
        )
    }

    // 검색 결과 오류 예외 처리
    if (!data) {
        return NextResponse.json(
            { error: "Short URL not found" },
            { status: 404 }
        )
    }

    // short URL to original URL 리다이렉트
    return NextResponse.redirect(data.original_url, 302);

}