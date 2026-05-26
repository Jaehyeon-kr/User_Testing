import { ArrowLeft, Star } from "lucide-react";
import { useNavigate } from "react-router";
import { useState, useEffect, useRef } from "react";
import { useStock } from "../contexts/StockContext";

export function F07StockDetailAll() {
  const navigate = useNavigate();
  const { setSelectedStock } = useStock();
  const [activeTab, setActiveTab] = useState("종합");
  const [activeTooltip, setActiveTooltip] = useState<string | null>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);

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
      name: "삼성전자",
      ticker: "005930",
      price: 219500,
      change: -2.23,
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
            {/* Two Cards Row */}
            <div className="grid grid-cols-2 gap-3 mb-3">
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <div className="flex items-center gap-2 mb-2">
                  <div className="text-[16px]">🧠</div>
                  <div className="text-[12px] text-[#888888]">AI 판단</div>
                </div>
                <div className="text-[16px] text-[#1A1A1A] mb-2" style={{ fontWeight: 700 }}>
                  매수 우세
                </div>
                <div className="w-full bg-[#F5F5F5] rounded-full h-2">
                  <div className="bg-[#FF6600] h-2 rounded-full" style={{ width: "70%" }} />
                </div>
              </div>

              <div className="bg-white p-4 rounded-lg shadow-sm">
                <div className="flex items-center gap-2 mb-2">
                  <div className="text-[16px]">📢</div>
                  <div className="text-[12px] text-[#888888]">여론 분위기</div>
                </div>
                <div className="text-[16px] text-[#1A1A1A] mb-2" style={{ fontWeight: 700 }}>
                  긍정 68%
                </div>
                <div className="w-full bg-[#F5F5F5] rounded-full h-2">
                  <div className="bg-[#1565C0] h-2 rounded-full" style={{ width: "68%" }} />
                </div>
              </div>
            </div>

            {/* AI Summary */}
            <div className="bg-[#FFFBF0] p-4 rounded-lg mb-3">
              <div className="flex items-center gap-2 mb-2">
                <div className="text-[16px]">💡</div>
                <div className="text-[14px] text-[#1A1A1A]" style={{ fontWeight: 700 }}>AI 종합 요약</div>
              </div>
              <div className="text-[14px] text-[#1A1A1A] leading-relaxed">
                단기 조정 후 반등 가능성, 중장기 매수 구간으로 판단
              </div>
            </div>

            {/* Signal Indicators */}
            <div className="bg-white p-4 rounded-lg shadow-sm mb-3">
              <div className="flex items-center gap-2 mb-4">
                <div className="text-[16px]">📊</div>
                <div className="text-[16px] text-[#1A1A1A]" style={{ fontWeight: 700 }}>신호 지표</div>
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between py-2 border-b border-[#F5F5F5]">
                  <div className="text-[14px] text-[#1A1A1A]">기술적 분석</div>
                  <div className="text-[14px] text-[#4CAF50]">▲ 긍정</div>
                </div>
                <div className="flex items-center justify-between py-2 border-b border-[#F5F5F5]">
                  <div className="text-[14px] text-[#1A1A1A]">수급 분석</div>
                  <div className="text-[14px] text-[#4CAF50]">▲ 긍정</div>
                </div>
                <div className="flex items-center justify-between py-2 border-b border-[#F5F5F5]">
                  <div className="text-[14px] text-[#1A1A1A]">뉴스 감성</div>
                  <div className="text-[14px] text-[#888888]">▶ 중립</div>
                </div>
                <div className="flex items-center justify-between py-2">
                  <div className="text-[14px] text-[#1A1A1A]">공시 분석</div>
                  <div className="text-[14px] text-[#F44336]">▼ 주의</div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-2 gap-3">
              <button className="py-3 border border-[#E0E0E0] rounded-lg text-[14px] text-[#1A1A1A] flex items-center justify-center gap-2">
                <Star className="w-4 h-4" />
                관심 저장
              </button>
              <button
                onClick={handleBuyClick}
                className="py-3 bg-[#FF6600] text-white rounded-lg text-[14px] flex items-center justify-center gap-2"
              >
                거래하기 →
              </button>
            </div>
          </>
        );

      case "여론":
        return (
          <>
            {/* Sentiment Analysis */}
            <div className="bg-white p-4 rounded-lg shadow-sm mb-3">
              <div className="text-[14px] text-[#888888] mb-3">여론 분석 · 최근 24시간</div>
              <div className="w-full h-8 flex rounded-lg overflow-hidden mb-2">
                <div className="bg-[#1565C0] h-full" style={{ width: "68%" }} />
                <div className="bg-[#888888] h-full" style={{ width: "20%" }} />
                <div className="bg-[#F44336] h-full" style={{ width: "12%" }} />
              </div>
              <div className="flex justify-between text-[12px]">
                <div className="text-[#1565C0]">긍정 68%</div>
                <div className="text-[#888888]">중립 20%</div>
                <div className="text-[#F44336]">부정 12%</div>
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

            {/* Keywords */}
            <div className="bg-white p-4 rounded-lg shadow-sm mb-3">
              <div className="flex items-center gap-2 mb-3">
                <div className="text-[16px]">📌</div>
                <div className="text-[14px] text-[#1A1A1A]" style={{ fontWeight: 700 }}>주요 키워드</div>
              </div>
              <div className="flex flex-wrap gap-2">
                {["#실적호전", "#반도체", "#배당", "#외국인매수"].map((keyword) => (
                  <div key={keyword} className="px-3 py-1 bg-[#F5F5F5] text-[#1A1A1A] text-[12px] rounded-full">
                    {keyword}
                  </div>
                ))}
              </div>
            </div>

            {/* Representative Opinions */}
            <div className="bg-white p-4 rounded-lg shadow-sm mb-3">
              <div className="flex items-center gap-2 mb-4">
                <div className="text-[16px]">🗣️</div>
                <div className="text-[14px] text-[#1A1A1A]" style={{ fontWeight: 700 }}>대표 의견</div>
              </div>
              <div className="space-y-3">
                <div className="p-3 bg-[#F5F5F5] rounded-lg">
                  <div className="flex items-start gap-2">
                    <div className="text-[16px]">👍</div>
                    <div className="flex-1">
                      <div className="text-[14px] text-[#1A1A1A] mb-1">"실적 발표 이후 반등 기대"</div>
                      <div className="text-[12px] text-[#888888]">커뮤니티</div>
                    </div>
                  </div>
                </div>
                <div className="p-3 bg-[#F5F5F5] rounded-lg">
                  <div className="flex items-start gap-2">
                    <div className="text-[16px]">👍</div>
                    <div className="flex-1">
                      <div className="text-[14px] text-[#1A1A1A] mb-1">"외국인 순매수 지속 중"</div>
                      <div className="text-[12px] text-[#888888]">SNS</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <button
              onClick={() => navigate("/trade")}
              className="w-full py-3 bg-[#FF6600] text-white rounded-lg text-[14px]"
            >
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
                <div className="text-[16px] text-[#1A1A1A]" style={{ fontWeight: 700 }}>
                  AI 분석 리포트
                </div>
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
                  "최근 3분기 연속 영업이익 상승",
                  "외국인 순매수 5일 연속",
                  "동종업계 대비 PER 저평가",
                  "글로벌 반도체 수요 회복세",
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
                {["미·중 무역 분쟁 변수", "원/달러 환율 상승 압력"].map((item, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <div className="mt-1.5 w-1.5 h-1.5 bg-[#F44336] rounded-full flex-shrink-0" />
                    <div className="text-[14px] text-[#1A1A1A]">{item}</div>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={() => navigate("/trade")}
              className="w-full py-3 bg-[#FF6600] text-white rounded-lg text-[14px]"
            >
              거래하기 →
            </button>
          </>
        );

      case "재무":
        return (
          <>
            {/* Section 1: Annual Performance */}
            <div className="bg-white p-4 rounded-lg shadow-sm mb-3">
              <div className="text-[16px] text-[#1A1A1A] mb-3" style={{ fontWeight: 700 }}>연간 실적</div>
              <div className="overflow-x-auto">
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
                    <tr className="border-b border-[#F5F5F5]">
                      <td className="py-2 px-2 text-[#1A1A1A]">매출액(조)</td>
                      <td className="py-2 px-2 text-right text-[#1A1A1A]">302.2</td>
                      <td className="py-2 px-2 text-right text-[#1A1A1A]">258.9</td>
                      <td className="py-2 px-2 text-right text-[#1A1A1A]">300.9</td>
                    </tr>
                    <tr className="border-b border-[#F5F5F5]">
                      <td className="py-2 px-2 text-[#1A1A1A]">영업이익(조)</td>
                      <td className="py-2 px-2 text-right text-[#1A1A1A]">43.4</td>
                      <td className="py-2 px-2 text-right text-[#1565C0]">6.6</td>
                      <td className="py-2 px-2 text-right text-[#1A1A1A]">32.7</td>
                    </tr>
                    <tr className="border-b border-[#F5F5F5]">
                      <td className="py-2 px-2 text-[#1A1A1A]">순이익(조)</td>
                      <td className="py-2 px-2 text-right text-[#1A1A1A]">39.0</td>
                      <td className="py-2 px-2 text-right text-[#1565C0]">15.5</td>
                      <td className="py-2 px-2 text-right text-[#1A1A1A]">26.6</td>
                    </tr>
                    <tr>
                      <td className="py-2 px-2 text-[#1A1A1A]">영업이익률</td>
                      <td className="py-2 px-2 text-right text-[#1A1A1A]">14.4%</td>
                      <td className="py-2 px-2 text-right text-[#1565C0]">2.6%</td>
                      <td className="py-2 px-2 text-right text-[#1A1A1A]">10.9%</td>
                    </tr>
                  </tbody>
                </table>
              </div>
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

            {/* Section 2: Technical Indicators */}
            <div className="bg-white p-4 rounded-lg shadow-sm mb-3" ref={tooltipRef}>
              <div className="text-[16px] text-[#1A1A1A] mb-3" style={{ fontWeight: 700 }}>기술적 지표</div>
              <div className="overflow-x-auto">
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
                    <tr className="border-b border-[#F5F5F5]">
                      <td className="py-2 px-2 text-[#1A1A1A]">
                        <div className="flex items-center gap-1 relative">
                          <span>PER</span>
                          <button
                            onClick={() => setActiveTooltip(activeTooltip === "PER" ? null : "PER")}
                            className="w-4 h-4 bg-[#E8F0FF] text-[#1A2B4A] rounded-full flex items-center justify-center text-[10px] cursor-pointer"
                            style={{ fontWeight: 700 }}
                          >
                            ?
                          </button>
                          {activeTooltip === "PER" && (
                            <div className="absolute left-0 top-6 bg-[#1A2B4A] text-white text-[11px] rounded-lg max-w-[220px] z-[100]" style={{ padding: "10px 12px", lineHeight: 1.6 }}>
                              주가수익비율. 낮을수록 저평가. 업종 평균보다 낮으면 매수 고려.
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="py-2 px-2 text-right text-[#1A1A1A]">14.2x</td>
                      <td className="py-2 px-2 text-right text-[#1A1A1A]">18.5x</td>
                      <td className="py-2 px-2 text-right text-[#D32F2F]">저평가</td>
                    </tr>
                    <tr className="border-b border-[#F5F5F5]">
                      <td className="py-2 px-2 text-[#1A1A1A]">
                        <div className="flex items-center gap-1 relative">
                          <span>PBR</span>
                          <button
                            onClick={() => setActiveTooltip(activeTooltip === "PBR" ? null : "PBR")}
                            className="w-4 h-4 bg-[#E8F0FF] text-[#1A2B4A] rounded-full flex items-center justify-center text-[10px] cursor-pointer"
                            style={{ fontWeight: 700 }}
                          >
                            ?
                          </button>
                          {activeTooltip === "PBR" && (
                            <div className="absolute left-0 top-6 bg-[#1A2B4A] text-white text-[11px] rounded-lg max-w-[220px] z-[100]" style={{ padding: "10px 12px", lineHeight: 1.6 }}>
                              주가순자산비율. 1배 이하면 자산 대비 저평가 상태.
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="py-2 px-2 text-right text-[#1A1A1A]">1.3x</td>
                      <td className="py-2 px-2 text-right text-[#1A1A1A]">2.1x</td>
                      <td className="py-2 px-2 text-right text-[#D32F2F]">저평가</td>
                    </tr>
                    <tr className="border-b border-[#F5F5F5]">
                      <td className="py-2 px-2 text-[#1A1A1A]">
                        <div className="flex items-center gap-1 relative">
                          <span>ROE</span>
                          <button
                            onClick={() => setActiveTooltip(activeTooltip === "ROE" ? null : "ROE")}
                            className="w-4 h-4 bg-[#E8F0FF] text-[#1A2B4A] rounded-full flex items-center justify-center text-[10px] cursor-pointer"
                            style={{ fontWeight: 700 }}
                          >
                            ?
                          </button>
                          {activeTooltip === "ROE" && (
                            <div className="absolute left-0 top-6 bg-[#1A2B4A] text-white text-[11px] rounded-lg max-w-[220px] z-[100]" style={{ padding: "10px 12px", lineHeight: 1.6 }}>
                              자기자본이익률. 높을수록 기업이 돈을 잘 버는 것.
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="py-2 px-2 text-right text-[#1A1A1A]">9.8%</td>
                      <td className="py-2 px-2 text-right text-[#1A1A1A]">12.3%</td>
                      <td className="py-2 px-2 text-right text-[#1565C0]">주의</td>
                    </tr>
                    <tr className="border-b border-[#F5F5F5]">
                      <td className="py-2 px-2 text-[#1A1A1A]">
                        <div className="flex items-center gap-1 relative">
                          <span>부채비율</span>
                          <button
                            onClick={() => setActiveTooltip(activeTooltip === "부채비율" ? null : "부채비율")}
                            className="w-4 h-4 bg-[#E8F0FF] text-[#1A2B4A] rounded-full flex items-center justify-center text-[10px] cursor-pointer"
                            style={{ fontWeight: 700 }}
                          >
                            ?
                          </button>
                          {activeTooltip === "부채비율" && (
                            <div className="absolute left-0 top-6 bg-[#1A2B4A] text-white text-[11px] rounded-lg max-w-[220px] z-[100]" style={{ padding: "10px 12px", lineHeight: 1.6 }}>
                              총부채/자기자본. 낮을수록 재무 안정성이 높음.
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="py-2 px-2 text-right text-[#1A1A1A]">38.2%</td>
                      <td className="py-2 px-2 text-right text-[#1A1A1A]">55.0%</td>
                      <td className="py-2 px-2 text-right text-[#D32F2F]">양호</td>
                    </tr>
                    <tr>
                      <td className="py-2 px-2 text-[#1A1A1A]">
                        <div className="flex items-center gap-1 relative">
                          <span>배당수익률</span>
                          <button
                            onClick={() => setActiveTooltip(activeTooltip === "배당수익률" ? null : "배당수익률")}
                            className="w-4 h-4 bg-[#E8F0FF] text-[#1A2B4A] rounded-full flex items-center justify-center text-[10px] cursor-pointer"
                            style={{ fontWeight: 700 }}
                          >
                            ?
                          </button>
                          {activeTooltip === "배당수익률" && (
                            <div className="absolute left-0 top-6 bg-[#1A2B4A] text-white text-[11px] rounded-lg max-w-[220px] z-[100]" style={{ padding: "10px 12px", lineHeight: 1.6 }}>
                              주가 대비 배당금 비율. 높을수록 배당 매력 있음.
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="py-2 px-2 text-right text-[#1A1A1A]">2.8%</td>
                      <td className="py-2 px-2 text-right text-[#1A1A1A]">1.9%</td>
                      <td className="py-2 px-2 text-right text-[#D32F2F]">우수</td>
                    </tr>
                  </tbody>
                </table>
              </div>
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

            {/* Buy Button */}
            <button
              onClick={() => navigate("/trade")}
              className="w-full py-3 bg-[#FF6600] text-white rounded-lg text-[14px]"
            >
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
      {/* Top Bar */}
      <div className="bg-white px-4 py-3 border-b border-[#E0E0E0]">
        <div className="flex items-center justify-between mb-3">
          <button onClick={() => navigate(-1)}>
            <ArrowLeft className="w-6 h-6 text-[#1A2B4A]" />
          </button>
          <div className="text-[16px] text-[#1A1A1A]" style={{ fontWeight: 700 }}>
            삼성전자 <span className="text-[#888888]">005930</span>
          </div>
          <div className="w-6" />
        </div>
        <div className="flex items-baseline gap-2">
          <div className="text-[24px] text-[#1A1A1A]" style={{ fontWeight: 700 }}>₩219,500</div>
          <div className="text-[14px] text-[#1565C0]">▼ -2.23% -5,000</div>
        </div>
      </div>

      {/* Tab Bar */}
      <div className="bg-white px-4 flex gap-6 border-b border-[#E0E0E0] overflow-x-auto">
        {["종합", "여론", "AI분석", "재무"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`py-3 text-[14px] whitespace-nowrap ${
              activeTab === tab
                ? "text-[#1A1A1A] border-b-2 border-[#FF6600]"
                : "text-[#888888]"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Body */}
      <div className="flex-1 overflow-y-auto p-4">
        {renderTabContent()}
      </div>
    </div>
  );
}
