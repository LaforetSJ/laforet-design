import { KakaoMap } from '@/components/kakao-map'

export function ContactSection() {
  return (
    <section id="contact" className="py-16 lg:py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-foreground mb-4">Contact Us</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">라포레디자인 스튜디오를 방문해주세요</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-stretch">
          {/* 지도 */}
          <div className="rounded-2xl overflow-hidden border border-border min-h-[320px] lg:min-h-[400px]">
            <KakaoMap />
          </div>

          {/* 정보 */}
          <div className="flex flex-col justify-center space-y-8">
            <div>
              <h3 className="text-2xl font-semibold text-foreground mb-6">라포레 디자인 스튜디오</h3>
              <dl className="space-y-5">
                <div className="flex gap-4">
                  <dt className="w-24 shrink-0 text-sm font-semibold text-primary uppercase tracking-wide">Address</dt>
                  <dd className="text-foreground text-sm leading-relaxed">
                    경기도 용인시 수지구<br />수풍로 53 상가동 1층<br />(동문굿모닝힐)
                  </dd>
                </div>
                <div className="flex gap-4">
                  <dt className="w-24 shrink-0 text-sm font-semibold text-primary uppercase tracking-wide">Tel</dt>
                  <dd className="text-foreground text-sm space-y-1">
                    <a href="tel:010-8587-9987" className="block hover:text-primary transition-colors">📱 010-8587-9987</a>
                  </dd>
                </div>
                <div className="flex gap-4">
                  <dt className="w-24 shrink-0 text-sm font-semibold text-primary uppercase tracking-wide">Open</dt>
                  <dd className="text-foreground text-sm space-y-1">
                    <p>MON – FRI &nbsp; AM 09:00 ~ PM 06:00</p>
                    <p>SAT &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; AM 09:00 ~ PM 06:00</p>
                  </dd>
                </div>
                <div className="flex gap-4">
                  <dt className="w-24 shrink-0 text-sm font-semibold text-primary uppercase tracking-wide">Close</dt>
                  <dd className="text-foreground text-sm">SUN</dd>
                </div>
              </dl>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <a
                href="/request"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 text-center bg-primary text-primary-foreground hover:bg-primary/90 rounded-lg px-6 py-3 text-sm font-semibold transition-colors"
              >
                시공 접수하기
              </a>
              <a
                href="tel:010-8587-9987"
                className="flex-1 text-center border-2 border-primary text-foreground hover:bg-primary/10 rounded-lg px-6 py-3 text-sm font-semibold transition-colors"
              >
                전화 문의
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
