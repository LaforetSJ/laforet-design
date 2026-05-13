'use client'

import { useEffect, useRef } from 'react'

declare global {
  interface Window {
    kakao: any
  }
}

export function KakaoMap() {
  const mapRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const script = document.createElement('script')
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_MAP_KEY}&libraries=services&autoload=false`
    script.async = true
    document.head.appendChild(script)

    script.onload = () => {
      window.kakao.maps.load(() => {
        if (!mapRef.current) return

        const geocoder = new window.kakao.maps.services.Geocoder()
        geocoder.addressSearch('경기도 용인시 수지구 수풍로 53', (result: any, status: any) => {
          if (status !== window.kakao.maps.services.Status.OK) return

          const coords = new window.kakao.maps.LatLng(result[0].y, result[0].x)

          const map = new window.kakao.maps.Map(mapRef.current!, {
            center: coords,
            level: 4,
          })

          const marker = new window.kakao.maps.Marker({ map, position: coords })

          const lat = result[0].y
          const lng = result[0].x
          const kakaoMapUrl = `https://map.kakao.com/link/map/라포레 디자인 스튜디오,${lat},${lng}`
          const kakaoNavi = `https://map.kakao.com/link/to/라포레 디자인 스튜디오,${lat},${lng}`

          const infowindow = new window.kakao.maps.InfoWindow({
            content: `
              <div style="padding:10px 14px;min-width:160px;">
                <div style="font-size:13px;font-weight:700;margin-bottom:6px;">라포레 디자인 스튜디오</div>
                <div style="display:flex;gap:6px;margin-top:4px;">
                  <a href="${kakaoMapUrl}" target="_blank" rel="noopener noreferrer"
                    style="font-size:11px;color:#3B82F6;text-decoration:none;">지도 보기</a>
                  <span style="color:#ccc;">|</span>
                  <a href="${kakaoNavi}" target="_blank" rel="noopener noreferrer"
                    style="font-size:11px;color:#3B82F6;text-decoration:none;">길찾기</a>
                </div>
              </div>`,
          })
          infowindow.open(map, marker)
        })
      })
    }

    return () => {
      if (document.head.contains(script)) document.head.removeChild(script)
    }
  }, [])

  return <div ref={mapRef} style={{ width: '100%', height: '100%', minHeight: '320px' }} />
}
