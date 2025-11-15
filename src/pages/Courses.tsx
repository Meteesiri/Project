import { Box, Heading, Grid, Card, Flex, Text, Progress } from '@radix-ui/themes';
import { Link } from 'react-router-dom';

const mockCourses = [
  { 
    id: 'calculus-i',
    title: 'Calculus I', 
    teacher: 'Ms. Davis', 
    progress: 75 
  },
  { 
    id: 'physics-ii-lab',
    title: 'Physics II Lab', 
    teacher: 'Ms. Davis', 
    progress: 50 
  },
  { 
    id: 'world-history',
    title: 'World History', 
    teacher: 'Dr. Chen', 
    progress: 8 
  },
  { 
    id: 'computer-science',
    title: 'Computer Science', 
    teacher: 'Prof. Lee', 
    progress: 60 
  },
  { 
    id: 'english-lit',
    title: 'English Literature', 
    teacher: 'Mr. Brown', 
    progress: 30 
  },
  { 
    id: 'data-structures',
    title: 'Data Structures', 
    teacher: 'Dr. Smith', 
    progress: 100 
  },
];


function CourseCard({ id, title, teacher, progress }: {id: string, title: string, teacher: string, progress: number }) {
  return (
    <Link to={`/course/${id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
      <Card>
        <Flex direction="column" gap="3">
          <Heading size="4" trim="start">{title}</Heading>
          <Text size="2" color="gray">Teacher: {teacher}</Text>
          
          <Box>
            <Progress value={progress} color="blue" size="2" />
            <Text size="1" color="gray" mt="1">{progress}% Complete</Text>
          </Box>
        </Flex>
      </Card>
    </Link>
  );
}

function Courses() {
  return (
    <Box px="6" py="6">
      <Heading size="8" mb="4">
        Courses
      </Heading>
      
      <Grid columns="3" gap="4">
       
        {mockCourses.map((course) => (
          <CourseCard
            key={course.id} 
            id={course.id}  
            title={course.title}
            teacher={course.teacher}
            progress={course.progress}
          />
        ))}
      </Grid>
    </Box>
  );
}

export default Courses;