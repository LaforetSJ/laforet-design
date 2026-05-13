"use client"

import { ArrowRight } from "lucide-react"

interface AnnouncementBannerProps {
  blogUrl?: string
}

export function AnnouncementBanner({ blogUrl = "https://blog.naver.com/laforetdesign" }: AnnouncementBannerProps) {
  return (
    <a
      href={blogUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed top-16 lg:top-20 left-0 right-0 z-40 w-full h-11 bg-primary hover:bg-primary/90 transition-colors"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between">
        <div className="flex-1" />
        <p className="text-primary-foreground text-sm font-medium flex items-center gap-2">
          <span>{"📝"}</span>
          <span>최신 시공사례를 네이버 블로그에서 확인하세요</span>
        </p>
        <div className="flex-1 flex justify-end">
          <span className="text-primary-foreground text-sm font-medium hidden sm:flex items-center gap-1 hover:underline">
            블로그 바로가기
            <ArrowRight className="w-4 h-4" />
          </span>
        </div>
      </div>
    </a>
  )
}
