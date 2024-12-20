import { useState, useEffect } from "react";
import { TanamanMonokotil } from "@/app/data/monokotil-data";
import { Monokotil, Pertanyaan } from "@/app/types/monokotil";
import { graphData } from "../data/graf-data";

// Extend Pertanyaan type to include answer
type PertanyaanWithAnswer = Pertanyaan & {
  answer?: number;
};

export const useExpertSystem = () => {
  const [currentQuestion, setCurrentQuestion] =
    useState<PertanyaanWithAnswer | null>(null);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [possiblePlants, setPossiblePlants] =
    useState<Monokotil[]>(TanamanMonokotil);
  const [result, setResult] = useState<Monokotil | null>(null);
  const [isFirstQuestion, setIsFirstQuestion] = useState(true);
  const [filteredGraph, setFilteredGraph] = useState({
    nodes: graphData.nodes,
    links: graphData.links,
  });
  const [questionHistory, setQuestionHistory] = useState<
    PertanyaanWithAnswer[]
  >([]);

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

  const getInitialQuestion = (): PertanyaanWithAnswer | null => {
    const randomNum = Math.floor(Math.random() * 67) + 1;
    const randomQuestionId = `q${randomNum}`;
    const question = Pertanyaan.find((q) => q.id === randomQuestionId);
    return question ? { ...question } : null;
  };

  const getNextQuestion = (): PertanyaanWithAnswer | null => {
    if (isFirstQuestion) {
      setIsFirstQuestion(false);
      const initialQuestion = getInitialQuestion();
      if (initialQuestion) setQuestionHistory([initialQuestion]);
      return initialQuestion;
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
    return question ? { ...question } : null;
  };

  const handleAnswer = (answer: number) => {
    if (!currentQuestion) return;

    // Update current question with answer
    const questionWithAnswer: PertanyaanWithAnswer = {
      ...currentQuestion,
      answer: answer,
    };

    // Update question history with the answered question
    setQuestionHistory([...questionHistory, questionWithAnswer]);

    // Update answers state
    const newAnswers = { ...answers, [currentQuestion.id]: answer };
    setAnswers(newAnswers);

    // Filter possible plants
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
    setQuestionHistory([]);
  };

  useEffect(() => {
    const nextQuestion = getNextQuestion();
    setCurrentQuestion(nextQuestion);
  }, [answers]);

  useEffect(() => {
    const firstQuestion = getNextQuestion();
    setCurrentQuestion(firstQuestion);
  }, []);

  const updateFilteredGraph = () => {
    const filteredNodes = graphData.nodes.filter((node) =>
      possiblePlants.some((plant) => plant.nama === node.id)
    );
    const filteredLinks = graphData.links.filter(
      (link) =>
        filteredNodes.some((node) => node.id === link.source) &&
        filteredNodes.some((node) => node.id === link.target)
    );
    setFilteredGraph({ nodes: filteredNodes, links: filteredLinks });
  };

  useEffect(() => {
    updateFilteredGraph();
  }, [possiblePlants]);

  return {
    currentQuestion,
    result,
    possiblePlants,
    filteredGraph,
    questionHistory,
    handleAnswer,
    handleReset,
  };
};
