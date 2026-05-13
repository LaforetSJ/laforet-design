import { Home, Building2, Wrench } from "lucide-react"

const services = [
  {
    icon: Home,
    title: "아파트 인테리어",
    description: "전체 리모델링부터 부분 시공까지, 라이프스타일에 맞는 맞춤형 주거 공간을 완성합니다.",
  },
  {
    icon: Building2,
    title: "상업공간 인테리어",
    description: "카페, 레스토랑, 오피스 등 브랜드 아이덴티티를 담은 상업 공간을 디자인합니다.",
  },
  {
    icon: Wrench,
    title: "부분 시공",
    description: "주방, 욕실, 거실 등 필요한 부분만 효율적으로 시공하여 비용을 절감합니다.",
  },
]

export function ServicesSection() {
  return (
    <section id="about" className="py-16 lg:py-24 bg-primary/15">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-foreground mb-4">
            라포레디자인의 전문 분야
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            다양한 공간에 맞는 최적의 인테리어 솔루션을 제공합니다
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-card rounded-xl p-8 lg:p-10 border border-border hover:border-primary/30 hover:shadow-lg transition-all duration-300 group"
            >
              {/* Icon */}
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                <service.icon className="w-7 h-7 text-primary" />
              </div>
              
              {/* Content */}
              <h3 className="text-xl font-semibold text-foreground mb-3">
                {service.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
