import { Box, Heading, Text, Card, Flex, Grid } from "@radix-ui/themes";
import { useEffect, useState } from "react";
import { useClassroom } from "../hooks/useClassroom/useClassroom";
import type { ClassroomCourse } from "../hooks/useClassroom/types/ClassroomCourse";
import { useNavigate } from "react-router-dom";

const Skeleton = ({ className }: { className: string }) => (
  <div className={`animate-pulse bg-[var(--gray-4)] rounded ${className}`} />
);

function Dashboard() {
  const { fetchCourses, fetchTotalAssignments } = useClassroom();
  const navigate = useNavigate();
  const [refreshFlag, setRefreshFlag] = useState(0);
  const [courses, setCourses] = useState<ClassroomCourse[]>([]);
  const [assignmentCount, setAssignmentCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [lastSync, setLastSync] = useState("");

  useEffect(() => {
    const load = async () => {
      setLoading(true);

      const list = await fetchCourses();
      setCourses(list);

      const total = await fetchTotalAssignments();
      setAssignmentCount(total);

      setLastSync(new Date().toLocaleTimeString());

      setLoading(false);
    };

    load();
  }, [refreshFlag]);

  const courseColor = (id: string) => {
    const colors = [
      "indigo",
      "blue",
      "cyan",
      "teal",
      "green",
      "violet",
      "purple",
      "orange",
    ];
    let hash = 0;
    for (let i = 0; i < id.length; i++) {
      hash = (hash + (id.codePointAt(i) || 0) * (i + 1)) % colors.length;
    }

    return colors[hash];
  };

  return (
    <Box px="6" py="6" className="max-w-6xl mx-auto  rounded-xl shadow-sm">
      <Flex justify="between" align="center" mb="4">
        <Flex direction="column">
          <Heading size="8">Dashboard</Heading>
          <Text size="2" color="gray" className="mt-1">
            Overview of your learning activity
          </Text>
          <Text size="1" color="gray">
            Last synced: {lastSync}
          </Text>
        </Flex>
        <button
          onClick={() => setRefreshFlag((prev) => prev + 1)}
          className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition"
        >
          Refresh
        </button>
      </Flex>

      <Card className="p-4 border border-gray-200 rounded-xl shadow-sm mb-4">
        <Heading size="5" mb="3">
          Your Courses
        </Heading>
        {loading && (
          <Flex wrap="wrap" gap="2">
            <Skeleton className="w-32 h-6" />
            <Skeleton className="w-28 h-6" />
            <Skeleton className="w-40 h-6" />
            <Skeleton className="w-24 h-6" />
          </Flex>
        )}
        <Flex wrap="wrap" gap="2">
          {courses.map((course) => {
            const color = courseColor(course.id);
            return (
              <Box
                key={course.id}
                className="
                  px-3 py-1 
                  flex items-center gap-2
                  bg-[var(--gray-2)] 
                  border border-[var(--gray-6)] 
                  rounded-lg 
                  text-sm 
                  cursor-pointer 
                  transition 
                  hover:bg-[var(--gray-3)]
                "
                onClick={() => navigate(`/course/${course.id}`)}
                style={{ borderLeft: `4px solid var(--${color}-9)` }}
              >
                <span
                  className="inline-block w-2 h-2 rounded-full mr-2"
                  style={{ backgroundColor: `var(--${color}-9)` }}
                />
                {course.name}
              </Box>
            );
          })}
          {courses.length === 0 && !loading && (
            <Text size="2" color="gray">
              No courses available.
            </Text>
          )}
        </Flex>
      </Card>

      <Grid columns="2" gap="4">
        <Card className="p-4 border border-gray-200 rounded-xl shadow-sm">
          <Heading size="5" mb="4">
            Upcoming Assignments
          </Heading>
          <Flex direction="column" gap="4">
            {loading && (
              <>
                <Skeleton className="w-full h-4 mb-2" />
                <Skeleton className="w-2/3 h-4 mb-4" />
              </>
            )}

            <Text color="gray" size="2">
              No upcoming assignments.
            </Text>
          </Flex>
        </Card>

        <Card className="p-4  border border-gray-200 rounded-xl shadow-sm">
          <Heading size="5" mb="4">
            Quick Stats
          </Heading>
          <Flex direction="column" gap="2">
            <Text size="3">{courses.length} Courses</Text>
            <Text size="3">{assignmentCount} Total Assignments</Text>
            <Text size="3" color="gray">
              Assignment details limited by API
            </Text>
          </Flex>
        </Card>
      </Grid>

      <Card mt="4" className="p-4 border border-gray-200 rounded-xl shadow-sm">
        <Heading size="5" mb="4">
          Recent Activity
        </Heading>
        <Box style={{ minHeight: "100px" }}>
          {loading && (
            <>
              <Skeleton className="w-full h-4 mb-2" />
              <Skeleton className="w-2/3 h-4 mb-2" />
              <Skeleton className="w-1/2 h-4 mb-2" />
            </>
          )}

          <Text color="gray">No recent activity.</Text>
        </Box>
      </Card>
    </Box>
  );
}

export default Dashboard;
