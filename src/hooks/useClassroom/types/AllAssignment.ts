import type { ClassroomWork } from "../useClassroom";
import type { ClassroomSubmission } from "./ClassroomSubmission.type";

export interface AllClassroomAssignment {
  courseId: string;
  courseName: string;
  title: string;
  dueDate: ClassroomWork["dueDate"];
  submission: ClassroomSubmission | null;
  courseWorkId: ClassroomWork["id"];
}
