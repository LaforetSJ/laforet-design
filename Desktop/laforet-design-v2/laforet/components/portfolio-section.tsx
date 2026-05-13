"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { ArrowUpRight } from "lucide-react"

interface BlogPost {
  title: string
  link: string
  pubDate: string
  thumbnail: string | null
  category: string
}

const BLOG_ID = "laforetdesign"
const BLOG_URL = `https://blog.naver.com/${BLOG_ID}`

// Fallback images when thumbnail is not available
const fallbackImages = [
  "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800&h=600&fit=crop",
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop",
  "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&h=600&fit=crop",
  "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&h=600&fit=crop",
  "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop",
  "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=800&h=600&fit=crop",
]

export function PortfolioSection() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)

  useEffect(() => {
    async function fetchBlogPosts() {
      try {
        const response = await fetch(`/api/blog-feed?blogId=${BLOG_ID}`)
        const data = await response.json()
        
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

    fetchBlogPosts()
  }, [])

  return (
    <section id="portfolio" className="py-16 lg:py-24 bg-secondary/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-foreground mb-4">
            시공사례
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            라포레디자인이 완성한 프리미엄 공간들을 만나보세요
          </p>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {[...Array(6)].map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        )}

        {/* Error State */}
        {!isLoading && hasError && (
          <div className="text-center py-16">
            <p className="text-muted-foreground mb-6">
              블로그 피드를 불러올 수 없습니다
            </p>
            <Button
              className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-lg px-8"
              asChild
            >
              <a href={BLOG_URL} target="_blank" rel="noopener noreferrer">
                네이버 블로그에서 시공사례 확인하기
                <ArrowUpRight className="ml-2 w-4 h-4" />
              </a>
            </Button>
          </div>
        )}

        {/* Posts Grid */}
        {!isLoading && !hasError && posts.length > 0 && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {posts.map((post, index) => (
              <BlogPostCard 
                key={post.link} 
                post={post} 
                fallbackImage={fallbackImages[index % fallbackImages.length]}
              />
            ))}
          </div>
        )}

        {/* More Button */}
        <div className="text-center mt-12">
          <Button
            variant="outline"
            size="lg"
            className="border-2 border-primary text-foreground hover:bg-primary/10 rounded-lg px-8 group"
            asChild
          >
            <a href={BLOG_URL} target="_blank" rel="noopener noreferrer">
              네이버 블로그에서 더보기
              <ArrowUpRight className="ml-2 w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          </Button>
        </div>
      </div>
    </section>
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

function BlogPostCard({ post, fallbackImage }: { post: BlogPost; fallbackImage: string }) {
  const [imgSrc, setImgSrc] = useState(proxyUrl(post.thumbnail) || fallbackImage)

  return (
    <a
      href={post.link}
      target="_blank"
      rel="noopener noreferrer"
      className="group block bg-card rounded-xl overflow-hidden border-2 border-border hover:border-primary transition-all duration-300 hover:shadow-lg"
    >
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden bg-muted">
        <img
          src={imgSrc}
          alt={post.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          onError={() => setImgSrc(fallbackImage)}
        />
      </div>
      
      {/* Content */}
      <div className="p-5">
        <h3 className="font-medium text-foreground text-lg mb-2 group-hover:text-primary transition-colors line-clamp-2">
          {post.title}
        </h3>
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">{post.pubDate}</p>
          <span className="text-sm font-medium text-primary opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
            자세히 보기
            <ArrowUpRight className="w-3 h-3" />
          </span>
        </div>
      </div>
    </a>
  )
}

function SkeletonCard() {
  return (
    <div className="bg-card rounded-xl overflow-hidden border border-border">
      <div className="aspect-[4/3] bg-muted animate-pulse" />
      <div className="p-5 space-y-3">
        <div className="h-5 bg-muted rounded animate-pulse" />
        <div className="h-5 bg-muted rounded animate-pulse w-3/4" />
        <div className="h-4 bg-muted rounded animate-pulse w-1/3" />
      </div>
    </div>
  )
}
