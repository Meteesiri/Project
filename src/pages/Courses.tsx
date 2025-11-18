import { Box, Heading, Grid } from "@radix-ui/themes";
import { useState, useEffect } from "react";
import type { ClassroomCourse } from "../hooks/useClassroom/types/ClassroomCourse";
import { useClassroom } from "../hooks/useClassroom/useClassroom";
import type { CourseTeacher } from "../hooks/useClassroom/types/CourseTeacher";
import CourseCard from "../components/CourseCard";

function Courses() {
  const { fetchCourses, fetchCourseTeachers, computeCourseProgress } =
    useClassroom();
  const [loading, setLoading] = useState(true);
  const [courses, setCourses] = useState<
    (ClassroomCourse & { teacherNames: CourseTeacher[]; progress: number })[]
  >([]);

  useEffect(() => {
    fetchCourses().then(async (list) => {
      const enriched = await Promise.all(
        list.map(async (course) => {
          const teacherNames = await fetchCourseTeachers(course.id);
          const progress = await computeCourseProgress(course.id);

          return {
            ...course,
            teacherNames,
            progress,
          };
        }),
      );

      setCourses(enriched);
      setLoading(false);
    });
  }, []);
  return (
    <Box px="6" py="6">
      <Heading size="8" mb="4">
        Courses
      </Heading>
            {loading ? (
        <Grid columns="3" gap="4">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i + 1}
              className="rounded-lg border border-[var(--gray-6)] bg-[var(--gray-2)] p-4 animate-pulse"
            >
              <div className="h-5 w-3/4 bg-[var(--gray-6)] rounded mb-3"></div>
              <div className="h-4 w-1/2 bg-[var(--gray-6)] rounded mb-4"></div>
              <div className="w-full h-2 bg-[var(--gray-6)] rounded mb-1"></div>
              <div className="h-3 w-20 bg-[var(--gray-6)] rounded"></div>
            </div>
          ))}
        </Grid>
      ) : (
        <Grid columns="3" gap="4">
          {courses.map((course) => (
            <CourseCard
              key={course.id}
              id={course.id}
              title={course.name}
              teacher={course.teacherNames
                .map((teacher) => teacher.profile.name.fullName)
                .join(", ")}
              progress={course.progress}
            />
          ))}
        </Grid>
      )}
    </Box>
  );
}

export default Courses;
