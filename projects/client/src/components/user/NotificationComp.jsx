import { useNavigate } from "react-router-dom";
import { Box, Badge } from "@chakra-ui/react";
import { IoNotifications } from "react-icons/io5";

export const NotificationComp = () => {
  const navigate = useNavigate();

  const toNotification = () => {
    navigate("/notification");
  };
  return (
    <>
      <Box pr={"23px"} pt="5px" as="button" onClick={toNotification} mt="4">
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
          borderRadius="2xl"
        >
          0
        </Badge>
        <IoNotifications size={28} color="#5F8D4E" />
      </Box>
    </>
  );
};
