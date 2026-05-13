import { NextResponse } from "next/server"
import { supabase } from "@/lib/supabase"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const password = searchParams.get("password")

  if (password !== process.env.REQUEST_LIST_PASSWORD) {
    return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 })
  }

  const { data, error } = await supabase
    .from("requests")
    .select("*")
    .order("created_at", { ascending: false })

  if (error) return NextResponse.json({ success: false, error: error.message }, { status: 500 })

  return NextResponse.json({ success: true, data })
}
