import {
  Box,
  Flex,
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
  useColorModeValue,
} from "@chakra-ui/react";
import { MdOutlinePayment } from "react-icons/md";
import { MdOutlinePayments } from "react-icons/md";
import { GoPackage } from "react-icons/go";
import { TbTruckDelivery } from "react-icons/tb";
import { MdDoneOutline } from "react-icons/md";

export const DashboardComp = () => {
  return (
    <div>
      <Box maxW="6xl" pl={20} mx={"auto"} pt={50}>
        <SimpleGrid columns={{ base: 1, md: 5 }} spacing={{ base: 5, lg: 2 }}>
          <StatsCard
            title={"Waiting Payment"}
            stat={"0"}
            icon={<MdOutlinePayment size={"2.5em"} />}
          />
          <StatsCard
            title={"Confirm Payment"}
            stat={"0"}
            icon={<MdOutlinePayments size={"2.5em"} />}
          />
          <StatsCard
            title={"On Process"}
            stat={"0"}
            icon={<GoPackage size={"2.5em"} />}
          />
          <StatsCard
            title={"Delivery"}
            stat={"0"}
            icon={<TbTruckDelivery size={"2.5em"} />}
          />
          <StatsCard
            title={"Done"}
            stat={"0"}
            icon={<MdDoneOutline size={"2.5em"} />}
          />
        </SimpleGrid>
      </Box>
    </div>
  );
};

function StatsCard(props) {
  const { title, stat, icon } = props;
  return (
    <div>
      <Stat
        px={{ base: 2, md: 4 }}
        py={"5"}
        shadow={"xl"}
        border={"2px solid"}
        borderColor={useColorModeValue("#285430")}
        bgColor="#E5D9B6"
        rounded={"lg"}
      >
        <Flex justifyContent={"space-between"}>
          <Box pl={{ base: 2, md: 4 }}>
            <StatLabel fontWeight={"medium"} isTruncated>
              {title}
            </StatLabel>
            <StatNumber fontSize={"2xl"} fontWeight={"medium"}>
              {stat}
            </StatNumber>
          </Box>
          <Box
            my={"auto"}
            color={useColorModeValue("#285430")}
            alignContent={"center"}
          >
            {icon}
          </Box>
        </Flex>
      </Stat>
    </div>
  );
}
