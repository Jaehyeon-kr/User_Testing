import { ArrowLeft } from "lucide-react";
import { useStock } from "../contexts/StockContext";
import { useNavigate } from "react-router";
import { useState } from "react";

export function F07StockGlobal() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("종합");
  const { setSelectedStock } = useStock();

  const handleBuyClick = () => {
    setSelectedStock({
      name: "NVIDIA",
      ticker: "NVDA",
      price: 208.26,
      change: 4.32,
      isOverseas: true,
      currency: "USD"
    });
    navigate("/trade-global");
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
                  긍정 74%
                </div>
                <div className="w-full bg-[#F5F5F5] rounded-full h-2">
                  <div className="bg-[#1565C0] h-2 rounded-full" style={{ width: "74%" }} />
                </div>
              </div>
            </div>

            <div className="bg-[#FFFBF0] p-4 rounded-lg mb-3">
              <div className="flex items-center gap-2 mb-2">
                <div className="text-[16px]">💡</div>
                <div className="text-[14px] text-[#1A1A1A]" style={{ fontWeight: 700 }}>AI 종합 요약</div>
              </div>
              <div className="text-[14px] text-[#1A1A1A] leading-relaxed">
                AI 인프라 수요 지속, TSM 펀드 규제 완화 수혜. 단기 과열 경계하나 중장기 매수 유효.
              </div>
            </div>

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
                  <div className="text-[14px] text-[#4CAF50]">▲ 긍정</div>
                </div>
                <div className="flex items-center justify-between py-2">
                  <div className="text-[14px] text-[#1A1A1A]">공시 분석</div>
                  <div className="text-[14px] text-[#888888]">▶ 중립</div>
                </div>
              </div>
            </div>

            <button
              onClick={handleBuyClick}
              className="w-full py-3 bg-[#FF6600] text-white rounded-lg text-[14px]"
            >
              거래하기 →
            </button>
          </>
        );

      case "여론":
        return (
          <>
            <div className="bg-white p-4 rounded-lg shadow-sm mb-3">
              <div className="text-[14px] text-[#888888] mb-3">여론 분석</div>
              <div className="w-full h-8 flex rounded-lg overflow-hidden mb-2">
                <div className="bg-[#1565C0] h-full" style={{ width: "74%" }} />
                <div className="bg-[#888888] h-full" style={{ width: "18%" }} />
                <div className="bg-[#F44336] h-full" style={{ width: "8%" }} />
              </div>
              <div className="flex justify-between text-[12px]">
                <div className="text-[#1565C0]">긍정 74%</div>
                <div className="text-[#888888]">중립 18%</div>
                <div className="text-[#F44336]">부정 8%</div>
              </div>
            </div>

            <div className="bg-white p-4 rounded-lg shadow-sm mb-3">
              <div className="flex items-center gap-2 mb-3">
                <div className="text-[16px]">📌</div>
                <div className="text-[14px] text-[#1A1A1A]" style={{ fontWeight: 700 }}>주요 키워드</div>
              </div>
              <div className="flex flex-wrap gap-2">
                {["#AI인프라", "#반도체", "#데이터센터", "#실적서프라이즈"].map((keyword) => (
                  <div key={keyword} className="px-3 py-1 bg-[#F5F5F5] text-[#1A1A1A] text-[12px] rounded-full">
                    {keyword}
                  </div>
                ))}
              </div>
            </div>

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
                      <div className="text-[14px] text-[#1A1A1A] mb-1">"인텔 실적 서프라이즈로 반도체 섹터 동반 상승"</div>
                      <div className="text-[12px] text-[#888888]">커뮤니티</div>
                    </div>
                  </div>
                </div>
                <div className="p-3 bg-[#F5F5F5] rounded-lg">
                  <div className="flex items-start gap-2">
                    <div className="text-[16px]">👍</div>
                    <div className="flex-1">
                      <div className="text-[14px] text-[#1A1A1A] mb-1">"AI 데이터센터 투자 사이클 2027년까지 지속"</div>
                      <div className="text-[12px] text-[#888888]">SNS</div>
                    </div>
                  </div>
                </div>
                <div className="p-3 bg-[#F5F5F5] rounded-lg">
                  <div className="flex items-start gap-2">
                    <div className="text-[16px]">👎</div>
                    <div className="flex-1">
                      <div className="text-[14px] text-[#1A1A1A] mb-1">"단기 52주 고점 부근, 차익실현 압력"</div>
                      <div className="text-[12px] text-[#888888]">커뮤니티</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <button
              onClick={handleBuyClick}
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
                  "인텔 데이터센터 22% 성장으로 반도체 업황 확인",
                  "AI 인프라 수요 2026년 지속 성장 전망",
                  "시가총액 5조 달러 돌파, 글로벌 1위 유지",
                  "Blackwell 아키텍처 차세대 GPU 수요 견조",
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
                  "미·중 반도체 수출 규제 재개 가능성",
                  "52주 신고가 부근 차익실현 물량",
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <div className="mt-1.5 w-1.5 h-1.5 bg-[#F44336] rounded-full flex-shrink-0" />
                    <div className="text-[14px] text-[#1A1A1A]">{item}</div>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={handleBuyClick}
              className="w-full py-3 bg-[#FF6600] text-white rounded-lg text-[14px]"
            >
              거래하기 →
            </button>
          </>
        );

      case "재무":
        return (
          <>
            <div className="bg-white p-4 rounded-lg shadow-sm mb-3">
              <div className="text-[16px] text-[#1A1A1A] mb-3" style={{ fontWeight: 700 }}>연간 실적 (USD)</div>
              <div className="overflow-x-auto">
                <table className="w-full text-[12px]">
                  <thead>
                    <tr className="bg-[#f8f8f8]">
                      <th className="py-2 px-2 text-left text-[#888888]">항목</th>
                      <th className="py-2 px-2 text-right text-[#888888]">FY2023</th>
                      <th className="py-2 px-2 text-right text-[#888888]">FY2024</th>
                      <th className="py-2 px-2 text-right text-[#888888]">FY2025</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-[#F5F5F5]">
                      <td className="py-2 px-2 text-[#1A1A1A]">매출(B)</td>
                      <td className="py-2 px-2 text-right text-[#1A1A1A]">26.97</td>
                      <td className="py-2 px-2 text-right text-[#1A1A1A]">60.92</td>
                      <td className="py-2 px-2 text-right text-[#1A1A1A]">130.50</td>
                    </tr>
                    <tr className="border-b border-[#F5F5F5]">
                      <td className="py-2 px-2 text-[#1A1A1A]">영업이익(B)</td>
                      <td className="py-2 px-2 text-right text-[#1A1A1A]">4.22</td>
                      <td className="py-2 px-2 text-right text-[#1A1A1A]">32.97</td>
                      <td className="py-2 px-2 text-right text-[#1A1A1A]">81.38</td>
                    </tr>
                    <tr className="border-b border-[#F5F5F5]">
                      <td className="py-2 px-2 text-[#1A1A1A]">순이익(B)</td>
                      <td className="py-2 px-2 text-right text-[#1A1A1A]">4.37</td>
                      <td className="py-2 px-2 text-right text-[#1A1A1A]">29.76</td>
                      <td className="py-2 px-2 text-right text-[#1A1A1A]">72.88</td>
                    </tr>
                    <tr>
                      <td className="py-2 px-2 text-[#1A1A1A]">영업이익률</td>
                      <td className="py-2 px-2 text-right text-[#1A1A1A]">15.7%</td>
                      <td className="py-2 px-2 text-right text-[#1A1A1A]">54.1%</td>
                      <td className="py-2 px-2 text-right text-[#1A1A1A]">62.4%</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="bg-white p-4 rounded-lg shadow-sm mb-3">
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
                      <td className="py-2 px-2 text-[#1A1A1A]">PER</td>
                      <td className="py-2 px-2 text-right text-[#1A1A1A]">46.2x</td>
                      <td className="py-2 px-2 text-right text-[#1A1A1A]">38.5x</td>
                      <td className="py-2 px-2 text-right text-[#1565C0]">고평가</td>
                    </tr>
                    <tr className="border-b border-[#F5F5F5]">
                      <td className="py-2 px-2 text-[#1A1A1A]">PBR</td>
                      <td className="py-2 px-2 text-right text-[#1A1A1A]">35.8x</td>
                      <td className="py-2 px-2 text-right text-[#1A1A1A]">18.2x</td>
                      <td className="py-2 px-2 text-right text-[#1565C0]">고평가</td>
                    </tr>
                    <tr className="border-b border-[#F5F5F5]">
                      <td className="py-2 px-2 text-[#1A1A1A]">ROE</td>
                      <td className="py-2 px-2 text-right text-[#1A1A1A]">91.4%</td>
                      <td className="py-2 px-2 text-right text-[#1A1A1A]">42.3%</td>
                      <td className="py-2 px-2 text-right text-[#D32F2F]">우수</td>
                    </tr>
                    <tr className="border-b border-[#F5F5F5]">
                      <td className="py-2 px-2 text-[#1A1A1A]">부채비율</td>
                      <td className="py-2 px-2 text-right text-[#1A1A1A]">12.1%</td>
                      <td className="py-2 px-2 text-right text-[#1A1A1A]">28.5%</td>
                      <td className="py-2 px-2 text-right text-[#D32F2F]">양호</td>
                    </tr>
                    <tr>
                      <td className="py-2 px-2 text-[#1A1A1A]">배당수익률</td>
                      <td className="py-2 px-2 text-right text-[#1A1A1A]">0.02%</td>
                      <td className="py-2 px-2 text-right text-[#1A1A1A]">0.8%</td>
                      <td className="py-2 px-2 text-right text-[#1565C0]">낮음</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <button
              onClick={handleBuyClick}
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
            NVIDIA <span className="text-[#888888]">NVDA · NASDAQ</span>
          </div>
          <div className="w-6" />
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <div className="text-[24px] text-[#1A1A1A]" style={{ fontWeight: 700 }}>$208.26</div>
            <div className="text-[14px] text-[#D32F2F]">▲ +8.63 (+4.32%)</div>
          </div>
          <div className="text-[11px] text-[#888888]">2026.04.24</div>
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
