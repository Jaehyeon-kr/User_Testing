import { Search } from "lucide-react";
import { useNavigate } from "react-router";
import { useState, useEffect } from "react";

interface F05SimpleHomeWithExtraMenusProps {
  onSimpleToggle: () => void;
}

export function F05SimpleHomeWithExtraMenus({ onSimpleToggle }: F05SimpleHomeWithExtraMenusProps) {
  const navigate = useNavigate();
  const [enabledMenus, setEnabledMenus] = useState<string[]>([]);
  const [showComingSoonToast, setShowComingSoonToast] = useState(false);
  const [showSaveToast, setShowSaveToast] = useState(true);

  const showComingSoon = () => {
    setShowComingSoonToast(true);
    setTimeout(() => setShowComingSoonToast(false), 2000);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSaveToast(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Load menu settings from localStorage
    const saved = localStorage.getItem('menuSettings');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        const active = parsed.activeMenus || [];
        setEnabledMenus(active.map((m: any) => m.name));
      } catch (e) {
        console.error('Failed to load menu settings:', e);
      }
    }
  }, []);

  const isMenuEnabled = (menuName: string) => enabledMenus.includes(menuName);

  return (
    <div className="w-full h-full bg-[#F5F5F5] flex flex-col">
      {/* Top Bar */}
      <div className="bg-white px-4 py-3 flex items-center justify-between border-b border-[#E0E0E0]">
        <div className="text-[16px] text-[#1A2B4A]" style={{ fontWeight: 700 }}>T-STOCK</div>
        <div className="flex items-center gap-3">
          <Search className="w-5 h-5 text-[#1A2B4A] cursor-pointer" onClick={showComingSoon} />
          <div className="w-[72px] h-[26px] bg-[#E0E0E0] rounded-full p-[2px] flex">
            <button className="flex-1 bg-white rounded-full flex items-center justify-center text-[11px] text-[#1A2B4A]" style={{ fontWeight: 700 }}>
              국내
            </button>
            <button
              onClick={() => navigate("/global-simple")}
              className="flex-1 rounded-full flex items-center justify-center text-[11px] text-[#888888]"
            >
              해외
            </button>
          </div>
          <div className="w-[80px] h-[26px] bg-[#E0E0E0] rounded-full p-[2px] flex">
            <button
              onClick={onSimpleToggle}
              className="flex-1 rounded-full flex items-center justify-center text-[11px] text-[#888888]"
            >
              일반
            </button>
            <button className="flex-1 bg-white rounded-full flex items-center justify-center text-[11px] text-[#1A2B4A]" style={{ fontWeight: 700 }}>
              심플
            </button>
          </div>
        </div>
      </div>

      {/* Tab Bar */}
      <div className="bg-white px-4 flex gap-6 border-b border-[#E0E0E0]">
        <button className="py-3 text-[14px] text-[#1A1A1A] border-b-2 border-[#FF6600]">
          오늘주식
        </button>
        <button onClick={showComingSoon} className="py-3 text-[14px] text-[#888888]">인사이트</button>
        <button onClick={showComingSoon} className="py-3 text-[14px] text-[#888888]">자산</button>
        <button onClick={showComingSoon} className="py-3 text-[14px] text-[#888888]">MY</button>
      </div>

      {/* Body - Scrollable */}
      <div className="flex-1 overflow-y-auto">
        {/* Section 1: 주요지수 */}
        <div className="p-4 bg-white mb-3">
          <div className="flex items-center justify-between mb-4">
            <div className="text-[16px] text-[#1A1A1A]" style={{ fontWeight: 700 }}>주요지수</div>
            <div className="text-[10px] text-[#888888]">2026.04.24 기준</div>
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between py-2">
              <div className="text-[14px] text-[#888888]">KOSPI</div>
              <div className="text-right">
                <div className="text-[16px] text-[#1A1A1A]" style={{ fontWeight: 700 }}>6,475.63</div>
                <div className="text-[12px] text-[#1565C0]">▼ -0.08%</div>
              </div>
            </div>
            <div className="flex items-center justify-between py-2">
              <div className="text-[14px] text-[#888888]">KOSDAQ</div>
              <div className="text-right">
                <div className="text-[16px] text-[#1A1A1A]" style={{ fontWeight: 700 }}>1,203.84</div>
                <div className="text-[12px] text-[#D32F2F]">▲ +2.51%</div>
              </div>
            </div>
          </div>
        </div>

        {/* Section 2: 최근 본 종목 */}
        {isMenuEnabled("최근 본 종목") && (
          <div className="p-4 bg-white mb-3">
            <div className="text-[16px] text-[#1A1A1A] mb-4" style={{ fontWeight: 700 }}>최근 본 종목</div>
            <div className="flex gap-3 overflow-x-auto">
              {[
                { name: "삼성전자", route: "/stock-detail" },
                { name: "SK하이닉스", route: "/stock-skhynix" },
              ].map((stock) => (
                <button
                  key={stock.name}
                  onClick={() => navigate(stock.route)}
                  className="px-4 py-2 bg-[#F5F5F5] rounded-full text-[14px] text-[#1A1A1A] whitespace-nowrap"
                >
                  {stock.name}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Section 3: 오늘의 테마 */}
        {isMenuEnabled("오늘의 테마") && (
          <div className="p-4 bg-white mb-3">
            <div className="text-[16px] text-[#1A1A1A] mb-4" style={{ fontWeight: 700 }}>오늘의 테마</div>
            <div className="bg-white border border-[#E0E0E0] p-4 rounded-lg">
              <div className="flex items-center justify-between">
                <div className="text-[16px] text-[#1A1A1A]" style={{ fontWeight: 700 }}>반도체 소부장</div>
                <div className="text-[16px] text-[#D32F2F]" style={{ fontWeight: 700 }}>▲ +5.8%</div>
              </div>
            </div>
          </div>
        )}

        {/* Section 4: 거래량 상위 */}
        {isMenuEnabled("거래량 상위") && (
          <div className="p-4 bg-white mb-3">
            <div className="text-[16px] text-[#1A1A1A] mb-4" style={{ fontWeight: 700 }}>거래량 상위</div>
            <div className="flex items-center justify-between py-2">
              <div className="text-[16px] text-[#1A1A1A]">삼성전자</div>
              <div className="text-[14px] text-[#888888]">3,241만주</div>
            </div>
          </div>
        )}

        {/* Section 5: 환율 현황 - NEW */}
        {isMenuEnabled("환율 현황") && (
          <div className="p-4 bg-white mb-3">
            <div className="text-[16px] text-[#1A1A1A] mb-4" style={{ fontWeight: 700 }}>환율 현황</div>
            <div className="space-y-3">
              {[
                { name: "원/달러", rate: "₩1,483", change: "+2원", percent: "+0.14%", positive: true },
                { name: "원/엔", rate: "₩1,019", change: "-3원", percent: "-0.29%", positive: false },
                { name: "원/유로", rate: "₩1,641", change: "+5원", percent: "+0.31%", positive: true },
              ].map((currency, i) => (
                <div key={i} className="flex items-center justify-between py-2 border-b border-[#F5F5F5] last:border-0">
                  <div className="text-[14px] text-[#888888]">{currency.name}</div>
                  <div className="text-right">
                    <div className="text-[16px] text-[#1A1A1A] mb-1" style={{ fontWeight: 700 }}>{currency.rate}</div>
                    <div className={`text-[12px] ${currency.positive ? 'text-[#D32F2F]' : 'text-[#1565C0]'}`}>
                      {currency.positive ? '▲' : '▼'} {currency.change} ({currency.percent})
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Section 6: 글로벌 증시 - NEW */}
        {isMenuEnabled("글로벌 증시") && (
          <div className="p-4 bg-white mb-3">
            <div className="text-[16px] text-[#1A1A1A] mb-4" style={{ fontWeight: 700 }}>글로벌 증시</div>
            <div className="space-y-3">
              {[
                { name: "NASDAQ", value: "19,146.81", change: "-0.89%" },
                { name: "S&P500", value: "5,348.82", change: "-0.41%" },
                { name: "DOW", value: "39,818.22", change: "-0.36%" },
              ].map((index, i) => (
                <div key={i} className="flex items-center justify-between py-2 border-b border-[#F5F5F5] last:border-0">
                  <div className="text-[14px] text-[#888888]">{index.name}</div>
                  <div className="text-right">
                    <div className="text-[16px] text-[#1A1A1A] mb-1" style={{ fontWeight: 700 }}>{index.value}</div>
                    <div className="text-[12px] text-[#1565C0]">▼ {index.change}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Bottom Navigation */}
      <div className="bg-white border-t border-[#E0E0E0] grid grid-cols-6 py-2">
        <button className="flex flex-col items-center gap-1">
          <div className="w-6 h-6 bg-[#FF6600] rounded" />
          <div className="text-[10px] text-[#FF6600]">홈</div>
        </button>
        <button onClick={() => navigate("/balance")} className="flex flex-col items-center gap-1">
          <div className="w-6 h-6 bg-[#888888] rounded" />
          <div className="text-[10px] text-[#888888]">잔고</div>
        </button>
        <button onClick={() => navigate("/trade")} className="flex flex-col items-center gap-1">
          <div className="w-6 h-6 bg-[#888888] rounded" />
          <div className="text-[10px] text-[#888888]">투자</div>
        </button>
        <button onClick={() => navigate("/ai-info")} className="flex flex-col items-center gap-1">
          <div className="w-6 h-6 bg-[#888888] rounded" />
          <div className="text-[10px] text-[#888888]">AI정보</div>
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

      {/* Save Success Toast */}
      {showSaveToast && (
        <div
          className="fixed left-1/2 -translate-x-1/2 text-white text-[13px] z-50"
          style={{
            bottom: "80px",
            backgroundColor: "#2E7D32",
            borderRadius: "24px",
            padding: "12px 24px",
            fontWeight: 600
          }}
        >
          ✓ 메뉴가 저장되었습니다
        </div>
      )}

      {/* Coming Soon Toast */}
      {showComingSoonToast && (
        <div className="fixed bottom-24 left-1/2 -translate-x-1/2 bg-black/75 text-white text-[12px] px-5 py-2 rounded-[20px] z-50">
          준비 중인 기능입니다
        </div>
      )}
    </div>
  );
}
