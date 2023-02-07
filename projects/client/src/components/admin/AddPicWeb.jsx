import React, { useRef, useState, useEffect } from "react";
import Swal from "sweetalert2";
import Axios from "axios";
import {
  Box,
  Button,
  Center,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Select,
  Stack,
  Text,
  Textarea,
  useColorModeValue,
} from "@chakra-ui/react";

export const AddPicWeb = () => {
  const [profile3, setProfile3] = useState("upload");
  const [image3, setImage3] = useState("");

//   const onCreate = async () => {
//     try {
//       const addProduct = {
//         productName: inputProductName.current.value,
//         description: inputDescription.current.value,
//       };
//       const res = await Axios.post(
//         `${process.env.REACT_APP_API_BASE_URL}/product/create`,
//         addProduct
//       );
//       Swal.fire({
//         icon: "success",
//         text: "Success",
//       });
//       setTimeout(() => window.location.replace("/adminPage"), 2000);
//       console.log(res);
//     } catch (err) {
//       console.log(err);
//     }
//   };

  const handleUpload2 = async () => {
    const data = new FormData();
    data.append("file", image3);

    const resultImage = await Axios.post(
      `${process.env.REACT_APP_API_BASE_URL}/picture/single-uploaded-picture`,
      data,
      {
        headers: {
          "Content-type": "multipart/form-data",
        },
      }
    );

    setProfile3(resultImage.data.pictureName);
    setImage3({ images: "" });
    Swal.fire({
      icon: "success",
      text: "Success",
      width: "370px",
    });
    window.location.replace("/admin");
  };

//   return (
//     <div>
//       <Box
//         p="10px"
//         ml="200px"
//         mt="215px"
//         mr="100px"
//         color={useColorModeValue("#285430")}
//         border="2px"
//         borderRadius="2xl"
//       >
//         <Box
//           w={"385px"}
//           m="10px"
//           mb="25px"
//           borderWidth="2px"
//           boxShadow="xl"
//           borderRadius="8px"
//           borderColor="#285430"
//         >
//           <Box
//             pt="10px"
//             h="50px"
//             borderTopRadius="8px"
//             align="center"
//             bg="#E5D9B6"
//             fontSize="18px"
//           >
//             <Text justifyContent="center" fontWeight="bold" color="#285430">
//               Add Product
//             </Text>
//           </Box>
//           <Stack spacing={"10px"}>
//             <FormControl>
//               <FormLabel mt={"10px"} ml={"10px"} color="#285430">
//                 Product Name
//               </FormLabel>
//               <Input
//                 w={"360px"}
//                 ml={"10px"}
//                 ref={inputProductName}
//                 placeholder="Product"
//                 _placeholder={{ color: "#5F8D4E" }}
//                 borderColor="#285430"
//                 textColor="#285430"
//               ></Input>
//             </FormControl>
//             <FormControl>
//               <FormLabel mt={"10px"} ml={"10px"} color="#285430">
//                 Category
//               </FormLabel>
//               <Select
//                 w={"360px"}
//                 ml={"10px"}
//                 color={"#285430"}
//                 borderColor="#285430"
//               >
//                 <option>Select Category</option>
//                 {data2?.map((item) => {
//                   return (
//                     <>
//                       <option color="#285430">{item.categoryName}</option>
//                     </>
//                   );
//                 })}
//               </Select>
//             </FormControl>
//             <FormControl>
//               <FormLabel mt={"10px"} ml={"10px"} color={"#285430"}>
//                 Description
//               </FormLabel>
//               <Textarea
//                 w={"360px"}
//                 ml={"10px"}
//                 textColor="#285430"
//                 borderColor="#285430"
//                 ref={inputDescription}
//               ></Textarea>
//             </FormControl>
//             <Center>
//               <Button
//                 mt={"20px"}
//                 mb={"20px"}
//                 w={"360px"}
//                 bgColor={"#A4BE7B"}
//                 borderColor="#285430"
//                 border="2px"
//                 fontSize="16px"
//                 color="gray.800"
//                 justifyContent="center"
//                 onClick={onCreate}
//               >
//                 Add Product
//               </Button>
//             </Center>
//           </Stack>
//         </Box>
//       </Box>
//     </div>
//   );
// };