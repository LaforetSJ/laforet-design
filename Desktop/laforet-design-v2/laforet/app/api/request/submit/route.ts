import { NextResponse } from "next/server"
import nodemailer from "nodemailer"

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!
const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export async function POST(request: Request) {
  try {
    const body = await request.json()

    // Supabase REST API 직접 호출
    const res = await fetch(`${SUPABASE_URL}/rest/v1/requests`, {
      method: "POST",
      headers: {
        "apikey": SUPABASE_KEY,
        "Authorization": `Bearer ${SUPABASE_KEY}`,
        "Content-Type": "application/json",
        "Prefer": "return=representation",
      },
      body: JSON.stringify(body),
    })

    if (!res.ok) {
      const err = await res.text()
      throw new Error(err)
    }

    const rows = await res.json()
    const saved = rows[0]

    // 이메일 발송 (실패해도 접수는 성공 처리)
    sendEmail(body, saved.id, saved.created_at).catch((e) => console.error("Email error:", e))

    return NextResponse.json({ success: true, id: saved.id })
  } catch (error) {
    console.error("Request submit error:", error)
    return NextResponse.json({ success: false, error: "접수 중 오류가 발생했습니다." }, { status: 500 })
  }
}

async function sendEmail(data: any, id: number, createdAt?: string) {
  if (!process.env.NAVER_PASSWORD || process.env.NAVER_PASSWORD === "여기에_네이버_비밀번호_입력") return

  const transporter = nodemailer.createTransport({
    host: "smtp.naver.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.NAVER_USER,
      pass: process.env.NAVER_PASSWORD,
    },
  })

  const c = data.construction || {}
  const row = (label: string, value: any) =>
    `<tr><td style="padding:6px 10px;background:#f9f9f9;font-weight:bold;width:160px">${label}</td><td style="padding:6px 10px">${Array.isArray(value) ? (value.join(", ") || "-") : (value || "-")}</td></tr>`

  const dateStr = createdAt
    ? new Date(createdAt).toLocaleString("ko-KR", { timeZone: "Asia/Seoul" })
    : new Date().toLocaleString("ko-KR", { timeZone: "Asia/Seoul" })

  // 관리자 알림 이메일
  await transporter.sendMail({
    from: `"라포레디자인 접수" <${process.env.NAVER_USER}>`,
    to: process.env.ADMIN_EMAIL,
    subject: `[라포레디자인] 새 시공 접수 #${id} - ${data.name}`,
    html: `
      <h2 style="color:#333">새 시공 접수 #${id}</h2>
      <p style="color:#888;font-size:13px;margin:0 0 12px">접수일시: ${dateStr}</p>
      <table border="1" cellpadding="0" cellspacing="0" style="border-collapse:collapse;width:100%;font-size:14px">
        <tr><td colspan="2" style="padding:8px 10px;background:#222;color:#fff;font-weight:bold">기본 정보</td></tr>
        ${row("이름", data.name)}
        ${row("연락처", data.phone)}
        ${row("이메일", data.email)}
        ${row("통화가능시간", data.call_time)}
        ${row("공사시작일", data.start_date)}
        ${row("입주예정일", data.move_in_date)}
        ${row("건물유형", data.building_type)}
        ${row("주소", data.address)}
        ${row("평형", data.area_pyeong ? data.area_pyeong + "평" : "-")}
        ${row("공급면적", data.area_sqm ? data.area_sqm + "㎡" : "-")}
        ${row("가족구성원", data.family_members)}
        ${row("유입경로", data.referral)}
        <tr><td colspan="2" style="padding:8px 10px;background:#222;color:#fff;font-weight:bold">공사의뢰사항</td></tr>
        ${row("바닥철거", c.floor_demo)}
        ${row("확장공사", c.expansion)}
        ${row("부분샷시교체", c.sash === "교체" ? `교체 (위치: ${c.sash_location || "-"})` : "해당없음")}
        ${row("거실 욕실", c.bathroom_living)}
        ${row("안방 욕실", c.bathroom_main)}
        ${row("타일공사", c.tile)}
        ${row("목공공사", [...(c.carpentry || []), c.balcony_door_count ? `발코니 중문 ${c.balcony_door_count}EA` : ""])}
        ${row("디자인공사", c.design)}
        ${row("필름공사", c.film)}
        ${row("도장공사", c.paint_count ? `발코니 페인트 ${c.paint_count}칸` : "-")}
        ${row("주방가구", [c.kitchen_shape, ...(c.kitchen_extras || []), c.fridge_count ? `냉장고장 ${c.fridge_count}EA` : "", c.tall_count ? `키큰장 ${c.tall_count}EA` : ""].filter(Boolean))}
        ${row("가구공사", [...(c.furniture || []), c.closet_count ? `붙박이장 ${c.closet_count}EA` : "", c.half_count ? `하프장 ${c.half_count}EA` : "", c.bench_count ? `벤치장 ${c.bench_count}EA` : "", c.storage_count ? `창고문 ${c.storage_count}EA` : ""].filter(Boolean))}
        ${row("도배공사", c.wallpaper)}
        ${row("바닥공사", c.flooring)}
        ${row("전기/조명", [...(c.electric || []), c.outlet_count ? `콘센트이설/신설 ${c.outlet_count}EA` : ""].filter(Boolean))}
        ${row("기타", c.extras)}
        <tr><td colspan="2" style="padding:8px 10px;background:#222;color:#fff;font-weight:bold">추가사항</td></tr>
        ${row("추가사항", data.notes)}
      </table>
    `,
  })

  // 고객 확인 이메일 (이메일 입력한 경우)
  if (data.email) {
    await transporter.sendMail({
      from: `"라포레디자인" <${process.env.NAVER_USER}>`,
      to: data.email,
      subject: `[라포레디자인] 시공 접수가 완료되었습니다 (#${id})`,
      html: `
        <h2>안녕하세요, ${data.name}님!</h2>
        <p>시공 접수가 정상적으로 완료되었습니다.</p>
        <p>접수번호: <b>#${id}</b></p>
        <p>담당자가 확인 후 <b>${data.phone}</b>으로 연락드리겠습니다.</p>
        <br/>
        <p>감사합니다.</p>
        <p><b>라포레디자인</b><br/>📱 010-8587-9987</p>
      `,
    })
  }
}
