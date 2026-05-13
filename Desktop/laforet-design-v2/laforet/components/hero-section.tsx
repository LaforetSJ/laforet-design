'use client'

import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

function smoothScrollTo(sectionId: string) {
  const element = document.getElementById(sectionId)
  if (!element) return
  const headerHeight = 80
  const targetY = element.getBoundingClientRect().top + window.scrollY - headerHeight
  const startY = window.scrollY
  const distance = targetY - startY
  const duration = 700
  let startTime: number | null = null

  function easeInOutCubic(t: number) {
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2
  }

  function animate(currentTime: number) {
    if (startTime === null) startTime = currentTime
    const elapsed = currentTime - startTime
    const progress = Math.min(elapsed / duration, 1)
    window.scrollTo(0, startY + distance * easeInOutCubic(progress))
    if (progress < 1) requestAnimationFrame(animate)
  }
  requestAnimationFrame(animate)
}

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-[104px] lg:pt-[124px]">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,color-mix(in_oklch,var(--primary)_15%,transparent)_0%,transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,color-mix(in_oklch,var(--primary)_10%,transparent)_0%,transparent_50%)]" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-4xl mx-auto">
          {/* Main Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-semibold text-foreground leading-tight text-balance mb-6">
            신뢰를 짓고,
            <br />
            <span className="text-primary">공간</span>을 완성합니다
          </h1>
          
          {/* Subtext */}
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 text-pretty">
            라포레디자인과 함께하면 당신의 공간이 달라집니다.
            <br className="hidden sm:block" />
            10년 이상의 경험과 신뢰로 최고의 인테리어를 선사합니다.
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              size="lg"
              className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-lg px-8 py-6 text-base font-medium group"
              onClick={() => smoothScrollTo("portfolio")}
            >
              시공사례 보기
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-2 border-primary text-foreground hover:bg-primary/10 rounded-lg px-8 py-6 text-base font-medium"
              onClick={() => smoothScrollTo("cta")}
            >
              무료 견적 문의
            </Button>
          </div>
        </div>
        
        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-muted-foreground/30 rounded-full flex items-start justify-center p-2">
            <div className="w-1.5 h-3 bg-primary rounded-full" />
          </div>
        </div>
      </div>
    </section>
  )
}
