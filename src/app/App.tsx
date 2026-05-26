import { BrowserRouter, Routes, Route, useNavigate } from "react-router";
import { useState } from "react";
import { DeviceFrame } from "./components/DeviceFrame";
import { StockProvider } from "./contexts/StockContext";

// B-version imports (현재 코드 = 수정 후)
import { F01HomeScreen } from "./components/F01HomeScreen";
import { F02SimpleModal } from "./components/F02SimpleModal";
import { F03SimpleHome } from "./components/F03SimpleHome";
import { F04SettingsNew } from "./components/F04SettingsNew";
import { F05SimpleHomeCustom } from "./components/F05SimpleHomeCustom";
import { F05SimpleHomeWithExtraMenus } from "./components/F05SimpleHomeWithExtraMenus";
import { F06AIInfo } from "./components/F06AIInfo";
import { F07StockDetailAll } from "./components/F07StockDetailAll";
import { F08StockOpinion } from "./components/F08StockOpinion";
import { F09StockAIAnalysis } from "./components/F09StockAIAnalysis";
import { BalanceScreen } from "./components/BalanceScreen";
import { TradeScreen } from "./components/TradeScreen";
import { BankingScreen } from "./components/BankingScreen";
import { F01GlobalHome } from "./components/F01GlobalHome";
import { F03GlobalSimple } from "./components/F03GlobalSimple";
import { F06AIInfoGlobal } from "./components/F06AIInfoGlobal";
import { F07StockGlobal } from "./components/F07StockGlobal";
import { F07StockGlobalAAPL } from "./components/F07StockGlobalAAPL";
import { F07StockGlobalTSLA } from "./components/F07StockGlobalTSLA";
import { F07StockSKHynix } from "./components/F07StockSKHynix";
import { F07StockNAVER } from "./components/F07StockNAVER";
import { BalanceGlobal } from "./components/BalanceGlobal";
import { TradeGlobal } from "./components/TradeGlobal";
import { OrderHistory } from "./components/OrderHistory";
import { TestGuide, TestFloatingOverlay } from "./components/TestGuide";
import { TestProvider, useTest } from "./contexts/TestContext";

// A-version imports (수정 전)
import { F01HomeScreen as F01HomeScreen_A } from "../../src_version_A/app/components/F01HomeScreen";
import { F03SimpleHome as F03SimpleHome_A } from "../../src_version_A/app/components/F03SimpleHome";
import { F04SettingsNew as F04SettingsNew_A } from "../../src_version_A/app/components/F04SettingsNew";
import { F06AIInfo as F06AIInfo_A } from "../../src_version_A/app/components/F06AIInfo";
import { F07StockDetailAll as F07StockDetailAll_A } from "../../src_version_A/app/components/F07StockDetailAll";
import { F07StockGlobal as F07StockGlobal_A } from "../../src_version_A/app/components/F07StockGlobal";
import { F08StockOpinion as F08StockOpinion_A } from "../../src_version_A/app/components/F08StockOpinion";
import { TradeScreen as TradeScreen_A } from "../../src_version_A/app/components/TradeScreen";
import { BankingScreen as BankingScreen_A } from "../../src_version_A/app/components/BankingScreen";
import { OrderHistory as OrderHistory_A } from "../../src_version_A/app/components/OrderHistory";

function TestStartBar() {
  const navigate = useNavigate();
  const { phase, participantId, setParticipantId } = useTest();
  const [selectedVersion, setSelectedVersion] = useState<"A" | "B">(
    () => (new URLSearchParams(window.location.search).get("version") === "A" ? "A" : "B")
  );

  // 테스트 진행 중이거나 /test 페이지에 있으면 숨김
  if (phase !== "idle" && phase !== "intro") return null;

  const handleStart = () => {
    const versionParam = selectedVersion === "A" ? "?version=A" : "";
    // 버전이 바뀌면 페이지 자체를 리로드해서 URL 파라미터 반영
    const currentVersion = new URLSearchParams(window.location.search).get("version") === "A" ? "A" : "B";
    if (currentVersion !== selectedVersion) {
      window.location.href = "/test" + versionParam;
    } else {
      navigate("/test" + versionParam);
    }
  };

  return (
    <div style={{
      position: "fixed",
      bottom: 0,
      left: 0,
      right: 0,
      background: "#1A1A1A",
      padding: "12px 24px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: 12,
      zIndex: 9998,
    }}>
      <input
        type="text"
        value={participantId}
        onChange={(e) => setParticipantId(e.target.value)}
        placeholder="참가자 ID (예: P01)"
        style={{
          padding: "8px 14px",
          borderRadius: 8,
          border: "none",
          fontSize: 14,
          width: 180,
          outline: "none",
        }}
      />
      <div style={{ display: "flex", gap: 4 }}>
        {(["A", "B"] as const).map((v) => (
          <button
            key={v}
            onClick={() => setSelectedVersion(v)}
            style={{
              padding: "8px 16px",
              borderRadius: 8,
              border: selectedVersion === v ? "2px solid white" : "2px solid transparent",
              background: v === "A" ? "#1565C0" : "#FF6600",
              color: "white",
              fontSize: 14,
              fontWeight: 700,
              cursor: "pointer",
              opacity: selectedVersion === v ? 1 : 0.5,
            }}
          >
            {v}버전
          </button>
        ))}
      </div>
      <button
        onClick={handleStart}
        disabled={!participantId.trim()}
        style={{
          padding: "8px 24px",
          borderRadius: 8,
          border: "none",
          background: participantId.trim() ? "#FF6600" : "#555",
          color: "white",
          fontSize: 14,
          fontWeight: 700,
          cursor: participantId.trim() ? "pointer" : "default",
        }}
      >
        테스트 시작
      </button>
    </div>
  );
}

interface MenuSettingsState {
  activeMenus: Array<{ id: number; name: string; enabled: boolean }>;
  hiddenMenus: Array<{ id: number; name: string; enabled: boolean }>;
}

// A/B 버전 감지: URL에 ?version=A 이면 A버전, 아니면 B버전(기본)
function useABVersion(): "A" | "B" {
  const params = new URLSearchParams(window.location.search);
  return params.get("version") === "A" ? "A" : "B";
}

export default function App() {
  const version = useABVersion();
  const [showModal, setShowModal] = useState(false);
  const [isSimpleMode, setIsSimpleMode] = useState(false);
  const [menuSettings, setMenuSettings] = useState<MenuSettingsState | null>(null);

  const handleSimpleToggle = () => {
    if (!isSimpleMode) {
      setShowModal(true);
    } else {
      setIsSimpleMode(false);
    }
  };

  const handleConfirmSimple = () => {
    setIsSimpleMode(true);
    setShowModal(false);
  };

  const handleCancelSimple = () => {
    setShowModal(false);
  };

  const handleSaveMenuSettings = (settings: MenuSettingsState) => {
    setMenuSettings(settings);
  };

  // 버전별 컴포넌트 선택
  const Home = version === "A" ? F01HomeScreen_A : F01HomeScreen;
  const SimpleHome = version === "A" ? F03SimpleHome_A : F03SimpleHome;
  const Settings = version === "A" ? F04SettingsNew_A : F04SettingsNew;
  const AIInfo = version === "A" ? F06AIInfo_A : F06AIInfo;
  const StockDetail = version === "A" ? F07StockDetailAll_A : F07StockDetailAll;
  const StockGlobal = version === "A" ? F07StockGlobal_A : F07StockGlobal;
  const StockOpinion = version === "A" ? F08StockOpinion_A : F08StockOpinion;
  const Trade = version === "A" ? TradeScreen_A : TradeScreen;
  const Banking = version === "A" ? BankingScreen_A : BankingScreen;
  const Orders = version === "A" ? OrderHistory_A : OrderHistory;

  return (
    <StockProvider>
      <BrowserRouter>
        <TestProvider onTaskStart={() => {
          setIsSimpleMode(false);
          setShowModal(false);
        }}>
        <div className="w-full min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200" style={{ fontFamily: "'Noto Sans KR', sans-serif" }}>
          {/* A/B 버전 표시 배지 (실험 진행자용) */}
          <div style={{
            position: "fixed",
            top: 8,
            right: 8,
            zIndex: 9999,
            background: version === "A" ? "#1565C0" : "#FF6600",
            color: "white",
            padding: "4px 12px",
            borderRadius: "12px",
            fontSize: "11px",
            fontWeight: 700,
            opacity: 0.9
          }}>
            {version === "A" ? "A (수정 전)" : "B (수정 후)"}
          </div>

          {/* 태스크 진행 중 플로팅 오버레이 (타이머 + 완료 버튼) */}
          <TestFloatingOverlay />

          <DeviceFrame>
            <div className="w-full h-full bg-white relative">
              <Routes>
              <Route
                path="/"
                element={
                  isSimpleMode ? (
                    <SimpleHome onSimpleToggle={handleSimpleToggle} />
                  ) : (
                    <Home onSimpleToggle={handleSimpleToggle} />
                  )
                }
              />
              <Route path="/simple-home" element={<SimpleHome onSimpleToggle={handleSimpleToggle} />} />
              <Route path="/settings" element={<Settings onSave={handleSaveMenuSettings} />} />
              <Route path="/simple-home-custom" element={<F05SimpleHomeCustom onSimpleToggle={handleSimpleToggle} />} />
              <Route path="/simple-home-extra" element={<F05SimpleHomeWithExtraMenus onSimpleToggle={handleSimpleToggle} />} />
              <Route path="/ai-info" element={<AIInfo />} />
              <Route path="/stock-detail" element={<StockDetail />} />
              <Route path="/stock-skhynix" element={<F07StockSKHynix />} />
              <Route path="/stock-naver" element={<F07StockNAVER />} />
              <Route path="/stock-opinion" element={<StockOpinion />} />
              <Route path="/stock-ai-analysis" element={<F09StockAIAnalysis />} />
              <Route path="/balance" element={<BalanceScreen />} />
              <Route path="/order-history" element={<Orders />} />
              <Route path="/trade" element={<Trade />} />
              <Route path="/banking" element={<Banking />} />
              <Route path="/global" element={<F01GlobalHome onSimpleToggle={handleSimpleToggle} />} />
              <Route path="/global-simple" element={<F03GlobalSimple onSimpleToggle={handleSimpleToggle} />} />
              <Route path="/ai-info-global" element={<F06AIInfoGlobal />} />
              <Route path="/stock-global" element={<StockGlobal />} />
              <Route path="/stock-global-aapl" element={<F07StockGlobalAAPL />} />
              <Route path="/stock-global-tsla" element={<F07StockGlobalTSLA />} />
              <Route path="/balance-global" element={<BalanceGlobal />} />
              <Route path="/trade-global" element={<TradeGlobal />} />
              <Route path="/test" element={<TestGuide />} />
            </Routes>

            {showModal && (
              <F02SimpleModal onConfirm={handleConfirmSimple} onCancel={handleCancelSimple} />
            )}
            </div>
          </DeviceFrame>

          {/* 웹 하단 고정 바: 테스트 시작 */}
          <TestStartBar />
        </div>
        </TestProvider>
      </BrowserRouter>
    </StockProvider>
  );
}