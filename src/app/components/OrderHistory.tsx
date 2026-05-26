import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router";
import { useState } from "react";

export function OrderHistory() {
  const navigate = useNavigate();
  const [showCancelDialog, setShowCancelDialog] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [cancelTarget, setCancelTarget] = useState<number | null>(null);
  const [orders, setOrders] = useState([
    { id: 1, name: "삼성전자", ticker: "005930", type: "매수", qty: "2주", price: "219,500원", amount: "439,000원", status: "접수 완료", time: "2026.04.24 14:32", isKRW: true, canceled: false },
    { id: 2, name: "NVIDIA", ticker: "NVDA", type: "매수", qty: "1주", price: "$208.26", amount: "$208.26", status: "접수 완료", time: "2026.04.24 11:15", isKRW: false, canceled: false },
    { id: 3, name: "SK하이닉스", ticker: "000660", type: "매수", qty: "3주", price: "1,225,000원", amount: "3,675,000원", status: "접수 완료", time: "2026.04.23 16:45", isKRW: true, canceled: false },
    { id: 4, name: "Apple", ticker: "AAPL", type: "매수", qty: "2주", price: "$274.43", amount: "$548.86", status: "체결 완료", time: "2026.04.23 10:22", isKRW: false, canceled: false },
    { id: 5, name: "NAVER", ticker: "035420", type: "매도", qty: "1주", price: "217,500원", amount: "217,500원", status: "체결 완료", time: "2026.04.22 13:18", isKRW: true, canceled: false }
  ]);

  const handleCancelClick = (orderId: number) => {
    setCancelTarget(orderId);
    setShowCancelDialog(true);
  };

  const handleConfirmCancel = () => {
    if (cancelTarget !== null) {
      setOrders(orders.map(order =>
        order.id === cancelTarget ? { ...order, canceled: true, status: "취소됨" } : order
      ));
    }
    setShowCancelDialog(false);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000);
  };

  return (
    <div className="w-full h-full bg-[#F5F5F5] flex flex-col">
      {/* Top Bar */}
      <div className="bg-[#1A2B4A] px-4 py-3 flex items-center justify-between">
        <button onClick={() => navigate(-1)}>
          <ArrowLeft className="w-6 h-6 text-white/80" />
        </button>
        <div className="text-[15px] text-white" style={{ fontWeight: 700 }}>주문 내역</div>
        <div className="w-6 h-6" />
      </div>

      {/* Body - Scrollable */}
      <div className="flex-1 overflow-y-auto">
        {/* Filter Tabs */}
        <div className="bg-white px-4 flex gap-4 border-b border-[#E0E0E0]">
          <button className="py-3 text-[14px] text-[#1A1A1A] border-b-2 border-[#FF6600]">
            전체
          </button>
          <button className="py-3 text-[14px] text-[#888888]">접수 완료</button>
          <button className="py-3 text-[14px] text-[#888888]">체결 완료</button>
          <button className="py-3 text-[14px] text-[#888888]">취소됨</button>
        </div>

        {/* Order List */}
        <div className="p-4 space-y-3">
          {orders.map((order) => (
            <div key={order.id} className="bg-white rounded-lg p-4 shadow-sm">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="text-[16px] text-[#1A1A1A]" style={{ fontWeight: 700 }}>
                      {order.name}
                    </div>
                    <div className={`text-[12px] px-2 py-0.5 rounded ${
                      order.type === "매수" ? "bg-[#FFEBEE] text-[#D32F2F]" : "bg-[#E3F2FD] text-[#1565C0]"
                    }`}>
                      {order.type}
                    </div>
                  </div>
                  <div className="text-[12px] text-[#888888]">{order.ticker}</div>
                </div>
                <div className={`text-[13px] px-3 py-1 rounded-full ${
                  order.status === "접수 완료" ? "bg-[#E8F5E9] text-[#2E7D32]" :
                  order.status === "체결 완료" ? "bg-[#E3F2FD] text-[#1565C0]" :
                  "bg-[#F5F5F5] text-[#888888]"
                }`}>
                  {order.status}
                </div>
              </div>

              <div className="space-y-2 mb-3">
                <div className="flex items-center justify-between">
                  <div className="text-[13px] text-[#888888]">주문수량</div>
                  <div className="text-[13px] text-[#1A1A1A]">{order.qty}</div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="text-[13px] text-[#888888]">주문단가</div>
                  <div className="text-[13px] text-[#1A1A1A]">{order.price}</div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="text-[13px] text-[#888888]">주문금액</div>
                  <div className="text-[14px] text-[#1A1A1A]" style={{ fontWeight: 700 }}>{order.amount}</div>
                </div>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-[#F5F5F5]">
                <div className="text-[11px] text-[#AAAAAA]">{order.time}</div>
                {order.status === "접수 완료" && !order.canceled && (
                  <button
                    onClick={() => handleCancelClick(order.id)}
                    className="px-4 py-1.5 border border-[#DDDDDD] rounded-md text-[12px] text-[#666666]"
                  >
                    취소
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Cancel Confirmation Dialog */}
      {showCancelDialog && (
        <div
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center"
          onClick={(e) => {
            if (e.target === e.currentTarget) setShowCancelDialog(false);
          }}
        >
          <div className="bg-white rounded-2xl p-6 w-[280px] shadow-2xl">
            <div className="text-[15px] text-[#1A2B4A] text-center mb-5" style={{ fontWeight: 700 }}>
              주문을 취소하시겠습니까?
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setShowCancelDialog(false)}
                className="flex-1 h-[44px] bg-white border-[1.5px] border-[#DDDDDD] rounded-lg text-[14px] text-[#666666]"
                style={{ fontWeight: 700 }}
              >
                취소
              </button>
              <button
                onClick={handleConfirmCancel}
                className="flex-1 h-[44px] bg-[#1A2B4A] text-white rounded-lg text-[14px]"
                style={{ fontWeight: 700 }}
              >
                확인
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast Message */}
      {showToast && (
        <div className="fixed bottom-24 left-1/2 -translate-x-1/2 bg-black/75 text-white text-[12px] px-5 py-2 rounded-[20px] z-50">
          주문이 취소되었습니다
        </div>
      )}

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
    </div>
  );
}
