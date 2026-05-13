import Link from "next/link"
import Image from "next/image"

export function Footer() {
  return (
    <footer className="bg-foreground text-background py-12 lg:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Logo & Description */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-flex items-center mb-4 cursor-pointer">
              <Image
                src="/Laforet_text_logo.png"
                alt="라포레디자인 로고"
                width={160}
                height={64}
                className="h-14 w-auto object-contain" style={{mixBlendMode: "screen"}}
              />
            </Link>
            <p className="text-background/70 text-sm leading-relaxed max-w-md mt-3">
              신뢰를 짓고, 공간을 완성합니다.<br />
              경기도 용인을 중심으로 10년 이상의 경험으로<br />
              고객님의 꿈꾸는 공간을 현실로 만들어 드립니다.
            </p>
          </div>

          {/* Company Info */}
          <div>
            <h4 className="font-semibold text-background mb-4">회사 정보</h4>
            <ul className="space-y-2 text-sm text-background/70">
              <li>상호: 라포레디자인</li>
              <li>대표: 김정환</li>
              <li>주소: 경기도 용인시 수지구<br />수풍로 53 상가동 1층<br />(동문굿모닝힐)</li>
            </ul>
          </div>

          {/* Contact & SNS */}
          <div>
            <h4 className="font-semibold text-background mb-4">연락처</h4>
            <ul className="space-y-2 text-sm text-background/70">
              <li>
                <a href="tel:010-8587-9987" className="hover:text-primary transition-colors cursor-pointer">
                  📱 010-8587-9987
                </a>
              </li>
              <li className="text-background/50">FAX: 070-8280-7077</li>
            </ul>

            <h4 className="font-semibold text-background mt-6 mb-4">SNS</h4>
            <div className="flex gap-4">
              <a
                href="https://blog.naver.com/laforetdesign"
                target="_blank"
                rel="noopener noreferrer"
                className="text-background/70 hover:text-primary transition-colors text-sm cursor-pointer"
              >
                네이버 블로그
              </a>
              <a
                href="https://www.instagram.com/laforet_interior/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-background/70 hover:text-primary transition-colors text-sm cursor-pointer"
              >
                인스타그램
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-8 border-t border-background/10 text-center text-sm text-background/50">
          © 2025 라포레디자인. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
