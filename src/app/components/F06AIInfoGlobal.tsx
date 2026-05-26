import { ArrowLeft, Search, Plus } from "lucide-react";
import { useNavigate } from "react-router";
import { useState } from "react";

export function F06AIInfoGlobal() {
  const navigate = useNavigate();
  const [activeStock, setActiveStock] = useState("NVDA");
  const [showComingSoonToast, setShowComingSoonToast] = useState(false);

  const showComingSoon = () => {
    setShowComingSoonToast(true);
    setTimeout(() => setShowComingSoonToast(false), 2000);
  };

  return (
    <div className="w-full h-full bg-[#F5F5F5] flex flex-col">
      {/* Top Bar */}
      <div className="bg-[#1A2B4A] px-4 py-3 flex items-center justify-between">
        <button onClick={() => navigate(-1)}>
          <ArrowLeft className="w-6 h-6 text-white/80" />
        </button>
        <div className="text-[15px] text-white" style={{ fontWeight: 700 }}>AI 정보</div>
        <div className="w-[72px] h-[26px] bg-transparent rounded-full p-[2px] flex border border-white/20">
          <button
            onClick={() => navigate("/ai-info")}
            className="flex-1 rounded-full flex items-center justify-center text-[11px] text-white/50"
          >
            국내
          </button>
          <button className="flex-1 bg-white rounded-full flex items-center justify-center text-[11px] text-[#1A2B4A]" style={{ fontWeight: 700 }}>
            해외
          </button>
        </div>
      </div>

      {/* Body */}
      <div className="flex-1 overflow-y-auto">
        {/* Search Bar */}
        <div className="p-4 bg-white mb-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#888888]" />
            <input
              type="text"
              placeholder="종목명 또는 티커 검색 (e.g. NVDA, AAPL)"
              onClick={showComingSoon}
              onFocus={showComingSoon}
              className="w-full pl-10 pr-4 py-3 bg-[#F5F5F5] rounded-lg text-[14px] outline-none focus:ring-2 focus:ring-[#FF6600] cursor-pointer"
            />
          </div>
        </div>

        {/* Quick Select Section */}
        <div className="p-4 bg-white mb-2">
          <div className="text-[14px] text-[#888888] mb-3">관심 종목 빠른 선택</div>
          <div className="flex gap-2 overflow-x-auto">
            {[
              { ticker: "NVDA", route: "/stock-global" },
              { ticker: "AAPL", route: "/stock-global-aapl" },
              { ticker: "TSLA", route: "/stock-global-tsla" },
            ].map((stock) => (
              <button
                key={stock.ticker}
                onClick={() => {
                  setActiveStock(stock.ticker);
                  navigate(stock.route);
                }}
                className={`px-4 py-2 rounded-full text-[14px] whitespace-nowrap ${
                  activeStock === stock.ticker
                    ? "bg-[#FF6600] text-white"
                    : "bg-[#f0f4ff] text-[#1A2B4A]"
                }`}
                style={{ fontWeight: activeStock === stock.ticker ? 700 : 400 }}
              >
                {stock.ticker}
              </button>
            ))}
            <button
              onClick={showComingSoon}
              className="px-4 py-2 border border-[#E0E0E0] rounded-full text-[14px] text-[#888888] whitespace-nowrap flex items-center gap-1"
            >
              <Plus className="w-4 h-4" />
              추가
            </button>
          </div>
        </div>

        {/* AI Issues Section */}
        <div className="p-4 bg-white">
          <div className="text-[16px] text-[#1A1A1A] mb-4" style={{ fontWeight: 700 }}>
            AI가 주목하는 오늘의 이슈
          </div>
          <div className="space-y-3">
            <button
              onClick={() => navigate("/stock-global-aapl")}
              className="w-full bg-white border border-[#E0E0E0] rounded-lg p-4 shadow-sm text-left"
            >
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-[#888888] rounded-full mt-2 flex-shrink-0" />
                <div className="flex-1">
                  <div className="text-[14px] text-[#1A1A1A] mb-1" style={{ fontWeight: 700 }}>
                    미 연준 기준금리 동결 유지 (5.25~5.50%)
                  </div>
                  <div className="text-[13px] text-[#888888]">
                    빅테크 실적 영향 분석
                  </div>
                </div>
              </div>
            </button>

            <button
              onClick={() => navigate("/stock-global")}
              className="w-full bg-white border border-[#E0E0E0] rounded-lg p-4 shadow-sm text-left"
            >
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-[#D32F2F] rounded-full mt-2 flex-shrink-0" />
                <div className="flex-1">
                  <div className="text-[14px] text-[#1A1A1A] mb-1" style={{ fontWeight: 700 }}>
                    빅테크 1분기 실적 시즌 어닝서프라이즈 연속
                  </div>
                  <div className="text-[13px] text-[#888888]">
                    NVIDIA·Apple 매출 가이던스 상향
                  </div>
                </div>
              </div>
            </button>

            <button
              onClick={() => navigate("/stock-global-tsla")}
              className="w-full bg-white border border-[#E0E0E0] rounded-lg p-4 shadow-sm text-left"
            >
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-[#1565C0] rounded-full mt-2 flex-shrink-0" />
                <div className="flex-1">
                  <div className="text-[14px] text-[#1A1A1A] mb-1" style={{ fontWeight: 700 }}>
                    미·이란 군사 긴장 지속, 국제유가 상승 압력
                  </div>
                  <div className="text-[13px] text-[#888888]">
                    에너지·방위산업 섹터 전망
                  </div>
                </div>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="bg-white border-t border-[#E0E0E0] grid grid-cols-6 py-2">
        <button onClick={() => navigate("/global")} className="flex flex-col items-center gap-1">
          <div className="w-6 h-6 bg-[#888888] rounded" />
          <div className="text-[10px] text-[#888888]">홈</div>
        </button>
        <button onClick={() => navigate("/balance-global")} className="flex flex-col items-center gap-1">
          <div className="w-6 h-6 bg-[#888888] rounded" />
          <div className="text-[10px] text-[#888888]">잔고</div>
        </button>
        <button onClick={() => navigate("/trade-global")} className="flex flex-col items-center gap-1">
          <div className="w-6 h-6 bg-[#888888] rounded" />
          <div className="text-[10px] text-[#888888]">투자</div>
        </button>
        <button className="flex flex-col items-center gap-1">
          <div className="w-6 h-6 bg-[#FF6600] rounded" />
          <div className="text-[10px] text-[#FF6600]">AI정보</div>
        </button>
        <button onClick={() => navigate("/banking")} className="flex flex-col items-center gap-1">
          <div className="w-6 h-6 bg-[#888888] rounded" />
          <div className="text-[10px] text-[#888888]">뱅킹</div>
        </button>
        <button onClick={() => navigate("/settings")} className="flex flex-col items-center gap-1">
          <div className="w-6 h-6 bg-[#888888] rounded" />
          <div className="text-[10px] text-[#888888]">설정</div>
        </button>
      </div>

      {/* Coming Soon Toast */}
      {showComingSoonToast && (
        <div className="fixed bottom-24 left-1/2 -translate-x-1/2 bg-black/75 text-white text-[12px] px-5 py-2 rounded-[20px] z-50">
          준비 중인 기능입니다
        </div>
      )}
    </div>
  );
}
