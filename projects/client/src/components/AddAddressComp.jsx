// import {
//   Box,
//   Button,
//   Center,
//   Checkbox,
//   Flex,
//   FormControl,
//   FormLabel,
//   Input,
//   Select,
//   Stack,
//   Text,
//   Textarea,
// } from "@chakra-ui/react";
// import React from "react";
// import { useRef } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import Axios from "axios";
// import Swal from "sweetalert2";
// import { ArrowBackIcon } from "@chakra-ui/icons";

// export const AddAddressComp = () => {
  

//   const onCreate = async () => {
//     try {
//       const addAddress = {
//         addressLine: inputAddressLine.current.value,
//         district: inputDistrict.current.value,
//         city: inputCity.current.value,
//         province: inputProvince.current.value,
//         postalCode: inputPostalCode.current.value,
//         detail: inputDetail.current.value,
//         receiverName: inputReceiverName.current.value,
//         receiverPhone: inputReceiverPhone.current.value,
//         receiverEmail: inputReceiverEmail.current.value,
//       };

//       const res = await Axios.post(
//         `${process.env.REACT_APP_API_BASE_URL}/address/create`,
//         addAddress
//       );
//       Swal.fire({
//         icon: "success",
//         text: "Success",
//         width: "370",
//       });
//       navigate("/account/address");
//       console.log(res);
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   return (
//     <div>
//       <Center>
//         <Box>
          
//           <Box
//             className="body"
//             bgColor="white"
//             h={"850px"}
//             w={"390px"}
//           >
            
//           </Box>
//         </Box>
//       </Center>
//     </div>
//   );
// };