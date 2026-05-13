"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"

const navItems = [
  { label: "시공사례", sectionId: "portfolio" },
  { label: "전문분야", sectionId: "about" },
  { label: "고객후기", sectionId: "reviews" },
  { label: "Contact Us", sectionId: "contact" },
]

function smoothScrollTo(sectionId: string) {
  const targetY = sectionId === "top"
    ? 0
    : (() => {
        const element = document.getElementById(sectionId)
        if (!element) return null
        return element.getBoundingClientRect().top + window.scrollY - 80
      })()

  if (targetY === null) return
  const startY = window.scrollY
  const distance = targetY - startY
  const duration = 700
  let startTime: number | null = null

  function easeInOutCubic(t: number) {
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2
  }

  function step(timestamp: number) {
    if (!startTime) startTime = timestamp
    const elapsed = timestamp - startTime
    const progress = Math.min(elapsed / duration, 1)
    window.scrollTo(0, startY + distance * easeInOutCubic(progress))
    if (progress < 1) requestAnimationFrame(step)
  }

  requestAnimationFrame(step)
}

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const handleLogoClick = () => {
    setIsMenuOpen(false)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    e.preventDefault()
    smoothScrollTo(sectionId)
    setIsMenuOpen(false)
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <button
            onClick={handleLogoClick}
            className="flex items-center cursor-pointer"
            aria-label="페이지 상단으로 이동"
          >
            <Image
              src="/laforet-logo.jpg"
              alt="라포레디자인 로고"
              width={200}
              height={80}
              className="h-16 w-auto object-contain"
              priority
            />
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navItems.map((item) => (
              <a
                key={item.sectionId}
                href={`#${item.sectionId}`}
                onClick={(e) => handleNavClick(e, item.sectionId)}
                className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors cursor-pointer"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* CTA Button */}
          <div className="hidden lg:flex items-center gap-3">
            <Link
              href="/request"
              className="text-sm font-semibold text-primary border-2 border-primary rounded-lg px-5 py-2 hover:bg-primary/10 transition-colors"
            >
              시공 접수
            </Link>
            <Button
              className="bg-primary text-primary-foreground hover:bg-primary/80 rounded-lg px-6 cursor-pointer font-semibold"
              onClick={() => smoothScrollTo("contact")}
            >
              무료 견적 문의
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 cursor-pointer"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="메뉴 열기"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden py-4 border-t border-border">
            <nav className="flex flex-col gap-4">
              {navItems.map((item) => (
                <a
                  key={item.sectionId}
                  href={`#${item.sectionId}`}
                  onClick={(e) => handleNavClick(e, item.sectionId)}
                  className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors cursor-pointer"
                >
                  {item.label}
                </a>
              ))}
              <Link
                href="/request"
                onClick={() => setIsMenuOpen(false)}
                className="text-sm font-semibold text-primary border-2 border-primary rounded-lg px-5 py-2.5 text-center hover:bg-primary/10 transition-colors"
              >
                시공 접수
              </Link>
              <Button
                className="bg-primary text-primary-foreground hover:bg-primary/80 rounded-lg w-full mt-2 cursor-pointer font-semibold"
                onClick={() => { smoothScrollTo("contact"); setIsMenuOpen(false) }}
              >
                무료 견적 문의
              </Button>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
