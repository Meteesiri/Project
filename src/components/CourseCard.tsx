import { Card, Heading, Box, Progress, Text } from "@radix-ui/themes";
import { Link } from "react-router-dom";

interface CourseCardProps {
  id: string;
  title: string;
  teacher: string;
  progress: number;
}

export default function CourseCard({
  id,
  title,
  teacher,
  progress,
}: Readonly<CourseCardProps>) {
  return (
    <Link
      to={`/course/${id}`}
      style={{ textDecoration: "none", color: "inherit" }}
    >
      <Card>
        <div className="flex flex-col gap-3">
          <Heading size="4" trim="start">
            {title}
          </Heading>
          <Text size="2" color="gray">
            Teacher: {teacher}
          </Text>
          <Box>
            <Progress value={progress} color="indigo" size="2" />
            <Text size="1" color="gray" mt="1">
              {progress}% Complete
            </Text>
          </Box>
        </div>
      </Card>
    </Link>
  );
}
