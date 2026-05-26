import { useNavigate } from "react-router";
import { ArrowLeft } from "lucide-react";
import { useState } from "react";

export function BalanceScreen() {
  const navigate = useNavigate();
  const [showCancelDialog, setShowCancelDialog] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [cancelTarget, setCancelTarget] = useState<number | null>(null);
  const [orders, setOrders] = useState([
    {
      id: 1,
      name: "삼성전자",
      type: "매수",
      quantity: 2,
      price: 219500,
      total: 439000,
      currency: "KRW",
      status: "접수 완료",
      time: "2026.04.24 14:32"
    },
    {
      id: 2,
      name: "NVIDIA",
      type: "매수",
      quantity: 1,
      price: 208.26,
      total: 208.26,
      currency: "USD",
      status: "접수 완료",
      time: "2026.04.24 11:15"
    }
  ]);

  const handleCancelClick = (orderId: number) => {
    setCancelTarget(orderId);
    setShowCancelDialog(true);
  };

  const cancelOrder = (orderId: number) => {
    setOrders(prev => prev.filter(order => order.id !== orderId));
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000);
  };

  const handleConfirmCancel = () => {
    setShowCancelDialog(false);
    if (cancelTarget !== null) {
      cancelOrder(cancelTarget);
    }
  };

  return (
    <div className="w-full h-full bg-[#F5F5F5] flex flex-col">
      {/* Top Bar */}
      <div className="bg-[#1A2B4A] px-4 py-3 flex items-center justify-between">
        <button onClick={() => navigate(-1)}>
          <ArrowLeft className="w-6 h-6 text-white/80" />
        </button>
        <div className="text-[15px] text-white" style={{ fontWeight: 700 }}>잔고</div>
        <div className="w-[72px] h-[26px] bg-transparent rounded-full p-[2px] flex border border-white/20">
          <button className="flex-1 bg-white rounded-full flex items-center justify-center text-[11px] text-[#1A2B4A]" style={{ fontWeight: 700 }}>
            국내
          </button>
          <button
            onClick={() => navigate("/balance-global")}
            className="flex-1 rounded-full flex items-center justify-center text-[11px] text-white/50"
          >
            해외
          </button>
        </div>
      </div>

      {/* Body - Scrollable */}
      <div className="flex-1 overflow-y-auto">
        {/* Section 1: Total Balance Card */}
        <div className="p-4">
          <div className="bg-[#1A2B4A] rounded-xl p-6">
            <div className="text-[12px] text-white/70 mb-2">총 평가금액</div>
            <div className="text-[22px] text-white mb-3" style={{ fontWeight: 700 }}>
              12,847,320 원
            </div>
            <div className="flex items-center gap-4 text-[14px]">
              <div className="text-[#FF9999]">수익: +847,320원</div>
              <div className="text-[#FF9999]">수익률: +7.07%</div>
            </div>
          </div>
        </div>

        {/* Section 2: Period Returns */}
        <div className="p-4 pt-0">
          <div className="bg-white rounded-lg p-4">
            <div className="text-[14px] text-[#888888] mb-3">기간 수익</div>
            <div className="space-y-2">
              <div className="flex items-center justify-between py-2">
                <div className="text-[14px] text-[#1A1A1A]">1주</div>
                <div className="text-[14px] text-[#D32F2F]">+2.3%</div>
              </div>
              <div className="flex items-center justify-between py-2">
                <div className="text-[14px] text-[#1A1A1A]">1개월</div>
                <div className="text-[14px] text-[#D32F2F]">+5.1%</div>
              </div>
              <div className="flex items-center justify-between py-2">
                <div className="text-[14px] text-[#1A1A1A]">3개월</div>
                <div className="text-[14px] text-[#1565C0]">-1.2%</div>
              </div>
              <div className="flex items-center justify-between py-2">
                <div className="text-[14px] text-[#1A1A1A]">1년</div>
                <div className="text-[14px] text-[#D32F2F]">+7.07%</div>
              </div>
            </div>
          </div>
        </div>

        {/* Section 3: Deposit */}
        <div className="p-4 pt-0">
          <div className="bg-white rounded-lg p-4">
            <div className="text-[14px] text-[#888888] mb-3">예수금</div>
            <div className="space-y-2">
              <div className="flex items-center justify-between py-2">
                <div className="text-[14px] text-[#1A1A1A]">주문가능금액</div>
                <div className="text-[14px] text-[#1A1A1A]">2,350,000원</div>
              </div>
              <div className="flex items-center justify-between py-2">
                <div className="text-[14px] text-[#1A1A1A]">D+2 예수금</div>
                <div className="text-[14px] text-[#1A1A1A]">2,350,000원</div>
              </div>
            </div>
            <div className="mt-4 pt-3 border-t border-[#F5F5F5] text-right">
              <div className="text-[10px] text-[#888888]">현재 환율: ₩1,483 / $1 · 2026.04.24 기준</div>
            </div>
          </div>
        </div>

        {/* Section 4: Holdings */}
        <div className="p-4 pt-0">
          <div className="bg-white rounded-lg p-4">
            <div className="text-[16px] text-[#1A1A1A] mb-3" style={{ fontWeight: 700 }}>보유 종목</div>
            <div className="space-y-4">
              {[
                { name: "삼성전자", qty: "20주", avg: "224,500원", value: "4,390,000원", return: "-2.23%", isPositive: false },
                { name: "SK하이닉스", qty: "5주", avg: "1,183,500원", value: "6,125,000원", return: "+3.51%", isPositive: true },
                { name: "NAVER", qty: "3주", avg: "221,000원", value: "652,500원", return: "-1.58%", isPositive: false },
              ].map((stock, i) => (
                <div key={i} className="flex items-start justify-between py-2 border-b border-[#F5F5F5] last:border-0">
                  <div>
                    <div className="text-[14px] text-[#1A1A1A] mb-1" style={{ fontWeight: 700 }}>
                      {stock.name}
                    </div>
                    <div className="text-[12px] text-[#888888]">
                      {stock.qty} · 평균 {stock.avg}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-[14px] text-[#1A1A1A] mb-1" style={{ fontWeight: 700 }}>
                      {stock.value}
                    </div>
                    <div className={`text-[12px] ${stock.isPositive ? 'text-[#D32F2F]' : 'text-[#1565C0]'}`}>
                      {stock.return}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Section 5: Order History Preview */}
        <div className="p-4 pt-0">
          <div className="bg-white rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="text-[16px] text-[#1A1A1A]" style={{ fontWeight: 700 }}>주문 내역</div>
              <button
                onClick={() => navigate("/order-history")}
                className="text-[13px] text-[#888888] flex items-center gap-1"
              >
                전체보기 ›
              </button>
            </div>
            {orders.length === 0 ? (
              <div style={{
                textAlign: "center",
                padding: "24px",
                color: "#AAAAAA",
                fontSize: "13px"
              }}>
                주문 내역이 없습니다
              </div>
            ) : (
              <div className="space-y-3">
                {orders.map((order) => (
                  <div key={order.id} className="flex items-start justify-between py-2 border-b border-[#F5F5F5] last:border-0">
                    <div className="flex-1">
                      <div className="text-[14px] text-[#1A1A1A] mb-1" style={{ fontWeight: 700 }}>
                        {order.name} / {order.type} {order.quantity}주
                      </div>
                      <div className="text-[12px] text-[#888888]">{order.time}</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="text-right">
                        <div className="text-[14px] text-[#1A1A1A] mb-1" style={{ fontWeight: 700 }}>
                          {order.currency === "KRW"
                            ? `${order.total.toLocaleString()}원`
                            : `$${order.total.toFixed(2)}`
                          }
                        </div>
                        <div className="text-[12px] text-[#2E7D32]">{order.status}</div>
                      </div>
                      <button
                        onClick={() => handleCancelClick(order.id)}
                        className="px-3 py-1 border border-[#DDDDDD] rounded-md text-[11px] text-[#666666]"
                      >
                        취소
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
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
                아니오
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
        <button className="flex flex-col items-center gap-1">
          <div className="w-6 h-6 bg-[#FF6600] rounded" />
          <div className="text-[10px] text-[#FF6600]">잔고</div>
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
