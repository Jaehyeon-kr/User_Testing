import { Search } from "lucide-react";
import { useNavigate } from "react-router";
import { useState, useEffect } from "react";

interface F03SimpleHomeProps {
  onSimpleToggle: () => void;
}

export function F03SimpleHome({ onSimpleToggle }: F03SimpleHomeProps) {
  const navigate = useNavigate();
  const [enabledMenus, setEnabledMenus] = useState<string[]>([
    "최근 본 종목",
    "실시간 급등",
    "오늘의 테마",
    "거래량 상위"
  ]);

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
          <Search className="w-5 h-5 text-[#1A2B4A]" />
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
          <button onClick={onSimpleToggle} className="text-[11px] text-[#888888] underline">일반 모드</button>
        </div>
      </div>

      {/* Banner */}
      <div className="bg-[#E3F2FD] px-4 py-2 text-[12px] text-[#1565C0]">
        심플 모드 활성화됨 — 설정에서 메뉴를 편집할 수 있어요
      </div>

      {/* Tab Bar */}
      <div className="bg-white px-4 flex gap-6 border-b border-[#E0E0E0]">
        <button className="py-3 text-[14px] text-[#1A1A1A] border-b-2 border-[#FF6600]">
          오늘주식
        </button>
        <button className="py-3 text-[14px] text-[#888888]">인사이트</button>
        <button className="py-3 text-[14px] text-[#888888]">자산</button>
        <button className="py-3 text-[14px] text-[#888888]">MY</button>
      </div>

      {/* Body - Scrollable */}
      <div className="flex-1 overflow-y-auto">
        {/* Section 1: 주요지수 - simplified */}
        <div className="p-4 bg-white mb-3">
          <div className="flex items-center justify-between mb-4">
            <div className="text-[16px] text-[#1A1A1A]" style={{ fontWeight: 700 }}>주요지수</div>
            <div className="text-[11px] text-[#888888]">2026.04.24 기준</div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-white border border-[#E0E0E0] p-4">
              <div className="text-[14px] text-[#888888] mb-2">KOSPI</div>
              <div className="text-[18px] text-[#1A1A1A] mb-1" style={{ fontWeight: 700 }}>6,475.63</div>
              <div className="text-[14px] text-[#1565C0]">▼ -0.08%</div>
            </div>
            <div className="bg-white border border-[#E0E0E0] p-4">
              <div className="text-[14px] text-[#888888] mb-2">KOSDAQ</div>
              <div className="text-[18px] text-[#1A1A1A] mb-1" style={{ fontWeight: 700 }}>1,203.84</div>
              <div className="text-[14px] text-[#D32F2F]">▲ +2.51%</div>
            </div>
          </div>
        </div>

        {/* Section 2: 최근 본 종목 */}
        {isMenuEnabled("최근 본 종목") && (
          <div className="p-4 bg-white mb-3">
            <div className="text-[16px] text-[#1A1A1A] mb-4" style={{ fontWeight: 700 }}>최근 본 종목</div>
            <div className="flex gap-3 overflow-x-auto">
              {[
                { name: "삼성전자", price: "219,500", change: "-2.23%" },
                { name: "SK하이닉스", price: "1,225,000", change: "+3.51%" },
              ].map((stock, i) => (
                <div key={i} className="bg-white border border-[#E0E0E0] p-4 min-w-[140px]">
                  <div className="text-[16px] text-[#1A1A1A] mb-2" style={{ fontWeight: 700 }}>{stock.name}</div>
                  <div className="text-[14px] text-[#888888] mb-1">{stock.price}</div>
                  <div className={`text-[14px] ${stock.change.startsWith('+') ? 'text-[#D32F2F]' : 'text-[#1565C0]'}`}>
                    {stock.change}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Section 3: 실시간 급등 - top 3 only */}
        {isMenuEnabled("실시간 급등") && (
          <div className="p-4 bg-white mb-3">
            <div className="text-[16px] text-[#1A1A1A] mb-4" style={{ fontWeight: 700 }}>실시간 급등</div>
            <div className="space-y-3">
              {[
                { rank: 1, name: "셀트리온", rate: "+8.5%" },
                { rank: 2, name: "LG에너지솔루션", rate: "+7.2%" },
                { rank: 3, name: "현대차", rate: "+6.8%" },
              ].map((item) => (
                <div key={item.rank} className="flex items-center gap-3 py-2">
                  <div className="w-8 h-8 bg-[#FF6600] text-white rounded-full flex items-center justify-center text-[14px]" style={{ fontWeight: 700 }}>
                    {item.rank}
                  </div>
                  <div className="flex-1 text-[16px] text-[#1A1A1A]">{item.name}</div>
                  <div className="px-3 py-1 bg-[#FFE5E5] text-[#D32F2F] text-[14px] rounded">
                    {item.rate}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Section 4: 오늘의 테마 */}
        {isMenuEnabled("오늘의 테마") && (
          <div className="p-4 bg-white mb-3">
            <div className="text-[16px] text-[#1A1A1A] mb-4" style={{ fontWeight: 700 }}>오늘의 테마</div>
            <div className="grid grid-cols-2 gap-3">
              {["2차전지", "AI 반도체"].map((theme, i) => (
                <div key={i} className="bg-white border border-[#E0E0E0] p-5 text-center">
                  <div className="text-[16px] text-[#1A1A1A]" style={{ fontWeight: 700 }}>{theme}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Section 5: 거래량 상위 */}
        {isMenuEnabled("거래량 상위") && (
          <div className="p-4 bg-white mb-3">
            <div className="text-[16px] text-[#1A1A1A] mb-4" style={{ fontWeight: 700 }}>거래량 상위</div>
            <div className="space-y-3">
              {[
                { name: "삼성전자", rate: "+1.2%" },
                { name: "SK하이닉스", rate: "+2.5%" },
              ].map((stock, i) => (
                <div key={i} className="flex items-center justify-between py-2 border-b border-[#F5F5F5]">
                  <div className="text-[16px] text-[#1A1A1A]">{stock.name}</div>
                  <div className={`text-[14px] ${stock.rate.startsWith('+') ? 'text-[#D32F2F]' : 'text-[#1565C0]'}`}>
                    {stock.rate}
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
        <button
          onClick={() => navigate("/ai-info")}
          className="flex flex-col items-center gap-1 relative"
        >
          <div className="w-6 h-6 bg-[#888888] rounded" />
          <div className="text-[10px] text-[#888888]">AI정보</div>
          <div className="absolute top-0 right-4 w-2 h-2 bg-[#FF6600] rounded-full" />
        </button>
        <button onClick={() => navigate("/banking")} className="flex flex-col items-center gap-1">
          <div className="w-6 h-6 bg-[#888888] rounded" />
          <div className="text-[10px] text-[#888888]">뱅킹</div>
        </button>
        <button
          onClick={() => navigate("/settings")}
          className="flex flex-col items-center gap-1 relative"
        >
          <div className="w-6 h-6 bg-[#888888] rounded" />
          <div className="text-[10px] text-[#888888]">설정</div>
          <div className="absolute top-0 right-4 w-2 h-2 bg-[#FF6600] rounded-full" />
        </button>
      </div>

    </div>
  );
}
