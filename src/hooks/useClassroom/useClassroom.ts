import axios from "axios";
import type { ClassroomCourse } from "./types/ClassroomCourse";
import type { CourseTeacher } from "./types/CourseTeacher";
import {
  SubmissionState,
  type ClassroomSubmission,
} from "./types/ClassroomSubmission.type";
import type { AllClassroomAssignment } from "./types/AllAssignment";

export interface ClassroomWork {
  id: string;
  title: string;
  dueDate?: {
    year: number;
    month: number;
    day: number;
  };
  courseId: string;
  state?: string;
}

export const useClassroom = () => {
  const token = localStorage.getItem("googleToken");
  const baseUrl = "https://classroom.googleapis.com/v1";

  const authHeader = token ? { Authorization: `Bearer ${token}` } : {};

  const instance = axios.create({
    baseURL: "https://classroom.googleapis.com/v1",
    headers: authHeader,
  });

  instance.interceptors.request.use(
    (config) => {
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      console.error("Request error:", error);
      return Promise.reject(error);
    },
  );

  instance.interceptors.response.use(
    (response) => response,
    (error) => {
      console.error("API error:", error.response?.data || error.message);

      if (error.response?.status === 401) {
        console.warn("Token expired or unauthorized. Logging out...");
        localStorage.removeItem("googleToken");
      }

      return Promise.reject(error);
    },
  );

  const fetchCourses = async (): Promise<ClassroomCourse[]> => {
    if (!token) {
      return [];
    }
    const { data } = await instance.get(`/courses`, {
      headers: authHeader,
    });
    return data.courses || [];
  };

  const fetchCourseDetail = async (
    courseId: string,
  ): Promise<ClassroomCourse | null> => {
    if (!token) {
      return null;
    }
    const { data } = await instance.get(`/courses/${courseId}`, {
      headers: authHeader,
    });
    return data || null;
  };

  const fetchCourseWork = async (
    courseId: string,
  ): Promise<ClassroomWork[]> => {
    if (!token) {
      return [];
    }
    const { data } = await instance.get(`/courses/${courseId}/courseWork`, {
      headers: authHeader,
    });
    return data.courseWork || [];
  };

  const fetchCourseWorkByCourse = async (
    courseId: string,
  ): Promise<ClassroomWork[]> => {
    if (!token) {
      return [];
    }
    const { data } = await instance.get(
      `${baseUrl}/courses/${courseId}/courseWork`,
      {
        headers: authHeader,
      },
    );
    return data.courseWork || [];
  };

  const fetchTotalAssignments = async (): Promise<number> => {
    if (!token) {
      return 0;
    }

    const courses = await fetchCourses();
    let total = 0;

    for (const course of courses) {
      const works = await fetchCourseWork(course.id);
      console.log(works);
      total += works.length;
    }

    console.log("Total assignments fetched:", total);

    return total;
  };

  const fetchTotalAssignmentsWithDueDates = async (): Promise<number> => {
    if (!token) {
      return 0;
    }

    const courses = await fetchCourses();
    let totalWithDueDates = 0;

    for (const course of courses) {
      const works = await fetchCourseWork(course.id);
      const worksWithDueDates = works.filter(
        (work) =>
          work.dueDate?.day !== 0 &&
          work.dueDate?.month !== 0 &&
          work.dueDate?.year !== 0,
      );
      totalWithDueDates += worksWithDueDates.length;
    }

    return totalWithDueDates;
  };

  const fetchCourseTeachers = async (
    courseId: string,
  ): Promise<CourseTeacher[]> => {
    if (!token) {
      return [];
    }

    const { data } = await instance.get<{ teachers: CourseTeacher[] }>(
      `/courses/${courseId}/teachers`,
      {
        headers: authHeader,
      },
    );

    return data.teachers;
  };

  const fetchSubmission = async (
    courseId: string,
    workId: string,
  ): Promise<ClassroomSubmission | null> => {
    if (!token) {
      return null;
    }

    const { data } = await instance.get(
      `/courses/${courseId}/courseWork/${workId}/studentSubmissions`,
      { headers: authHeader },
    );

    return data.studentSubmissions?.[0] ?? null;
  };

  const computeCourseProgress = async (courseId: string) => {
    const works = await fetchCourseWork(courseId);
    if (works.length === 0) {
      return 0;
    }

    const SAMPLE_SIZE = 8;
    const sample = works.slice(0, SAMPLE_SIZE);

    let submittedCount = 0;

    for (const work of sample) {
      const submission = await fetchSubmission(courseId, work.id);

      if (
        (submission?.state as unknown as string) ===
          SubmissionState.TURNED_IN ||
        (submission?.state as unknown as string) === SubmissionState.RETURNED
      ) {
        submittedCount++;
      }
    }

    const estimatedProgress = Math.round((submittedCount / SAMPLE_SIZE) * 100);

    return estimatedProgress;
  };

  const fetchAllAssignments = async (): Promise<AllClassroomAssignment[]> => {
    if (!token) {
      return [];
    }

    const courses = await fetchCourses();
    const all: AllClassroomAssignment[] = [];

    for (const course of courses) {
      const works = await fetchCourseWork(course.id);

      const enriched = await Promise.all(
        works.map(async (work: ClassroomWork) => {
          const sub = await fetchSubmission(course.id, work.id);

          return {
            courseId: course.id,
            courseName: course.name,
            title: work.title,
            dueDate: work.dueDate,
            submission: sub,
            courseWorkId: work.id,
          };
        }),
      );

      all.push(...enriched);
    }

    return all;
  };

  return {
    fetchCourses,
    fetchCourseDetail,
    fetchCourseWork,
    fetchCourseWorkByCourse,
    fetchTotalAssignments,
    fetchTotalAssignmentsWithDueDates,
    fetchCourseTeachers,
    fetchSubmission,
    computeCourseProgress,
    fetchAllAssignments,
  };
};
