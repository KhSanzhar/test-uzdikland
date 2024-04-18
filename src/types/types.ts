export interface Subject {
    id: number;
    name: string;
}
  
export interface Topic {
    id: number;
    subjectId: number;
    name: string;
}

export interface DifficultyRating {
    difficulty: 'easy' | 'medium' | 'hard'; 
}

export interface Question extends DifficultyRating {
    id: number;
    topicId: number;
    text: string;
    choices: Choice[];
    correctAnswerId: number;
}

export interface Choice {
    id: number;
    text: string;
}

