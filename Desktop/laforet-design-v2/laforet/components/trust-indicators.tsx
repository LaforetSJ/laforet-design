"use client"

import { useEffect, useState, useRef } from "react"

const stats = [
  { value: 15, suffix: "년+", label: "시공 경력" },
  { value: 500, suffix: "건+", label: "완료 프로젝트" },
  { value: 98, suffix: "%", label: "고객 만족도" },
  { value: 85, suffix: "%", label: "재계약률" },
]

function AnimatedCounter({ value, suffix }: { value: number; suffix: string }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLDivElement>(null)
  const hasAnimated = useRef(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true
          const duration = 2000
          const steps = 60
          const increment = value / steps
          let current = 0

          const timer = setInterval(() => {
            current += increment
            if (current >= value) {
              setCount(value)
              clearInterval(timer)
            } else {
              setCount(Math.floor(current))
            }
          }, duration / steps)
        }
      },
      { threshold: 0.5 }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [value])

  return (
    <div ref={ref} className="text-4xl sm:text-5xl font-semibold text-foreground">
      {count}
      <span className="text-primary">{suffix}</span>
    </div>
  )
}

export function TrustIndicators() {
  return (
    <section className="py-16 lg:py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-card rounded-xl p-6 lg:p-8 text-center border-t-4 border-t-primary border border-border shadow-sm hover:shadow-md transition-shadow"
            >
              <AnimatedCounter value={stat.value} suffix={stat.suffix} />
              <div className="mt-2 text-sm sm:text-base text-muted-foreground font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
