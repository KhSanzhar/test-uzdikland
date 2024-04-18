import React, { useEffect, useState } from "react";
import { getNextQuestion, shuffleQuestions } from "../utils/questionUtils";
import { Link, useParams } from "react-router-dom";
import { Question } from "../types/types";

const QuizPage: React.FC = () => {

    const [questions, setQuestions] = useState<Question[]>([]);
    const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
    const [currentDifficulty, setCurrentDifficulty] = useState<'easy' | 'medium' | 'hard'>('easy');
    const [usedQuestionIds, setUsedQuestionIds] = useState<Set<number>>(new Set());
    const [score, setScore] = useState(0);
    const [isCompleted, setIsCompleted] = useState(false);
    const [questionCount, setQuestionCount] = useState(0);
    const [selectedChoice, setSelectedChoice] = useState<number | null>(null);
    // const [results, setResults] = useState({
    //     easy: { correct: 0, wrong: 0},
    //     medium: { correct: 0, wrong: 0},
    //     hard: { correct: 0, wrong: 0}
    // });
    const {topicId} = useParams<{topicId: string}>();
    const maxQuestions = 10;

    useEffect(() => {
        fetch(`/data/questions.json`)
            .then(response => response.json())
            .then(data => {
                const filteredQuestions = shuffleQuestions(data.filter((question: Question) => question.topicId.toString() === topicId));
                setQuestions(filteredQuestions);
                setCurrentQuestion(filteredQuestions[0]);
            })
            .catch(error => console.error('Error loading the questions:', error));
    }, [topicId]);

    const handleAnswerSelect = (choiceId: number) => {
        
        if (currentQuestion) {
            const wasCorrect = currentQuestion.correctAnswerId === choiceId;
            if (wasCorrect) setScore(score + 1);

            // setResults(prevResults => ({
            //     ...prevResults,
            //     [currentQuestion.difficulty]: {
            //         correct: wasCorrect ? prevResults[currentQuestion.difficulty].correct + 1 : prevResults[currentQuestion.difficulty].correct,
            //         wronog: wasCorrect ? prevResults[currentQuestion.difficulty].wrong + 1 : prevResults[currentQuestion.difficulty].wrong
            //     }
            // }));

            const newCount = questionCount + 1;

            setQuestionCount(newCount);

            setTimeout(() => setSelectedChoice(null), 0);

            if (newCount < maxQuestions) {
                const nextQuestion = getNextQuestion(questions, currentDifficulty, wasCorrect, usedQuestionIds);
                if (nextQuestion) {
                    setCurrentQuestion(nextQuestion);
                    setCurrentDifficulty(nextQuestion.difficulty);
                    setUsedQuestionIds(new Set(usedQuestionIds.add(nextQuestion.id)));
                    setQuestionCount(questionCount + 1);
                } else {
                    setIsCompleted(true);
                }
            } else {
                setIsCompleted(true);
            }
        }
    };

    return(
        <>
            <nav className="bg-white border-gray-200 dark:bg-gray-900">
                <div className="max-w-screen-xl mx-auto px-4 py-2.5 flex justify-center items-center">
                    <Link to="/" className="flex items-center space-x-3 rtl:space-x-reverse">
                        <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">Subjects</span>
                    </Link>
                </div>
            </nav>
            <div className="container mx-auto px-4 py-8">
                {!isCompleted && (<h1 className="text-xl font-bold text-center mb-6">Quiz on {currentQuestion?.difficulty.toUpperCase()} level</h1>)}
                {/* {!isCompleted ? (
                    currentQuestion && (
                        <div className="mb-4">
                            <div className="bg-white shado-lg rounded-lg p-6">
                                <h2 className="text-lg font-bold mb-4">{currentQuestion.text}</h2>
                                <ul className="list-disc pl-5">
                                    {currentQuestion.choices.map((choice) => (
                                        <li key={choice.id} className="mb-2">
                                            <button
                                                onClick={() => handleAnswerSelect(choice.id)}
                                                className="text-blue-700 hover:text-blue-900"
                                            >
                                                {choice.text}
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    ) */}
                    {!isCompleted ? (
                    currentQuestion && (
                        <div className="flex flex-col p-3 bg-white text-black rounded-lg shadow-xl w-full max-w-md mx-auto">
                            <div className="flex justify-between items-center mb-4">
                                <span className="text-lg font-bold text-gray-700">{currentQuestion.text}</span>
                                <span className="bg-black px-2 py-1 text-white text-sm rounded font-semibold">{questionCount + 1}/{maxQuestions}</span>
                            </div>
                            <form className="flex flex-col">
                                {currentQuestion.choices.map((choice) => (
                                    <label key={choice.id} className="flex items-center p-3 my-2 rounded-lg cursor-pointer border transition-colors hover:bg-gray-100">
                                        <input
                                            type="radio"
                                            name="value-radio"
                                            value={choice.id}
                                            onChange={() => handleAnswerSelect(choice.id)}
                                            checked={selectedChoice === choice.id}
                                            className="hidden" 
                                        />
                                        <span className="ml-2">{choice.text}</span>
                                    </label>
                                ))}
                            </form>
                            {selectedChoice !== null && (
                                <div className={`mt-4 text-sm font-semibold ${selectedChoice === currentQuestion.correctAnswerId ? 'text-green-500' : 'text-red-500'}`}>
                                    {selectedChoice === currentQuestion.correctAnswerId ? 'Congratulations!' : 'Bad answer'}
                                </div>
                            )}
                        </div>
                    )
                ) : (
                    <div className="text-center">
                        <h2 className="text-2xl font-bold mb-4">Quiz Completed!</h2>
                        <p className="text-lg mb-4">You answered {score} out of {maxQuestions} questions correctly.</p>
                        {/* <div>
                            <p>Easy: {results.easy.correct} Correct, {results.easy.wrong} Wrong</p>
                            <p>Medium: {results.medium.correct} Correct, {results.medium.wrong} Wrong</p>
                            <p>Hard: {results.hard.correct} Correct, {results.hard.wrong} Wrong</p>
                        </div> */}
                        <Link to="/" className="text-lg text-blue-700 hover:text-blue-900">
                            Go back to subjects
                        </Link>
                    </div>
                )}
            </div>
        </>
    );
};

export default QuizPage;