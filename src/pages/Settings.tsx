import {  Box, Heading, Card, Flex, Text, TextField, Button, Avatar } from '@radix-ui/themes';

 type SettingsProps = {
  name: string;
  avatarUrl: string;
  setName: React.Dispatch<React.SetStateAction<string>>;
  setAvatarUrl: React.Dispatch<React.SetStateAction<string>>;
}

function Settings({ name, avatarUrl, setName, setAvatarUrl }: SettingsProps) {

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault(); 
    alert(`บันทึกข้อมูลแล้ว:\nชื่อ: ${name}\nURL รูป: ${avatarUrl}`);
  };

  return (
    <Box px="6" py="6">
      <Heading size="8" mb="4">
        Settings
      </Heading>

      <Box maxWidth="600px">
        <Card>
          <Flex direction="column" gap="5">
            
            <Flex justify="between" align="start">
              <Heading size="5">
                Account Information
              </Heading>
              <Avatar
                src={avatarUrl} 
                fallback={name.charAt(0) || 'A'} 
                size="6"
                radius="full"
              />
            </Flex>

            <form onSubmit={handleSave}>
              <Flex direction="column" gap="4">
                
                <label>
                  <Text as="div" size="2" weight="medium" mb="1">
                    Name
                  </Text>
                  <TextField.Root
                    size="3"
                    value={name} 
                    onChange={(e) => setName(e.target.value)} 
                  />
                </label>

                <label>
                  <Text as="div" size="2" weight="medium" mb="1">
                    Avatar URL (เปลี่ยนรูป)
                  </Text>
                  <TextField.Root
                    size="3"
                    value={avatarUrl} 
                    onChange={(e) => setAvatarUrl(e.target.value)} 
                  />
                </label>

                <Flex justify="end" mt="2">
                  <Button size="2" type="submit">
                    Save Changes
                  </Button>
                </Flex>

              </Flex>
            </form>

          </Flex>
        </Card>
      </Box>
    </Box>
  );
}

export default Settings;