import { ArrowLeft, Star } from "lucide-react";
import { useNavigate } from "react-router";
import { useState } from "react";

export function F07StockDetail() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("종합");

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
          <div className="text-[24px] text-[#1A1A1A]" style={{ fontWeight: 700 }}>₩75,400</div>
          <div className="text-[14px] text-[#D32F2F]">▲ +1.2% +900</div>
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
              <div className="flex items-center gap-2">
                <div className="text-[14px] text-[#4CAF50]">▲ 긍정</div>
              </div>
            </div>
            <div className="flex items-center justify-between py-2 border-b border-[#F5F5F5]">
              <div className="text-[14px] text-[#1A1A1A]">수급 분석</div>
              <div className="flex items-center gap-2">
                <div className="text-[14px] text-[#4CAF50]">▲ 긍정</div>
              </div>
            </div>
            <div className="flex items-center justify-between py-2 border-b border-[#F5F5F5]">
              <div className="text-[14px] text-[#1A1A1A]">뉴스 감성</div>
              <div className="flex items-center gap-2">
                <div className="text-[14px] text-[#888888]">▶ 중립</div>
              </div>
            </div>
            <div className="flex items-center justify-between py-2">
              <div className="text-[14px] text-[#1A1A1A]">공시 분석</div>
              <div className="flex items-center gap-2">
                <div className="text-[14px] text-[#F44336]">▼ 주의</div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-3">
          <button className="py-3 border border-[#E0E0E0] rounded-lg text-[14px] text-[#1A1A1A] flex items-center justify-center gap-2">
            <Star className="w-4 h-4" />
            관심 저장
          </button>
          <button className="py-3 bg-[#FF6600] text-white rounded-lg text-[14px] flex items-center justify-center gap-2">
            거래하기 →
          </button>
        </div>
      </div>
    </div>
  );
}
