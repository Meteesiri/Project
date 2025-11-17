export interface RubricGrade {
  criterionId: string;
  levelId: string;
  points: number;
}

export interface SubmissionHistory {
  stateHistory?: StateHistory[];
  gradeHistory?: GradeHistory[];
}

export interface StateHistory {
  state: "CREATED" | "TURNED_IN"
  stateTimestamp: string;
}

export interface GradeHistory {
  gradeChangeType: "DRAFT" | "ASSIGNED"
  gradeTimestamp: string;
}

export interface AssignmentSubmission {
  submissionHistory?: unknown[];
  attachments?: unknown[];
}

export interface ShortAnswerSubmission {
  answer: string;
}

export interface MultipleChoiceSubmission {
  answers: string[];
}

export const SubmissionState = {
  NEW: "NEW",
  CREATED: "CREATED",
  TURNED_IN: "TURNED_IN",
  RETURNED: "RETURNED",
  RECLAIMED_BY_STUDENT: "RECLAIMED_BY_STUDENT",
};

export const CourseWorkType = {
  ASSIGNMENT: "ASSIGNMENT",
  SHORT_ANSWER_QUESTION: "SHORT_ANSWER_QUESTION",
  MULTIPLE_CHOICE_QUESTION: "MULTIPLE_CHOICE_QUESTION",
};

export interface ClassroomSubmission {
  courseId: string;
  courseWorkId: string;
  id: string;
  userId: string;
  creationTime?: string;
  updateTime?: string;
  state:typeof SubmissionState;
  late?: boolean;
  draftGrade?: number;
  assignedGrade?: number;
  rubricId?: string;
  draftRubricGrades?: Record<string, RubricGrade>;
  assignedRubricGrades?: Record<string, RubricGrade>;
  alternateLink?: string;
  courseWorkType?: typeof CourseWorkType;
  associatedWithDeveloper?: boolean;
  submissionHistory?: SubmissionHistory[];
  previewVersion?: string;

  assignmentSubmission?: AssignmentSubmission;
  shortAnswerSubmission?: ShortAnswerSubmission;
  multipleChoiceSubmission?: MultipleChoiceSubmission;
}
