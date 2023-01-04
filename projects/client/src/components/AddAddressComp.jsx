import {
  Box,
  Button,
  Center,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Select,
  Stack,
  Text,
  Textarea,
} from "@chakra-ui/react";
import React from "react";
import { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import Axios from "axios";
import Swal from "sweetalert2";
import { ArrowBackIcon } from "@chakra-ui/icons";

export const AddAddressComp = () => {
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
  const navigate = useNavigate();

  const onCreate = async () => {
    try {
      const addAddress = {
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

      const res = await Axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/address/create`,
        addAddress
      );
      Swal.fire({
        icon: "success",
        text: "Success",
        width: "370",
      });
      navigate("/account/address");
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <Center>
        <Box>
          <Box
            className="header"
            w={"390px"}
            h={"80px"}
            bgColor="#E5D9B6"
            display={"flex"}
            justifyContent="space-between"
            pt={"10px"}
            pl={"1px"}
            pos="fixed"
            top={"0"}
            zIndex={"2"}
          >
            <Box as={Link} to={"/account/address"}>
              <ArrowBackIcon
                mt={"20px"}
                ml={"20px"}
                pos={"fixed"}
                color="#285430"
                fontSize={"25px"}
              />
            </Box>
            <Box margin={"auto"} alignItems={"center"} textColor="#285430">
              <Text as={"b"} fontSize="xl">
                ADD ADDRESS
              </Text>
            </Box>
          </Box>
          <Box
            className="body"
            bgColor="white"
            h={"850px"}
            w={"390px"}
          >
            <Stack spacing={"10px"} textColor="#285430">
              <FormControl>
                <FormLabel ml={"20px"}>Alamat</FormLabel>
                <Input
                  ref={inputAddressLine}
                  placeholder="Alamat"
                  ml="20px"
                  width="340px"
                  border="2px"
                  borderColor="#285430"
                ></Input>
              </FormControl>
              <FormControl>
                <FormLabel ml={"20px"}>Kecamatan</FormLabel>
                <Input
                  ref={inputDistrict}
                  ml={"20px"}
                  width="340px"
                  border="2px"
                  borderColor="#285430"
                ></Input>
              </FormControl>
              <FormControl>
                <FormLabel ml={"20px"}>Kota/Kabupaten</FormLabel>
                {/* <Input ref={inputCity} defaultValue={data?.city}></Input> */}
                <Select
                  ref={inputCity}
                  ml={"20px"}
                  width="340px"
                  border="2px"
                  borderColor="#285430"
                >
                  <option value="">
                    Pilih Kota/Kabupaten
                  </option>
                  <option value="154">
                    Jakarta Timur
                  </option>
                  <option value="55">
                    Kota Bekasi
                  </option>
                  <option value="457">
                    Kota Tangerang Selatan
                  </option>
                  <option value="153">
                    Kota Jakarta Selatan
                  </option>
                  <option value="151">
                    Kota Jakarta Barat
                  </option>
                  <option value="152">
                    Kota Jakarta Pusat
                  </option>
                  <option value="79">
                    Kota Bogor
                  </option>
                  <option value="155">
                    Kota Jakarta Utara
                  </option>
                </Select>
                <FormLabel ml={"20px"}>Provinsi</FormLabel>
                {/* <Input ref={inputProvince} defaultValue={data?.province}></Input> */}
                <Select
                  ref={inputProvince}
                  ml={"20px"}
                  width="340px"
                  border="2px"
                  borderColor="#285430"
                >
                  <option value="">
                    Pilih Provinsi
                  </option>
                  <option value="6">
                    DKI Jakarta
                  </option>
                  <option value="9">
                    Jawa Barat
                  </option>
                  <option value="3">
                    Banten
                  </option>
                </Select>
              </FormControl>
              <FormControl>
                <FormLabel ml={"20px"}>Kode Pos</FormLabel>
                <Input
                  ref={inputPostalCode}
                  ml={"20px"}
                  width="340px"
                  border="2px"
                  borderColor="#285430"
                ></Input>
              </FormControl>
              <FormControl>
                <FormLabel ml={"20px"}>Detail Alamat</FormLabel>
                <Textarea
                  ref={inputDetail}
                  placeholder="e.g. Blok/Lantai"
                  ml={"20px"}
                  width="340px"
                  border="2px"
                  borderColor="#285430"
                ></Textarea>
                <Checkbox  iconColor='#285430' iconSize='1rem' mt="10px" mb={"10px"} ml={"20px"}>
                  Set as Default Address
                </Checkbox>
                <FormControl>
                  <FormLabel ml={"20px"}>Nama Penerima</FormLabel>
                  <Flex>
                    <Input
                      ref={inputReceiverName}
                      ml={"20px"}
                      width="340px"
                      border="2px"
                      borderColor="#285430"
                      placeholder="Name"
                    ></Input>
                  </Flex>
                </FormControl>
                <FormControl>
                  <FormLabel ml={"20px"}>No. Telepon Penerima</FormLabel>
                  <Input
                    ref={inputReceiverPhone}
                    placeholder="08xxx"
                    ml={"20px"}
                    width="340px"
                    border="2px"
                    borderColor="#285430"
                    type={"text"}
                  ></Input>
                </FormControl>
                <FormControl>
                  <FormLabel ml={"20px"}>Email Penerima</FormLabel>
                  <Input
                    ref={inputReceiverEmail}
                    placeholder="yourname@example.com"
                    ml={"20px"}
                    width="340px"
                    border="2px"
                    borderColor="#285430"
                  ></Input>
                </FormControl>
              </FormControl>
              <Center>
                <Button
                  onClick={onCreate}
                  bgColor={"#A4BE7B"}
                  borderColor="#285430"
                  border="2px"
                  fontSize="18px"
                  color="gray.800"
                  width={"160px"}
                  justifyContent="center"
                >
                  Add Address
                </Button>
              </Center>
            </Stack>
          </Box>
        </Box>
      </Center>
    </div>
  );
};