"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { CheckCircle2 } from "lucide-react"

// ── 체크박스 그룹 ──────────────────────────────────────
function CheckGroup({ label, options, values, onChange }: {
  label?: string
  options: string[]
  values: string[]
  onChange: (v: string[]) => void
}) {
  const toggle = (opt: string) =>
    onChange(values.includes(opt) ? values.filter((v) => v !== opt) : [...values, opt])
  return (
    <div>
      {label && <p className="text-sm text-muted-foreground mb-2">{label}</p>}
      <div className="flex flex-wrap gap-2">
        {options.map((opt) => (
          <button key={opt} type="button" onClick={() => toggle(opt)}
            className={`px-3 py-1.5 rounded-lg border text-sm transition-colors ${values.includes(opt) ? "border-primary bg-primary/10 text-primary font-medium" : "border-border text-muted-foreground hover:border-primary/50"}`}>
            {opt}
          </button>
        ))}
      </div>
    </div>
  )
}

// ── 라디오 그룹 ────────────────────────────────────────
function RadioGroup({ label, options, value, onChange }: {
  label?: string
  options: string[]
  value: string
  onChange: (v: string) => void
}) {
  return (
    <div>
      {label && <p className="text-sm text-muted-foreground mb-2">{label}</p>}
      <div className="flex flex-wrap gap-2">
        {options.map((opt) => (
          <button key={opt} type="button" onClick={() => onChange(opt)}
            className={`px-3 py-1.5 rounded-lg border text-sm transition-colors ${value === opt ? "border-primary bg-primary/10 text-primary font-medium" : "border-border text-muted-foreground hover:border-primary/50"}`}>
            {opt}
          </button>
        ))}
      </div>
    </div>
  )
}

// ── 섹션 래퍼 ──────────────────────────────────────────
function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="bg-card border border-border rounded-xl p-6 sm:p-8 space-y-5">
      <h2 className="text-base font-semibold text-foreground border-b border-border pb-3">{title}</h2>
      {children}
    </section>
  )
}

// ── 수량 입력 ──────────────────────────────────────────
function CountInput({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-sm text-foreground">{label}</span>
      <Input className="w-20 h-8 text-sm" placeholder="0" value={value} onChange={(e) => onChange(e.target.value)} />
      <span className="text-sm text-muted-foreground">EA</span>
    </div>
  )
}

// ══════════════════════════════════════════════════════
export default function RequestPage() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [privacyAgreed, setPrivacyAgreed] = useState(false)

  // 기본정보
  const [basic, setBasic] = useState({
    name: "", password: "", phone1: "010", phone2: "", phone3: "",
    email1: "", email2: "naver.com", emailDirect: "",
    call_time: "", start_date: "", move_in_date: "",
    building_type: "", address: "", address_detail: "",
    area_pyeong: "", area_sqm: "", family_members: "", referral: "",
  })

  // 공사의뢰사항
  const [floor_demo, setFloorDemo] = useState<string[]>([])
  const [expansion, setExpansion] = useState<string[]>([])
  const [sash, setSash] = useState("")
  const [sash_location, setSashLocation] = useState("")
  const [bathroom_living, setBathroomLiving] = useState("공사 미진행")
  const [bathroom_main, setBathroomMain] = useState("공사 미진행")
  const [tile, setTile] = useState<string[]>([])
  const [carpentry, setCarpentry] = useState<string[]>([])
  const [balcony_door_count, setBalconyDoorCount] = useState("")
  const [insulation, setInsulation] = useState(false)
  const [design, setDesign] = useState<string[]>([])
  const [film, setFilm] = useState<string[]>([])
  const [paint_count, setPaintCount] = useState("")
  const [kitchen_shape, setKitchenShape] = useState("")
  const [kitchen_extras, setKitchenExtras] = useState<string[]>([])
  const [fridge_count, setFridgeCount] = useState("")
  const [tall_count, setTallCount] = useState("")
  const [furniture, setFurniture] = useState<string[]>([])
  const [closet_count, setClosetCount] = useState("")
  const [half_count, setHalfCount] = useState("")
  const [bench_count, setBenchCount] = useState("")
  const [storage_count, setStorageCount] = useState("")
  const [wallpaper, setWallpaper] = useState("")
  const [flooring, setFlooring] = useState("")
  const [electric, setElectric] = useState<string[]>([])
  const [outlet_count, setOutletCount] = useState("")
  const [extras, setExtras] = useState<string[]>([])
  const [notes, setNotes] = useState("")

  const setB = (k: string, v: string) => setBasic((p) => ({ ...p, [k]: v }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!basic.name || !basic.phone2 || !basic.phone3) return alert("이름과 휴대전화를 입력해주세요.")
    if (!privacyAgreed) return alert("개인정보 수집·이용에 동의해주세요.")

    setIsSubmitting(true)
    const emailDomain = basic.email2 === "직접입력" ? basic.emailDirect : basic.email2
    const payload = {
      name: basic.name,
      password: basic.password,
      phone: `${basic.phone1}-${basic.phone2}-${basic.phone3}`,
      email: basic.email1 ? `${basic.email1}@${emailDomain}` : null,
      call_time: basic.call_time,
      start_date: basic.start_date,
      move_in_date: basic.move_in_date,
      building_type: basic.building_type,
      address: `${basic.address} ${basic.address_detail}`.trim(),
      area_pyeong: basic.area_pyeong,
      area_sqm: basic.area_sqm,
      family_members: basic.family_members,
      referral: basic.referral,
      privacy_agreed: privacyAgreed,
      construction: {
        floor_demo,
        expansion,
        sash, sash_location,
        bathroom_living, bathroom_main,
        tile, carpentry,
        balcony_door_count, insulation,
        design, film,
        paint_count,
        kitchen_shape, kitchen_extras, fridge_count, tall_count,
        furniture, closet_count, half_count, bench_count, storage_count,
        wallpaper, flooring,
        electric, outlet_count,
        extras,
      },
      notes,
    }

    try {
      const res = await fetch("/api/request/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })
      const data = await res.json()
      if (data.success) setIsSubmitted(true)
      else alert("접수 중 오류가 발생했습니다. 다시 시도해주세요.")
    } catch {
      alert("접수 중 오류가 발생했습니다.")
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <CheckCircle2 className="w-16 h-16 text-primary mx-auto mb-6" />
          <h2 className="text-2xl font-semibold text-foreground mb-3">접수가 완료되었습니다!</h2>
          <p className="text-muted-foreground mb-2">담당자가 확인 후 빠른 시간 내에 연락드리겠습니다.</p>
          <p className="text-sm text-muted-foreground mb-8">📱 010-8587-9987</p>
          <Button onClick={() => router.push("/")} className="bg-primary text-primary-foreground px-8">홈으로 돌아가기</Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-3xl mx-auto px-4 py-12 sm:px-6">
        <div className="mb-10">
          <h1 className="text-3xl sm:text-4xl font-semibold text-foreground mb-3">시공 접수</h1>
          <p className="text-muted-foreground">아래 내용을 입력해주시면 담당자가 빠른 시간 내에 연락드리겠습니다.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">

          {/* ─── 기본 정보 ─── */}
          <Section title="기본 정보">
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <Label className="mb-2 block">고객명 <span className="text-red-500">*</span></Label>
                <Input placeholder="홍길동" value={basic.name} onChange={(e) => setB("name", e.target.value)} required />
              </div>
              <div>
                <Label className="mb-2 block">비밀번호 <span className="text-xs text-muted-foreground">(접수 확인용)</span></Label>
                <Input type="password" placeholder="숫자 4자리 권장" value={basic.password} onChange={(e) => setB("password", e.target.value)} />
              </div>
            </div>

            <div>
              <Label className="mb-2 block">휴대전화 <span className="text-red-500">*</span></Label>
              <div className="flex items-center gap-2">
                <select value={basic.phone1} onChange={(e) => setB("phone1", e.target.value)}
                  className="h-10 rounded-lg border border-input bg-background px-3 text-sm">
                  {["010","011","016","017","018","019"].map(v => <option key={v}>{v}</option>)}
                </select>
                <span className="text-muted-foreground">-</span>
                <Input className="w-24" maxLength={4} placeholder="0000" value={basic.phone2} onChange={(e) => setB("phone2", e.target.value)} required />
                <span className="text-muted-foreground">-</span>
                <Input className="w-24" maxLength={4} placeholder="0000" value={basic.phone3} onChange={(e) => setB("phone3", e.target.value)} required />
              </div>
            </div>

            <div>
              <Label className="mb-2 block">E-mail</Label>
              <div className="flex items-center gap-2 flex-wrap">
                <Input className="w-36" placeholder="이메일" value={basic.email1} onChange={(e) => setB("email1", e.target.value)} />
                <span className="text-muted-foreground">@</span>
                <select value={basic.email2} onChange={(e) => setB("email2", e.target.value)}
                  className="h-10 rounded-lg border border-input bg-background px-3 text-sm">
                  {["naver.com","gmail.com","daum.net","kakao.com","직접입력"].map(v => <option key={v}>{v}</option>)}
                </select>
                {basic.email2 === "직접입력" && (
                  <Input className="w-36" placeholder="직접입력" value={basic.emailDirect} onChange={(e) => setB("emailDirect", e.target.value)} />
                )}
              </div>
            </div>

            <div>
              <Label className="mb-2 block">통화가능시간</Label>
              <Input placeholder="예) 오전 10시 이후" value={basic.call_time} onChange={(e) => setB("call_time", e.target.value)} />
              <p className="text-xs text-muted-foreground mt-1">* 오후 6시 이후 전화 상담 불가</p>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <Label className="mb-2 block">공사시작일</Label>
                <Input type="date" value={basic.start_date} onChange={(e) => setB("start_date", e.target.value)} />
              </div>
              <div>
                <Label className="mb-2 block">입주예정일</Label>
                <Input type="date" value={basic.move_in_date} onChange={(e) => setB("move_in_date", e.target.value)} />
              </div>
            </div>
          </Section>

          {/* ─── 건물 정보 ─── */}
          <Section title="건물 정보">
            <RadioGroup label="건물유형" options={["아파트","주택","빌라","사무실","병원","학원","카페","기타"]}
              value={basic.building_type} onChange={(v) => setB("building_type", v)} />

            <div>
              <Label className="mb-2 block">공사현장주소</Label>
              <Input placeholder="도로명 또는 지번 주소" value={basic.address} onChange={(e) => setB("address", e.target.value)} className="mb-2" />
              <Input placeholder="건물명, 동, 호수" value={basic.address_detail} onChange={(e) => setB("address_detail", e.target.value)} />
              <p className="text-xs text-muted-foreground mt-1">* 경기 일부 지역만 진행 가능한 점 양해바랍니다.</p>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <Label className="mb-2 block">분양평수</Label>
                <div className="flex items-center gap-2">
                  <Input placeholder="예) 32" value={basic.area_pyeong} onChange={(e) => setB("area_pyeong", e.target.value)} />
                  <span className="text-sm text-muted-foreground shrink-0">평형</span>
                </div>
              </div>
              <div>
                <Label className="mb-2 block">공급면적</Label>
                <div className="flex items-center gap-2">
                  <Input placeholder="예) 105" value={basic.area_sqm} onChange={(e) => setB("area_sqm", e.target.value)} />
                  <span className="text-sm text-muted-foreground shrink-0">㎡</span>
                </div>
              </div>
            </div>

            <div>
              <Label className="mb-2 block">가족구성원</Label>
              <Input placeholder="예) 30대 중반 부부와 5살 유아, 3살 남아" value={basic.family_members} onChange={(e) => setB("family_members", e.target.value)} />
            </div>

            <RadioGroup label="라포레디자인을 알게 된 경로"
              options={["SNS","블로그","포털사이트","지인소개","기타"]}
              value={basic.referral} onChange={(v) => setB("referral", v)} />
          </Section>

          {/* ─── 공사의뢰사항 ─── */}
          <Section title="공사의뢰사항">

            <CheckGroup label="바닥철거" options={["데코타일","장판","마루","타일"]} values={floor_demo} onChange={setFloorDemo} />

            <CheckGroup label="확장공사" options={["거실 발코니 확장","작은방 발코니 확장","주방 발코니 확장"]} values={expansion} onChange={setExpansion} />

            <div className="space-y-2">
              <RadioGroup label="부분샷시교체" options={["해당없음","교체"]} value={sash} onChange={setSash} />
              {sash === "교체" && (
                <Input placeholder="설치 위치 입력" value={sash_location} onChange={(e) => setSashLocation(e.target.value)} />
              )}
            </div>

            <div className="space-y-3">
              <p className="text-sm text-muted-foreground font-medium">욕실공사</p>
              <RadioGroup label="거실 욕실" options={["공사 미진행","일반형","고급형","전체철거 및 방수공사"]} value={bathroom_living} onChange={setBathroomLiving} />
              <RadioGroup label="안방 욕실" options={["공사 미진행","일반형","고급형","전체철거 및 방수공사"]} value={bathroom_main} onChange={setBathroomMain} />
            </div>

            <CheckGroup label="타일공사" options={["주방(싱크대) 벽타일 시공","발코니 전체 바닥타일 시공","현관 바닥타일 시공","기타"]} values={tile} onChange={setTile} />

            <div className="space-y-3">
              <p className="text-sm text-muted-foreground font-medium">목공공사</p>
              <CheckGroup options={["현관 중문 교체","방문(욕실문) 및 문틀 교체","단열공사"]} values={carpentry} onChange={setCarpentry} />
              <div className="flex items-center gap-3 flex-wrap">
                <span className="text-sm text-foreground">발코니 중문</span>
                <Input className="w-20 h-8 text-sm" placeholder="0" value={balcony_door_count} onChange={(e) => setBalconyDoorCount(e.target.value)} />
                <span className="text-sm text-muted-foreground">EA</span>
              </div>
            </div>

            <CheckGroup label="디자인공사" options={["거실 TV벽면 아트월","거실 등박스","기존 몰딩 리폼","웨인스코팅","디자인 파티션 및 가벽"]} values={design} onChange={setDesign} />

            <CheckGroup label="필름공사" options={["샤시리폼","도어리폼","가구리폼","기타리폼"]} values={film} onChange={setFilm} />

            <div className="space-y-2">
              <p className="text-sm text-muted-foreground font-medium">도장공사</p>
              <div className="flex items-center gap-3 flex-wrap">
                <span className="text-sm text-foreground">발코니 페인트 시공</span>
                <Input className="w-20 h-8 text-sm" placeholder="0" value={paint_count} onChange={(e) => setPaintCount(e.target.value)} />
                <span className="text-sm text-muted-foreground">칸</span>
              </div>
            </div>

            <div className="space-y-3">
              <p className="text-sm text-muted-foreground font-medium">주방가구공사</p>
              <RadioGroup label="형태" options={["─자","ㄱ자","ㄷ자","아일랜드"]} value={kitchen_shape} onChange={setKitchenShape} />
              <div className="flex flex-wrap gap-4">
                <CountInput label="냉장고장" value={fridge_count} onChange={setFridgeCount} />
                <CountInput label="키큰장" value={tall_count} onChange={setTallCount} />
              </div>
              <CheckGroup options={["발코니 보조주방","기타"]} values={kitchen_extras} onChange={setKitchenExtras} />
            </div>

            <div className="space-y-3">
              <p className="text-sm text-muted-foreground font-medium">가구공사</p>
              <CheckGroup options={["신발장","화장대","월플렉스","기타"]} values={furniture} onChange={setFurniture} />
              <div className="flex flex-wrap gap-4">
                <CountInput label="붙박이장" value={closet_count} onChange={setClosetCount} />
                <CountInput label="하프장" value={half_count} onChange={setHalfCount} />
                <CountInput label="벤치장" value={bench_count} onChange={setBenchCount} />
                <CountInput label="창고문" value={storage_count} onChange={setStorageCount} />
              </div>
            </div>

            <RadioGroup label="도배공사" options={["해당없음","천연벽지","실크벽지","수입벽지"]} value={wallpaper} onChange={setWallpaper} />

            <RadioGroup label="바닥공사" options={["해당없음","장판","강마루","온돌마루","타일(포세린/폴리싱)","마루+타일"]} value={flooring} onChange={setFlooring} />

            <div className="space-y-3">
              <p className="text-sm text-muted-foreground font-medium">전기/조명</p>
              <CheckGroup options={["전체 조명 교체","스위치·콘센트 감지기 교체","홈시어터"]} values={electric} onChange={setElectric} />
              <div className="flex items-center gap-3 flex-wrap">
                <span className="text-sm text-foreground">스위치·콘센트 이설/신설</span>
                <Input className="w-20 h-8 text-sm" placeholder="0" value={outlet_count} onChange={(e) => setOutletCount(e.target.value)} />
                <span className="text-sm text-muted-foreground">EA</span>
              </div>
            </div>

            <CheckGroup label="기타" options={["방문 손잡이","비디오폰","빨래건조대","우레탄줄눈"]} values={extras} onChange={setExtras} />
          </Section>

          {/* ─── 추가사항 ─── */}
          <Section title="추가사항">
            <Textarea
              placeholder="원하시는 디자인 컨셉 또는 공사 내용을 자유롭게 기재해 주세요."
              className="min-h-[120px] resize-none"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </Section>

          {/* ─── 개인정보 동의 ─── */}
          <section className="bg-muted/30 border border-border rounded-xl p-6 space-y-4 text-sm text-muted-foreground">
            <div className="space-y-2">
              <p className="font-semibold text-foreground">■ 개인정보 수집·이용 목적</p>
              <p>홈페이지 서비스 제공 및 문의 답변과 답변에 필요한 추가정보 수집을 위한 연락, 운영 관리 등을 위한 목적</p>
            </div>
            <div className="space-y-2">
              <p className="font-semibold text-foreground">■ 개인정보의 보유 및 이용기간</p>
              <p>정보 주체의 개인정보 수집 및 이용에 대한 동의를 거부할 수 있으나, 동의 거부 시 해당 서비스를 이용할 수 없습니다. 개인정보 수집 및 이용 목적이 달성된 이후 1년이 경과한 경우 해당 정보를 파기합니다.</p>
            </div>
            <label className="flex items-center gap-3 cursor-pointer pt-2">
              <input type="checkbox" checked={privacyAgreed} onChange={(e) => setPrivacyAgreed(e.target.checked)}
                className="w-4 h-4 accent-primary" />
              <span className="text-foreground font-medium">개인정보 수집·이용에 동의합니다. <span className="text-red-500">*</span></span>
            </label>
          </section>

          <Button type="submit" disabled={isSubmitting || !basic.name || !basic.phone2}
            className="w-full bg-primary text-primary-foreground hover:bg-primary/90 py-6 text-base font-medium rounded-xl">
            {isSubmitting ? "접수 중..." : "시공 접수하기"}
          </Button>
        </form>
      </div>
    </div>
  )
}
