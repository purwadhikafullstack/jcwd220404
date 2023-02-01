import { useState } from "react";
import Axios from "axios";
import {
  AccordionButton,
  AccordionIcon,
  AccordionPanel,
  Box,
  Button,
  ButtonGroup,
} from "@chakra-ui/react";
import Swal from "sweetalert2";

export const AddPicWeb = () => {
  const [profile3, setProfile3] = useState("upload");
  const [image3, setImage3] = useState("");

  const handleChoose2 = (e) => {
    console.log("e.target.files", e.target.files);
    setImage3(e.target.files[0]);
  };

  const handleUpload2 = async () => {
    const data = new FormData();
    console.log(data);
    data.append("file", image3);
    console.log(data.get("file"));

    const resultImage = await Axios.post(
      `${process.env.REACT_APP_API_BASE_URL}/picture/single-uploaded-picture`,
      data,
      {
        headers: {
          "Content-type": "multipart/form-data",
        },
      }
    );
    console.log(resultImage.data);
    setProfile3(resultImage.data.pictureName);
    setImage3({ images: "" });
    console.log(image3);
    console.log(profile3);
    Swal.fire({
      icon: "success",
      text: "Success",
      width: "370px",
    });
    window.location.replace("/admin");
  };
  
  return (
    <div>
      <h2>
        {/* <AccordionButton> */}
          <Box color="#285430" as="span" flex="1" textAlign="left">
            Add Picture
          </Box>
          {/* <AccordionIcon color="gray.800" /> */}
        {/* </AccordionButton> */}
      </h2>
      {/* <AccordionPanel pb={4}> */}
        <ButtonGroup size="sm">
          <form encType="multipart/form-data">
            <input
              type={"file"}
              accept="image/*"
              name="file"
              size={"100px"}
              onChange={(e) => handleChoose2(e)}
            ></input>
          </form>
          <Button
            mr="120px"
            bgColor={"#A4BE7B"}
            borderColor="#285430"
            border="2px"
            color="gray.800"
            onClick={handleUpload2}
            size="sm"
          >
            Upload
          </Button>
        </ButtonGroup>
      {/* </AccordionPanel> */}
    </div>
  );
};
