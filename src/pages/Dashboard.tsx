import { Box,  Heading, Text, Card, Flex, Grid, Progress, Separator } from '@radix-ui/themes';
import { CheckCircledIcon, CircleIcon } from '@radix-ui/react-icons';

function LegendDot({ color }: { color: string }) {
  return (
    <Box style={{
      width: 12,
      height: 12,
      backgroundColor: `var(--${color}-9)`, 
      borderRadius: '3px',
      flexShrink: 0
    }} />
  );
}



function Dashboard() {
  return (
    <Box px="6" py="6">
      <Heading size="8" mb="4">
        Dashboard
      </Heading>
       <Grid columns="2" gap="4">

        <Card>
          <Heading size="5" mb="4">Upcoming Assignments</Heading>
          <Flex direction="column" gap="4">

            <Box>
              <Flex gap="2" align="center" mb="1">
                <CheckCircledIcon color="var(--green-9)" />
                <Text size="2" weight="bold">100%</Text>
                <Text size="1" color="gray">Completed</Text>
                <Separator orientation="vertical" size="1" />
                <Text size="2">Data Structures - Due Fri</Text>
              </Flex>
              <Progress value={100} color="green" />
            </Box>

            <Box>
              <Flex gap="2" align="center" mb="1">
                <CircleIcon color="var(--blue-9)" />
                <Text size="2" weight="bold">75%</Text>
                <Text size="1" color="gray">Pending</Text>
                <Separator orientation="vertical" size="1" />
                <Text size="2">Computer Science - Due Mon</Text>
              </Flex>
              <Progress value={75} color="blue" />
            </Box>
          </Flex>
        </Card>

        <Card>
          <Heading size="5" mb="4">Quick Stats</Heading>
          <Flex direction="column" gap="2">
            <Text size="3">4 Course</Text>
            <Text size="3">5 <Text color="red">Overdue</Text></Text>
            <Text size="3">12 Total Assignments</Text>
            <Text size="3">5 Pending Submissions</Text>
          </Flex>
        </Card>

        <Card>
          <Flex gap="4" align="center">
            <Box style={{
              width: '100px',
              height: '100px',
              borderRadius: '50%',
              backgroundColor: 'var(--gray-3)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0
            }}>
              <Flex direction="column" align="center">
                <Text size="1" color="gray">Status</Text>
                <Text weight="bold">1 of 4</Text>
              </Flex>
            </Box>

            <Flex direction="column" gap="2">
              <Flex align="center" gap="2">
                <LegendDot color="green" />
                <Text size="2">Completed</Text>
              </Flex>
              <Flex align="center" gap="2">
                <LegendDot color="blue" />
                <Text size="2">Pending</Text>
              </Flex>
              <Flex align="center" gap="2">
                <LegendDot color="red" />
                <Text size="2">Overdue</Text>
              </Flex>
            </Flex>
          </Flex>
        </Card>

        <Card>
          <Heading size="5" mb="4">Course Progress</Heading>
          <Flex direction="column" gap="3">
            <Flex align="center" gap="2">
              <LegendDot color="purple" />
              <Text size="3">4 Course</Text>
            </Flex>
            <Flex align="center" gap="2">
              <LegendDot color="yellow" />
              <Text size="3">12 Assignments</Text>
            </Flex>
            <Flex align="center" gap="2">
              <LegendDot color="red" />
              <Text size="3">Overdue</Text>
            </Flex>
          </Flex>
        </Card>

      </Grid>

      <Card mt="4"> 
        <Heading size="5" mb="4">Recent Activity</Heading>
        <Box style={{ minHeight: '100px' }}>
          <Text color="gray">No recent activity.</Text>
        </Box>
      </Card>

    </Box>
  );
}

export default Dashboard;