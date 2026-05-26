import { useNavigate } from "react-router";
import { useState } from "react";
import { ChevronDown } from "lucide-react";

export function BankingScreen() {
  const navigate = useNavigate();
  const [selectedBank, setSelectedBank] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [amount, setAmount] = useState("");
  const [memo, setMemo] = useState("");
  const [showComingSoonModal, setShowComingSoonModal] = useState(false);

  const banks = [
    "미래에셋증권",
    "국민은행",
    "신한은행",
    "하나은행",
    "우리은행",
    "카카오뱅크",
    "토스뱅크",
    "기업은행",
  ];

  const handleTransfer = () => {
    setShowComingSoonModal(true);
  };

  const addAmount = (value: number) => {
    const currentAmount = amount ? parseInt(amount.replace(/,/g, "")) : 0;
    const newAmount = currentAmount + value;
    setAmount(newAmount.toLocaleString());
  };

  const setMaxAmount = () => {
    setAmount("3,120,000");
  };

  return (
    <div className="w-full h-full bg-[#F5F5F5] flex flex-col relative">
      {/* Top Bar */}
      <div className="bg-[#1A2B4A] px-4 py-3 flex items-center justify-center">
        <div className="text-[15px] text-white" style={{ fontWeight: 700 }}>뱅킹</div>
      </div>

      {/* Body - Scrollable */}
      <div className="flex-1 overflow-y-auto">
        {/* Section 1: Withdrawal Available */}
        <div className="p-4">
          <div className="bg-[#1A2B4A] rounded-xl p-6">
            <div className="text-[11px] text-white/60 mb-2">인출 가능 금액</div>
            <div className="text-[22px] text-white mb-2" style={{ fontWeight: 700 }}>
              3,120,000 원
            </div>
            <div className="text-[10px] text-white/50">CMA 계좌 · 미래에셋증권</div>
          </div>
        </div>

        {/* Section 2: Transfer Form */}
        <div className="px-4 pb-4">
          <div className="bg-white rounded-lg p-4">
            <div className="text-[12px] text-[#1A2B4A] mb-4" style={{ fontWeight: 700 }}>
              이체하기
            </div>

            {/* Field 1: Bank Selection */}
            <div className="mb-4">
              <div className="text-[11px] text-[#888888] mb-2">이체 은행</div>
              <div className="relative">
                <select
                  value={selectedBank}
                  onChange={(e) => setSelectedBank(e.target.value)}
                  className="w-full px-3 py-3 bg-[#f8f8f8] border border-[#e5e5e5] rounded-lg text-[13px] appearance-none outline-none"
                >
                  <option value="">은행을 선택하세요</option>
                  {banks.map((bank) => (
                    <option key={bank} value={bank}>
                      {bank}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#888888] pointer-events-none" />
              </div>
            </div>

            {/* Field 2: Account Number */}
            <div className="mb-4">
              <div className="text-[11px] text-[#888888] mb-2">이체 계좌번호</div>
              <input
                type="text"
                value={accountNumber}
                onChange={(e) => setAccountNumber(e.target.value.replace(/[^0-9]/g, ""))}
                placeholder="계좌번호 입력 (숫자만)"
                className="w-full px-3 py-3 bg-[#f8f8f8] rounded-lg text-[13px] outline-none"
              />
            </div>

            {/* Field 3: Amount */}
            <div className="mb-4">
              <div className="text-[11px] text-[#888888] mb-2">이체 금액</div>
              <input
                type="text"
                value={amount}
                onChange={(e) => setAmount(e.target.value.replace(/[^0-9,]/g, ""))}
                placeholder="금액 입력 (원)"
                className="w-full px-3 py-3 bg-[#f8f8f8] rounded-lg text-[13px] outline-none mb-2"
              />
              <div className="flex gap-2">
                <button
                  onClick={() => addAmount(100000)}
                  className="flex-1 px-3 py-2 bg-[#f8f8f8] rounded-full text-[11px] text-[#1A1A1A]"
                >
                  +10만
                </button>
                <button
                  onClick={() => addAmount(500000)}
                  className="flex-1 px-3 py-2 bg-[#f8f8f8] rounded-full text-[11px] text-[#1A1A1A]"
                >
                  +50만
                </button>
                <button
                  onClick={() => addAmount(1000000)}
                  className="flex-1 px-3 py-2 bg-[#f8f8f8] rounded-full text-[11px] text-[#1A1A1A]"
                >
                  +100만
                </button>
                <button
                  onClick={setMaxAmount}
                  className="flex-1 px-3 py-2 bg-[#f8f8f8] rounded-full text-[11px] text-[#1A1A1A]"
                >
                  전액
                </button>
              </div>
            </div>

            {/* Field 4: Memo */}
            <div className="mb-4">
              <div className="text-[11px] text-[#888888] mb-2">이체 메모 (선택)</div>
              <input
                type="text"
                value={memo}
                onChange={(e) => setMemo(e.target.value)}
                placeholder="메모 입력"
                className="w-full px-3 py-3 bg-[#f8f8f8] rounded-lg text-[13px] outline-none"
              />
            </div>

            {/* Transfer Button */}
            <button
              onClick={handleTransfer}
              className="w-full py-3 bg-[#1A2B4A] text-white rounded-lg text-[13px]"
              style={{ fontWeight: 700 }}
            >
              이체하기
            </button>
          </div>
        </div>

        {/* Section 3: Recent Transfers */}
        <div className="px-4 pb-4">
          <div className="bg-white rounded-lg p-4">
            <div className="text-[12px] text-[#1A2B4A] mb-3" style={{ fontWeight: 700 }}>
              최근 이체 내역
            </div>
            <div className="space-y-3">
              {[
                { bank: "국민은행", account: "123-456-789012", date: "2026.04.22", amount: "-500,000원" },
                { bank: "카카오뱅크", account: "3333-01-234567", date: "2026.04.18", amount: "-1,000,000원" },
              ].map((transfer, i) => (
                <div key={i} className="flex items-center justify-between py-2 border-b border-[#F5F5F5] last:border-0">
                  <div>
                    <div className="text-[13px] text-[#1A1A1A] mb-1">
                      {transfer.bank} · {transfer.account}
                    </div>
                    <div className="text-[11px] text-[#888888]">{transfer.date}</div>
                  </div>
                  <div className="text-[13px] text-[#1565C0]" style={{ fontWeight: 700 }}>
                    {transfer.amount}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Coming Soon Modal */}
      {showComingSoonModal && (
        <div
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center"
          onClick={(e) => {
            if (e.target === e.currentTarget) setShowComingSoonModal(false);
          }}
        >
          <div className="bg-white rounded-2xl p-6 w-[280px] shadow-2xl">
            <div className="text-[15px] text-[#1A2B4A] text-center mb-2" style={{ fontWeight: 700 }}>
              준비 중인 기능입니다
            </div>
            <div className="text-[13px] text-[#666666] text-center mb-5">
              실제 앱 출시 시 이용 가능합니다.
            </div>
            <button
              onClick={() => setShowComingSoonModal(false)}
              className="w-full h-[44px] bg-[#1A2B4A] text-white rounded-lg text-[14px]"
              style={{ fontWeight: 700 }}
            >
              확인
            </button>
          </div>
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
        <button className="flex flex-col items-center gap-1">
          <div className="w-6 h-6 bg-[#FF6600] rounded" />
          <div className="text-[10px] text-[#FF6600]">뱅킹</div>
        </button>
        <button onClick={() => navigate("/settings")} className="flex flex-col items-center gap-1">
          <div className="w-6 h-6 bg-[#888888] rounded" />
          <div className="text-[10px] text-[#888888]">설정</div>
        </button>
      </div>
    </div>
  );
}
