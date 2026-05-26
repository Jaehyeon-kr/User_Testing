# T-STOCK - 주식 거래 모바일 웹 애플리케이션

## 프로젝트 개요

모바일 환경(iPhone 14 Pro 기준, 390x844px)에 최적화된 주식 거래 플랫폼 프로토타입입니다.
국내(KRW) 및 해외(USD) 시장을 모두 지원하며, AI 기반 분석 기능을 포함합니다.

> 현재 모든 데이터는 목업(Mock) 데이터로 구성되어 있으며, 실제 API 백엔드는 연결되어 있지 않습니다.

---

## 기술 스택

| 분류 | 기술 |
|------|------|
| 프레임워크 | React 18.3.1 + TypeScript |
| 빌드 도구 | Vite 6.3.5 |
| 라우팅 | React Router 7.13.0 |
| 스타일링 | Tailwind CSS 4.1.12 |
| UI 컴포넌트 | shadcn/ui (Radix UI 기반), MUI 7.3.5 |
| 아이콘 | Lucide React, MUI Icons |
| 차트 | Recharts 2.15.2 |
| 애니메이션 | Motion 12.23.24 |
| 상태 관리 | React Context API |
| 패키지 매니저 | pnpm |

---

## 프로젝트 구조

```
stock/
├── src/
│   ├── app/
│   │   ├── App.tsx                    # 메인 라우터 및 레이아웃
│   │   ├── components/
│   │   │   ├── DeviceFrame.tsx        # iPhone 프레임 래퍼
│   │   │   ├── F01HomeScreen.tsx      # 국내 홈 화면
│   │   │   ├── F01GlobalHome.tsx      # 해외 홈 화면
│   │   │   ├── F02SimpleModal.tsx     # 심플 모드 전환 모달
│   │   │   ├── F03SimpleHome.tsx      # 심플 홈 (국내)
│   │   │   ├── F03GlobalSimple.tsx    # 심플 홈 (해외)
│   │   │   ├── F04SettingsNew.tsx     # 메뉴 커스터마이징 설정
│   │   │   ├── F06AIInfo.tsx          # AI 정보 (국내)
│   │   │   ├── F06AIInfoGlobal.tsx    # AI 정보 (해외)
│   │   │   ├── F07StockDetailAll.tsx  # 종합 종목 상세
│   │   │   ├── F07StockGlobal*.tsx    # 해외 종목 상세 (AAPL, TSLA)
│   │   │   ├── F07StockNAVER.tsx      # NAVER 종목 상세
│   │   │   ├── F07StockSKHynix.tsx    # SK하이닉스 종목 상세
│   │   │   ├── F08StockOpinion.tsx    # 여론/커뮤니티 감성 분석
│   │   │   ├── F09StockAIAnalysis.tsx # AI 분석 리포트
│   │   │   ├── BalanceScreen.tsx      # 잔고 (국내)
│   │   │   ├── BalanceGlobal.tsx      # 잔고 (해외)
│   │   │   ├── TradeScreen.tsx        # 주문 (국내)
│   │   │   ├── TradeGlobal.tsx        # 주문 (해외)
│   │   │   ├── BankingScreen.tsx      # 뱅킹/출금
│   │   │   ├── OrderHistory.tsx       # 주문 내역
│   │   │   └── ui/                    # shadcn/ui 컴포넌트 (40+)
│   │   └── contexts/
│   │       └── StockContext.tsx        # 종목 선택 전역 상태
│   └── styles/                         # CSS 스타일 파일
├── package.json
├── vite.config.ts
└── pnpm-workspace.yaml
```

### 파일 네이밍 규칙

- `F01` ~ `F09`: 기능(Feature) 번호 기반 컴포넌트
- `*Global*`: 해외 시장 전용 컴포넌트
- `*Screen`: 전체 화면 단위 컴포넌트

---

## 주요 기능

### 1. 시장 홈 화면
- **국내**: KOSPI, KOSDAQ, NASDAQ 지수 + 삼성전자, SK하이닉스, NAVER, 카카오
- **해외**: NASDAQ, S&P 500, DOW, VIX 지수 + AAPL, TSLA, NVDA
- 국내/해외 전환 토글 지원

### 2. 종목 상세 정보
- **종합 탭**: AI 판단, 감성 분석, 요약
- **여론 탭**: 커뮤니티 의견, 긍정/부정/중립 비율
- **AI분석 탭**: 근거 기반 분석, 리스크 요인
- **재무 탭**: 재무 지표

### 3. AI 분석 기능
- 매수/매도 추천 (신뢰도 표시)
- 실시간 여론 감성 분석 (긍정/부정/중립)
- 언급량 추이 차트
- 핵심 키워드 추출
- 리스크 요인 분석

### 4. 거래 기능
- 종목 선택 및 수량/가격 입력
- 호가창 표시 (매수/매도 물량)
- 시장가/지정가 주문
- 주문 확인 모달
- 다중 통화 지원 (KRW/USD)

### 5. 자산 관리
- 보유 종목 잔고 조회
- 주문 내역 및 주문 취소
- 뱅킹 (출금 가능 금액, 은행 선택, 이체)

### 6. UI 모드
- **일반 모드**: 전체 기능
- **심플 모드**: 간소화된 인터페이스, 메뉴 커스터마이징 가능
  - 기본 메뉴: 최근 본 종목, 실시간 급등, 오늘의 테마, 거래량 상위
  - 숨김 메뉴: 글로벌 증시, 환율 현황, 관심종목 뉴스 등

---

## 라우팅 경로

| 경로 | 화면 |
|------|------|
| `/` | 홈 (일반/심플 모드 전환) |
| `/global` | 해외 시장 홈 |
| `/stock-detail` | 종목 상세 (종합) |
| `/stock-skhynix` | SK하이닉스 상세 |
| `/stock-naver` | NAVER 상세 |
| `/stock-opinion` | 여론 분석 |
| `/stock-ai-analysis` | AI 분석 리포트 |
| `/balance` | 국내 잔고 |
| `/balance-global` | 해외 잔고 |
| `/trade` | 국내 주문 |
| `/trade-global` | 해외 주문 |
| `/banking` | 뱅킹 |
| `/order-history` | 주문 내역 |
| `/ai-info` | AI 정보 (국내) |
| `/ai-info-global` | AI 정보 (해외) |
| `/settings` | 메뉴 설정 |

---

## 디자인 시스템

### 주요 색상

| 용도 | 색상 코드 |
|------|-----------|
| 프라이머리 (오렌지) | `#FF6600` |
| 다크 (네이비) | `#1A2B4A` |
| 텍스트 (블랙) | `#1A1A1A` |
| 뉴트럴 (그레이) | `#888888` |
| 배경 (라이트) | `#F5F5F5` |
| 상승 (빨강) | `#D32F2F` |
| 하락 (파랑) | `#1565C0` |
| 보유 (초록) | `#4CAF50` |

### 레이아웃
- iPhone 14 Pro 목업 프레임 (390x844px, 0.72 스케일)
- 상단 바: 로고, 검색, 알림, 모드/지역 토글
- 하단 탭: 오늘주식, 인사이트, 자산, MY

---

## 실행 방법

```bash
# 의존성 설치
pnpm install

# 개발 서버 실행
pnpm run dev

# 프로덕션 빌드
pnpm run build
```

---

## 상태 관리

- **StockContext**: 선택된 종목 정보를 전역으로 공유 (종목명, 티커, 가격, 변동률, 통화, 지역)
- **LocalStorage**: 심플 모드 메뉴 커스터마이징 설정 저장
