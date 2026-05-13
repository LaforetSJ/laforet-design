"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface Request {
  id: number
  created_at: string
  type: string
  name: string
  phone: string
  email: string
  building_type: string
  area: string
  address: string
  desired_date: string
  budget: string
  scope: string[]
  preferred_call_time: string
  referral: string
  notes: string
  status: string
}

export default function RequestListPage() {
  const [password, setPassword] = useState("")
  const [isAuthed, setIsAuthed] = useState(false)
  const [requests, setRequests] = useState<Request[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [selected, setSelected] = useState<Request | null>(null)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")
    try {
      const res = await fetch(`/api/request/list?password=${encodeURIComponent(password)}`)
      const data = await res.json()
      if (data.success) {
        setRequests(data.data)
        setIsAuthed(true)
      } else {
        setError("비밀번호가 올바르지 않습니다.")
      }
    } catch {
      setError("오류가 발생했습니다.")
    } finally {
      setIsLoading(false)
    }
  }

  if (!isAuthed) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4">
        <div className="w-full max-w-sm">
          <h1 className="text-2xl font-semibold text-foreground mb-6 text-center">접수 목록</h1>
          <form onSubmit={handleLogin} className="space-y-4">
            <Input
              type="password"
              placeholder="비밀번호 입력"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="text-center"
            />
            {error && <p className="text-red-500 text-sm text-center">{error}</p>}
            <Button type="submit" disabled={isLoading} className="w-full bg-primary text-primary-foreground">
              {isLoading ? "확인 중..." : "확인"}
            </Button>
          </form>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 py-10 sm:px-6">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-semibold text-foreground">접수 목록 <span className="text-muted-foreground text-base font-normal ml-2">총 {requests.length}건</span></h1>
        </div>

        <div className="overflow-x-auto rounded-xl border border-border">
          <table className="w-full text-sm">
            <thead className="bg-muted/50">
              <tr>
                <th className="text-left px-4 py-3 text-muted-foreground font-medium">NO</th>
                <th className="text-left px-4 py-3 text-muted-foreground font-medium">이름</th>
                <th className="text-left px-4 py-3 text-muted-foreground font-medium">연락처</th>
                <th className="text-left px-4 py-3 text-muted-foreground font-medium">건물유형</th>
                <th className="text-left px-4 py-3 text-muted-foreground font-medium">평형</th>
                <th className="text-left px-4 py-3 text-muted-foreground font-medium">접수일</th>
                <th className="text-left px-4 py-3 text-muted-foreground font-medium">상태</th>
                <th className="text-left px-4 py-3 text-muted-foreground font-medium">상세</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {requests.map((r) => (
                <tr key={r.id} className="bg-card hover:bg-muted/30 transition-colors">
                  <td className="px-4 py-3 text-muted-foreground">#{r.id}</td>
                  <td className="px-4 py-3 font-medium text-foreground">{r.name}</td>
                  <td className="px-4 py-3 text-foreground">{r.phone}</td>
                  <td className="px-4 py-3 text-muted-foreground">{r.building_type || "-"}</td>
                  <td className="px-4 py-3 text-muted-foreground">{r.area || "-"}</td>
                  <td className="px-4 py-3 text-muted-foreground">{new Date(r.created_at).toLocaleDateString("ko-KR")}</td>
                  <td className="px-4 py-3">
                    <span className="px-2 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">{r.status}</span>
                  </td>
                  <td className="px-4 py-3">
                    <button onClick={() => setSelected(r)} className="text-primary text-xs underline underline-offset-2">상세보기</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* 상세 모달 */}
        {selected && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setSelected(null)}>
            <div className="bg-card rounded-xl border border-border w-full max-w-lg max-h-[80vh] overflow-y-auto p-6" onClick={(e) => e.stopPropagation()}>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold">접수 #{selected.id} 상세</h2>
                <button onClick={() => setSelected(null)} className="text-muted-foreground hover:text-foreground text-xl leading-none">✕</button>
              </div>
              <dl className="space-y-3 text-sm">
                {[
                  ["구분", selected.type],
                  ["이름", selected.name],
                  ["연락처", selected.phone],
                  ["이메일", selected.email || "-"],
                  ["희망 통화 시간", selected.preferred_call_time || "-"],
                  ["유입 경로", selected.referral || "-"],
                  ["건물 유형", selected.building_type || "-"],
                  ["평형", selected.area || "-"],
                  ["주소", selected.address || "-"],
                  ["희망 시공 시기", selected.desired_date || "-"],
                  ["예산", selected.budget || "-"],
                  ["시공 범위", selected.scope?.join(", ") || "-"],
                  ["특이사항", selected.notes || "-"],
                  ["접수일", new Date(selected.created_at).toLocaleString("ko-KR")],
                ].map(([label, value]) => (
                  <div key={label} className="flex gap-3 border-b border-border pb-3 last:border-0">
                    <dt className="w-28 shrink-0 text-muted-foreground font-medium">{label}</dt>
                    <dd className="text-foreground break-all">{value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
