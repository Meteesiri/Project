import { Box, Heading, Text, Tabs, Flex, TextField, Table, Checkbox, Badge } from '@radix-ui/themes';
import { useParams, useNavigate } from 'react-router-dom';
import { IconButton } from '@radix-ui/themes';
import { MagnifyingGlassIcon, CheckIcon, ExclamationTriangleIcon, CrossCircledIcon, ArrowLeftIcon} from '@radix-ui/react-icons';

const courseData = {
  'calculus-i': { 
    title: 'Calculus I',
    teacher: 'Ms. Davis',
    stats: '3 Total Assignments, Last Updated: May 23, 2024'
  },
  'physics-ii-lab': {
    title: 'Physics II Lab',
    teacher: 'Ms. Davis',
    stats: '5 Total Labs, Last Updated: May 22, 2024'
  },
  'world-history': {
    title: 'World History',
    teacher: 'Dr. Chen',
    stats: '2 Essays, 1 Exam, Last Updated: May 20, 2024'
  },
  'computer-science': {
    title: 'Computer Science',
    teacher: 'Prof. Lee',
    stats: '4 Projects, Last Updated: May 24, 2024'
  },
  'english-lit': {
    title: 'English Literature',
    teacher: 'Mr. Brown',
    stats: '3 Reading Quizzes, Last Updated: May 19, 2024'
  },
  'data-structures': {
    title: 'Data Structures',
    teacher: 'Dr. Smith',
    stats: '6 Coding Assignments, Last Updated: May 21, 2024'
  },

};

const assignments = [
  { title: 'Quiz 1', due: 'Tomorrow', status: 'Done', grade: '90/100' },
  { title: 'Problem Set 3', due: 'Tomorrow', status: 'Pending', grade: '--' },
  { title: 'Final Essay', due: 'Yesterday', status: 'Overdue', grade: '--' },
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



function ClassDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const data = (id && courseData[id as keyof typeof courseData]) || { title: "Course Not Found", teacher: "", stats: "" }

  return (
    <Box px="6" py="6">
      <Flex align="center" gap="3" mb="1"> 
        <IconButton
          variant="ghost"
          onClick={() => navigate('/')} 
        >
          <ArrowLeftIcon width="20" height="20" />
        </IconButton>
        <Heading size="8">{data.title}</Heading> 
      </Flex>
      <Text as="p" size="3" color="gray">Teacher: {data.teacher}</Text>
      <Text as="p" size="2" color="gray" mb="4">{data.stats}</Text>

      <Tabs.Root defaultValue="assignments">
        <Tabs.List>
          <Tabs.Trigger value="assignments">Assignments</Tabs.Trigger>
          <Tabs.Trigger value="people">People</Tabs.Trigger>
          <Tabs.Trigger value="settings">Settings</Tabs.Trigger>
        </Tabs.List>

        <Box pt="4">
         <Tabs.Content value="assignments">
            <Flex justify="between" mb="4" align="center">
              <Box maxWidth="300px">
                <TextField.Root>
                  <TextField.Slot>
                    <MagnifyingGlassIcon height="16" width="16" />
                  </TextField.Slot>
                </TextField.Root>
              </Box>
              <Text size="2" color="gray">
                Filter by: Due Soon X
              </Text>
            </Flex>
            
            <Table.Root variant="surface">
              <Table.Header>
                <Table.Row>
                  <Table.ColumnHeaderCell width="40px"><Checkbox /></Table.ColumnHeaderCell>
                  <Table.ColumnHeaderCell>Title</Table.ColumnHeaderCell>
                  <Table.ColumnHeaderCell>Due Date</Table.ColumnHeaderCell>
                  <Table.ColumnHeaderCell>Status</Table.ColumnHeaderCell>
                  <Table.ColumnHeaderCell>Grade</Table.ColumnHeaderCell>
                </Table.Row>
              </Table.Header>

              <Table.Body>
                {assignments.map(item => (
                  <Table.Row key={item.title}>
                    <Table.Cell><Checkbox /></Table.Cell>
                    <Table.RowHeaderCell>{item.title}</Table.RowHeaderCell>
                    <Table.Cell>{item.due}</Table.Cell>
                    <Table.Cell>
                      {/* @ts-ignore */}
                      <StatusBadge status={item.status} />
                    </Table.Cell>
                    <Table.Cell>{item.grade}</Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table.Root>
          </Tabs.Content>

          <Tabs.Content value="people">
            <Text>People in {data.title} will be listed here.</Text>
          </Tabs.Content>

          <Tabs.Content value="settings">
            <Text>Settings for {data.title} will be here.</Text>
          </Tabs.Content>
        </Box>
      </Tabs.Root>
    </Box>
  );
}

export default ClassDetail;