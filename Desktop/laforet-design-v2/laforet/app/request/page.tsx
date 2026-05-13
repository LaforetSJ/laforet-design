"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!
const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

interface Request {
  id: number
  created_at: string
  name: string
  building_type: string
  status: string
  isDummy?: boolean
}

const DUMMY_REQUESTS: Request[] = [
  { id: -1,  created_at: "2024-01-08T10:12:00", name: "정민아", building_type: "아파트", status: "시공완료", isDummy: true },
  { id: -2,  created_at: "2024-01-22T14:35:00", name: "최현석", building_type: "아파트", status: "시공완료", isDummy: true },
  { id: -3,  created_at: "2024-02-05T09:48:00", name: "박지수", building_type: "빌라",   status: "시공완료", isDummy: true },
  { id: -4,  created_at: "2024-02-19T11:20:00", name: "이준호", building_type: "아파트", status: "시공완료", isDummy: true },
  { id: -5,  created_at: "2024-03-04T13:55:00", name: "김성민", building_type: "아파트", status: "시공완료", isDummy: true },
  { id: -6,  created_at: "2024-03-18T15:10:00", name: "주혜진", building_type: "상가",   status: "시공완료", isDummy: true },
  { id: -7,  created_at: "2024-04-02T10:30:00", name: "성재현", building_type: "아파트", status: "시공완료", isDummy: true },
  { id: -8,  created_at: "2024-04-15T09:05:00", name: "구민아", building_type: "빌라",   status: "시공완료", isDummy: true },
  { id: -9,  created_at: "2024-05-03T14:22:00", name: "백진수", building_type: "아파트", status: "시공완료", isDummy: true },
  { id: -10, created_at: "2024-05-20T11:40:00", name: "하현아", building_type: "아파트", status: "시공완료", isDummy: true },
  { id: -11, created_at: "2024-06-07T13:15:00", name: "이재원", building_type: "상가",   status: "시공완료", isDummy: true },
  { id: -12, created_at: "2024-06-24T10:50:00", name: "노수연", building_type: "아파트", status: "시공완료", isDummy: true },
  { id: -13, created_at: "2024-07-09T15:35:00", name: "곽민정", building_type: "빌라",   status: "시공완료", isDummy: true },
  { id: -14, created_at: "2024-07-25T09:20:00", name: "홍승우", building_type: "아파트", status: "시공완료", isDummy: true },
  { id: -15, created_at: "2024-08-12T11:05:00", name: "허나연", building_type: "아파트", status: "시공완료", isDummy: true },
  { id: -16, created_at: "2024-08-28T14:45:00", name: "차민서", building_type: "아파트", status: "시공완료", isDummy: true },
  { id: -17, created_at: "2024-09-10T10:30:00", name: "권민혁", building_type: "빌라",   status: "시공완료", isDummy: true },
  { id: -18, created_at: "2024-09-25T13:00:00", name: "유소연", building_type: "아파트", status: "시공완료", isDummy: true },
  { id: -19, created_at: "2024-10-08T09:40:00", name: "심재훈", building_type: "상가",   status: "시공완료", isDummy: true },
  { id: -20, created_at: "2024-10-22T11:25:00", name: "문지현", building_type: "아파트", status: "시공완료", isDummy: true },
  { id: -21, created_at: "2024-11-05T14:10:00", name: "남성호", building_type: "아파트", status: "시공완료", isDummy: true },
  { id: -22, created_at: "2024-11-19T10:55:00", name: "고은비", building_type: "빌라",   status: "시공완료", isDummy: true },
  { id: -23, created_at: "2024-12-03T13:30:00", name: "전혜린", building_type: "아파트", status: "시공완료", isDummy: true },
  { id: -24, created_at: "2024-12-17T09:15:00", name: "안준혁", building_type: "아파트", status: "시공완료", isDummy: true },
  { id: -25, created_at: "2025-01-07T11:50:00", name: "배소영", building_type: "아파트", status: "시공완료", isDummy: true },
  { id: -26, created_at: "2025-01-21T14:35:00", name: "류성민", building_type: "상가",   status: "시공완료", isDummy: true },
  { id: -27, created_at: "2025-02-04T10:20:00", name: "황미래", building_type: "아파트", status: "시공완료", isDummy: true },
  { id: -28, created_at: "2025-02-18T13:05:00", name: "신재원", building_type: "빌라",   status: "시공완료", isDummy: true },
  { id: -29, created_at: "2025-03-05T09:50:00", name: "송지원", building_type: "아파트", status: "시공완료", isDummy: true },
  { id: -30, created_at: "2025-03-19T11:35:00", name: "오승현", building_type: "아파트", status: "시공완료", isDummy: true },
  { id: -31, created_at: "2025-04-02T14:20:00", name: "임수진", building_type: "아파트", status: "시공완료", isDummy: true },
  { id: -32, created_at: "2025-04-16T10:05:00", name: "한동훈", building_type: "빌라",   status: "시공완료", isDummy: true },
  { id: -33, created_at: "2025-05-01T12:50:00", name: "윤지아", building_type: "아파트", status: "시공완료", isDummy: true },
  { id: -34, created_at: "2025-05-15T09:35:00", name: "조민석", building_type: "상가",   status: "시공완료", isDummy: true },
  { id: -35, created_at: "2025-06-03T11:20:00", name: "강나은", building_type: "아파트", status: "시공완료", isDummy: true },
  { id: -36, created_at: "2025-06-18T14:05:00", name: "정현우", building_type: "아파트", status: "시공완료", isDummy: true },
  { id: -37, created_at: "2025-07-02T10:50:00", name: "최수아", building_type: "빌라",   status: "시공완료", isDummy: true },
  { id: -38, created_at: "2025-07-17T13:35:00", name: "박지훈", building_type: "아파트", status: "시공중",   isDummy: true },
  { id: -39, created_at: "2025-08-05T09:20:00", name: "이서연", building_type: "아파트", status: "시공중",   isDummy: true },
  { id: -40, created_at: "2025-08-20T11:05:00", name: "김민준", building_type: "아파트", status: "시공중",   isDummy: true },
]

export default function RequestListPage() {
  const [requests, setRequests] = useState<Request[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [search, setSearch] = useState("")
  const [page, setPage] = useState(1)
  const PER_PAGE = 15

  useEffect(() => {
    async function fetchRequests() {
      try {
        const res = await fetch(
          `${SUPABASE_URL}/rest/v1/requests?select=id,created_at,name,building_type,status&order=created_at.desc`,
          {
            headers: {
              apikey: SUPABASE_KEY,
              Authorization: `Bearer ${SUPABASE_KEY}`,
            },
          }
        )
        const data = await res.json()
        const merged = [...data, ...DUMMY_REQUESTS].sort(
          (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        )
        setRequests(merged)
      } catch {
        setRequests(DUMMY_REQUESTS)
      } finally {
        setIsLoading(false)
      }
    }
    fetchRequests()
  }, [])

  const filtered = requests.filter((r) =>
    search ? r.name?.includes(search) : true
  )
  const totalPages = Math.ceil(filtered.length / PER_PAGE)
  const paged = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE)
  const total = filtered.length

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-5xl mx-auto px-4 py-12 sm:px-6">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold text-foreground mb-2">시공 접수</h1>
          <p className="text-muted-foreground text-sm">접수하신 내용은 비공개로 처리되며 담당자가 순차적으로 연락드립니다.</p>
        </div>

        {/* 테이블 */}
        <div className="rounded-xl border border-border overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-muted/50">
              <tr>
                <th className="text-center px-4 py-3 text-muted-foreground font-medium w-16">NO</th>
                <th className="text-left px-4 py-3 text-muted-foreground font-medium">제목</th>
                <th className="text-center px-4 py-3 text-muted-foreground font-medium w-24">작성자</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {isLoading ? (
                [...Array(5)].map((_, i) => (
                  <tr key={i}>
                    <td colSpan={4} className="px-4 py-4">
                      <div className="h-4 bg-muted rounded animate-pulse" />
                    </td>
                  </tr>
                ))
              ) : paged.length === 0 ? (
                <tr>
                  <td colSpan={4} className="text-center py-12 text-muted-foreground">접수 내역이 없습니다.</td>
                </tr>
              ) : (
                paged.map((r, idx) => {
                  const no = total - ((page - 1) * PER_PAGE + idx)
                  return (
                    <tr key={r.id} className="bg-card hover:bg-muted/20 transition-colors">
                      <td className="text-center px-4 py-3 text-muted-foreground">{no}</td>
                      <td className="px-4 py-3 text-foreground">
                        <Link href={`/request/${r.id}`} className="hover:text-primary transition-colors">
                          <span className="mr-2">🔒</span>
                          문의주신 내용이 &quot;접수&quot; 되었습니다.
                        </Link>
                      </td>
                      <td className="text-center px-4 py-3 text-foreground">{r.name}</td>
                    </tr>
                  )
                })
              )}
            </tbody>
          </table>
        </div>

        {/* 하단 */}
        <div className="mt-4 flex items-center justify-between gap-4 flex-wrap">
          {/* 검색 */}
          <div className="flex items-center gap-2">
            <select className="h-9 rounded-lg border border-input bg-background px-3 text-sm">
              <option>글쓴이</option>
            </select>
            <div className="flex gap-2">
              <Input
                className="h-9 w-36 text-sm"
                placeholder="검색어"
                value={search}
                onChange={(e) => { setSearch(e.target.value); setPage(1) }}
              />
              <Button size="sm" variant="outline" className="h-9 px-4">
                <Search className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* 접수하기 */}
          <Link href="/request/new">
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90 h-9 px-5 text-sm font-semibold">
              접수하기
            </Button>
          </Link>
        </div>

        {/* 페이지네이션 */}
        {totalPages > 1 && (
          <div className="mt-6 flex justify-center gap-1">
            <button onClick={() => setPage(1)} disabled={page === 1}
              className="px-2 py-1 text-sm rounded border border-border disabled:opacity-40 hover:bg-muted">«</button>
            <button onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1}
              className="px-2 py-1 text-sm rounded border border-border disabled:opacity-40 hover:bg-muted">‹</button>
            {[...Array(totalPages)].map((_, i) => (
              <button key={i} onClick={() => setPage(i + 1)}
                className={`px-3 py-1 text-sm rounded border transition-colors ${page === i + 1 ? "bg-primary text-primary-foreground border-primary" : "border-border hover:bg-muted"}`}>
                {i + 1}
              </button>
            ))}
            <button onClick={() => setPage((p) => Math.min(totalPages, p + 1))} disabled={page === totalPages}
              className="px-2 py-1 text-sm rounded border border-border disabled:opacity-40 hover:bg-muted">›</button>
            <button onClick={() => setPage(totalPages)} disabled={page === totalPages}
              className="px-2 py-1 text-sm rounded border border-border disabled:opacity-40 hover:bg-muted">»</button>
          </div>
        )}
      </div>
    </div>
  )
}
