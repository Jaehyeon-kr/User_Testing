import { Menu, Search, Bell } from "lucide-react";
import { useNavigate } from "react-router";
import { useState } from "react";

interface F01HomeScreenProps {
  onSimpleToggle: () => void;
}

export function F01HomeScreen({ onSimpleToggle }: F01HomeScreenProps) {
  const navigate = useNavigate();
  const [showComingSoonToast, setShowComingSoonToast] = useState(false);

  const showComingSoon = () => {
    setShowComingSoonToast(true);
    setTimeout(() => setShowComingSoonToast(false), 2000);
  };

  return (
    <div className="w-full h-full bg-[#F5F5F5] flex flex-col">
      {/* Top Bar */}
      <div className="bg-white px-4 py-3 flex items-center justify-between border-b border-[#E0E0E0]">
        <div className="flex items-center gap-2">
          <div className="w-[72px] h-[26px] bg-[#E0E0E0] rounded-full p-[2px] flex">
            <button className="flex-1 bg-white rounded-full flex items-center justify-center text-[11px] text-[#1A2B4A]" style={{ fontWeight: 700 }}>
              국내
            </button>
            <button
              onClick={() => navigate("/global")}
              className="flex-1 rounded-full flex items-center justify-center text-[11px] text-[#888888]"
            >
              해외
            </button>
          </div>
        </div>
        <div className="text-[18px] text-[#1A2B4A]" style={{ fontWeight: 700 }}>T-STOCK</div>
        <div className="flex items-center gap-3">
          <Search className="w-5 h-5 text-[#1A2B4A] cursor-pointer" onClick={showComingSoon} />
          <Bell className="w-5 h-5 text-[#1A2B4A]" />
          <div className="w-[80px] h-[26px] bg-[#E0E0E0] rounded-full p-[2px] flex">
            <button className="flex-1 bg-white rounded-full flex items-center justify-center text-[11px] text-[#1A2B4A]" style={{ fontWeight: 700 }}>
              일반
            </button>
            <button
              onClick={onSimpleToggle}
              className="flex-1 rounded-full flex items-center justify-center text-[11px] text-[#888888]"
            >
              심플
            </button>
          </div>
        </div>
      </div>

      {/* Tab Bar */}
      <div className="bg-white px-4 flex gap-6 border-b border-[#E0E0E0] overflow-x-auto">
        <button className="py-3 text-[14px] text-[#1A1A1A] border-b-2 border-[#FF6600] whitespace-nowrap">
          오늘주식
        </button>
        <button onClick={showComingSoon} className="py-3 text-[14px] text-[#888888] whitespace-nowrap">인사이트</button>
        <button onClick={showComingSoon} className="py-3 text-[14px] text-[#888888] whitespace-nowrap">자산</button>
        <button onClick={showComingSoon} className="py-3 text-[14px] text-[#888888] whitespace-nowrap">MY</button>
      </div>

      {/* Body - Scrollable */}
      <div className="flex-1 overflow-y-auto">
        {/* Section 1: 주요지수 */}
        <div className="p-4 bg-white mb-2">
          <div className="flex items-center justify-between mb-3">
            <div className="text-[16px] text-[#1A1A1A]" style={{ fontWeight: 700 }}>주요지수</div>
            <div className="text-[11px] text-[#888888]">2026.04.24 기준</div>
          </div>
          <div className="grid grid-cols-3 gap-2">
            <div className="bg-white border border-[#E0E0E0] p-3">
              <div className="text-[12px] text-[#888888] mb-1">KOSPI</div>
              <div className="text-[14px] text-[#1A1A1A]" style={{ fontWeight: 700 }}>6,475.63</div>
              <div className="text-[12px] text-[#1565C0]">▼ -0.08%</div>
            </div>
            <div className="bg-white border border-[#E0E0E0] p-3">
              <div className="text-[12px] text-[#888888] mb-1">KOSDAQ</div>
              <div className="text-[14px] text-[#1A1A1A]" style={{ fontWeight: 700 }}>1,203.84</div>
              <div className="text-[12px] text-[#D32F2F]">▲ +2.51%</div>
            </div>
            <div className="bg-white border border-[#E0E0E0] p-3">
              <div className="text-[12px] text-[#888888] mb-1">NASDAQ</div>
              <div className="text-[14px] text-[#1A1A1A]" style={{ fontWeight: 700 }}>19,146.81</div>
              <div className="text-[12px] text-[#1565C0]">▼ -0.89%</div>
            </div>
          </div>
        </div>

        {/* Section 2: 관심종목 */}
        <div className="p-4 bg-white mb-2">
          <div className="text-[16px] text-[#1A1A1A] mb-3" style={{ fontWeight: 700 }}>관심종목</div>
          <div className="flex gap-3 overflow-x-auto">
            {[
              { name: "삼성전자", price: "219,500", change: "-2.23%" },
              { name: "SK하이닉스", price: "1,225,000", change: "+3.51%" },
              { name: "NAVER", price: "217,500", change: "-1.58%" },
              { name: "카카오", price: "52,300", change: "+0.5%" },
            ].map((stock, i) => (
              <div key={i} className="bg-white border border-[#E0E0E0] p-3 min-w-[120px]">
                <div className="text-[14px] text-[#1A1A1A] mb-1" style={{ fontWeight: 700 }}>{stock.name}</div>
                <div className="text-[12px] text-[#888888]">{stock.price}</div>
                <div className={`text-[12px] ${stock.change.startsWith('+') ? 'text-[#D32F2F]' : 'text-[#1565C0]'}`}>
                  {stock.change}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Section 3: 실시간 급등 */}
        <div className="p-4 bg-white mb-2">
          <div className="text-[16px] text-[#1A1A1A] mb-3" style={{ fontWeight: 700 }}>실시간 급등</div>
          <div className="space-y-2">
            {[
              { rank: 1, name: "셀트리온", rate: "+8.5%" },
              { rank: 2, name: "LG에너지솔루션", rate: "+7.2%" },
              { rank: 3, name: "현대차", rate: "+6.8%" },
              { rank: 4, name: "삼성바이오로직스", rate: "+5.9%" },
              { rank: 5, name: "포스코퓨처엠", rate: "+5.4%" },
            ].map((item) => (
              <div key={item.rank} className="flex items-center gap-3 py-2 border-b border-[#F5F5F5]">
                <div className="w-6 h-6 bg-[#FF6600] text-white rounded-full flex items-center justify-center text-[12px]">
                  {item.rank}
                </div>
                <div className="flex-1 text-[14px] text-[#1A1A1A]">{item.name}</div>
                <div className="px-2 py-1 bg-[#FFE5E5] text-[#D32F2F] text-[12px] rounded">
                  {item.rate}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Section 4: 오늘의 테마 */}
        <div className="p-4 bg-white mb-2">
          <div className="text-[16px] text-[#1A1A1A] mb-3" style={{ fontWeight: 700 }}>오늘의 테마</div>
          <div className="grid grid-cols-2 gap-2">
            {["2차전지", "AI 반도체", "바이오", "방산"].map((theme, i) => (
              <div key={i} className="bg-white border border-[#E0E0E0] p-4 text-center">
                <div className="text-[14px] text-[#1A1A1A]" style={{ fontWeight: 700 }}>{theme}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Section 5: 거래량 상위 */}
        <div className="p-4 bg-white mb-2">
          <div className="text-[16px] text-[#1A1A1A] mb-3" style={{ fontWeight: 700 }}>거래량 상위</div>
          <div className="space-y-2">
            {[
              { name: "삼성전자", volume: "24,582,341", rate: "+1.2%" },
              { name: "SK하이닉스", volume: "15,234,125", rate: "+2.5%" },
              { name: "NAVER", volume: "8,456,234", rate: "-0.8%" },
            ].map((stock, i) => (
              <div key={i} className="flex items-center justify-between py-2 border-b border-[#F5F5F5]">
                <div className="text-[14px] text-[#1A1A1A]">{stock.name}</div>
                <div className="text-right">
                  <div className="text-[12px] text-[#888888]">{stock.volume}</div>
                  <div className={`text-[12px] ${stock.rate.startsWith('+') ? 'text-[#D32F2F]' : 'text-[#1565C0]'}`}>
                    {stock.rate}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
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

      {/* Coming Soon Toast */}
      {showComingSoonToast && (
        <div className="fixed bottom-24 left-1/2 -translate-x-1/2 bg-black/75 text-white text-[12px] px-5 py-2 rounded-[20px] z-50">
          준비 중인 기능입니다
        </div>
      )}
    </div>
  );
}
