"use client"

import { useEffect, useState } from "react"
import { Star, ArrowUpRight } from "lucide-react"
import { Button } from "@/components/ui/button"

const BLOG_ID = "laforetdesign"
const BLOG_URL = "https://blog.naver.com/PostList.naver?blogId=laforetdesign&categoryNo=17&from=postList&parentCategoryNo=17"

interface ReviewPost {
  title: string
  link: string
  pubDate: string
  thumbnail: string | null
  summary: string
}

const fallbackReviews = [
  { id: 1, name: "김○○", location: "용인 수지구", rating: 5, text: "처음부터 끝까지 정말 만족스러웠습니다. 견적도 투명하게 설명해주시고, 시공 과정에서도 매일 진행 상황을 공유해주셔서 안심이 됐어요." },
  { id: 2, name: "박○○", location: "분당 정자동", rating: 5, text: "상업공간 인테리어는 처음이라 걱정이 많았는데, 전문적인 조언과 디자인으로 기대 이상의 결과물을 받았습니다. 손님들도 칭찬을 많이 해주세요!" },
  { id: 3, name: "이○○", location: "수원 영통구", rating: 5, text: "주방만 리모델링했는데 새 집 같아졌어요. 공간 활용도 잘 해주시고, 마감도 깔끔해서 정말 만족합니다. 나중에 욕실도 맡기려고요." },
  { id: 4, name: "최○○", location: "성남 분당구", rating: 5, text: "전체 리모델링을 맡겼는데 일정도 딱 맞게 지켜주시고 결과물도 너무 예뻐요. 친구들이 다들 어디서 했냐고 물어봐요." },
  { id: 5, name: "정○○", location: "용인 기흥구", rating: 5, text: "화장실 두 곳을 한 번에 리모델링했는데 작업자분들이 정말 꼼꼼하셨어요. 타일 줄눈 하나하나까지 신경 써주신 게 느껴졌습니다." },
  { id: 6, name: "한○○", location: "광교 신도시", rating: 5, text: "신혼집 인테리어를 맡겼는데 저희 취향을 잘 이해하고 반영해주셔서 정말 감동이었어요. 5년 후에도 또 맡기고 싶어요." },
  { id: 7, name: "윤○○", location: "수원 팔달구", rating: 5, text: "오래된 아파트인데 완전히 새 집처럼 바뀌었어요. 작업 중 발생한 작은 문제도 바로 해결해주셔서 신뢰가 갔습니다." },
  { id: 8, name: "조○○", location: "화성 동탄", rating: 5, text: "사무실 인테리어를 의뢰했는데 직원들이 출근하기 좋아졌다고 다들 좋아해요. 공간 분위기가 180도 달라졌습니다." },
]

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className={`w-4 h-4 ${i < rating ? "fill-primary text-primary" : "fill-muted text-muted"}`} />
      ))}
    </div>
  )
}

function proxyUrl(url: string | null): string | null {
  if (!url) return null
  try {
    const parsed = new URL(url)
    if (parsed.hostname.includes("pstatic.net") || parsed.hostname.includes("naver.net")) {
      return `/api/image-proxy?url=${encodeURIComponent(url)}`
    }
  } catch {}
  return url
}

function ReviewPostCard({ post }: { post: ReviewPost }) {
  const [imgSrc, setImgSrc] = useState<string | null>(proxyUrl(post.thumbnail))

  return (
    <a
      href={post.link}
      target="_blank"
      rel="noopener noreferrer"
      className="group block bg-card rounded-xl overflow-hidden border-2 border-border hover:border-primary transition-all duration-300 hover:shadow-lg"
    >
      {imgSrc && (
        <div className="relative aspect-[4/3] overflow-hidden bg-muted">
          <img
            src={imgSrc}
            alt={post.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            onError={() => setImgSrc(null)}
          />
        </div>
      )}
      <div className="p-5">
        <StarRating rating={5} />
        <h3 className="mt-3 font-medium text-foreground text-base leading-snug group-hover:text-primary transition-colors line-clamp-2">
          {post.title}
        </h3>
        {post.summary && (
          <p className="mt-2 text-sm text-muted-foreground leading-relaxed line-clamp-2">{post.summary}</p>
        )}
        <div className="mt-4 pt-4 border-t border-border flex items-center justify-between">
          <p className="text-sm text-muted-foreground">{post.pubDate}</p>
          <span className="text-xs font-medium text-primary opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
            후기 보기 <ArrowUpRight className="w-3 h-3" />
          </span>
        </div>
      </div>
    </a>
  )
}

function SkeletonReview() {
  return (
    <div className="bg-card rounded-xl overflow-hidden border border-border">
      <div className="aspect-[4/3] bg-muted animate-pulse" />
      <div className="p-5 space-y-3">
        <div className="flex gap-1">{Array.from({ length: 5 }).map((_, i) => <div key={i} className="w-4 h-4 rounded bg-muted animate-pulse" />)}</div>
        <div className="h-5 bg-muted rounded animate-pulse" />
        <div className="h-5 bg-muted rounded animate-pulse w-3/4" />
        <div className="h-4 bg-muted rounded animate-pulse w-1/3" />
      </div>
    </div>
  )
}

export function ReviewsSection() {
  const [posts, setPosts] = useState<ReviewPost[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)

  useEffect(() => {
    async function fetchReviews() {
      try {
        const res = await fetch(`/api/blog-feed?blogId=${BLOG_ID}&category=${encodeURIComponent("고객님들 후기")}&limit=8&requireThumbnail=false`)
        const data = await res.json()
        if (data.success && data.posts.length > 0) {
          setPosts(data.posts)
        } else {
          setHasError(true)
        }
      } catch {
        setHasError(true)
      } finally {
        setIsLoading(false)
      }
    }
    fetchReviews()
  }, [])

  return (
    <section id="reviews" className="py-16 lg:py-24 bg-secondary/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-foreground mb-4">고객 후기</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">라포레디자인과 함께한 고객님들의 생생한 이야기</p>
        </div>

        {isLoading && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => <SkeletonReview key={i} />)}
          </div>
        )}

        {!isLoading && !hasError && posts.length > 0 && (
          <>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
              {posts.map((post, index) => (
                <ReviewPostCard key={index} post={post} />
              ))}
            </div>
            <div className="text-center mt-10">
              <Button variant="outline" size="lg" className="border-2 border-primary text-foreground hover:bg-primary/10 rounded-lg px-8 cursor-pointer group" asChild>
                <a href={BLOG_URL} target="_blank" rel="noopener noreferrer">
                  더 많은 후기 보기 <ArrowUpRight className="ml-2 w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>
              </Button>
            </div>
          </>
        )}

        {!isLoading && hasError && (
          <>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
              {fallbackReviews.map((review) => (
                <div key={review.id} className="bg-card rounded-xl p-6 lg:p-8 border border-border hover:shadow-lg transition-shadow">
                  <StarRating rating={review.rating} />
                  <p className="mt-4 text-foreground leading-relaxed text-sm">{`"${review.text}"`}</p>
                  <div className="mt-6 pt-4 border-t border-border">
                    <p className="font-medium text-foreground">{review.name}</p>
                    <p className="text-sm text-muted-foreground">{review.location}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="text-center mt-10">
              <Button variant="outline" size="lg" className="border-2 border-primary text-foreground hover:bg-primary/10 rounded-lg px-8 cursor-pointer" asChild>
                <a href={BLOG_URL} target="_blank" rel="noopener noreferrer">
                  네이버 블로그에서 후기 보기 <ArrowUpRight className="ml-2 w-4 h-4" />
                </a>
              </Button>
            </div>
          </>
        )}
      </div>
    </section>
  )
}
