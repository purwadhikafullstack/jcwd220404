import React from "react";
import { Box, IconButton, useBreakpointValue } from "@chakra-ui/react";
import { BiLeftArrowAlt, BiRightArrowAlt } from "react-icons/bi";
import Slider from "react-slick";
import { useState } from "react";

export const CarouselComp = () => {
  const [slider, setSlider] = useState(null);

  const top = useBreakpointValue({ base: "90%", md: "50%" });
  const side = useBreakpointValue({ base: "30%", md: "10px" });

  const cards = [
    "https://ik.imagekit.io/dcjlghyytp1/cb201e90c04a05ddfe0c2444a8954010?tr=f-auto,w-480?tr=f-auto,w-131",
    "https://ik.imagekit.io/dcjlghyytp1/bd5336fa7d68e9b750ed75e6b55ee87a?tr=f-auto,w-480?tr=f-auto,w-131",
    "https://ik.imagekit.io/dcjlghyytp1/146c108249a37c32c4a0cb4ef7fcfcef?tr=f-auto,w-480?tr=f-auto,w-131",
    "https://ik.imagekit.io/dcjlghyytp1/b157368de305b518c1b362e77826c54a?tr=f-auto,w-480?tr=f-auto,w-131",
  ];

  return (
    <div>
      <Box
        position={"relative"}
        height={"300px"}
        width={"375px"}
        overflow={"hidden"}
        pt={"88px"}
      >
        <link
          rel="stylesheet"
          type="text/css"
          charSet="UTF-8"
          href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
        />
        <link
          rel="stylesheet"
          type="text/css"
          href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
        />
        <IconButton
          aria-label="left-arrow"
          position="absolute"
          background={"transparent"}
          left={side}
          top={top}
          transform={"translate(0%, -50%)"}
          zIndex={1}
          onClick={() => slider?.slickPrev()}
          variant="unstyled"
        >
          <BiLeftArrowAlt />
        </IconButton>
        <IconButton
          aria-label="right-arrow"
          backgroundColor={"transparent"}
          position="absolute"
          right={side}
          top={top}
          transform={"translate(50%, -50%)"}
          zIndex={2}
          onClick={() => slider?.slickNext()}
          variant="unstyled"
        >
          <BiRightArrowAlt />
        </IconButton>

        <Slider {...settings} ref={(slider) => setSlider(slider)}>
          {cards.map((url, index) => (
            <Box
              key={index}
              height={"160px"}
              borderRadius="2xl"
              position="relative"
              backgroundPosition="center"
              backgroundRepeat="no-repeat"
              backgroundSize="cover"
              backgroundImage={`url(${url})`}
            />
          ))}
        </Slider>
      </Box>
    </div>
  );
};

const settings = {
  arrows: false,
  infinite: true,
  autoplay: true,
  speed: 500,
  autoplaySpeed: 5000,
  slidesToShow: 1,
  slidesToScroll: 1,
};
