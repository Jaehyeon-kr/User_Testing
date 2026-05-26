import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router";
import { useState } from "react";
import { useStock } from "../contexts/StockContext";

export function TradeScreen() {
  const navigate = useNavigate();
  const { selectedStock } = useStock();
  const [showBuyModal, setShowBuyModal] = useState(false);
  const [buyQuantity, setBuyQuantity] = useState(0);
  const [buyPrice, setBuyPrice] = useState(selectedStock.price);
  const [showFinalConfirm, setShowFinalConfirm] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const availableCash = 3120000;
  const maxQuantity = Math.floor(availableCash / buyPrice);

  const handleConfirmBuy = () => {
    setShowBuyModal(false);
    setShowFinalConfirm(true);
  };

  const handleFinalConfirm = () => {
    setShowFinalConfirm(false);
    setBuyQuantity(0);
    setBuyPrice(selectedStock.price);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const handleCancelFinalConfirm = () => {
    setShowFinalConfirm(false);
    setShowBuyModal(true);
  };

  const handleCancelBuy = () => {
    setShowBuyModal(false);
    setBuyQuantity(0);
    setBuyPrice(selectedStock.price);
  };

  // Generate order book prices based on selected stock price
  const basePrice = selectedStock.price;
  const increment = selectedStock.currency === "KRW" ? 500 : 0.10;

  const sellOrders = Array.from({ length: 5 }, (_, i) => ({
    price: (basePrice + increment * (5 - i)).toLocaleString(undefined, {
      minimumFractionDigits: selectedStock.currency === "USD" ? 2 : 0,
      maximumFractionDigits: selectedStock.currency === "USD" ? 2 : 0
    }),
    volume: Math.floor(Math.random() * 20000 + 5000).toLocaleString()
  }));

  const buyOrders = Array.from({ length: 4 }, (_, i) => ({
    price: (basePrice - increment * (i + 1)).toLocaleString(undefined, {
      minimumFractionDigits: selectedStock.currency === "USD" ? 2 : 0,
      maximumFractionDigits: selectedStock.currency === "USD" ? 2 : 0
    }),
    volume: Math.floor(Math.random() * 20000 + 5000).toLocaleString()
  }));

  const currentPriceDisplay = selectedStock.currency === "KRW"
    ? `${selectedStock.price.toLocaleString()}원`
    : `$${selectedStock.price.toFixed(2)}`;

  const changeDisplay = selectedStock.change > 0
    ? `▲ +${Math.abs(selectedStock.change).toFixed(2)}%`
    : `▼ ${selectedStock.change.toFixed(2)}%`;

  const changeColor = selectedStock.change >= 0 ? "#D32F2F" : "#1565C0";

  const estimatedTotal = selectedStock.currency === "KRW"
    ? (buyQuantity * buyPrice).toLocaleString() + "원"
    : "$" + (buyQuantity * buyPrice).toFixed(2);

  return (
    <div className="w-full h-full bg-[#F5F5F5] flex flex-col">
      {/* Top Bar */}
      <div className="bg-[#1A2B4A] px-4 py-3 flex items-center justify-between">
        <button onClick={() => navigate(-1)}>
          <ArrowLeft className="w-6 h-6 text-white/80" />
        </button>
        <div className="text-[15px] text-white" style={{ fontWeight: 700 }}>투자</div>
        <div className="w-[72px] h-[26px] bg-transparent rounded-full p-[2px] flex border border-white/20">
          <button className="flex-1 bg-white rounded-full flex items-center justify-center text-[11px] text-[#1A2B4A]" style={{ fontWeight: 700 }}>
            국내
          </button>
          <button
            onClick={() => navigate("/trade-global")}
            className="flex-1 rounded-full flex items-center justify-center text-[11px] text-white/50"
          >
            해외
          </button>
        </div>
      </div>

      {/* Stock Info Header */}
      <div className="bg-white px-4 py-3">
        <div className="flex items-start justify-between mb-2">
          <div>
            <div className="text-[16px] text-[#1A1A1A] mb-1" style={{ fontWeight: 700 }}>
              {selectedStock.name} <span className="text-[#888888]">{selectedStock.ticker}</span>
            </div>
            <div className="text-[12px] text-[#888888]">
              {selectedStock.isOverseas ? "해외주식" : "코스피 · 전기전자"}
            </div>
          </div>
          <div className="text-right">
            <div className="text-[16px] mb-1" style={{ fontWeight: 700, color: changeColor }}>
              {currentPriceDisplay}
            </div>
            <div className="text-[12px]" style={{ color: changeColor }}>
              {changeDisplay}
            </div>
          </div>
        </div>
      </div>

      {/* Mini Chart */}
      <div className="p-4">
        <div className="bg-white rounded-lg p-4 border border-[#E0E0E0]">
          <div className="h-[110px] flex items-end">
            <svg width="100%" height="100%" viewBox="0 0 300 110" preserveAspectRatio="none">
              <defs>
                <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={selectedStock.change >= 0 ? "rgba(211,47,47,0.08)" : "rgba(21,101,192,0.08)"} />
                  <stop offset="100%" stopColor={selectedStock.change >= 0 ? "rgba(211,47,47,0)" : "rgba(21,101,192,0)"} />
                </linearGradient>
              </defs>
              <path
                d="M 0,80 L 30,75 L 60,68 L 90,70 L 120,62 L 150,58 L 180,55 L 210,60 L 240,52 L 270,48 L 300,45"
                fill="none"
                stroke={selectedStock.change >= 0 ? "#D32F2F" : "#1565C0"}
                strokeWidth="2"
              />
              <path
                d="M 0,80 L 30,75 L 60,68 L 90,70 L 120,62 L 150,58 L 180,55 L 210,60 L 240,52 L 270,48 L 300,45 L 300,110 L 0,110 Z"
                fill="url(#chartGradient)"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* Order Book */}
      <div className="flex-1 overflow-y-auto px-4">
        <div className="bg-white rounded-lg border border-[#E0E0E0] overflow-hidden">
          <div className="text-[14px] text-[#1A1A1A] px-4 py-3 border-b border-[#E0E0E0]" style={{ fontWeight: 700 }}>
            호가창
          </div>

          <div className="grid grid-cols-3 bg-[#F8F8F8] border-b border-[#E0E0E0]">
            <div className="py-2 text-center text-[10px] text-[#888888]">매도잔량</div>
            <div className="py-2 text-center text-[10px] text-[#888888]">가격</div>
            <div className="py-2 text-center text-[10px] text-[#888888]">매수잔량</div>
          </div>

          {/* Sell orders */}
          {sellOrders.map((row, i) => (
            <div key={i} className="grid grid-cols-3 border-b border-[#F5F5F5]">
              <div className="py-2 px-2 text-center text-[11px] bg-[#e8f0ff] text-[#1565C0]">
                {row.volume}
              </div>
              <div className="py-2 px-2 text-center text-[11px] text-[#1A1A1A]" style={{ fontWeight: 700 }}>
                {row.price}
              </div>
              <div className="py-2 px-2 text-center text-[11px]"></div>
            </div>
          ))}

          {/* Current price row */}
          <div className="grid grid-cols-3 border-b-2" style={{ borderColor: changeColor }}>
            <div className="py-2 px-2 text-center text-[11px]"></div>
            <div className="py-2 px-2 text-center text-[11px] text-white" style={{ backgroundColor: changeColor, fontWeight: 700 }}>
              {basePrice.toLocaleString(undefined, {
                minimumFractionDigits: selectedStock.currency === "USD" ? 2 : 0,
                maximumFractionDigits: selectedStock.currency === "USD" ? 2 : 0
              })} ←현재가
            </div>
            <div className="py-2 px-2 text-center text-[11px]"></div>
          </div>

          {/* Buy orders */}
          {buyOrders.map((row, i) => (
            <div key={i} className="grid grid-cols-3 border-b border-[#F5F5F5]">
              <div className="py-2 px-2 text-center text-[11px]"></div>
              <div className="py-2 px-2 text-center text-[11px] text-[#1A1A1A]" style={{ fontWeight: 700 }}>
                {row.price}
              </div>
              <div className="py-2 px-2 text-center text-[11px] bg-[#fff0f0] text-[#D32F2F]">
                {row.volume}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Trade Buttons */}
      <div className="p-4 bg-white border-t border-[#E0E0E0]">
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => {
              setBuyPrice(selectedStock.price);
              setShowBuyModal(true);
            }}
            className="h-[48px] bg-[#D32F2F] text-white rounded-lg text-[16px]"
            style={{ fontWeight: 700 }}
          >
            매수
          </button>
          <button className="h-[48px] bg-[#1565C0] text-white rounded-lg text-[16px]" style={{ fontWeight: 700 }}>
            매도
          </button>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="bg-white border-t border-[#E0E0E0] grid grid-cols-6 py-2">
        <button onClick={() => navigate("/")} className="flex flex-col items-center gap-1">
          <div className="w-6 h-6 bg-[#888888] rounded" />
          <div className="text-[10px] text-[#888888]">홈</div>
        </button>
        <button onClick={() => navigate("/balance")} className="flex flex-col items-center gap-1">
          <div className="w-6 h-6 bg-[#888888] rounded" />
          <div className="text-[10px] text-[#888888]">잔고</div>
        </button>
        <button className="flex flex-col items-center gap-1">
          <div className="w-6 h-6 bg-[#FF6600] rounded" />
          <div className="text-[10px] text-[#FF6600]">투자</div>
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

      {/* Buy Modal */}
      {showBuyModal && (
        <div
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center"
          onClick={(e) => {
            if (e.target === e.currentTarget) handleCancelBuy();
          }}
        >
          <div className="bg-white rounded-2xl p-6 w-[300px] shadow-2xl">
            {/* Header */}
            <div className="mb-3">
              <div className="flex items-center justify-between mb-2">
                <div className="text-[16px] text-[#1A2B4A]" style={{ fontWeight: 700 }}>매수 주문</div>
                <button onClick={handleCancelBuy} className="text-[20px] text-[#888888]">✕</button>
              </div>
              <div className="text-[11px] text-[#999999]">수량과 단가를 직접 입력할 수 있습니다</div>
            </div>

            {/* Stock info row */}
            <div className="mb-3 pb-3 border-b border-[#EEEEEE]">
              <div className="text-[12px] text-[#666666] mb-1">
                {selectedStock.name} {selectedStock.ticker}
              </div>
              <div className="text-[12px]" style={{ fontWeight: 700, color: changeColor }}>
                {currentPriceDisplay} {changeDisplay}
              </div>
            </div>

            {/* Field 1: 종목명 */}
            <div className="mb-3">
              <div className="text-[11px] text-[#999999] mb-1">종목명</div>
              <input
                type="text"
                value={selectedStock.name}
                readOnly
                className="w-full px-3 py-2.5 bg-[#F8F8F8] border border-[#E5E5E5] rounded-lg text-[13px]"
              />
            </div>

            {/* Field 2: 수량 */}
            <div className="mb-3">
              <div className="text-[11px] text-[#999999] mb-1">수량 (주)</div>
              <div className="relative">
                <input
                  type="number"
                  value={buyQuantity || ''}
                  onChange={(e) => setBuyQuantity(Math.max(0, Number(e.target.value)))}
                  placeholder="수량을 입력하세요"
                  className="w-full px-3 py-2.5 border border-[#E5E5E5] rounded-lg text-[13px] pr-36 focus:border-[#FF6600] focus:outline-none placeholder:text-[#BBBBBB]"
                />
                <div className="absolute right-2 top-1/2 -translate-y-1/2 flex gap-1 items-center">
                  <span className="text-[14px] text-[#888888] mr-1">✏️</span>
                  <button
                    onClick={() => setBuyQuantity(maxQuantity)}
                    className="px-2.5 py-1 bg-[#F0F4FF] border border-[#1A2B4A] rounded-md text-[11px] text-[#1A2B4A]"
                  >
                    최대
                  </button>
                  <button
                    onClick={() => setBuyQuantity(prev => Math.max(0, prev - 1))}
                    className="w-7 h-7 bg-[#F0F4FF] rounded-md flex items-center justify-center text-[16px]"
                  >
                    −
                  </button>
                  <button
                    onClick={() => setBuyQuantity(prev => prev + 1)}
                    className="w-7 h-7 bg-[#F0F4FF] rounded-md flex items-center justify-center text-[16px]"
                  >
                    +
                  </button>
                </div>
              </div>
              <div className="text-[10px] text-[#AAAAAA] mt-1">
                최대 {maxQuantity.toLocaleString()}주 구매 가능 (예수금 ₩{availableCash.toLocaleString()} 기준)
              </div>
            </div>

            {/* Field 3: 단가 */}
            <div className="mb-3">
              <div className="text-[11px] text-[#999999] mb-1">
                단가 ({selectedStock.currency === "KRW" ? "원" : "USD"})
              </div>
              <div className="relative">
                <input
                  type="number"
                  value={buyPrice}
                  onChange={(e) => setBuyPrice(Math.max(0, Number(e.target.value)))}
                  className="w-full px-3 py-2.5 border border-[#E5E5E5] rounded-lg text-[13px] pr-8 focus:border-[#FF6600] focus:outline-none"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[14px] text-[#888888]">✏️</span>
              </div>
              <div className="text-[10px] text-[#AAAAAA] mt-1">
                현재가: {selectedStock.currency === "KRW" ? "₩" : "$"}{selectedStock.price.toLocaleString(undefined, {
                  minimumFractionDigits: selectedStock.currency === "USD" ? 2 : 0,
                  maximumFractionDigits: selectedStock.currency === "USD" ? 2 : 0
                })}{selectedStock.currency === "KRW" ? "원" : ""}
              </div>
            </div>

            {/* 수정 button */}
            <div className="flex justify-end mb-3">
              <button
                onClick={() => document.querySelector<HTMLInputElement>('input[type="number"]')?.focus()}
                className="px-4 py-1.5 bg-[#F0F4FF] border border-[#1A2B4A] rounded-md text-[12px] text-[#1A2B4A]"
              >
                수정
              </button>
            </div>

            {/* 예상 체결 금액 */}
            <div className="bg-[#F8F9FA] rounded-lg p-3 mb-4">
              <div className="flex items-center justify-between">
                <div className="text-[11px] text-[#666666]">예상 체결 금액</div>
                <div className="text-[13px] text-[#1A2B4A]" style={{ fontWeight: 700 }}>
                  {estimatedTotal}
                </div>
              </div>
            </div>

            {/* Bottom Buttons */}
            <div className="flex gap-3">
              <button
                onClick={handleCancelBuy}
                className="flex-1 h-[46px] bg-white border-[1.5px] border-[#DDDDDD] rounded-lg text-[14px] text-[#666666]"
                style={{ fontWeight: 700 }}
              >
                취소
              </button>
              <button
                onClick={handleConfirmBuy}
                className="flex-1 h-[46px] bg-[#D32F2F] text-white rounded-lg text-[14px]"
                style={{ fontWeight: 700 }}
              >
                확인
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Final Confirmation Modal */}
      {showFinalConfirm && (
        <div
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center"
          onClick={(e) => {
            if (e.target === e.currentTarget) handleCancelFinalConfirm();
          }}
        >
          <div className="bg-white rounded-2xl p-6 w-[300px] shadow-2xl">
            {/* Header */}
            <div className="text-[16px] text-[#1A2B4A] mb-4" style={{ fontWeight: 700 }}>주문 확인</div>

            {/* Content Card */}
            <div className="bg-[#F8F9FA] rounded-lg p-4 mb-3">
              <div className="flex items-center justify-between mb-2">
                <div className="text-[12px] text-[#666666]">종목명</div>
                <div className="text-[13px] text-[#1A1A1A]" style={{ fontWeight: 700 }}>{selectedStock.name}</div>
              </div>
              <div className="flex items-center justify-between mb-2">
                <div className="text-[12px] text-[#666666]">수량</div>
                <div className="text-[13px] text-[#1A1A1A]" style={{ fontWeight: 700 }}>{buyQuantity}주</div>
              </div>
              <div className="flex items-center justify-between mb-3">
                <div className="text-[12px] text-[#666666]">단가</div>
                <div className="text-[13px] text-[#1A1A1A]" style={{ fontWeight: 700 }}>
                  {selectedStock.currency === "KRW" ? "₩" : "$"}
                  {buyPrice.toLocaleString(undefined, {
                    minimumFractionDigits: selectedStock.currency === "USD" ? 2 : 0,
                    maximumFractionDigits: selectedStock.currency === "USD" ? 2 : 0
                  })}
                  {selectedStock.currency === "KRW" ? "원" : ""}
                </div>
              </div>
              <div className="border-t border-[#E0E0E0] pt-3">
                <div className="flex items-center justify-between">
                  <div className="text-[12px] text-[#666666]">총 주문금액</div>
                  <div className="text-[16px] text-[#D32F2F]" style={{ fontWeight: 700 }}>
                    {selectedStock.currency === "KRW" ? "₩" : "$"}
                    {(buyQuantity * buyPrice).toLocaleString(undefined, {
                      minimumFractionDigits: selectedStock.currency === "USD" ? 2 : 0,
                      maximumFractionDigits: selectedStock.currency === "USD" ? 2 : 0
                    })}
                    {selectedStock.currency === "KRW" ? "원" : ""}
                  </div>
                </div>
              </div>
            </div>

            {/* Warning Text */}
            <div className="text-[11px] text-[#999999] text-center mb-4">
              주문 후 취소는 주문 내역에서 가능합니다
            </div>

            {/* Bottom Buttons */}
            <div className="flex gap-3">
              <button
                onClick={handleCancelFinalConfirm}
                className="flex-1 h-[46px] bg-white border-[1.5px] border-[#DDDDDD] rounded-lg text-[14px] text-[#666666]"
                style={{ fontWeight: 700 }}
              >
                취소
              </button>
              <button
                onClick={handleFinalConfirm}
                className="flex-1 h-[46px] bg-[#D32F2F] text-white rounded-lg text-[14px]"
                style={{ fontWeight: 700 }}
              >
                주문 확정
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast Message */}
      {showToast && (
        <div className="fixed bottom-24 left-1/2 -translate-x-1/2 bg-black/80 text-white text-[12px] px-5 py-2 rounded-full">
          매수 주문이 접수되었습니다
        </div>
      )}
    </div>
  );
}
