import { useState } from "react";
import { useTest, TASKS, SUS_QUESTIONS } from "../contexts/TestContext";

const LIKERT_LABELS_EASE = ["매우 어려움", "", "", "보통", "", "", "매우 쉬움"];
const LIKERT_LABELS_CONFIDENCE = ["전혀 없음", "", "", "보통", "", "", "매우 있음"];
const LIKERT_LABELS_INFO = ["매우 부족", "", "", "보통", "", "", "매우 충분"];

function Likert7({ value, onChange, labels }: { value: number; onChange: (v: number) => void; labels: string[] }) {
  return (
    <div className="flex items-center gap-1 mt-1">
      {[1, 2, 3, 4, 5, 6, 7].map((v) => (
        <button key={v} onClick={() => onChange(v)} className="flex flex-col items-center" style={{ minWidth: 36 }}>
          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-[13px] font-bold border-2 transition-all ${
            value === v ? "bg-[#FF6600] text-white border-[#FF6600]" : "bg-white text-[#888] border-[#DDD]"
          }`}>{v}</div>
          <div className="text-[9px] text-[#999] mt-1 text-center leading-tight h-4">{labels[v - 1] || ""}</div>
        </button>
      ))}
    </div>
  );
}

function Likert5({ value, onChange }: { value: number; onChange: (v: number) => void }) {
  return (
    <div className="flex items-center gap-2 mt-1">
      {[1, 2, 3, 4, 5].map((v) => (
        <button key={v} onClick={() => onChange(v)} className="flex flex-col items-center" style={{ minWidth: 40 }}>
          <div className={`w-9 h-9 rounded-full flex items-center justify-center text-[14px] font-bold border-2 transition-all ${
            value === v ? "bg-[#1565C0] text-white border-[#1565C0]" : "bg-white text-[#888] border-[#DDD]"
          }`}>{v}</div>
          <div className="text-[9px] text-[#999] mt-1">{v === 1 ? "전혀\n아님" : v === 5 ? "매우\n그럼" : ""}</div>
        </button>
      ))}
    </div>
  );
}

const formatTime = (s: number) => {
  const m = Math.floor(s / 60);
  const sec = s % 60;
  return `${m.toString().padStart(2, "0")}:${sec.toString().padStart(2, "0")}`;
};

export function TestGuide() {
  const ctx = useTest();
  const { phase, currentTask, taskResults, susResult, version, participantId, setParticipantId, startTest, startTask, submitTaskSurvey, submitSUS, resetTest, downloadAllCSV } = ctx;

  const [ease, setEase] = useState(4);
  const [confidence, setConfidence] = useState(4);
  const [infoSufficiency, setInfoSufficiency] = useState(4);
  const [susAnswers, setSusAnswers] = useState<number[]>(new Array(10).fill(3));

  // INTRO (also idle — entering /test sets up intro)
  if (phase === "idle" || phase === "intro") {
    return (
      <div className="w-full h-full bg-white flex flex-col">
        <div className="flex-1 overflow-y-auto p-5">
          <div className="text-center mb-6 mt-4">
            <div className="text-[28px] font-bold text-[#1A1A1A] mb-2">📋 사용성 테스트</div>
            <div className="text-[14px] text-[#888] mb-1">T-STOCK 앱 {version} 버전</div>
          </div>

          <div className="bg-[#F5F5F5] rounded-xl p-4 mb-4">
            <div className="text-[15px] font-bold text-[#1A1A1A] mb-2">안내사항</div>
            <ul className="text-[13px] text-[#555] space-y-2 leading-relaxed">
              <li>• 총 <b>5개의 미션</b>을 수행합니다.</li>
              <li>• 각 미션마다 <b>시간이 측정</b>됩니다.</li>
              <li>• 미션 완료 후 간단한 <b>설문</b>에 응답합니다.</li>
              <li>• 모든 미션 후 <b>SUS 설문</b> (10문항)을 진행합니다.</li>
              <li>• 수행 중 <b>소리 내어 생각</b>해주세요 (Think-aloud).</li>
            </ul>
          </div>

          <div className="bg-[#FFF8F0] border border-[#FFE0B2] rounded-xl p-4 mb-4">
            <div className="text-[13px] text-[#E65100] leading-relaxed">
              ⚠️ 정답이 있는 테스트가 아닙니다. 편하게 사용하시면 됩니다. 어려운 부분이 있다면 그것도 중요한 피드백입니다.
            </div>
          </div>

          <div className="bg-[#F5F5F5] rounded-xl p-4">
            <div className="text-[15px] font-bold text-[#1A1A1A] mb-2">미션 목록 미리보기</div>
            {TASKS.map((task, i) => (
              <div key={i} className="flex items-start gap-2 py-2 border-b border-[#E8E8E8] last:border-0">
                <div className="w-6 h-6 rounded-full bg-[#FF6600] text-white text-[12px] flex items-center justify-center font-bold flex-shrink-0 mt-0.5">{i + 1}</div>
                <div className="text-[13px] text-[#555]">{task.mission}</div>
              </div>
            ))}
          </div>

          {/* 참가자 ID 입력 */}
          <div className="bg-white border border-[#E0E0E0] rounded-xl p-4 mt-4">
            <div className="text-[14px] font-bold text-[#1A1A1A] mb-2">참가자 정보</div>
            <input
              type="text"
              value={participantId}
              onChange={(e) => setParticipantId(e.target.value)}
              placeholder="참가자 ID (예: P01)"
              className="w-full px-3 py-2.5 border border-[#DDD] rounded-lg text-[14px] text-[#1A1A1A] outline-none focus:border-[#FF6600]"
            />
          </div>
        </div>
        <div className="p-4 border-t border-[#E0E0E0]">
          <button
            onClick={startTest}
            disabled={!participantId.trim()}
            className={`w-full py-3.5 rounded-xl text-[16px] font-bold ${
              participantId.trim()
                ? "bg-[#FF6600] text-white"
                : "bg-[#E0E0E0] text-[#AAA]"
            }`}
          >
            테스트 시작하기
          </button>
        </div>
      </div>
    );
  }

  // TASK BRIEFING
  if (phase === "task-briefing") {
    const task = TASKS[currentTask];
    return (
      <div className="w-full h-full bg-white flex flex-col">
        <div className="flex-1 flex flex-col items-center justify-center p-6">
          <div className="w-14 h-14 rounded-full bg-[#FF6600] text-white text-[24px] flex items-center justify-center font-bold mb-4">{task.id}</div>
          <div className="text-[18px] font-bold text-[#1A1A1A] mb-2 text-center">{task.title}</div>
          <div className="text-[13px] text-[#888] mb-6">미션 {currentTask + 1} / {TASKS.length}</div>

          <div className="bg-[#FFF8F0] border border-[#FFE0B2] rounded-xl p-5 w-full mb-6">
            <div className="text-[11px] text-[#E65100] font-bold mb-2">📌 미션</div>
            <div className="text-[15px] text-[#1A1A1A] leading-relaxed font-medium">{task.mission}</div>
          </div>

          <div className="text-[12px] text-[#AAA] text-center">
            "시작" 버튼을 누르면 타이머가 시작되고<br />앱 홈 화면으로 이동합니다.
          </div>
        </div>
        <div className="p-4 border-t border-[#E0E0E0]">
          <button onClick={startTask} className="w-full py-3.5 bg-[#FF6600] text-white rounded-xl text-[16px] font-bold">시작</button>
        </div>
      </div>
    );
  }

  // TASK SURVEY
  if (phase === "task-survey") {
    const task = TASKS[currentTask];
    // Find the time from the context's taskTimeRef indirectly via elapsed
    return (
      <div className="w-full h-full bg-white flex flex-col">
        <div className="bg-[#FF6600] px-4 py-3 text-white">
          <div className="text-[14px] font-bold">Task {currentTask + 1} 완료! 🎉</div>
          <div className="text-[12px] opacity-80">소요 시간: {formatTime(ctx.elapsed)}</div>
        </div>
        <div className="flex-1 overflow-y-auto p-4">
          <div className="bg-[#F5F5F5] rounded-lg p-3 mb-5 text-[13px] text-[#555]">{task.mission}</div>

          <div className="mb-5">
            <div className="text-[14px] font-bold text-[#1A1A1A] mb-2">이 과업은 얼마나 쉬웠나요?</div>
            <Likert7 value={ease} onChange={setEase} labels={LIKERT_LABELS_EASE} />
          </div>
          <div className="mb-5">
            <div className="text-[14px] font-bold text-[#1A1A1A] mb-2">수행하면서 얼마나 자신감이 있었나요?</div>
            <Likert7 value={confidence} onChange={setConfidence} labels={LIKERT_LABELS_CONFIDENCE} />
          </div>
          <div className="mb-5">
            <div className="text-[14px] font-bold text-[#1A1A1A] mb-2">제공된 정보는 충분했나요?</div>
            <Likert7 value={infoSufficiency} onChange={setInfoSufficiency} labels={LIKERT_LABELS_INFO} />
          </div>
        </div>
        <div className="p-4 border-t border-[#E0E0E0]">
          <button
            onClick={() => {
              submitTaskSurvey(ease, confidence, infoSufficiency);
              setEase(4);
              setConfidence(4);
              setInfoSufficiency(4);
            }}
            className="w-full py-3.5 bg-[#FF6600] text-white rounded-xl text-[16px] font-bold"
          >
            {currentTask < TASKS.length - 1 ? "다음 미션으로" : "SUS 설문으로"}
          </button>
        </div>
      </div>
    );
  }

  // SUS
  if (phase === "sus") {
    return (
      <div className="w-full h-full bg-white flex flex-col">
        <div className="bg-[#1565C0] px-4 py-3 text-white">
          <div className="text-[16px] font-bold">📊 SUS 설문</div>
          <div className="text-[12px] opacity-80">System Usability Scale (1~5점)</div>
        </div>
        <div className="flex-1 overflow-y-auto p-4">
          <div className="text-[12px] text-[#888] mb-4">각 문항에 대해 1(전혀 아님)~5(매우 그럼)로 선택하세요.</div>
          {SUS_QUESTIONS.map((q, i) => (
            <div key={i} className="mb-5 pb-4 border-b border-[#F0F0F0] last:border-0">
              <div className="text-[13px] text-[#1A1A1A] mb-2 leading-relaxed">
                <span className="font-bold text-[#1565C0]">{i + 1}.</span> {q}
              </div>
              <Likert5 value={susAnswers[i]} onChange={(v) => { const a = [...susAnswers]; a[i] = v; setSusAnswers(a); }} />
            </div>
          ))}
        </div>
        <div className="p-4 border-t border-[#E0E0E0]">
          <button onClick={() => submitSUS(susAnswers)} className="w-full py-3.5 bg-[#1565C0] text-white rounded-xl text-[16px] font-bold">제출하기</button>
        </div>
      </div>
    );
  }

  // RESULTS
  if (phase === "results") {
    return (
      <div className="w-full h-full bg-white flex flex-col">
        <div className="bg-[#1A1A1A] px-4 py-3 text-white">
          <div className="text-[16px] font-bold">📈 테스트 결과</div>
          <div className="text-[12px] opacity-70">버전 {version} · 참가자: {participantId}</div>
        </div>
        <div className="flex-1 overflow-y-auto p-4">
          <div className="bg-[#E3F2FD] rounded-xl p-4 mb-4 text-center">
            <div className="text-[13px] text-[#1565C0] mb-1">SUS 총점</div>
            <div className="text-[36px] font-bold text-[#1565C0]">{susResult?.totalScore.toFixed(1)}</div>
            <div className="text-[11px] text-[#888] mt-1">
              {(susResult?.totalScore ?? 0) >= 68 ? "평균 이상 ✅" : "평균 미만 ⚠️"} (기준: 68점)
            </div>
          </div>

          <div className="text-[15px] font-bold text-[#1A1A1A] mb-3">과업별 결과</div>
          {taskResults.map((r, i) => (
            <div key={i} className="bg-[#F5F5F5] rounded-lg p-3 mb-2">
              <div className="flex justify-between items-center mb-2">
                <div className="text-[13px] font-bold text-[#1A1A1A]">Task {i + 1}</div>
                <div className="text-[14px] font-bold text-[#FF6600]">{formatTime(r.timeSeconds)}</div>
              </div>
              {r.answer && (
                <div className="text-[12px] text-[#1565C0] mb-1">답변: {r.answer}</div>
              )}
              <div className="flex gap-3 text-[11px] text-[#888]">
                <span>난이도: {r.ease}/7</span>
                <span>자신감: {r.confidence}/7</span>
                <span>정보충분: {r.infoSufficiency}/7</span>
              </div>
            </div>
          ))}

          <div className="text-[15px] font-bold text-[#1A1A1A] mb-3 mt-4">SUS 응답 상세</div>
          {SUS_QUESTIONS.map((q, i) => (
            <div key={i} className="flex justify-between items-center py-2 border-b border-[#F0F0F0] last:border-0">
              <div className="text-[11px] text-[#555] flex-1 pr-2">{i + 1}. {q}</div>
              <div className="text-[13px] font-bold text-[#1565C0]">{susResult?.answers[i]}</div>
            </div>
          ))}

          <div className="mt-4 bg-[#E8F5E9] border border-[#A5D6A7] rounded-lg p-3">
            <div className="text-[12px] text-[#2E7D32]">✅ 결과가 CSV 파일로 자동 저장되었습니다. (누적 {(localStorage.getItem("tstock_test_results") || "").split("\n").length}명)</div>
          </div>
        </div>

        <div className="p-4 border-t border-[#E0E0E0] flex gap-2">
          <button
            onClick={downloadAllCSV}
            className="flex-1 py-3 bg-[#1565C0] text-white rounded-xl text-[14px] font-bold"
          >📥 전체 CSV 다운로드</button>
          <button
            onClick={() => { resetTest(); setSusAnswers(new Array(10).fill(3)); }}
            className="flex-1 py-3 bg-[#FF6600] text-white rounded-xl text-[14px] font-bold"
          >다음 참가자</button>
        </div>
      </div>
    );
  }

  return null;
}

/** Floating overlay shown on ALL pages when a task is running */
export function TestFloatingOverlay() {
  const { phase, currentTask, elapsed, taskAnswer, setTaskAnswer, completeTask } = useTest();

  if (phase !== "task-running") return null;

  return (
    <div style={{
      position: "fixed",
      bottom: 0,
      left: 0,
      right: 0,
      zIndex: 10000,
      background: "rgba(0,0,0,0.9)",
      padding: "10px 16px 14px",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: 8,
    }}>
      {/* 타이머 */}
      <div style={{
        display: "flex",
        alignItems: "center",
        gap: 10,
        width: "100%",
        justifyContent: "center",
      }}>
        <span style={{ color: "#FF6600", fontSize: 13, fontWeight: 700 }}>Task {currentTask + 1}</span>
        <span style={{ color: "#FFF", fontSize: 13, fontWeight: 700 }}>⏱ {formatTime(elapsed)}</span>
      </div>

      {/* 답변 입력 + 제출 버튼 */}
      <div style={{ display: "flex", gap: 8, width: "100%", maxWidth: 420 }}>
        <input
          type="text"
          value={taskAnswer}
          onChange={(e) => setTaskAnswer(e.target.value)}
          placeholder="답변 입력 (예: PER 12.5)"
          style={{
            flex: 1,
            padding: "9px 12px",
            borderRadius: 8,
            border: "none",
            fontSize: 14,
            outline: "none",
          }}
        />
        <button
          onClick={completeTask}
          style={{
            background: "#FF6600",
            color: "white",
            border: "none",
            padding: "9px 20px",
            borderRadius: 8,
            fontSize: 14,
            fontWeight: 700,
            cursor: "pointer",
            whiteSpace: "nowrap",
          }}
        >
          제출
        </button>
      </div>
    </div>
  );
}
