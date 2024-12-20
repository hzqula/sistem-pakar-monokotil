import { useState, useEffect } from "react";
import { TanamanMonokotil } from "@/app/data/monokotil-data";
import { Monokotil, Pertanyaan } from "@/app/types/monokotil";

export const useExpertSystem = () => {
  const [currentQuestion, setCurrentQuestion] = useState<Pertanyaan | null>(
    null
  );
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [possiblePlants, setPossiblePlants] =
    useState<Monokotil[]>(TanamanMonokotil);
  const [result, setResult] = useState<Monokotil | null>(null);
  const [isFirstQuestion, setIsFirstQuestion] = useState(true);


  const getValidQuestions = (): string[] => {
    if (possiblePlants.length === 0) return [];

    const questionIds = new Set<string>();
    for (const plant of possiblePlants) {
      Object.entries(plant.ciri).forEach(([key, value]) => {
        const hasDistinction = possiblePlants.some(
          (p) => p.ciri[key] !== value
        );
        if (hasDistinction && !answers[key]) {
          questionIds.add(key);
        }
      });
    }
    return Array.from(questionIds);
  };

  const getInitialQuestion = (): Pertanyaan | null => {
    const randomNum = Math.floor(Math.random() * 67) + 1;
    const randomQuestionId = `q${randomNum}`;
    const question = Pertanyaan.find((q) => q.id === randomQuestionId);
    return question || null;
  };

  const getNextQuestion = (): Pertanyaan | null => {
    if (isFirstQuestion) {
      setIsFirstQuestion(false);
      return getInitialQuestion();
    }

    const validQuestions = getValidQuestions();
    if (validQuestions.length === 0) {
      if (possiblePlants.length === 1) {
        setResult(possiblePlants[0]);
      }
      return null;
    }

    const randomIndex = Math.floor(Math.random() * validQuestions.length);
    const question = Pertanyaan.find(
      (q) => q.id === validQuestions[randomIndex]
    );
    return question || null;
  };

  const handleAnswer = (answer: number) => {
    if (!currentQuestion) return;

    const newAnswers = { ...answers, [currentQuestion.id]: answer };
    setAnswers(newAnswers);

    const newPossiblePlants = possiblePlants.filter(
      (plant) => plant.ciri[currentQuestion.id] === answer
    );
    setPossiblePlants(newPossiblePlants);
  };

  const handleReset = () => {
    setAnswers({});
    setPossiblePlants(TanamanMonokotil);
    setResult(null);
    setIsFirstQuestion(true);
  };

  useEffect(() => {
    const nextQuestion = getNextQuestion();
    setCurrentQuestion(nextQuestion);
  }, [answers]);

  useEffect(() => {
    const firstQuestion = getNextQuestion();
    setCurrentQuestion(firstQuestion);
  }, []);

  return {
    currentQuestion,
    result,
    possiblePlants,
    handleAnswer,
    handleReset,
  };
};
