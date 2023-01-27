import { Image } from "@chakra-ui/react";

export const LogoComp = () => {
  return (
    <>
      <Image
        src={`${process.env.REACT_APP_API_BASE_URL}/upload/OnlyFreshLogo.png`}
      ></Image>
    </>
  );
};