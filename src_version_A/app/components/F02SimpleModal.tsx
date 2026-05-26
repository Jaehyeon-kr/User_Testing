interface F02SimpleModalProps {
  onConfirm: () => void;
  onCancel: () => void;
}

export function F02SimpleModal({ onConfirm, onCancel }: F02SimpleModalProps) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-[12px] w-[300px] p-6">
        <div className="text-[16px] text-[#1A1A1A] mb-3" style={{ fontWeight: 700 }}>
          심플 모드로 전환
        </div>
        <div className="text-[13px] text-[#888888] mb-6 leading-relaxed">
          복잡한 정보를 줄이고 핵심만 보여주는 초보자 친화 화면으로 전환합니다.
        </div>
        <div className="flex gap-2">
          <button
            onClick={onCancel}
            className="flex-1 py-2 border border-[#888888] text-[#888888] text-[14px] rounded"
          >
            취소
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 py-2 bg-[#FF6600] text-white text-[14px] rounded"
          >
            확인
          </button>
        </div>
      </div>
    </div>
  );
}
