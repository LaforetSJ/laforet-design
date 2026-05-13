import { Button } from "@/components/ui/button"
import { MessageCircle } from "lucide-react"

export function CTASection() {
  return (
    <section id="cta" className="py-16 lg:py-24 bg-primary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-primary-foreground mb-4">
          지금 무료 견적을 받아보세요
        </h2>
        <p className="text-primary-foreground/80 text-lg max-w-2xl mx-auto mb-8">
          부담 없이 상담받고, 합리적인 견적을 확인하세요.
          <br className="hidden sm:block" />
          24시간 내 빠른 답변을 드립니다.
        </p>
        
        <Button 
          size="lg" 
          className="bg-foreground text-background hover:bg-foreground/90 rounded-lg px-8 py-6 text-base font-medium cursor-pointer"
          asChild
        >
          <a href="https://pf.kakao.com" target="_blank" rel="noopener noreferrer">
            <MessageCircle className="mr-2 w-5 h-5" />
            카카오톡으로 문의하기
          </a>
        </Button>
      </div>
    </section>
  )
}
