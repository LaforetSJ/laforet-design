"use client"

import { useEffect, useState } from "react"
import { ArrowUpRight } from "lucide-react"

const SPANS = [
  "lg:col-span-2 lg:row-span-2",
  "",
  "",
  "",
  "",
  "",
  "",
  "lg:col-span-2",
]

const STEPS = [
  { step: "01", title: "현장 철거", desc: "기존 마감재를 완전 철거하고 구조를 점검합니다. 숨겨진 하자까지 꼼꼼히 확인합니다." },
  { step: "02", title: "설비 / 골조", desc: "배관·전기 등 기초 설비를 정비하고 구조를 보강합니다. 보이지 않는 곳까지 완벽하게." },
  { step: "03", title: "마감 시공", desc: "도배·바닥·타일·가구 등 마감재를 시공합니다. 디테일 하나하나에 집중합니다." },
  { step: "04", title: "완공 & AS", desc: "최종 점검 후 고객님께 인도합니다. 시공 후 1년간 무상 AS를 보장합니다." },
]

function proxyUrl(url: string): string {
  try {
    const parsed = new URL(url)
    if (parsed.hostname.includes("pstatic.net") || parsed.hostname.includes("naver.net")) {
      return `/api/image-proxy?url=${encodeURIComponent(url)}`
    }
  } catch {}
  return url
}

export function WhyUsSection() {
  const [gallery, setGallery] = useState<{ src: string; title: string; link: string }[]>([])

  useEffect(() => {
    fetch("/api/blog-feed?blogId=laforetdesign&limit=20")
      .then((r) => r.json())
      .then((d) => {
        if (d.success) {
          const posts = d.posts.filter((p: any) => p.thumbnail)
          for (let i = posts.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [posts[i], posts[j]] = [posts[j], posts[i]]
          }
          setGallery(
            posts
              .slice(0, 8)
              .map((p: any) => ({ src: proxyUrl(p.thumbnail), title: p.title, link: p.link }))
          )
        }
      })
      .catch(() => {})
  }, [])

  return (
    <section id="about" className="py-16 lg:py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* 헤더 */}
        <div className="text-center mb-14">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-foreground mb-4">
            왜 라포레디자인인가요?
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            시공의 모든 과정을 투명하게 공개합니다
          </p>
        </div>

        {/* ── 타임라인 ── */}
        <div className="relative mb-20">
          <div className="hidden lg:block absolute top-8 left-[12.5%] right-[12.5%] h-px bg-border z-0" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
            {STEPS.map((s, i) => (
              <div key={i} className="flex flex-col items-center text-center group">
                <div className="w-16 h-16 rounded-full bg-card border-2 border-primary flex items-center justify-center mb-5 shadow-sm group-hover:bg-primary transition-colors duration-300">
                  <span className="text-sm font-bold text-primary group-hover:text-primary-foreground transition-colors duration-300">{s.step}</span>
                </div>
                <h3 className="text-base font-semibold text-foreground mb-2">{s.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── 갤러리 ── */}
        <div>
          <div className="flex items-end justify-between mb-6">
            <div>
              <p className="text-xs font-semibold text-primary uppercase tracking-widest mb-1">Our Work</p>
              <h3 className="text-xl sm:text-2xl font-semibold text-foreground">믿음직한 라포레의 시공</h3>
            </div>
            <a href="https://blog.naver.com/laforetdesign" target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-1 text-sm text-muted-foreground hover:text-primary transition-colors">
              더 보기 <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>

          {/* 벤토 그리드 */}
          {gallery.length > 0 ? (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 auto-rows-[200px]">
              {gallery.map((item, i) => (
                <a key={i} href={item.link} target="_blank" rel="noopener noreferrer"
                  className={`group relative rounded-2xl overflow-hidden bg-muted ${SPANS[i] ?? ""}`}>
                  <img src={item.src} alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      const img = e.currentTarget
                      img.style.display = "none"
                      const parent = img.parentElement
                      if (parent) parent.classList.add("bg-muted")
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                    <span className="text-white text-sm font-medium line-clamp-2">{item.title}</span>
                  </div>
                </a>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 auto-rows-[200px]">
              {[...Array(8)].map((_, i) => (
                <div key={i} className={`rounded-2xl bg-muted animate-pulse ${SPANS[i] ?? ""}`} />
              ))}
            </div>
          )}
        </div>

      </div>
    </section>
  )
}
