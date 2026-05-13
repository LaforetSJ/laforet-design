"use client"

import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ArrowLeft } from "lucide-react"

interface RequestDetail {
  id: number
  created_at: string
  name: string
  phone: string
  email: string
  call_time: string
  start_date: string
  move_in_date: string
  building_type: string
  address: string
  area_pyeong: string
  area_sqm: string
  family_members: string
  referral: string
  construction: any
  notes: string
  status: string
}

function Row({ label, value }: { label: string; value: any }) {
  if (!value || (Array.isArray(value) && value.length === 0)) return null
  const text = Array.isArray(value) ? value.join(", ") : value
  return (
    <div className="flex gap-3 py-3 border-b border-border last:border-0">
      <dt className="w-32 shrink-0 text-sm text-muted-foreground font-medium">{label}</dt>
      <dd className="text-sm text-foreground break-all">{text}</dd>
    </div>
  )
}

export default function RequestDetailPage() {
  const { id } = useParams()
  const router = useRouter()
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [data, setData] = useState<RequestDetail | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleUnlock = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")
    try {
      const res = await fetch(`/api/request/${id}?password=${encodeURIComponent(password)}`)
      const json = await res.json()
      if (json.success) {
        setData(json.data)
      } else {
        setError(json.error || "비밀번호가 올바르지 않습니다.")
      }
    } catch {
      setError("오류가 발생했습니다.")
    } finally {
      setIsLoading(false)
    }
  }

  if (!data) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4">
        <div className="w-full max-w-sm">
          <button onClick={() => router.push("/request")} className="flex items-center gap-2 text-muted-foreground hover:text-foreground text-sm mb-6 transition-colors">
            <ArrowLeft className="w-4 h-4" /> 목록으로
          </button>
          <h1 className="text-xl font-semibold text-foreground mb-2">비공개 접수글</h1>
          <p className="text-sm text-muted-foreground mb-6">접수 시 입력하신 비밀번호를 입력해주세요.</p>
          <form onSubmit={handleUnlock} className="space-y-3">
            <Input type="password" placeholder="비밀번호" value={password}
              onChange={(e) => setPassword(e.target.value)} className="text-center" autoFocus />
            {error && <p className="text-red-500 text-sm text-center">{error}</p>}
            <Button type="submit" disabled={isLoading} className="w-full bg-primary text-primary-foreground">
              {isLoading ? "확인 중..." : "확인"}
            </Button>
          </form>
        </div>
      </div>
    )
  }

  const c = data.construction || {}

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-3xl mx-auto px-4 py-12 sm:px-6">
        <button onClick={() => router.push("/request")} className="flex items-center gap-2 text-muted-foreground hover:text-foreground text-sm mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4" /> 목록으로
        </button>

        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-semibold text-foreground">접수 #{data.id}</h1>
          <span className="px-3 py-1 rounded-full text-sm font-medium bg-primary/10 text-primary">{data.status}</span>
        </div>

        <div className="space-y-6">
          <section className="bg-card border border-border rounded-xl p-6">
            <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-4">기본 정보</h2>
            <dl>
              <Row label="이름" value={data.name} />
              <Row label="연락처" value={data.phone} />
              <Row label="이메일" value={data.email} />
              <Row label="통화가능시간" value={data.call_time} />
              <Row label="공사시작일" value={data.start_date} />
              <Row label="입주예정일" value={data.move_in_date} />
              <Row label="건물유형" value={data.building_type} />
              <Row label="주소" value={data.address} />
              <Row label="평형" value={data.area_pyeong ? `${data.area_pyeong}평` : ""} />
              <Row label="공급면적" value={data.area_sqm ? `${data.area_sqm}㎡` : ""} />
              <Row label="가족구성원" value={data.family_members} />
              <Row label="유입경로" value={data.referral} />
            </dl>
          </section>

          <section className="bg-card border border-border rounded-xl p-6">
            <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-4">공사의뢰사항</h2>
            <dl>
              <Row label="바닥철거" value={c.floor_demo} />
              <Row label="확장공사" value={c.expansion} />
              <Row label="부분샷시교체" value={c.sash === "교체" ? `교체 (위치: ${c.sash_location || "-"})` : null} />
              <Row label="거실 욕실" value={c.bathroom_living !== "공사 미진행" ? c.bathroom_living : null} />
              <Row label="안방 욕실" value={c.bathroom_main !== "공사 미진행" ? c.bathroom_main : null} />
              <Row label="타일공사" value={c.tile} />
              <Row label="목공공사" value={[...(c.carpentry || []), c.balcony_door_count ? `발코니 중문 ${c.balcony_door_count}EA` : ""].filter(Boolean)} />
              <Row label="디자인공사" value={c.design} />
              <Row label="필름공사" value={c.film} />
              <Row label="도장공사" value={c.paint_count ? `발코니 페인트 ${c.paint_count}칸` : null} />
              <Row label="주방가구" value={[c.kitchen_shape, ...(c.kitchen_extras || []), c.fridge_count ? `냉장고장 ${c.fridge_count}EA` : "", c.tall_count ? `키큰장 ${c.tall_count}EA` : ""].filter(Boolean)} />
              <Row label="가구공사" value={[...(c.furniture || []), c.closet_count ? `붙박이장 ${c.closet_count}EA` : "", c.half_count ? `하프장 ${c.half_count}EA` : "", c.bench_count ? `벤치장 ${c.bench_count}EA` : "", c.storage_count ? `창고문 ${c.storage_count}EA` : ""].filter(Boolean)} />
              <Row label="도배공사" value={c.wallpaper !== "해당없음" ? c.wallpaper : null} />
              <Row label="바닥공사" value={c.flooring !== "해당없음" ? c.flooring : null} />
              <Row label="전기/조명" value={[...(c.electric || []), c.outlet_count ? `콘센트이설/신설 ${c.outlet_count}EA` : ""].filter(Boolean)} />
              <Row label="기타" value={c.extras} />
            </dl>
          </section>

          {data.notes && (
            <section className="bg-card border border-border rounded-xl p-6">
              <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-4">추가사항</h2>
              <p className="text-sm text-foreground leading-relaxed">{data.notes}</p>
            </section>
          )}

          <p className="text-xs text-muted-foreground text-center">
            접수일: {new Date(data.created_at).toLocaleString("ko-KR")}
          </p>
        </div>
      </div>
    </div>
  )
}
