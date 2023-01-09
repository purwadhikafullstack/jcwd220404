import { Image } from "@chakra-ui/react";
import OnlyFreshLogo from ".././OnlyFreshLogo.png";

export const LogoComp = () => {
  return (
    <div>
      <Image
        src={`${process.env.REACT_APP_API_BASE_URL}/upload/PIMG-167324294561798293.png`}
      ></Image>
    </div>
  );
};
