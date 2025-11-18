import {
  Box,
  Heading,
  Text,
  Flex,
  TextField,
  Table,
  IconButton,
} from "@radix-ui/themes";
import { useParams, useNavigate } from "react-router-dom";
import { MagnifyingGlassIcon, ArrowLeftIcon } from "@radix-ui/react-icons";
import {
  useClassroom,
  type ClassroomWork,
} from "../hooks/useClassroom/useClassroom";
import { useEffect, useState } from "react";
import type { CourseTeacher } from "../hooks/useClassroom/types/CourseTeacher";
import type { ClassroomCourse } from "../hooks/useClassroom/types/ClassroomCourse";
import StatusBadge from "../components/StatusBadge";
import type { ClassroomSubmission } from "../hooks/useClassroom/types/ClassroomSubmission.type";

export default function CourseDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    fetchCourseDetail,
    fetchCourseTeachers,
    fetchCourseWork,
    fetchSubmission,
  } = useClassroom();

  const [course, setCourse] = useState<ClassroomCourse | null>(null);
  const [teachers, setTeachers] = useState<CourseTeacher[]>([]);
  const [works, setWorks] = useState<
    (ClassroomWork & { submission: ClassroomSubmission | null })[]
  >([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const load = async () => {
      if (!id) {
        return;
      }

      const courseDetail = await fetchCourseDetail(id);
      setCourse(courseDetail);

      const teachers = await fetchCourseTeachers(id);
      setTeachers(teachers || []);

      const works = await fetchCourseWork(id);

      const enriched = await Promise.all(
        (works || []).map(async (work: ClassroomWork) => {
          const sub = await fetchSubmission(id, work.id);
          return { ...work, submission: sub };
        }),
      );
      setWorks(enriched);
    };
    load();
  }, [id]);

  const getStatusByState = (state?: string, late: boolean = false) => {
    if (
      (state as unknown as string) === "TURNED_IN" ||
      (state as unknown as string) === "RETURNED"
    ) {
      return "Done";
    }

    return late ? "Overdue" : "Pending";
  };

  if (!course) {
    return (
      <Box px="6" py="6">
        <IconButton variant="ghost" onClick={() => navigate("/")}>
          <ArrowLeftIcon width="20" height="20" />
        </IconButton>
        <Heading size="6">Loading...</Heading>
      </Box>
    );
  }

  return (
    <Box px="6" py="6">
      <Flex align="center" gap="3" mb="1">
        <IconButton variant="ghost" onClick={() => navigate("/")}>
          <ArrowLeftIcon width="20" height="20" />
        </IconButton>
        <Heading size="8">{course.name}</Heading>
      </Flex>
      <Text as="p" size="3" color="gray">
        {teachers.length > 0
          ? `Teacher: ${teachers[0].profile.name.fullName}`
          : "Teacher: —"}
      </Text>
      <Text as="p" size="2" color="gray" mb="4">
        Updated: {new Date(course.updateTime).toLocaleDateString("en-CA")}
      </Text>

      <Flex mb="4" align="center" gap="3">
        <TextField.Root
          placeholder="Search assignments..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-[300px]"
        >
          <TextField.Slot>
            <MagnifyingGlassIcon />
          </TextField.Slot>
        </TextField.Root>
      </Flex>

      <Table.Root variant="surface">
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>Title</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Due Date</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Status</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Grade</Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {works
            .filter((work) =>
              work.title.toLowerCase().includes(search.toLowerCase()),
            )
            .map((work) => {
              const due = work.dueDate
                ? `${work.dueDate.year}-${work.dueDate.month}-${work.dueDate.day}`
                : "No due";

              return (
                <Table.Row key={work.id}>
                  <Table.RowHeaderCell>{work.title}</Table.RowHeaderCell>
                  <Table.Cell>{due}</Table.Cell>
                  <Table.Cell>
                    <StatusBadge
                      status={getStatusByState(
                        work.submission?.state as unknown as string,
                        work.submission?.late,
                      )}
                    />
                  </Table.Cell>
                  <Table.Cell>
                    {work.submission?.assignedGrade ?? "-"}
                  </Table.Cell>
                </Table.Row>
              );
            })}
        </Table.Body>
      </Table.Root>
    </Box>
  );
}
