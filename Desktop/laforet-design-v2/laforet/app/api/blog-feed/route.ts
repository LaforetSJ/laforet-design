import { NextResponse } from "next/server"

interface BlogPost {
  title: string
  link: string
  pubDate: string
  thumbnail: string | null
  category: string
  summary: string
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const blogId = searchParams.get("blogId") || "laforetdesign"
  const categoryFilter = searchParams.get("category") || null
  const limit = parseInt(searchParams.get("limit") || "6")
  const requireThumbnail = searchParams.get("requireThumbnail") !== "false"

  try {
    const rssUrl = `https://rss.blog.naver.com/${blogId}`
    const response = await fetch(rssUrl, {
      headers: { "User-Agent": "Mozilla/5.0 (compatible; LaForetDesign/1.0)" },
      next: { revalidate: 3600 },
    })

    if (!response.ok) throw new Error(`RSS fetch failed: ${response.status}`)

    const xmlText = await response.text()
    let posts = parseRSSFeed(xmlText)

    // 카테고리 필터링 (고객님들 후기 등)
    if (categoryFilter) {
      const filtered = posts.filter((p) =>
        p.category.includes(categoryFilter) || p.title.includes(categoryFilter)
      )
      posts = filtered.length > 0 ? filtered : posts
    }

    if (requireThumbnail) {
      posts = posts.filter((p) => p.thumbnail !== null)
    }

    return NextResponse.json({ posts: posts.slice(0, limit), success: true })
  } catch (error) {
    console.error("Blog feed error:", error)
    return NextResponse.json({ posts: [], success: false, error: "Failed to fetch blog feed" }, { status: 500 })
  }
}

function parseRSSFeed(xml: string): BlogPost[] {
  const posts: BlogPost[] = []
  const itemRegex = /<item>([\s\S]*?)<\/item>/g
  let match

  while ((match = itemRegex.exec(xml)) !== null) {
    const itemContent = match[1]
    const title = extractTag(itemContent, "title")
    const link = extractTag(itemContent, "link")
    const pubDate = extractTag(itemContent, "pubDate")
    const description = extractTag(itemContent, "description")
    const categoryRaw = extractTag(itemContent, "category")
    const thumbnail = extractThumbnail(description || itemContent)
    const summary = extractSummary(description || "")
    const category = categoryRaw || categorizePost(title || "")

    if (title && link) {
      posts.push({
        title: decodeHTMLEntities(title),
        link,
        pubDate: formatDate(pubDate),
        thumbnail,
        category,
        summary: decodeHTMLEntities(summary),
      })
    }
  }
  return posts
}

function extractTag(content: string, tag: string): string | null {
  const cdataRegex = new RegExp(`<${tag}><!\\[CDATA\\[([\\s\\S]*?)\\]\\]><\\/${tag}>`, "i")
  const cdataMatch = content.match(cdataRegex)
  if (cdataMatch) return cdataMatch[1].trim()
  const regex = new RegExp(`<${tag}>([\\s\\S]*?)<\\/${tag}>`, "i")
  const match = content.match(regex)
  return match ? match[1].trim() : null
}

function extractThumbnail(content: string): string | null {
  // HTML 엔티티 디코딩 후 추출
  const decoded = content
    .replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&amp;/g, "&").replace(/&quot;/g, '"')

  // <img src="..."> 패턴
  const imgRegex = /<img[^>]+src=["']([^"']+)["']/i
  const match = decoded.match(imgRegex)
  if (match) {
    const src = match[1]
    // Naver 이미지 URL에 type=w800 붙여서 적절한 크기 요청
    if (src.includes("pstatic.net") && !src.includes("type=")) {
      return src.includes("?") ? `${src}&type=w800` : `${src}?type=w800`
    }
    return src
  }

  // enclosure url 패턴
  const mediaRegex = /url=["']([^"']+)["']/i
  const mediaMatch = decoded.match(mediaRegex)
  if (mediaMatch) return mediaMatch[1]

  return null
}

function extractSummary(description: string): string {
  // HTML 태그 제거 후 앞 100자 추출
  const clean = description.replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim()
  return clean.length > 100 ? clean.slice(0, 100) + "..." : clean
}

function categorizePost(title: string): string {
  const t = title.toLowerCase()
  if (t.includes("아파트") || t.includes("주거") || t.includes("거실") || t.includes("안방")) return "아파트"
  if (t.includes("카페") || t.includes("레스토랑") || t.includes("매장") || t.includes("상가") || t.includes("오피스")) return "상업공간"
  if (t.includes("욕실") || t.includes("주방") || t.includes("화장실") || t.includes("부분")) return "부분시공"
  if (t.includes("후기") || t.includes("리뷰") || t.includes("완공")) return "고객님들 후기"
  return "시공사례"
}

function formatDate(dateStr: string | null): string {
  if (!dateStr) return ""
  try {
    const date = new Date(dateStr)
    return `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(2, "0")}.${String(date.getDate()).padStart(2, "0")}`
  } catch { return "" }
}

function decodeHTMLEntities(text: string): string {
  return text
    .replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&nbsp;/g, " ")
}
