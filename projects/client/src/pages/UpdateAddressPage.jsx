import React from "react"
import {
    Image,
    Box,
    Button,
    Checkbox,
    Flex,
    FormControl,
    FormLabel,
    Input,
    Select,
    Stack,
    Center,
    Textarea,
    Heading,
  } from "@chakra-ui/react";
  import { useRef, useState } from "react";
  import { useDispatch, useSelector } from "react-redux";
  import Axios from "axios";
  import Swal from "sweetalert2";
  import { syncData } from "../redux/addressSlice";
  import { useEffect } from "react";
  import { useParams } from "react-router-dom";
  import OnlyFreshLogo from "../OnlyFreshLogo.png";

  export const UpdateAddressPage = () => {
    // const { id } = useSelector((state) => state.addressSlice.value);
    const [data, setData] = useState();
    const inputAddressLine = useRef("");
    const inputCity = useRef("");
    const inputProvince = useRef("");
    const inputDetail = useRef("");
    const inputDistrict = useRef("");
    const inputPostalCode = useRef("");
    const inputDefaultAddress = useRef("");
    const inputReceiverName = useRef("");
    const inputReceiverPhone = useRef("");
    const inputReceiverEmail = useRef("");
    const dispatch = useDispatch();
    const params = useParams();
  
    const onUpdate = async () => {
      try {
        const updateAddress = {
          addressLine: inputAddressLine.current.value,
          district: inputDistrict.current.value,
          city: inputCity.current.value,
          province: inputProvince.current.value,
          postalCode: inputPostalCode.current.value,
          detail: inputDetail.current.value,
          receiverName: inputReceiverName.current.value,
          receiverPhone: inputReceiverPhone.current.value,
          receiverEmail: inputReceiverEmail.current.value,
        };
        const result = await Axios.patch(
          `${process.env.REACT_APP_API_BASE_URL}/address/updateAddress/${params.id}`,
          updateAddress
        );
        console.log(result);
        Swal.fire({
          icon: "success",
          text: "Success",
        });
        setTimeout(() => window.location.replace("/account/address"), 2000);
      } catch (err) {
        console.log(err);
      }
    };
  
    const getData = async () => {
      try {
        const result = await Axios.get(
          `${process.env.REACT_APP_API_BASE_URL}/address/findById/${params.id}`
        );
        console.log(result.data);
        setData(result.data);
        // dispatch(syncData(result.data));
      } catch (err) {
        console.log(err);
      }
    };
  
    useEffect(() => {
      getData();
    }, []);
  
    return (
      <div>
      <Center>
        <Box 
        w={"390px"}
        h={"100%"}   
        px={3} 
        py={3} 
        border="2px"  
        bgColor="#E5D9B6" >
      <Image src={OnlyFreshLogo} height="160px" w={"auto"} ml={"75px"} />
          <Stack  spacing={"10px"}  >
          <Heading mt={"10px"} size={"lg"} textColor="#285430">
           Update Your Address
          </Heading>
            <FormControl>
              <FormLabel><b>Alamat</b></FormLabel>
              <Input
                ref={inputAddressLine}
                bgColor={"white"}
                textColor="#285430"
                placeholder="Alamat"
                _placeholder={{ color: "#5F8D4E" }}
                mb={"20px"}
                defaultValue={data?.addressLine}
                w={"340px"}
                border={"2px"}
              ></Input>
            </FormControl>
            <FormLabel><b>Kecamatan</b></FormLabel>
            <Input
              ref={inputDistrict}
              bgColor={"white"}
              textColor="#285430"
              placeholder="Alamat"
              _placeholder={{ color: "#5F8D4E" }}
              mb={"20px"}
              w={"340px"}
              border={"2px"}
              defaultValue={data?.district}
            ></Input>
            <FormControl>
              <FormLabel><b>Kota/Kabupaten</b></FormLabel>
              {/* <Input ref={inputCity} defaultValue={data?.city}></Input> */}
              <Select 
              ref={inputCity} 
              bgColor={"white"}
              textColor="#285430"
              _placeholder={{ color: "#5F8D4E" }}
              mb={"20px"}
              w={"340px"}
              border={"2px"}>
                <option selected={data?.city === ""} value="">
                  Pilih Kota/Kabupaten
                </option>
                <option value="154" selected={data?.city === "154"}>
                  Jakarta Timur
                </option>
                <option value="55" selected={data?.city === "55"}>
                  Kota Bekasi
                </option>
                <option value="457" selected={data?.city === "457"}>
                  Kota Tangerang Selatan
                </option>
                <option value="153" selected={data?.city === "153"}>
                  Kota Jakarta Selatan
                </option>
                <option value="151" selected={data?.city === "151"}>
                  Kota Jakarta Barat
                </option>
                <option value="152" selected={data?.city === "152"}>
                  Kota Jakarta Pusat
                </option>
                <option value="79" selected={data?.city === "79"}>
                  Kota Bogor
                </option>
                <option value="155" selected={data?.city === "155"}>
                  Kota Jakarta Utara
                </option>
              </Select>
              <FormLabel><b>Provinsi</b></FormLabel>
              {/* <Input ref={inputProvince} defaultValue={data?.province}></Input> */}
              <Select 
              ref={inputProvince}
              bgColor={"white"}
              textColor="#285430"
              _placeholder={{ color: "#5F8D4E" }}
              mb={"20px"}
              w={"340px"}
              border={"2px"}>
                <option selected={data?.province === ""} value="">
                  Pilih Provinsi
                </option>
                <option value="6" selected={data?.province === "6"}>
                  DKI Jakarta
                </option>
                <option value="9" selected={data?.province === "9"}>
                  Jawa Barat
                </option>
                <option value="3" selected={data?.province === "3"}>
                  Banten
                </option>
              </Select>
            </FormControl>
            <FormControl>
              <FormLabel><b>Kode Pos</b></FormLabel>
              <Input
                ref={inputPostalCode}
                defaultValue={data?.postalCode}
                bgColor={"white"}
                textColor="#285430"
                _placeholder={{ color: "#5F8D4E" }}
                mb={"20px"}
                w={"340px"}
                border={"2px"}
              ></Input>
            </FormControl>
            <FormControl>
              <FormLabel><b>Detail Alamat</b></FormLabel>
              <Textarea
                ref={inputDetail}
                placeholder="e.g. Blok/Lantai"
                defaultValue={data?.detail}
                bgColor={"white"}
                textColor="#285430"
                _placeholder={{ color: "#5F8D4E" }}
                mb={"20px"}
                w={"340px"}
                border={"2px"}
              ></Textarea>
              <Checkbox mb={"20px"}><b>Set as Default Address</b></Checkbox>
              <FormControl>
                <FormLabel><b>Nama Penerima</b></FormLabel>
                <Flex>
                  <Input
                    ref={inputReceiverName}
                    defaultValue={data?.receiverName}
                    placeholder="Name"
                    bgColor={"white"}
                textColor="#285430"
                _placeholder={{ color: "#5F8D4E" }}
                mb={"20px"}
                w={"340px"}
                border={"2px"}
                  ></Input>
                </Flex>
              </FormControl>
              <FormControl>
                <FormLabel><b>No. Telepon Penerima</b></FormLabel>
                <Input
                  ref={inputReceiverPhone}
                  placeholder="08xxx"
                  type={"text"}
                  defaultValue={data?.receiverPhone}
                  bgColor={"white"}
                textColor="#285430"
                _placeholder={{ color: "#5F8D4E" }}
                mb={"20px"}
                w={"340px"}
                border={"2px"}
                ></Input>
              </FormControl>
              <FormControl>
                <FormLabel><b>Email Penerima</b></FormLabel>
                <Input
                  ref={inputReceiverEmail}
                  placeholder="yourname@example.com"
                  defaultValue={data?.receiverEmail}
                  bgColor={"white"}
                textColor="#285430"
                _placeholder={{ color: "#5F8D4E" }}
                mb={"20px"}
                w={"340px"}
                border={"2px"}
                ></Input>
              </FormControl>
            </FormControl>
            <Center>
            <Button
                onClick={() => onUpdate(data.id)}
                mt={"3"}
                mb={"3"}
                _hover={{
                  bg: "#E5D9B6",
                }}
                bgColor={"#A4BE7B"}
                borderColor="#285430"
                border="2px"
                fontSize="18px"
                color="gray.800"
                w={"90px"}
                alignItems="center"
              >
                <b>Confirm</b>
              </Button>
              </Center>
              <Box  justifyContent="center" >
            <React.StrictMode>
            <img src="https://cdn.dribbble.com/users/1162077/screenshots/3848914/programmer.gif" width="100%" height="200px"></img>
            </React.StrictMode>
            </Box>
          </Stack>
        </Box>
        </Center>
      </div>
    );
  };