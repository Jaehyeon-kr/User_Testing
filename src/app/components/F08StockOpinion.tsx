import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router";
import { useState } from "react";

export function F08StockOpinion() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("여론");

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
        </div>

        {/* Keywords */}
        <div className="bg-white p-4 rounded-lg shadow-sm mb-3">
          <div className="flex items-center gap-2 mb-3">
            <div className="text-[16px]">📌</div>
            <div className="text-[14px] text-[#1A1A1A]" style={{ fontWeight: 700 }}>주요 키워드</div>
          </div>
          <div className="flex flex-wrap gap-2">
            {["#실적호전", "#반도체", "#배당", "#외국인매수"].map((keyword) => (
              <div
                key={keyword}
                className="px-3 py-1 bg-[#F5F5F5] text-[#1A1A1A] text-[12px] rounded-full"
              >
                {keyword}
              </div>
            ))}
          </div>
        </div>

        {/* Trend Chart */}
        <div className="bg-white p-4 rounded-lg shadow-sm mb-3">
          <div className="flex items-center gap-2 mb-4">
            <div className="text-[16px]">💬</div>
            <div className="text-[14px] text-[#1A1A1A]" style={{ fontWeight: 700 }}>실시간 언급 추이</div>
          </div>
          <div className="h-32 flex items-end gap-2">
            {[30, 45, 60, 80, 70, 85, 75, 90].map((height, i) => (
              <div key={i} className="flex-1 flex flex-col items-center">
                <div
                  className="w-full bg-[#FF6600] rounded-t"
                  style={{ height: `${height}%` }}
                />
                <div className="text-[10px] text-[#888888] mt-2">
                  {i * 3}h
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Representative Opinions */}
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <div className="text-[16px]">🗣️</div>
            <div className="text-[14px] text-[#1A1A1A]" style={{ fontWeight: 700 }}>대표 의견</div>
          </div>
          <div className="space-y-3">
            <div className="p-3 bg-[#F5F5F5] rounded-lg">
              <div className="flex items-start gap-2 mb-1">
                <div className="text-[16px]">👍</div>
                <div className="flex-1">
                  <div className="text-[14px] text-[#1A1A1A] mb-1">
                    "실적 발표 이후 반등 기대"
                  </div>
                  <div className="text-[12px] text-[#888888]">커뮤니티</div>
                </div>
              </div>
            </div>

            <div className="p-3 bg-[#F5F5F5] rounded-lg">
              <div className="flex items-start gap-2 mb-1">
                <div className="text-[16px]">👍</div>
                <div className="flex-1">
                  <div className="text-[14px] text-[#1A1A1A] mb-1">
                    "외국인 순매수 지속 중"
                  </div>
                  <div className="text-[12px] text-[#888888]">SNS</div>
                </div>
              </div>
            </div>

            <div className="p-3 bg-[#F5F5F5] rounded-lg">
              <div className="flex items-start gap-2 mb-1">
                <div className="text-[16px]">👎</div>
                <div className="flex-1">
                  <div className="text-[14px] text-[#1A1A1A] mb-1">
                    "단기 과열 구간 주의"
                  </div>
                  <div className="text-[12px] text-[#888888]">커뮤니티</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
