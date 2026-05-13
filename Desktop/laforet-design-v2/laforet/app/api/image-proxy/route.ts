import { NextResponse } from "next/server"

const ALLOWED_HOSTS = ["postfiles.pstatic.net", "blogfiles.pstatic.net", "blogthumb.pstatic.net", "blogimgs.naver.net", "imgnews.pstatic.net"]

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const imageUrl = searchParams.get("url")

  if (!imageUrl) return new NextResponse("Missing url", { status: 400 })

  try {
    const parsed = new URL(imageUrl)
    if (!ALLOWED_HOSTS.some((h) => parsed.hostname.endsWith(h))) {
      return new NextResponse("Not allowed", { status: 403 })
    }

    const response = await fetch(imageUrl, {
      headers: {
        Referer: "https://blog.naver.com/",
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
      },
    })

    if (!response.ok) return new NextResponse("Failed", { status: response.status })

    const contentType = response.headers.get("content-type") || "image/jpeg"
    return new NextResponse(response.body, {
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "public, max-age=86400",
      },
    })
  } catch {
    return new NextResponse("Error", { status: 500 })
  }
}
