import { ArrowLeft, Star } from "lucide-react";
import { useStock } from "../contexts/StockContext";
import { useNavigate } from "react-router";
import { useState, useEffect, useRef } from "react";

export function F07StockSKHynix() {
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
      name: "SK하이닉스",
      ticker: "000660",
      price: 1225000,
      change: 3.51,
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
                <div className="text-[16px] text-[#1A1A1A] mb-2" style={{ fontWeight: 700 }}>매수 우세</div>
                <div className="w-full bg-[#F5F5F5] rounded-full h-2">
                  <div className="bg-[#FF6600] h-2 rounded-full" style={{ width: "82%" }} />
                </div>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <div className="flex items-center gap-2 mb-2">
                  <div className="text-[16px]">📢</div>
                  <div className="text-[12px] text-[#888888]">여론 분위기</div>
                </div>
                <div className="text-[16px] text-[#1A1A1A] mb-2" style={{ fontWeight: 700 }}>긍정 79%</div>
                <div className="w-full bg-[#F5F5F5] rounded-full h-2">
                  <div className="bg-[#1565C0] h-2 rounded-full" style={{ width: "79%" }} />
                </div>
              </div>
            </div>
            <div className="bg-[#FFFBF0] p-4 rounded-lg mb-3">
              <div className="flex items-center gap-2 mb-2">
                <div className="text-[16px]">💡</div>
                <div className="text-[14px] text-[#1A1A1A]" style={{ fontWeight: 700 }}>AI 종합 요약</div>
              </div>
              <div className="text-[14px] text-[#1A1A1A] leading-relaxed">
                1분기 영업이익 37.6조 역대 최대, 창사 이래 분기 최대 수익성 기록. 강력한 매수 구간.
              </div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm mb-3">
              <div className="flex items-center gap-2 mb-4">
                <div className="text-[16px]">📊</div>
                <div className="text-[16px] text-[#1A1A1A]" style={{ fontWeight: 700 }}>신호 지표</div>
              </div>
              <div className="space-y-3">
                {["기술적 분석", "수급 분석", "뉴스 감성", "공시 분석"].map((item, i) => (
                  <div key={i} className="flex items-center justify-between py-2 border-b border-[#F5F5F5] last:border-0">
                    <div className="text-[14px] text-[#1A1A1A]">{item}</div>
                    <div className="text-[14px] text-[#4CAF50]">▲ 긍정</div>
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
                <div className="bg-[#1565C0]" style={{ width: "79%" }} />
                <div className="bg-[#888888]" style={{ width: "15%" }} />
                <div className="bg-[#F44336]" style={{ width: "6%" }} />
              </div>
              <div className="flex justify-between text-[12px]">
                <div className="text-[#1565C0]">긍정 79%</div>
                <div className="text-[#888888]">중립 15%</div>
                <div className="text-[#F44336]">부정 6%</div>
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
                {["#어닝서프라이즈", "#HBM", "#AI반도체", "#역대최대"].map((keyword) => (
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
                  { icon: "👍", text: "1분기 영업이익 37.6조, 전년 대비 +405%" },
                  { icon: "👍", text: "HBM 수요 지속, 2026년 실적 전망 상향" },
                  { icon: "👎", text: "52주 신고가 부근, 단기 차익실현 주의" },
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
                  "1분기 매출 52.6조, 영업이익 37.6조 역대 최대",
                  "영업이익률 72% 창사 이래 최고 수익성",
                  "HBM3E 엔비디아 독점 공급 지속",
                  "외국인 순매수 지속, 지분율 53% 유지",
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
                  "52주 신고가 부근 단기 과열 경계",
                  "미·중 반도체 수출 규제 재개 가능성",
                  "원/달러 환율 1,483원 상승 압력",
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
                    ["매출액(조)", "44.6", "32.8", "66.2"],
                    ["영업이익(조)", "6.8", "-7.7", "23.5"],
                    ["순이익(조)", "5.4", "-9.1", "19.8"],
                    ["영업이익률", "15.3%", "-23.5%", "35.5%"],
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
                    ["PER", "18.4x", "18.5x", "적정", "#888888", "주가수익비율. 낮을수록 저평가. 업종 평균보다 낮으면 매수 고려."],
                    ["PBR", "3.8x", "2.1x", "고평가", "#1565C0", "주가순자산비율. 1배 이하면 자산 대비 저평가 상태."],
                    ["ROE", "24.6%", "12.3%", "우수", "#D32F2F", "자기자본이익률. 높을수록 기업이 돈을 잘 버는 것."],
                    ["부채비율", "42.1%", "55.0%", "양호", "#D32F2F", "총부채/자기자본. 낮을수록 재무 안정성이 높음."],
                    ["배당수익률", "0.82%", "1.9%", "낮음", "#888888", "주가 대비 배당금 비율. 높을수록 배당 매력 있음."],
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
            SK하이닉스 <span className="text-[#888888]">000660 · KOSPI</span>
          </div>
          <div className="w-6" />
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <div className="text-[24px] text-[#1A1A1A]" style={{ fontWeight: 700 }}>₩1,225,000</div>
            <div className="text-[14px] text-[#D32F2F]">▲ +41,500 (+3.51%)</div>
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
