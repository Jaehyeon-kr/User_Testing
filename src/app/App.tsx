import { BrowserRouter, Routes, Route } from "react-router";
import { useState, useEffect } from "react";
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

// 풀스크린 시작 화면 (phase === "idle" 일 때)
function StartScreen() {
  const { participantId, setParticipantId, startTest } = useTest();
  const [selectedVersion, setSelectedVersion] = useState<"A" | "B">(
    () => (new URLSearchParams(window.location.search).get("version") === "A" ? "A" : "B")
  );

  const handleStart = () => {
    const currentVersion = new URLSearchParams(window.location.search).get("version") === "A" ? "A" : "B";
    if (currentVersion !== selectedVersion) {
      const versionParam = selectedVersion === "A" ? "?version=A" : "";
      window.location.href = "/" + versionParam;
      return;
    }
    startTest();
  };

  return (
    <div style={{
      width: "100%",
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      background: "linear-gradient(135deg, #1A1A2E 0%, #16213E 50%, #0F3460 100%)",
      fontFamily: "'Noto Sans KR', sans-serif",
      padding: 24,
    }}>
      <div style={{
        background: "white",
        borderRadius: 24,
        padding: "48px 40px",
        maxWidth: 440,
        width: "100%",
        textAlign: "center",
        boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
      }}>
        <div style={{ fontSize: 40, marginBottom: 8 }}>📋</div>
        <h1 style={{ fontSize: 28, fontWeight: 800, color: "#1A1A1A", marginBottom: 8 }}>
          T-STOCK 사용성 테스트
        </h1>
        <p style={{ fontSize: 14, color: "#888", marginBottom: 32 }}>
          주식 앱 프로토타입 A/B 사용성 평가
        </p>

        {/* 참가자 ID */}
        <div style={{ marginBottom: 20, textAlign: "left" }}>
          <label style={{ fontSize: 13, fontWeight: 600, color: "#555", marginBottom: 6, display: "block" }}>
            참가자 ID
          </label>
          <input
            type="text"
            value={participantId}
            onChange={(e) => setParticipantId(e.target.value)}
            placeholder="예: P01"
            style={{
              width: "100%",
              padding: "12px 16px",
              borderRadius: 12,
              border: "2px solid #E0E0E0",
              fontSize: 16,
              outline: "none",
              boxSizing: "border-box",
              transition: "border-color 0.2s",
            }}
            onFocus={(e) => e.target.style.borderColor = "#FF6600"}
            onBlur={(e) => e.target.style.borderColor = "#E0E0E0"}
          />
        </div>

        {/* 버전 선택 */}
        <div style={{ marginBottom: 28, textAlign: "left" }}>
          <label style={{ fontSize: 13, fontWeight: 600, color: "#555", marginBottom: 6, display: "block" }}>
            테스트 버전
          </label>
          <div style={{ display: "flex", gap: 8 }}>
            {(["A", "B"] as const).map((v) => (
              <button
                key={v}
                onClick={() => setSelectedVersion(v)}
                style={{
                  flex: 1,
                  padding: "14px 0",
                  borderRadius: 12,
                  border: selectedVersion === v ? "2px solid " + (v === "A" ? "#1565C0" : "#FF6600") : "2px solid #E0E0E0",
                  background: selectedVersion === v ? (v === "A" ? "#1565C0" : "#FF6600") : "white",
                  color: selectedVersion === v ? "white" : "#888",
                  fontSize: 16,
                  fontWeight: 700,
                  cursor: "pointer",
                  transition: "all 0.2s",
                }}
              >
                {v}버전 {v === "A" ? "(수정 전)" : "(수정 후)"}
              </button>
            ))}
          </div>
        </div>

        {/* 시작 버튼 */}
        <button
          onClick={handleStart}
          disabled={!participantId.trim()}
          style={{
            width: "100%",
            padding: "16px 0",
            borderRadius: 12,
            border: "none",
            background: participantId.trim() ? "#FF6600" : "#E0E0E0",
            color: participantId.trim() ? "white" : "#AAA",
            fontSize: 18,
            fontWeight: 700,
            cursor: participantId.trim() ? "pointer" : "default",
            transition: "all 0.2s",
          }}
        >
          테스트 시작하기
        </button>
      </div>

      <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 12, marginTop: 24 }}>
        서울과학기술대학교 UX 디자인 · 사용성 평가
      </p>
    </div>
  );
}

// A/B 버전 감지: URL에 ?version=A 이면 A버전, 아니면 B버전(기본)
function useABVersion(): "A" | "B" {
  const params = new URLSearchParams(window.location.search);
  return params.get("version") === "A" ? "A" : "B";
}

function AppInner() {
  const version = useABVersion();
  const { phase } = useTest();
  const [showModal, setShowModal] = useState(false);
  const [isSimpleMode, setIsSimpleMode] = useState(false);

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

  const handleSaveMenuSettings = () => {};

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

  // 태스크 시작 시 앱 상태 초기화
  useEffect(() => {
    if (phase === "task-running") {
      setIsSimpleMode(false);
      setShowModal(false);
    }
  }, [phase]);

  // phase가 idle이면 풀스크린 시작 화면
  if (phase === "idle") {
    return <StartScreen />;
  }

  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200" style={{ fontFamily: "'Noto Sans KR', sans-serif" }}>
      {/* A/B 버전 표시 배지 */}
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

      {/* 태스크 진행 중 플로팅 오버레이 */}
      <TestFloatingOverlay />

      <DeviceFrame>
        <div className="w-full h-full bg-white relative">
          <Routes>
            <Route
              path="/"
              element={<TestGuide />}
            />
            <Route
              path="/home"
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
    </div>
  );
}

export default function App() {
  return (
    <StockProvider>
      <BrowserRouter>
        <TestProvider>
          <AppInner />
        </TestProvider>
      </BrowserRouter>
    </StockProvider>
  );
}
