export declare class CreateChallengeInput {
    student: string;
    description: string;
}
export declare class StudentSubmitAssignmentInput {
    challengeId: string;
    solution: string;
}
export declare class TeacherReviewingChallengeInput {
    challengeId: string;
    comment: string;
    grade: number;
}
