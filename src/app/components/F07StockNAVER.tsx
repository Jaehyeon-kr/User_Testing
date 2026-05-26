import { ArrowLeft, Star } from "lucide-react";
import { useStock } from "../contexts/StockContext";
import { useNavigate } from "react-router";
import { useState, useEffect, useRef } from "react";

export function F07StockNAVER() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("종합");
  const [activeTooltip, setActiveTooltip] = useState<string | null>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const { setSelectedStock } = useStock();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (tooltipRef.current && !tooltipRef.current.contains(event.target as Node)) {
        setActiveTooltip(null);
      }
    };

    if (activeTooltip) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [activeTooltip]);

  const handleBuyClick = () => {
    setSelectedStock({
      name: "NAVER",
      ticker: "035420",
      price: 217500,
      change: -1.58,
      isOverseas: false,
      currency: "KRW"
    });
    navigate("/trade");
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "종합":
        return (
          <>
            <div className="grid grid-cols-2 gap-3 mb-3">
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <div className="flex items-center gap-2 mb-2">
                  <div className="text-[16px]">🧠</div>
                  <div className="text-[12px] text-[#888888]">AI 판단</div>
                </div>
                <div className="text-[16px] text-[#1A1A1A] mb-2" style={{ fontWeight: 700 }}>중립</div>
                <div className="w-full bg-[#F5F5F5] rounded-full h-2">
                  <div className="bg-[#888888] h-2 rounded-full" style={{ width: "54%" }} />
                </div>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <div className="flex items-center gap-2 mb-2">
                  <div className="text-[16px]">📢</div>
                  <div className="text-[12px] text-[#888888]">여론 분위기</div>
                </div>
                <div className="text-[16px] text-[#1A1A1A] mb-2" style={{ fontWeight: 700 }}>중립 51%</div>
                <div className="w-full bg-[#F5F5F5] rounded-full h-2">
                  <div className="bg-[#888888] h-2 rounded-full" style={{ width: "51%" }} />
                </div>
              </div>
            </div>
            <div className="bg-[#FFF9E6] p-4 rounded-lg mb-3">
              <div className="flex items-center gap-2 mb-2">
                <div className="text-[16px]">💡</div>
                <div className="text-[14px] text-[#1A1A1A]" style={{ fontWeight: 700 }}>AI 종합 요약</div>
              </div>
              <div className="text-[14px] text-[#1A1A1A] leading-relaxed">
                AI 검색 전환 가속화로 검색 광고 매출 둔화 우려. 클라우드·커머스 성장세 유지하나 단기 관망 필요.
              </div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm mb-3">
              <div className="flex items-center gap-2 mb-4">
                <div className="text-[16px]">📊</div>
                <div className="text-[16px] text-[#1A1A1A]" style={{ fontWeight: 700 }}>신호 지표</div>
              </div>
              <div className="space-y-3">
                {[
                  { name: "기술적 분석", signal: "▼ 부정", color: "#1565C0" },
                  { name: "수급 분석", signal: "― 중립", color: "#888888" },
                  { name: "뉴스 감성", signal: "▼ 부정", color: "#1565C0" },
                  { name: "공시 분석", signal: "▲ 긍정", color: "#4CAF50" },
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between py-2 border-b border-[#F5F5F5] last:border-0">
                    <div className="text-[14px] text-[#1A1A1A]">{item.name}</div>
                    <div className="text-[14px]" style={{ color: item.color }}>{item.signal}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <button className="py-3 border border-[#E0E0E0] rounded-lg text-[14px] text-[#1A1A1A] flex items-center justify-center gap-2">
                <Star className="w-4 h-4" />
                관심 저장
              </button>
              <button onClick={handleBuyClick} className="py-3 bg-[#FF6600] text-white rounded-lg text-[14px]">
                거래하기 →
              </button>
            </div>
          </>
        );
      case "여론":
        return (
          <>
            <div className="bg-white p-4 rounded-lg shadow-sm mb-3">
              <div className="text-[14px] text-[#888888] mb-3">여론 분석 · 최근 24시간</div>
              <div className="w-full h-8 flex rounded-lg overflow-hidden mb-2">
                <div className="bg-[#1565C0]" style={{ width: "34%" }} />
                <div className="bg-[#888888]" style={{ width: "51%" }} />
                <div className="bg-[#F44336]" style={{ width: "15%" }} />
              </div>
              <div className="flex justify-between text-[12px]">
                <div className="text-[#1565C0]">긍정 34%</div>
                <div className="text-[#888888]">중립 51%</div>
                <div className="text-[#F44336]">부정 15%</div>
              </div>
              <div
                style={{
                  fontSize: "10px",
                  color: "#AAAAAA",
                  marginTop: "4px",
                  textAlign: "right"
                }}
              >
                최근 24시간 뉴스·SNS 기반 분석
              </div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm mb-3">
              <div className="flex items-center gap-2 mb-3">
                <div className="text-[16px]">📌</div>
                <div className="text-[14px] text-[#1A1A1A]" style={{ fontWeight: 700 }}>주요 키워드</div>
              </div>
              <div className="flex flex-wrap gap-2">
                {["#AI검색", "#광고매출", "#클라우드", "#커머스성장"].map((keyword) => (
                  <div key={keyword} className="px-3 py-1 bg-[#F5F5F5] text-[#1A1A1A] text-[12px] rounded-full">{keyword}</div>
                ))}
              </div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm mb-3">
              <div className="flex items-center gap-2 mb-4">
                <div className="text-[16px]">🗣️</div>
                <div className="text-[14px] text-[#1A1A1A]" style={{ fontWeight: 700 }}>대표 의견</div>
              </div>
              <div className="space-y-3">
                {[
                  { icon: "👍", text: "클라우드 사업 1분기 매출 +18% 성장" },
                  { icon: "👎", text: "AI 검색 전환으로 검색 광고 매출 둔화 우려" },
                  { icon: "👎", text: "외국인 3거래일 연속 순매도 지속" },
                ].map((opinion, i) => (
                  <div key={i} className="p-3 bg-[#F5F5F5] rounded-lg">
                    <div className="flex items-start gap-2">
                      <div className="text-[16px]">{opinion.icon}</div>
                      <div className="flex-1 text-[14px] text-[#1A1A1A]">{opinion.text}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <button onClick={handleBuyClick} className="w-full py-3 bg-[#FF6600] text-white rounded-lg text-[14px]">
              거래하기 →
            </button>
          </>
        );
      case "AI분석":
        return (
          <>
            <div className="mb-4">
              <div className="flex items-center gap-2 mb-1">
                <div className="text-[18px]">🤖</div>
                <div className="text-[16px] text-[#1A1A1A]" style={{ fontWeight: 700 }}>AI 분석 리포트</div>
              </div>
              <div className="text-[12px] text-[#888888]">업데이트: 오늘 오전 9:00</div>
            </div>
            <div className="bg-[#F0F4FF] p-4 rounded-lg shadow-sm mb-3">
              <div className="flex items-center gap-2 mb-3">
                <div className="text-[16px]">🔍</div>
                <div className="text-[14px] text-[#1A1A1A]" style={{ fontWeight: 700 }}>근거 분석</div>
              </div>
              <div className="space-y-2">
                {[
                  "1분기 클라우드 매출 +18%, 커머스 +12% 성장",
                  "네이버페이 MAU 3,200만 돌파",
                  "웹툰·웹소설 글로벌 매출 비중 52% 상승",
                  "자사주 소각 1,000억원 규모 공시",
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <div className="mt-1.5 w-1.5 h-1.5 bg-[#1A2B4A] rounded-full flex-shrink-0" />
                    <div className="text-[14px] text-[#1A1A1A]">{item}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-[#FFF0F0] p-4 rounded-lg shadow-sm mb-3">
              <div className="flex items-center gap-2 mb-3">
                <div className="text-[16px]">⚠️</div>
                <div className="text-[14px] text-[#1A1A1A]" style={{ fontWeight: 700 }}>리스크 요인</div>
              </div>
              <div className="space-y-2">
                {[
                  "AI 검색 전환으로 검색 광고 매출 YoY -5%",
                  "외국인 지분율 49.2% → 47.8% 하락",
                  "라인야후 일본 사업 불확실성 지속",
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <div className="mt-1.5 w-1.5 h-1.5 bg-[#F44336] rounded-full flex-shrink-0" />
                    <div className="text-[14px] text-[#1A1A1A]">{item}</div>
                  </div>
                ))}
              </div>
            </div>
            <button onClick={handleBuyClick} className="w-full py-3 bg-[#FF6600] text-white rounded-lg text-[14px]">
              거래하기 →
            </button>
          </>
        );
      case "재무":
        return (
          <>
            <div className="bg-white p-4 rounded-lg shadow-sm mb-3">
              <div className="text-[16px] text-[#1A1A1A] mb-3" style={{ fontWeight: 700 }}>연간 실적</div>
              <table className="w-full text-[12px]">
                <thead>
                  <tr className="bg-[#f8f8f8]">
                    <th className="py-2 px-2 text-left text-[#888888]">항목</th>
                    <th className="py-2 px-2 text-right text-[#888888]">2022</th>
                    <th className="py-2 px-2 text-right text-[#888888]">2023</th>
                    <th className="py-2 px-2 text-right text-[#888888]">2024</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["매출액(조)", "8.2", "9.1", "10.4"],
                    ["영업이익(조)", "1.5", "1.8", "1.7"],
                    ["순이익(조)", "1.2", "1.6", "1.4"],
                    ["영업이익률", "18.3%", "19.8%", "16.3%"],
                  ].map((row, i) => (
                    <tr key={i} className={i < 3 ? "border-b border-[#F5F5F5]" : ""}>
                      {row.map((cell, j) => (
                        <td key={j} className={`py-2 px-2 ${j === 0 ? "text-left" : "text-right"} text-[#1A1A1A]`}>
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
              <div style={{
                display: "flex",
                gap: "16px",
                marginTop: "6px",
                padding: "0 4px"
              }}>
                <span style={{ fontSize:"10px", color:"#333333" }}>
                  ▲ 빨간색: 전년 대비 증가 / 긍정
                </span>
                <span style={{ fontSize:"10px", color:"#333333" }}>
                  ▼ 파란색: 전년 대비 감소 / 주의
                </span>
              </div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm mb-3" ref={tooltipRef}>
              <div className="text-[16px] text-[#1A1A1A] mb-3" style={{ fontWeight: 700 }}>기술적 지표</div>
              <table className="w-full text-[12px]">
                <thead>
                  <tr className="bg-[#f8f8f8]">
                    <th className="py-2 px-2 text-left text-[#888888]">지표</th>
                    <th className="py-2 px-2 text-right text-[#888888]">현재</th>
                    <th className="py-2 px-2 text-right text-[#888888]">업종평균</th>
                    <th className="py-2 px-2 text-right text-[#888888]">평가</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["PER", "22.1x", "18.5x", "고평가", "#1565C0", "주가수익비율. 낮을수록 저평가. 업종 평균보다 낮으면 매수 고려."],
                    ["PBR", "2.8x", "2.1x", "고평가", "#1565C0", "주가순자산비율. 1배 이하면 자산 대비 저평가 상태."],
                    ["ROE", "12.8%", "12.3%", "적정", "#888888", "자기자본이익률. 높을수록 기업이 돈을 잘 버는 것."],
                    ["부채비율", "38.2%", "55.0%", "양호", "#D32F2F", "총부채/자기자본. 낮을수록 재무 안정성이 높음."],
                    ["배당수익률", "0.42%", "1.9%", "낮음", "#888888", "주가 대비 배당금 비율. 높을수록 배당 매력 있음."],
                  ].map((row, i) => (
                    <tr key={i} className={i < 4 ? "border-b border-[#F5F5F5]" : ""}>
                      <td className="py-2 px-2 text-[#1A1A1A]">
                        <div className="flex items-center gap-1 relative">
                          <span>{row[0]}</span>
                          <button
                            onClick={() => setActiveTooltip(activeTooltip === row[0] ? null : row[0])}
                            className="w-4 h-4 bg-[#E8F0FF] text-[#1A2B4A] rounded-full flex items-center justify-center text-[10px] cursor-pointer"
                            style={{ fontWeight: 700 }}
                          >
                            ?
                          </button>
                          {activeTooltip === row[0] && (
                            <div className="absolute left-0 top-6 bg-[#1A2B4A] text-white text-[11px] rounded-lg max-w-[220px] z-[100]" style={{ padding: "10px 12px", lineHeight: 1.6 }}>
                              {row[5]}
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="py-2 px-2 text-right text-[#1A1A1A]">{row[1]}</td>
                      <td className="py-2 px-2 text-right text-[#1A1A1A]">{row[2]}</td>
                      <td className="py-2 px-2 text-right" style={{ color: row[4] }}>{row[3]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div style={{
                display: "flex",
                gap: "16px",
                marginTop: "6px",
                padding: "0 4px"
              }}>
                <span style={{ fontSize:"10px", color:"#333333" }}>
                  ▲ 빨간색: 전년 대비 증가 / 긍정
                </span>
                <span style={{ fontSize:"10px", color:"#333333" }}>
                  ▼ 파란색: 전년 대비 감소 / 주의
                </span>
              </div>
            </div>
            <button onClick={handleBuyClick} className="w-full py-3 bg-[#FF6600] text-white rounded-lg text-[14px]">
              거래하기 →
            </button>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="w-full h-full bg-[#F5F5F5] flex flex-col">
      <div className="bg-white px-4 py-3 border-b border-[#E0E0E0]">
        <div className="flex items-center justify-between mb-3">
          <button onClick={() => navigate(-1)}><ArrowLeft className="w-6 h-6 text-[#1A2B4A]" /></button>
          <div className="text-[16px] text-[#1A1A1A]" style={{ fontWeight: 700 }}>
            NAVER <span className="text-[#888888]">035420 · KOSPI</span>
          </div>
          <div className="w-6" />
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <div className="text-[24px] text-[#1A1A1A]" style={{ fontWeight: 700 }}>₩217,500</div>
            <div className="text-[14px] text-[#1565C0]">▼ -3,500 (-1.58%)</div>
          </div>
          <div className="text-[11px] text-[#888888]">2026.04.24</div>
        </div>
      </div>
      <div className="bg-white px-4 flex gap-6 border-b border-[#E0E0E0] overflow-x-auto">
        {["종합", "여론", "AI분석", "재무"].map((tab) => (
          <button key={tab} onClick={() => setActiveTab(tab)} className={`py-3 text-[14px] whitespace-nowrap ${activeTab === tab ? "text-[#1A1A1A] border-b-2 border-[#FF6600]" : "text-[#888888]"}`}>
            {tab}
          </button>
        ))}
      </div>
      <div className="flex-1 overflow-y-auto p-4">{renderTabContent()}</div>
    </div>
  );
}
