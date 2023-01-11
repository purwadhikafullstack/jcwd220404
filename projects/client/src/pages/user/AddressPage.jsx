import { ArrowBackIcon } from "@chakra-ui/icons";
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
import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { AddAddressComp } from "../../components/AddAddressComp";
import Axios from "axios";

export const AddressPage = () => {
  const [province, setProvince] = useState([]);
  const [city, setCity] = useState([]);
  const [postal, setPostal] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState(0);
  const [selectedCity, setSelectedCity] = useState(0);
  const [selectedPostal, setSelectedPostal] = useState(0);
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
  const params = useParams();

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
        `${process.env.REACT_APP_API_BASE_URL}/address/create/${params.id}`,
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

  const fetchProvince = async () => {
    try {
      const response = await Axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/address/province`
      );
      setProvince(response.data.rajaongkir.results);
    } catch (err) {
      console.log(err);
    }
  };

  const renderProvince = () => {
    return province.map((val) => {
      return (
        <option value={val.province_id} key={val.province_id.toString()}>
          {val.province}
        </option>
      );
    });
  };

  const fetchCity = async () => {
    try {
      const response = await Axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/address/city/${selectedProvince}`
      );
      console.log(response);
      setCity(response.data.rajaongkir.results);
    } catch (err) {
      console.log(err);
    }
  };

  const renderCity = () => {
    return Array.from(city).map((val, i) => {
      return (
        <option value={val.city_id} key={i}>
          {val.type + " "} {val.city_name}
        </option>
      );
    });
  };

  const fetchPostal = async () => {
    try {
      const response = await Axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/address/postal/${selectedPostal}`
      );
      console.log(response);
      setPostal(response.data.rajaongkir.results);
    } catch (err) {
      console.log(err);
    }
  };

  const renderPostal = () => {
    return Array.from(postal).map((val, i) => {
      return (
        <option value={val.city_id} key={i}>
          {val.type + " "} {val.postal_code}
        </option>
      );
    });
  };

  const provinceHandler = ({ target }) => {
    const { value } = target;
    setSelectedProvince(value);
  };

  const cityHandler = ({ target }) => {
    const { value } = target;
    setSelectedCity(value);
  };

  const postalHandler = ({ target }) => {
    const { value } = target;
    setSelectedPostal(value);
  };

  useEffect(() => {
    fetchProvince();
  }, []);

  useEffect(() => {
    fetchCity();
  }, [selectedProvince]);

  useEffect(() => {
    fetchPostal();
  }, [selectedCity]);

  return (
    <div>
      <Center>
        <Box w={"390px"} h={"844px"} bgColor="white">
          {/* <Box as={Link} to={`/account/address`}>
            <ArrowBackIcon mt={"20px"} pos={"fixed"} />
          </Box> */}
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
            mt={"100px"}
            className="body"
            bgColor="white"
            h={"844px"}
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
                <FormLabel ml={"20px"}>Province</FormLabel>
                <Select
                  placeholder="Select Province"
                  onChange={provinceHandler}
                  ml={"20px"}
                  width="340px"
                  border="2px"
                  borderColor="#285430"
                >
                  {renderProvince()}
                </Select>
              </FormControl>
              <FormControl>
                <FormLabel ml={"20px"}>City</FormLabel>
                <Select placeholder="Select City" onChange={cityHandler}ml={"20px"}
                  width="340px"
                  border="2px"
                  borderColor="#285430">
                  {renderCity()}
                  
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
                <Checkbox
                  colorScheme="#285430"
                  iconColor="#285430"
                  iconSize="1rem"
                  mt="10px"
                  mb={"10px"}
                  ml={"20px"}
                >
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
