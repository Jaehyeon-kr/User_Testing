import { ArrowLeft, Search, Plus } from "lucide-react";
import { useNavigate } from "react-router";

export function F06AIInfo() {
  const navigate = useNavigate();

  return (
    <div className="w-full h-full bg-[#F5F5F5] flex flex-col">
      {/* Top Bar */}
      <div className="bg-[#1A2B4A] px-4 py-3 flex items-center justify-between">
        <button onClick={() => navigate(-1)}>
          <ArrowLeft className="w-6 h-6 text-white/80" />
        </button>
        <div className="text-[15px] text-white" style={{ fontWeight: 700 }}>AI 정보</div>
        <div className="w-[72px] h-[26px] bg-transparent rounded-full p-[2px] flex border border-white/20">
          <button className="flex-1 bg-white rounded-full flex items-center justify-center text-[11px] text-[#1A2B4A]" style={{ fontWeight: 700 }}>
            국내
          </button>
          <button
            onClick={() => navigate("/ai-info-global")}
            className="flex-1 rounded-full flex items-center justify-center text-[11px] text-white/50"
          >
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
              placeholder="종목명 또는 코드 검색"
              className="w-full pl-10 pr-4 py-3 bg-[#F5F5F5] rounded-lg text-[14px] outline-none focus:ring-2 focus:ring-[#FF6600] cursor-pointer"
            />
          </div>
        </div>

        {/* Quick Select Section */}
        <div className="p-4 bg-white mb-2">
          <div className="text-[14px] text-[#888888] mb-3">관심 종목 빠른 선택</div>
          <div className="flex gap-2 overflow-x-auto">
            {[
              { name: "삼성전자", route: "/stock-detail" },
              { name: "SK하이닉스", route: "/stock-skhynix" },
              { name: "NAVER", route: "/stock-naver" },
            ].map((stock) => (
              <button
                key={stock.name}
                onClick={() => navigate(stock.route)}
                className="px-4 py-2 bg-[#F5F5F5] rounded-full text-[14px] text-[#1A1A1A] whitespace-nowrap"
              >
                {stock.name}
              </button>
            ))}
            <button
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
              onClick={() => navigate("/stock-skhynix")}
              className="w-full bg-white border border-[#E0E0E0] rounded-lg p-4 shadow-sm text-left"
            >
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-[#D32F2F] rounded-full mt-2 flex-shrink-0" />
                <div className="flex-1">
                  <div className="text-[14px] text-[#1A1A1A] mb-1" style={{ fontWeight: 700 }}>
                    SK하이닉스 1분기 영업이익 37.6조 어닝서프라이즈
                  </div>
                  <div className="text-[13px] text-[#888888]">
                    HBM 수요 급증, 역대 최대 실적 경신
                  </div>
                </div>
              </div>
            </button>

            <button
              onClick={() => navigate("/stock-detail")}
              className="w-full bg-white border border-[#E0E0E0] rounded-lg p-4 shadow-sm text-left"
            >
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-[#1565C0] rounded-full mt-2 flex-shrink-0" />
                <div className="flex-1">
                  <div className="text-[14px] text-[#1A1A1A] mb-1" style={{ fontWeight: 700 }}>
                    미·이란 종전협상 교착, 유가 배럴당 100달러 근접
                  </div>
                  <div className="text-[13px] text-[#888888]">
                    에너지·화학 관련주 영향 분석
                  </div>
                </div>
              </div>
            </button>

            <button
              onClick={() => navigate("/stock-naver")}
              className="w-full bg-white border border-[#E0E0E0] rounded-lg p-4 shadow-sm text-left"
            >
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-[#888888] rounded-full mt-2 flex-shrink-0" />
                <div className="flex-1">
                  <div className="text-[14px] text-[#1A1A1A] mb-1" style={{ fontWeight: 700 }}>
                    한국은행 기준금리 동결 결정 (연 2.50%)
                  </div>
                  <div className="text-[13px] text-[#888888]">
                    금융·부동산 섹터 전망
                  </div>
                </div>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="bg-white border-t border-[#E5E5E5] grid grid-cols-6 py-2" style={{ height: '56px' }}>
        <button onClick={() => navigate("/")} className="flex flex-col items-center gap-1">
          <div className="w-6 h-6 bg-[#888888] rounded" />
          <div className="text-[10px] text-[#999999]">홈</div>
        </button>
        <button onClick={() => navigate("/balance")} className="flex flex-col items-center gap-1">
          <div className="w-6 h-6 bg-[#888888] rounded" />
          <div className="text-[10px] text-[#999999]">잔고</div>
        </button>
        <button onClick={() => navigate("/trade")} className="flex flex-col items-center gap-1">
          <div className="w-6 h-6 bg-[#888888] rounded" />
          <div className="text-[10px] text-[#999999]">투자</div>
        </button>
        <button className="flex flex-col items-center gap-1 relative">
          <div className="w-6 h-6 bg-[#FF6600] rounded" />
          <div className="text-[10px] text-[#FF6600]" style={{ fontWeight: 700 }}>AI정보</div>
          <div className="absolute top-0 right-4 w-2 h-2 bg-[#FF6600] rounded-full" />
        </button>
        <button onClick={() => navigate("/banking")} className="flex flex-col items-center gap-1">
          <div className="w-6 h-6 bg-[#888888] rounded" />
          <div className="text-[10px] text-[#999999]">뱅킹</div>
        </button>
        <button onClick={() => navigate("/settings")} className="flex flex-col items-center gap-1">
          <div className="w-6 h-6 bg-[#888888] rounded" />
          <div className="text-[10px] text-[#999999]">설정</div>
        </button>
      </div>

    </div>
  );
}
