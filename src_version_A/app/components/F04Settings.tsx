import { ArrowLeft, GripVertical } from "lucide-react";
import { useNavigate } from "react-router";
import { useState } from "react";

export function F04Settings() {
  const navigate = useNavigate();
  const [activeMenus, setActiveMenus] = useState([
    { id: 1, name: "최근 본 종목", enabled: true },
    { id: 2, name: "실시간 급등", enabled: true },
    { id: 3, name: "오늘의 테마", enabled: true },
    { id: 4, name: "거래량 상위", enabled: true },
  ]);
  const [hiddenMenus, setHiddenMenus] = useState([
    { id: 5, name: "주요 뉴스", enabled: false },
    { id: 6, name: "공시 알림", enabled: false },
    { id: 7, name: "투자자 동향", enabled: false },
  ]);

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
    navigate("/simple-home-custom");
  };

  return (
    <div className="w-full h-full bg-[#F5F5F5] flex flex-col">
      {/* Top Bar */}
      <div className="bg-white px-4 py-3 flex items-center justify-between border-b border-[#E0E0E0]">
        <button onClick={() => navigate(-1)}>
          <ArrowLeft className="w-6 h-6 text-[#1A2B4A]" />
        </button>
        <div className="text-[16px] text-[#1A1A1A]" style={{ fontWeight: 700 }}>홈 메뉴 편집</div>
        <button onClick={handleSave} className="text-[14px] text-[#FF6600]" style={{ fontWeight: 700 }}>
          저장
        </button>
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
                className="flex items-center justify-between px-4 py-4 border-b border-[#F5F5F5]"
              >
                <div className="flex items-center gap-3">
                  <GripVertical className="w-5 h-5 text-[#888888]" />
                  <div className="text-[14px] text-[#1A1A1A]">{menu.name}</div>
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
            숨긴 메뉴
          </div>
          <div className="bg-white">
            {hiddenMenus.map((menu) => (
              <div
                key={menu.id}
                className="flex items-center justify-between px-4 py-4 border-b border-[#F5F5F5]"
              >
                <div className="flex items-center gap-3">
                  <GripVertical className="w-5 h-5 text-[#888888]" />
                  <div className="text-[14px] text-[#888888]">{menu.name}</div>
                </div>
                <button
                  onClick={() => handleToggle(menu.id, false)}
                  className="relative w-12 h-6 bg-[#E0E0E0] rounded-full transition-colors"
                >
                  <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Footer Hint */}
        <div className="px-4 py-3 text-center text-[12px] text-[#888888]">
          드래그하여 순서를 변경할 수 있어요
        </div>
      </div>
    </div>
  );
}
