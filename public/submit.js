document.addEventListener("DOMContentLoaded", async () => {
    const scores = JSON.parse(localStorage.getItem("surveyScores"));
  
    if (!scores) {
      document.body.innerHTML = "<p>점수 데이터를 불러올 수 없습니다.</p>";
      return;
    }
  
    const maxScorePerType = {
      일반: 14 * 5,
      인식: 12 * 5,
      성향: 9 * 5,
      의존도: 17 * 5
    };
  
    const percentageScores = {
      인식: ((scores["인식"] / maxScorePerType["인식"]) * 100).toFixed(1),
      성향: ((scores["성향"] / maxScorePerType["성향"]) * 100).toFixed(1),
      의존도: ((scores["의존도"] / maxScorePerType["의존도"]) * 100).toFixed(1)
    };
  
    const resultDiv = document.getElementById("result");
    resultDiv.innerHTML = `<h2>설문 결과 (백분율)</h2><ul>`;
  
    for (const [type, score] of Object.entries(scores)) {
      if (["일반", "인식", "성향", "의존도"].includes(type)) {
        const percentage = ((score / maxScorePerType[type]) * 100).toFixed(1);
        resultDiv.innerHTML += `<li><strong>${type}</strong>: ${percentage}%</li>`;
      }
    }
  
    // 서버에 결과 전송
    await fetch("/addResults", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        Perception: percentageScores["인식"],
        Tendency: percentageScores["성향"],
        Dependence: percentageScores["의존도"],
        Age: scores["나이"],
        Gender: scores["성별"]
      })
    });
  
    resultDiv.innerHTML += `</ul>`;
  });
  