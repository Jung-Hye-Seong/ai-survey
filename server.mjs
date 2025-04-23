import express from "express";
import cors from "cors";
import { fileURLToPath } from "url";
import path from "path";
import questions from "./questions.json" assert { type: "json" };
import fs from "fs/promises";
import { saveResult } from "./db.js";


const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.get('/questions', (req, res) => {
    res.json(questions);
});
  
app.post("/addResults", async (req, res) => {
    try {
      const { Perception, Tendency, Dependence, Age, Gender } = req.body;
  
      const resultEntry = { Perception, Tendency, Dependence, Age, Gender };
      await saveResult(resultEntry);

  
      res.status(200).json({ message: "결과 저장 완료" });
    } catch (err) {
      console.error("결과 저장 오류:", err);
      res.status(500).json({ error: "서버 오류" });
    }
  });
  

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
