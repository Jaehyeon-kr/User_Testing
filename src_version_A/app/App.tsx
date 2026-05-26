import { BrowserRouter, Routes, Route } from "react-router";
import { useState } from "react";
import { DeviceFrame } from "./components/DeviceFrame";
import { StockProvider } from "./contexts/StockContext";
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

interface MenuSettingsState {
  activeMenus: Array<{ id: number; name: string; enabled: boolean }>;
  hiddenMenus: Array<{ id: number; name: string; enabled: boolean }>;
}

export default function App() {
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

  return (
    <StockProvider>
      <BrowserRouter>
        <div className="w-full min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200" style={{ fontFamily: "'Noto Sans KR', sans-serif" }}>
          <DeviceFrame>
            <div className="w-full h-full bg-white relative">
              <Routes>
              <Route
                path="/"
                element={
                  isSimpleMode ? (
                    <F03SimpleHome onSimpleToggle={handleSimpleToggle} />
                  ) : (
                    <F01HomeScreen onSimpleToggle={handleSimpleToggle} />
                  )
                }
              />
              <Route path="/simple-home" element={<F03SimpleHome onSimpleToggle={handleSimpleToggle} />} />
              <Route path="/settings" element={<F04SettingsNew onSave={handleSaveMenuSettings} />} />
              <Route path="/simple-home-custom" element={<F05SimpleHomeCustom onSimpleToggle={handleSimpleToggle} />} />
              <Route path="/simple-home-extra" element={<F05SimpleHomeWithExtraMenus onSimpleToggle={handleSimpleToggle} />} />
              <Route path="/ai-info" element={<F06AIInfo />} />
              <Route path="/stock-detail" element={<F07StockDetailAll />} />
              <Route path="/stock-skhynix" element={<F07StockSKHynix />} />
              <Route path="/stock-naver" element={<F07StockNAVER />} />
              <Route path="/stock-opinion" element={<F08StockOpinion />} />
              <Route path="/stock-ai-analysis" element={<F09StockAIAnalysis />} />
              <Route path="/balance" element={<BalanceScreen />} />
              <Route path="/order-history" element={<OrderHistory />} />
              <Route path="/trade" element={<TradeScreen />} />
              <Route path="/banking" element={<BankingScreen />} />
              <Route path="/global" element={<F01GlobalHome onSimpleToggle={handleSimpleToggle} />} />
              <Route path="/global-simple" element={<F03GlobalSimple onSimpleToggle={handleSimpleToggle} />} />
              <Route path="/ai-info-global" element={<F06AIInfoGlobal />} />
              <Route path="/stock-global" element={<F07StockGlobal />} />
              <Route path="/stock-global-aapl" element={<F07StockGlobalAAPL />} />
              <Route path="/stock-global-tsla" element={<F07StockGlobalTSLA />} />
              <Route path="/balance-global" element={<BalanceGlobal />} />
              <Route path="/trade-global" element={<TradeGlobal />} />
            </Routes>

            {showModal && (
              <F02SimpleModal onConfirm={handleConfirmSimple} onCancel={handleCancelSimple} />
            )}
            </div>
          </DeviceFrame>
        </div>
      </BrowserRouter>
    </StockProvider>
  );
}