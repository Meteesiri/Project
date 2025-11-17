import { Box, Heading, Flex, Table, Badge } from "@radix-ui/themes";
import { Link } from "react-router-dom";
import {
  CheckIcon,
  ExclamationTriangleIcon,
  CrossCircledIcon,
} from "@radix-ui/react-icons";
import { useClassroom } from "../hooks/useClassroom/useClassroom";
import { useEffect, useState } from "react";
import type { AllClassroomAssignment } from "../hooks/useClassroom/types/AllAssignment";

interface StatusBadgeProps {
  status: "Done" | "Pending" | "Overdue";
}

function StatusBadge({ status }: Readonly<StatusBadgeProps>) {
  const statusConfig = {
    Done: { color: "green", icon: <CheckIcon width="12" height="12" /> },
    Pending: {
      color: "amber",
      icon: <ExclamationTriangleIcon width="12" height="12" />,
    },
    Overdue: {
      color: "red",
      icon: <CrossCircledIcon width="12" height="12" />,
    },
  } as const;

  const config = statusConfig[status];

  return (
    <Badge color={config.color} radius="full" size="1">
      <Flex gap="1" align="center">
        {config.icon}
        {status}
      </Flex>
    </Badge>
  );
}

function Assignments() {
  const { fetchAllAssignments } = useClassroom();
  const [assignments, setAssignments] = useState<AllClassroomAssignment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      const data = await fetchAllAssignments();
      setAssignments(data);
      setLoading(false);
    };
    load();
  }, []);

  const getStatusByState = (state?: string, late: boolean = false) => {
    if (
      (state as unknown as string) === "TURNED_IN" ||
      (state as unknown as string) === "RETURNED"
    ) {
      return "Done";
    }

    return late ? "Overdue" : "Pending";
  };

  return (
    <Box px="6" py="6">
      <Heading size="8" mb="4">
        All Assignments
      </Heading>

      {loading && (
        <div className="text-gray-500 text-sm mb-4">Loading assignments...</div>
      )}

      <Table.Root variant="surface">
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>Course</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Title</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Due Date</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Status</Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {assignments.map((item) => {
            const status = getStatusByState(
              item.submission?.state as unknown as string,
              item.submission?.late,
            );

            const due = item.dueDate
              ? `${item.dueDate.year}-${item.dueDate.month}-${item.dueDate.day}`
              : "—";

            return (
              <Table.Row key={item.courseId}>
                <Table.RowHeaderCell>
                  <Link to={`/course/${item.courseId}`}>{item.courseName}</Link>
                </Table.RowHeaderCell>
                <Table.Cell>{item.title}</Table.Cell>
                <Table.Cell>{due}</Table.Cell>
                <Table.Cell>
                  <StatusBadge status={status} />
                </Table.Cell>
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table.Root>
    </Box>
  );
}

export default Assignments;
