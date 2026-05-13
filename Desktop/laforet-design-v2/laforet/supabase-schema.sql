-- 접수 테이블 생성
CREATE TABLE requests (
  id BIGSERIAL PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT NOW(),

  -- 고객 정보
  type TEXT NOT NULL DEFAULT '개인',
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT,
  preferred_call_time TEXT,
  referral TEXT,

  -- 공사 정보
  building_type TEXT,
  area TEXT,
  address TEXT,
  desired_date TEXT,
  budget TEXT,

  -- 희망 시공 범위 (배열)
  scope TEXT[],

  -- 특이사항
  notes TEXT,

  -- 진행 상태
  status TEXT DEFAULT '접수'
);

-- 누구나 INSERT 가능하도록 RLS 정책 설정
ALTER TABLE requests ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can insert requests"
  ON requests FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Anyone can read requests"
  ON requests FOR SELECT
  USING (true);
