import { Box, Badge } from "@chakra-ui/react";
import { IoNotifications } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

export const NotificationComp = () => {
  const navigate = useNavigate();
  const toNotification = () => {
    navigate("/notification");
  };
  return (
    <div>
      <Box
        pr={"23px"}
        pt="5px"
        as="button"
        onClick={toNotification}
        mt="4"
      >
        <Badge
          ml="1"
          mt="-1"
          fontSize="0.6em"
          bg="#FE0013"
          colorScheme={"red"}
          variant={"solid"}
          position="absolute"
          fontWeight="bold"
          color={"black"}
        >
          0
        </Badge>
        <IoNotifications size={28} color="#5F8D4E" />
      </Box>
    </div>
  );
};
