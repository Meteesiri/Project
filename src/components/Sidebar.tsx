import { Box, Flex, Text } from "@radix-ui/themes";
import { Link, useLocation } from "react-router-dom";

const linkStyle = {
  textDecoration: "none",
  color: "var(--gray-11)",
  display: "block",
  padding: "8px 16px",
  borderRadius: "6px",
};

const activeLinkStyle = {
  ...linkStyle,
  backgroundColor: "var(--blue-4)",
  color: "var(--blue-9)",
  fontWeight: 500,
};

function NavLink({
  to,
  children,
}: Readonly<{ to: string; children: React.ReactNode }>) {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <Link to={to} style={isActive ? activeLinkStyle : linkStyle}>
      <Text size="3">{children}</Text>
    </Link>
  );
}

function Sidebar() {
  return (
    <Box
      style={{
        width: "240px",
        height: "100vh",
        borderRight: "1px solid var(--gray-4)",
        padding: "16px",
      }}
    >
      <Flex direction="column" gap="2">
        <NavLink to="/">Dashboard</NavLink>
        <NavLink to="/courses">Courses</NavLink>
        <NavLink to="/assignments">Assignments</NavLink>
      </Flex>
    </Box>
  );
}

export default Sidebar;
