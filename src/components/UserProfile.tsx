import { SunIcon, MoonIcon } from "@radix-ui/react-icons";
import { Box, Avatar, Separator, IconButton, Text } from "@radix-ui/themes";
import { useGoogle } from "../hooks/useGoogle/useGoogle";
import { useEffect, useState } from "react";
import type { GoogleUserProfile } from "../hooks/useGoogle/useGoogle.types";
import { useAuth } from "../hooks/useAuth";
import { IoLogOutOutline } from "react-icons/io5";

type UserProfileProps = {
  isDarkMode: boolean;
  onIsDarkModeChange: (isDarkMode: boolean) => void;
};

export default function UserProfile({
  isDarkMode,
  onIsDarkModeChange,
}: Readonly<UserProfileProps>): Readonly<React.ReactNode> {
  const [user, setUser] = useState<GoogleUserProfile | null>(null);
  const { fetchUserProfile } = useGoogle();
  const auth = useAuth();

  useEffect(() => {
    fetchUserProfile().then((profile) => {
      setUser(profile);
    });
  }, [fetchUserProfile]);
  return (
    <Box
      style={{
        flexShrink: 0,
        borderBottom: "1px solid var(--gray-4)",
      }}
      p="3"
    >
      <div className="flex justify-end items-center gap-3">
        <Avatar
          src={user?.picture}
          fallback={user?.name.charAt(0) || ""}
          size="2"
          radius="full"
        />
        <Text>{user?.name}</Text>
        <IconButton variant="ghost" onClick={() => auth?.logout()}>
          <IoLogOutOutline width="18" height="18"/>
        </IconButton>
        <Separator orientation="vertical" size="2" />

        <IconButton
          variant="ghost"
          onClick={() => onIsDarkModeChange(!isDarkMode)}
        >
          {isDarkMode ? (
            <SunIcon width="18" height="18" />
          ) : (
            <MoonIcon width="18" height="18" />
          )}
        </IconButton>
      </div>
    </Box>
  );
}
