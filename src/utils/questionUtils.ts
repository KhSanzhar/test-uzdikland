import { Question, Choice, } from "../types/types";

function getNextLevel(currentDifficulty: 'easy' | 'medium' | 'hard', wasCorrect: boolean): 'easy' | 'medium' | 'hard' {
    const levels: Array<'easy' | 'medium' | 'hard'> = ['easy', 'medium', 'hard'];
    const currentIndex = levels.indexOf(currentDifficulty);

    if (wasCorrect) {
        return currentIndex < 2 ? levels[currentIndex + 1] : currentDifficulty;
    } else {
        return currentIndex > 0 ? levels[currentIndex - 1] : currentDifficulty;
    }
}

export function getNextQuestion(
    questions: Question[],
    currentDifficulty: 'easy' | 'medium' | 'hard',
    wasCorrect: boolean,
    usedQuestionIds: Set<number>
): Question | undefined {
    const nextDifficulty = getNextLevel(currentDifficulty, wasCorrect);
    const availableQuestions = questions.filter(q => q.difficulty === nextDifficulty && !usedQuestionIds.has(q.id));

    if (availableQuestions.length === 0) {
        return undefined;
    }

    const nextQuestion = availableQuestions[Math.floor(Math.random() * availableQuestions.length)];
    usedQuestionIds.add(nextQuestion.id);
    return nextQuestion;
}

export function shuffleQuestions(questions: Question[]): Question[] {
    for(let i = questions.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [questions[i], questions[j]] = [questions[j], questions[i]];
    }

    return questions;
}
