import { NextResponse } from "next/server"
import { supabase } from "@/lib/supabase"

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { searchParams } = new URL(request.url)
  const password = searchParams.get("password") ?? ""
  const { id: idStr } = await params
  const id = Number(idStr)

  if (isNaN(id) || id < 0) {
    return NextResponse.json({ success: false, error: "잘못된 접수번호입니다." }, { status: 400 })
  }

  const { data: rows, error } = await supabase
    .from("requests")
    .select("*")
    .eq("id", id)
    .limit(1)

  if (error) return NextResponse.json({ success: false, error: error.message }, { status: 500 })
  if (!rows || rows.length === 0) {
    return NextResponse.json({ success: false, error: "존재하지 않는 접수입니다." }, { status: 404 })
  }

  const row = rows[0]
  const isMaster = password === process.env.REQUEST_LIST_PASSWORD
  const isOwner = row.password && row.password === password

  if (!isMaster && !isOwner) {
    return NextResponse.json({ success: false, error: "비밀번호가 올바르지 않습니다." }, { status: 401 })
  }

  return NextResponse.json({ success: true, data: row })
}
