import { Box, Heading, Flex, Table, Badge,  } from '@radix-ui/themes';
import { Link } from 'react-router-dom';
import { CheckIcon, ExclamationTriangleIcon, CrossCircledIcon } from '@radix-ui/react-icons'; // <-- Import icons


const allAssignments = [
  { 
    course: 'Calculus I', 
    courseId: 'calculus-i', 
    title: 'Quiz 1', 
    due: 'Tomorrow', 
    status: 'Done' 
  },
  { 
    course: 'Calculus I', 
    courseId: 'calculus-i', 
    title: 'Problem Set 3', 
    due: 'Tomorrow', 
    status: 'Pending' 
  },
  { 
    course: 'Calculus I', 
    courseId: 'calculus-i', 
    title: 'Final Essay', 
    due: 'Yesterday', 
    status: 'Overdue' 
  },
  { 
    course: 'Physics II Lab', 
    courseId: 'physics-ii-lab', 
    title: 'Lab Report 1', 
    due: 'May 28, 2024', 
    status: 'Pending' 
  },
  { 
    course: 'World History', 
    courseId: 'world-history', 
    title: 'Book Report', 
    due: 'May 30, 2024', 
    status: 'Pending' 
  },
];


function StatusBadge({ status }: { status: 'Done' | 'Pending' | 'Overdue' }) {
  const statusConfig = {
    Done: { color: 'green', icon: <CheckIcon width="12" height="12" /> },
    Pending: { color: 'amber', icon: <ExclamationTriangleIcon width="12" height="12" /> },
    Overdue: { color: 'red', icon: <CrossCircledIcon width="12" height="12" /> },
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
  return (
    <Box px="6" py="6">
      <Heading size="8" mb="4">
        All Assignments
      </Heading>

      
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
          {allAssignments.map((item, index) => (
            <Table.Row key={index}>
          
              <Table.RowHeaderCell>
                <Link to={`/course/${item.courseId}`}>{item.course}</Link>
              </Table.RowHeaderCell>
              <Table.Cell>{item.title}</Table.Cell>
              <Table.Cell>{item.due}</Table.Cell>
              <Table.Cell>
                <StatusBadge status={item.status as 'Done' | 'Pending' | 'Overdue'} />
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </Box>
  );
}

export default Assignments;