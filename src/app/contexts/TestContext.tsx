import { createContext, useContext, useState, useRef, useEffect, type ReactNode } from "react";
import { useNavigate } from "react-router";

interface TaskResult {
  taskIndex: number;
  timeSeconds: number;
  completed: boolean;
  answer: string;
  ease: number;
  confidence: number;
  infoSufficiency: number;
}

interface SUSResult {
  answers: number[];
  totalScore: number;
}

export type TestPhase = "idle" | "intro" | "task-briefing" | "task-running" | "task-survey" | "sus" | "results";

interface TestContextType {
  phase: TestPhase;
  currentTask: number;
  elapsed: number;
  taskResults: TaskResult[];
  susResult: SUSResult | null;
  version: "A" | "B";
  participantId: string;
  setParticipantId: (id: string) => void;
  startTest: () => void;
  taskAnswer: string;
  setTaskAnswer: (answer: string) => void;
  startTask: () => void;
  completeTask: () => void;
  submitTaskSurvey: (ease: number, confidence: number, info: number) => void;
  submitSUS: (answers: number[]) => void;
  resetTest: () => void;
  goToTest: () => void;
  downloadAllCSV: () => void;
}

const TestContext = createContext<TestContextType | null>(null);

export const TASKS = [
  {
    id: 1,
    title: "Task 1: 종목 조회 및 정보 파악",
    mission: "홈 화면에서 삼성전자 종목을 찾아 클릭한 뒤, 해당 종목의 PER 값이 무엇인지 말해주세요.",
    hint: "측정: 완료 시간, 정답 여부 (H10-툴팁, H6-색상범례)",
  },
  {
    id: 2,
    title: "Task 2: 주식 주문 실행",
    mission: "삼성전자 주식 2주를 현재 가격으로 매수 주문해주세요.",
    hint: "측정: 완료 시간, 오류 횟수 (H5-최종확인, H3-수정버튼, H2-최대수량)",
  },
  {
    id: 3,
    title: "Task 3: 주문 취소",
    mission: "방금 주문한 삼성전자 2주 주문을 취소해주세요.",
    hint: "측정: 완료 시간, 주문 내역 도달 여부 (H3-주문취소버튼)",
  },
  {
    id: 4,
    title: "Task 4: 심플 모드 메뉴 커스터마이징",
    mission: "심플 모드로 전환한 뒤, 설정에서 '글로벌 증시' 메뉴를 추가하고 저장해주세요.",
    hint: "측정: 완료 시간, 저장 인지 여부 (H1-토스트, H3-취소/복원, H5-메뉴0개방지)",
  },
  {
    id: 5,
    title: "Task 5: 여론 분석 정보 확인",
    mission: "삼성전자의 여론 분석 화면에서 데이터의 수집 기간이 어떻게 되는지 확인해주세요.",
    hint: "측정: 정답 여부 (H2-데이터출처)",
  },
];

export const SUS_QUESTIONS = [
  "이 시스템을 자주 사용하고 싶다",
  "이 시스템이 불필요하게 복잡하다고 느꼈다",
  "이 시스템은 사용하기 쉬웠다",
  "이 시스템을 사용하려면 전문가의 도움이 필요할 것 같다",
  "이 시스템의 다양한 기능이 잘 통합되어 있다",
  "이 시스템에 일관성이 없는 부분이 너무 많다",
  "대부분의 사람들이 이 시스템 사용법을 빠르게 배울 것이다",
  "이 시스템은 사용하기 매우 번거로웠다",
  "이 시스템을 사용하는 데 자신감이 있었다",
  "이 시스템을 사용하기 전에 많은 것을 배워야 했다",
];

export function TestProvider({ children, onTaskStart }: { children: ReactNode; onTaskStart?: () => void }) {
  const navigate = useNavigate();
  const version = (new URLSearchParams(window.location.search).get("version") === "A" ? "A" : "B") as "A" | "B";

  const [phase, setPhase] = useState<TestPhase>("idle");
  const [currentTask, setCurrentTask] = useState(0);
  const [elapsed, setElapsed] = useState(0);
  const [taskResults, setTaskResults] = useState<TaskResult[]>([]);
  const [susResult, setSusResult] = useState<SUSResult | null>(null);
  const [participantId, setParticipantId] = useState("");
  const [taskAnswer, setTaskAnswer] = useState("");

  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const startTimeRef = useRef(0);
  const taskTimeRef = useRef(0);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  const versionParam = version === "A" ? "?version=A" : "";

  const startTest = () => {
    setCurrentTask(0);
    setPhase("task-briefing");
    navigate("/" + versionParam);
  };

  const startTask = () => {
    setPhase("task-running");
    setTaskAnswer("");
    onTaskStart?.();
    startTimeRef.current = Date.now();
    setElapsed(0);
    timerRef.current = setInterval(() => {
      setElapsed(Math.floor((Date.now() - startTimeRef.current) / 1000));
    }, 100);
    navigate("/home" + versionParam);
  };

  const completeTask = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    taskTimeRef.current = Math.floor((Date.now() - startTimeRef.current) / 1000);
    setPhase("task-survey");
    navigate("/" + versionParam);
  };

  const submitTaskSurvey = (ease: number, confidence: number, info: number) => {
    const result: TaskResult = {
      taskIndex: currentTask,
      timeSeconds: taskTimeRef.current,
      completed: true,
      answer: taskAnswer,
      ease,
      confidence,
      infoSufficiency: info,
    };
    setTaskResults((prev) => [...prev, result]);

    if (currentTask < TASKS.length - 1) {
      setCurrentTask((prev) => prev + 1);
      setPhase("task-briefing");
    } else {
      setPhase("sus");
    }
  };

  const generateCSVRow = (tasks: TaskResult[], susAnswers: number[], susTotal: number) => {
    // One row per participant:
    // participantId, version, timestamp,
    // task1_time, task1_ease, task1_confidence, task1_info,
    // task2_time, ... (x5 tasks),
    // sus1, sus2, ... sus10, sus_total
    const timestamp = new Date().toISOString();
    const taskCols = tasks.flatMap((t) => [t.timeSeconds, `"${t.answer.replace(/"/g, '""')}"`, t.ease, t.confidence, t.infoSufficiency]);
    return [participantId, version, timestamp, ...taskCols, ...susAnswers, susTotal.toFixed(1)].join(",");
  };

  const CSV_HEADER = [
    "participant_id", "version", "timestamp",
    ...TASKS.flatMap((_, i) => [`task${i+1}_time_sec`, `task${i+1}_answer`, `task${i+1}_ease`, `task${i+1}_confidence`, `task${i+1}_info`]),
    ...Array.from({length: 10}, (_, i) => `sus_q${i+1}`),
    "sus_total",
  ].join(",");

  const saveAndDownloadCSV = (tasks: TaskResult[], susAnswers: number[], susTotal: number) => {
    const newRow = generateCSVRow(tasks, susAnswers, susTotal);

    // Accumulate in localStorage
    const existing = localStorage.getItem("tstock_test_results") || "";
    const updated = existing ? existing + "\n" + newRow : newRow;
    localStorage.setItem("tstock_test_results", updated);

    // Auto-download full CSV
    const csv = CSV_HEADER + "\n" + updated;
    const blob = new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `tstock_ab_test_results.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const downloadAllCSV = () => {
    const existing = localStorage.getItem("tstock_test_results") || "";
    if (!existing) {
      alert("저장된 결과가 없습니다.");
      return;
    }
    const csv = CSV_HEADER + "\n" + existing;
    const blob = new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `tstock_ab_test_results.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const submitSUS = (answers: number[]) => {
    let total = 0;
    answers.forEach((ans, i) => {
      if (i % 2 === 0) total += ans - 1;
      else total += 5 - ans;
    });
    total *= 2.5;
    setSusResult({ answers: [...answers], totalScore: total });

    // Auto-save CSV
    saveAndDownloadCSV(taskResults, answers, total);

    setPhase("results");
  };

  const resetTest = () => {
    setPhase("idle");
    setCurrentTask(0);
    setTaskResults([]);
    setSusResult(null);
    setParticipantId("");
    navigate("/" + versionParam);
  };

  const goToTest = () => {
    navigate("/" + versionParam);
  };

  return (
    <TestContext.Provider
      value={{
        phase, currentTask, elapsed, taskResults, susResult, version,
        participantId, setParticipantId, taskAnswer, setTaskAnswer,
        startTest, startTask, completeTask, submitTaskSurvey, submitSUS, resetTest, goToTest, downloadAllCSV,
      }}
    >
      {children}
    </TestContext.Provider>
  );
}

export function useTest() {
  const ctx = useContext(TestContext);
  if (!ctx) throw new Error("useTest must be used within TestProvider");
  return ctx;
}
