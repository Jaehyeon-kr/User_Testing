import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router";
import { useState } from "react";

export function F09StockAIAnalysis() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("AI분석");

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
        {/* Header */}
        <div className="mb-4">
          <div className="flex items-center gap-2 mb-1">
            <div className="text-[18px]">🤖</div>
            <div className="text-[16px] text-[#1A1A1A]" style={{ fontWeight: 700 }}>
              AI 분석 리포트
            </div>
          </div>
          <div className="text-[12px] text-[#888888]">업데이트: 오늘 오전 9:00</div>
        </div>

        {/* Analysis Card */}
        <div className="bg-[#F0F4FF] p-4 rounded-lg shadow-sm mb-3">
          <div className="flex items-center gap-2 mb-3">
            <div className="text-[16px]">🔍</div>
            <div className="text-[14px] text-[#1A1A1A]" style={{ fontWeight: 700 }}>근거 분석</div>
          </div>
          <div className="space-y-2">
            <div className="flex items-start gap-2">
              <div className="mt-1.5 w-1.5 h-1.5 bg-[#1A2B4A] rounded-full flex-shrink-0" />
              <div className="text-[14px] text-[#1A1A1A]">
                최근 3분기 연속 영업이익 상승
              </div>
            </div>
            <div className="flex items-start gap-2">
              <div className="mt-1.5 w-1.5 h-1.5 bg-[#1A2B4A] rounded-full flex-shrink-0" />
              <div className="text-[14px] text-[#1A1A1A]">
                외국인 순매수 5일 연속
              </div>
            </div>
            <div className="flex items-start gap-2">
              <div className="mt-1.5 w-1.5 h-1.5 bg-[#1A2B4A] rounded-full flex-shrink-0" />
              <div className="text-[14px] text-[#1A1A1A]">
                동종업계 대비 PER 저평가
              </div>
            </div>
            <div className="flex items-start gap-2">
              <div className="mt-1.5 w-1.5 h-1.5 bg-[#1A2B4A] rounded-full flex-shrink-0" />
              <div className="text-[14px] text-[#1A1A1A]">
                글로벌 반도체 수요 회복세
              </div>
            </div>
          </div>
        </div>

        {/* Risk Card */}
        <div className="bg-[#FFF0F0] p-4 rounded-lg shadow-sm">
          <div className="flex items-center gap-2 mb-3">
            <div className="text-[16px]">⚠️</div>
            <div className="text-[14px] text-[#1A1A1A]" style={{ fontWeight: 700 }}>리스크 요인</div>
          </div>
          <div className="space-y-2">
            <div className="flex items-start gap-2">
              <div className="mt-1.5 w-1.5 h-1.5 bg-[#F44336] rounded-full flex-shrink-0" />
              <div className="text-[14px] text-[#1A1A1A]">
                미·중 무역 분쟁 변수
              </div>
            </div>
            <div className="flex items-start gap-2">
              <div className="mt-1.5 w-1.5 h-1.5 bg-[#F44336] rounded-full flex-shrink-0" />
              <div className="text-[14px] text-[#1A1A1A]">
                원/달러 환율 상승 압력
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
