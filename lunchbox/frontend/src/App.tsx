import { useMemo, useState } from "react";

const modules = [
  "member-management",
  "team-generator",
  "exclusion-presets",
  "history-analytics",
  "restaurant-registry",
  "game-suite"
];

export default function App() {
  const [selectedModule, setSelectedModule] = useState<string>(modules[0]);
  const moduleDescription = useMemo(() => {
    switch (selectedModule) {
      case "member-management":
        return "관리자를 위한 인원 등록, 수정, 제외 기능";
      case "team-generator":
        return "주 1회 자동 팀 랜덤 매칭 및 수동 생성";
      case "exclusion-presets":
        return "반복 제외가 필요한 인원을 프리셋으로 저장";
      case "history-analytics":
        return "팀 배정 이력 조회와 개인/식당 통계";
      case "restaurant-registry":
        return "점심 식당 CRUD 및 태그 관리";
      case "game-suite":
        return "돌림판, 사다리타기 등 5가지 미니 게임";
      default:
        return "";
    }
  }, [selectedModule]);

  return (
    <main className="app">
      <h1>Lunch Team Builder</h1>
      <p>모듈형 점심 팀 빌더 프로젝트 셋업 화면입니다.</p>
      <section className="module-selector">
        <h2>주요 모듈</h2>
        <nav>
          <ul>
            {modules.map((module) => (
              <li key={module}>
                <button
                  type="button"
                  onClick={() => setSelectedModule(module)}
                  className={module === selectedModule ? "active" : ""}
                >
                  {module}
                </button>
              </li>
            ))}
          </ul>
        </nav>
        <article>
          <h3>설명</h3>
          <p>{moduleDescription}</p>
        </article>
      </section>
    </main>
  );
}
