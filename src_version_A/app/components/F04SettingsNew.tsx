import { useNavigate } from "react-router";
import { useState } from "react";

interface MenuSettingsState {
  activeMenus: Array<{ id: number; name: string; enabled: boolean }>;
  hiddenMenus: Array<{ id: number; name: string; enabled: boolean }>;
}

interface F04SettingsNewProps {
  onSave: (settings: MenuSettingsState) => void;
}

// Helper functions moved outside component to avoid recreation on each render
const loadMenuState = () => {
  const saved = localStorage.getItem('menuSettings');
  if (saved) {
    try {
      const parsed = JSON.parse(saved);
      return {
        active: parsed.activeMenus || [],
        hidden: parsed.hiddenMenus || []
      };
    } catch (e) {
      console.error('Failed to load menu settings:', e);
    }
  }

  // Default state
  return {
    active: [
      { id: 1, name: "최근 본 종목", enabled: true },
      { id: 2, name: "실시간 급등", enabled: true },
      { id: 3, name: "오늘의 테마", enabled: true },
      { id: 4, name: "거래량 상위", enabled: true },
    ],
    hidden: [
      { id: 5, name: "글로벌 증시", enabled: false },
      { id: 6, name: "환율 현황", enabled: false },
      { id: 7, name: "관심종목 뉴스", enabled: false },
      { id: 8, name: "투자자 동향", enabled: false },
      { id: 9, name: "공시 알림", enabled: false },
      { id: 10, name: "오늘의 공모주", enabled: false },
      { id: 11, name: "MY 수익 현황", enabled: false },
      { id: 12, name: "국내 주요 뉴스", enabled: false },
    ]
  };
};

export function F04SettingsNew({ onSave }: F04SettingsNewProps) {
  const navigate = useNavigate();

  // Use lazy initialization for useState to avoid calling loadMenuState on every render
  const [activeMenus, setActiveMenus] = useState(() => loadMenuState().active);
  const [hiddenMenus, setHiddenMenus] = useState(() => loadMenuState().hidden);

  const handleToggle = (id: number, isActive: boolean) => {
    if (isActive) {
      const menu = activeMenus.find(m => m.id === id);
      if (menu) {
        setActiveMenus(activeMenus.filter(m => m.id !== id));
        setHiddenMenus([...hiddenMenus, { ...menu, enabled: false }]);
      }
    } else {
      const menu = hiddenMenus.find(m => m.id === id);
      if (menu) {
        setHiddenMenus(hiddenMenus.filter(m => m.id !== id));
        setActiveMenus([...activeMenus, { ...menu, enabled: true }]);
      }
    }
  };

  const handleSave = () => {
    // Save to localStorage
    const menuSettings = { activeMenus, hiddenMenus };
    localStorage.setItem('menuSettings', JSON.stringify(menuSettings));

    onSave(menuSettings);

    // Check if extra menus (환율 현황 or 글로벌 증시) are enabled
    const hasExtraMenus = activeMenus.some(menu =>
      menu.name === "환율 현황" || menu.name === "글로벌 증시"
    );

    if (hasExtraMenus) {
      navigate("/simple-home-extra");
    } else {
      navigate("/simple-home-custom");
    }
  };

  return (
    <div className="w-full h-full bg-[#F5F5F5] flex flex-col relative">
      {/* Top Bar */}
      <div className="bg-white px-4 py-3 flex items-center justify-center border-b border-[#E0E0E0]">
        <div className="text-[15px] text-[#1A1A1A]" style={{ fontWeight: 700 }}>홈 화면 편집</div>
      </div>

      {/* Body */}
      <div className="flex-1 overflow-y-auto">
        {/* Active Menus Section */}
        <div className="mb-2">
          <div className="px-4 py-2 bg-[#E0E0E0] text-[12px] text-[#888888]">
            표시 중인 메뉴
          </div>
          <div className="bg-white">
            {activeMenus.map((menu) => (
              <div
                key={menu.id}
                className="flex items-center justify-between px-4 border-b border-[#f5f5f5]"
                style={{ height: '44px' }}
              >
                <div className="flex items-center gap-3">
                  <div style={{ fontSize: '10px', color: '#DDDDDD' }}>☰</div>
                  <div className="text-[12px] text-[#222]" style={{ fontWeight: 700 }}>{menu.name}</div>
                </div>
                <button
                  onClick={() => handleToggle(menu.id, true)}
                  className="relative w-12 h-6 bg-[#FF6600] rounded-full transition-colors"
                >
                  <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Hidden Menus Section */}
        <div>
          <div className="px-4 py-2 bg-[#E0E0E0] text-[12px] text-[#888888]">
            추가 가능한 메뉴
          </div>
          <div className="bg-white">
            {hiddenMenus.map((menu) => (
              <div
                key={menu.id}
                className="flex items-center justify-between px-4 border-b border-[#f5f5f5]"
                style={{ height: '44px' }}
              >
                <div className="flex items-center gap-3">
                  <div style={{ fontSize: '10px', color: '#DDDDDD' }}>☰</div>
                  <div className="text-[12px] text-[#222]" style={{ fontWeight: 700 }}>{menu.name}</div>
                </div>
                <button
                  onClick={() => handleToggle(menu.id, false)}
                  className="relative w-12 h-6 bg-[#ddd] rounded-full transition-colors"
                >
                  <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Button */}
      <div className="p-4 bg-white border-t border-[#E0E0E0]">
        <button
          onClick={handleSave}
          className="w-full h-[48px] text-white rounded-lg text-[16px]"
          style={{
            fontWeight: 700,
            backgroundColor: "#FF6600",
            cursor: "pointer"
          }}
        >
          저장
        </button>
      </div>
    </div>
  );
}
