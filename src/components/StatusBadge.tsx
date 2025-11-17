import {
  CheckIcon,
  ExclamationTriangleIcon,
  CrossCircledIcon,
} from "@radix-ui/react-icons";
import { Badge, Flex } from "@radix-ui/themes";

export interface StatusBadgeProps {
  status: "Done" | "Pending" | "Overdue";
}

export default function StatusBadge({ status }: Readonly<StatusBadgeProps>) {
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
