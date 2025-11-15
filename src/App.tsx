import './App.css'
import { Routes, Route} from 'react-router-dom'
import { Box, Flex,Theme, IconButton, Avatar, Text, Separator } from '@radix-ui/themes'
import { useState } from 'react'
import { SunIcon, MoonIcon } from '@radix-ui/react-icons'
import Sidebar from './components/Sidebar' 
import Courses from './pages/Courses'
import Dashboard from './pages/Dashboard'
import Assignments from './pages/Assignments'
import Settings from './pages/Settings'
import ClassDetail from './pages/ClassDetail'

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const [name, setName] = useState('John Smith');
  const [avatarUrl, setAvatarUrl] = useState('https://i.pravatar.cc/150?img=68');

  return (
    <Theme appearance={isDarkMode ? 'dark' : 'light'}>
      <Flex> 
        <Sidebar /> 
        
        <Flex direction="column" style={{ flexGrow: 1, height: '100vh' }}>
          
          <Box 
            style={{ 
              flexShrink: 0,
              borderBottom: '1px solid var(--gray-4)', 
            }}
            p="3"
          >
 
            <Flex justify="end" align="center" gap="3">
              <Avatar
                src={avatarUrl}
                fallback={name.charAt(0) || 'A'}
                size="2"
                radius="full"
              />
              <Text size="2">{name}</Text>
              <Separator orientation="vertical" size="2" />


              <IconButton 
                variant="ghost" 
                onClick={() => setIsDarkMode(!isDarkMode)}
              >
                {isDarkMode 
                  ? <SunIcon width="18" height="18" /> 
                  : <MoonIcon width="18" height="18" />
                }
              </IconButton>
            </Flex>
          </Box>

          <Box style={{ flexGrow: 1, overflow: 'auto' }}>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/courses" element={<Courses />} />
              <Route path="/assignments" element={<Assignments />} />
 
              <Route 
                path="/settings" 
                element={
                  <Settings 
                    name={name} 
                    avatarUrl={avatarUrl}
                    setName={setName}
                    setAvatarUrl={setAvatarUrl}
                  />
                } 
              />
              
              <Route path="/course/:id" element={<ClassDetail />} />
            </Routes>
          </Box>

        </Flex>
      </Flex>
    </Theme>
  )
}

export default App