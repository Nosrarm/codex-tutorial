import express from "express";
import cors from "cors";
import helmet from "helmet";

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());

app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.get("/modules", (_req, res) => {
  res.json({
    modules: [
      { id: "member-management", description: "인원 등록 및 제외 관리" },
      { id: "team-generator", description: "주 1회 팀 자동 생성" },
      { id: "exclusion-presets", description: "제외 프리셋 관리" },
      { id: "history-analytics", description: "팀 이력 및 통계" },
      { id: "restaurant-registry", description: "식당 CRUD" },
      { id: "game-suite", description: "돌림판, 사다리 등 미니 게임" }
    ]
  });
});

const PORT = process.env.PORT ?? 4000;

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Lunch team backend running on port ${PORT}`);
});
