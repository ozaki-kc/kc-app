import { useState } from 'react';

export default function Home() {
  const questions = [
    { question: "駅まで徒歩何分？", options: ["～10分以内", "11～15分", "16～20分", "21～30分", "31分以上"], scores: [5, 4, 3, 2, 1] },
    { question: "小学校まで徒歩何分？", options: ["～10分以内", "11～15分", "16～20分", "21～30分", "31分以上"], scores: [5, 4, 3, 2, 1] },
    { question: "敷地面積は？", options: ["60坪以上", "50～59坪", "40～49坪", "30～39坪", "30坪未満"], scores: [5, 4, 3, 2, 1] },
    { question: "接道条件は？", options: ["南道路", "東・西道路", "北道路", "旗竿地", "接道なし"], scores: [5, 4, 3, 2, 1] },
    { question: "土地の高低差は？", options: ["なし（平坦）", "軽微な傾斜", "中程度の傾斜", "大きな傾斜", "崖地・擁壁あり"], scores: [5, 4, 3, 2, 1] },
    { question: "ハザードマップのリスクは？", options: ["該当なし", "軽微", "注意区域", "浸水想定あり", "危険区域"], scores: [5, 4, 3, 2, 1] }
  ];

  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [totalScore, setTotalScore] = useState(0);

  const handleAnswer = (score) => {
    const newAnswers = [...answers, score];
    setAnswers(newAnswers);
    if (step < questions.length - 1) {
      setStep(step + 1);
    } else {
      const sum = newAnswers.reduce((acc, curr) => acc + curr, 0);
      setTotalScore(sum);
    }
  };

  const getRank = (score) => {
    if (score >= 36) return "Sランク";
    if (score >= 31) return "Aランク";
    if (score >= 26) return "Bランク";
    if (score >= 21) return "Cランク";
    return "Dランク";
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      {answers.length < questions.length ? (
        <div className="w-full max-w-md">
          <h2 className="text-xl font-bold mb-4">{questions[step].question}</h2>
          <div className="flex flex-col gap-2">
            {questions[step].options.map((option, index) => (
              <button key={index} onClick={() => handleAnswer(questions[step].scores[index])} className="p-2 border rounded">
                {option}
              </button>
            ))}
          </div>
          <div className="mt-4">{step + 1} / {questions.length}</div>
        </div>
      ) : (
        <div className="w-full max-w-md text-center">
          <h2 className="text-2xl font-bold mb-2">診断結果</h2>
          <p className="text-3xl mb-4">{getRank(totalScore)}</p>
          <p>総得点: {totalScore}点</p>
          <button className="mt-6 p-2 border rounded" onClick={() => { setStep(0); setAnswers([]); setTotalScore(0); }}>もう一度診断する</button>
        </div>
      )}
    </div>
  );
}