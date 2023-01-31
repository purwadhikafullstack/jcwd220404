import { Box, Heading, Text, Button, Center, Image } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import NotFoundIcon from "../../NotFoundIcon.png";

export const NotFoundPage = () => {
    const navigate = useNavigate();
  const toHome = () => {
    navigate("/");
  };
  return (
    <div>
      <Center>
        <Box>
          <Box
            textAlign="center"
            py={10}
            px={6}
            bgColor="#E5D9B6"
            w={"390px"}
            h={"820px"}
          >
            <Heading
              className="header"
              display="inline-block"
              as="h2"
              size="3xl"
              backgroundClip="text"
              color={"#285430"}
            >
              404
            </Heading>
            <Text color={"#285430"} fontSize="23px" mt={3} mb={2}>
              Page Not Found
            </Text>
            <Text color={"#285430"} fontSize="18px" mb={6}>
              The page you're looking for does not seem to exist
            </Text>
            <Button
              bgColor={"#A4BE7B"}
              borderColor="#285430"
              border="2px"
              fontSize="18px"
              color="gray.800"
              onClick={toHome}
            >
              Go to Home
            </Button>
            <Box mt={"40px"}>
              <Image src={NotFoundIcon} />
            </Box>
          </Box>
        </Box>
      </Center>
    </div>
  );
};
