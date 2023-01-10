import { ArrowBackIcon } from "@chakra-ui/icons";
import {
  Box,
  Center,
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Select,
  Stack,
  Textarea,
  Text,
} from "@chakra-ui/react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useRef } from "react";
import Axios from "axios";
import Swal from "sweetalert2";
import { useState } from "react";

export const AddressPage = () => {
  const [province, setProvince] = useState([]);
  const [city, setCity] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState(0);
  const [selectedCity, setSelectedCity] = useState(0);
  // selectProvince(selectedProvince);
  // selectCity(selectedCity);
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

  const provinceHandler = ({ target }) => {
    const { value } = target;
    setSelectedProvince(value);
  };

  const cityHandler = ({ target }) => {
    const { value } = target;
    setSelectedCity(value);
  };

  useEffect(() => {
    fetchProvince();
  }, []);

  useEffect(() => {
    fetchCity();
  }, [selectedProvince]);

  return (
    <div>
      <Center>
        <Box
          className="header"
          w={"390px"}
          h={"80px"}
          bgColor="#E5D9B6"
          display={"flex"}
          justifyContent="space-between"
          pt={"10px"}
          pl={"1px"}
          // pos="fixed"
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
            <Box margin={"auto"} alignItems={"center"} textColor="#285430">
              <Text as={"b"} fontSize="xl">
                ADD ADDRESS
              </Text>
            </Box>
          </Box>
          <Box className="body" bgColor="white" h={"850px"} w={"390px"}>
            <Stack spacing={"10px"} mt={"20px"} textColor="#285430">
              <FormControl>
                <FormLabel>Alamat</FormLabel>
                <Input
                  ref={inputAddressLine}
                  placeholder="Alamat"
                  mb={"20px"}
                  ml="20px"
                  width="340px"
                  border="2px"
                  borderColor="#285430"
                ></Input>
              </FormControl>
              <FormControl>
                <FormLabel>Kecamatan</FormLabel>
                <Input
                  ref={inputDistrict}
                  mb={"20px"}
                  ml="20px"
                  width="340px"
                  border="2px"
                  borderColor="#285430"
                ></Input>
              </FormControl>
              <FormControl>
                <FormLabel>Province</FormLabel>
                <Select
                  placeholder="Select Province"
                  onChange={provinceHandler}
                >
                  {renderProvince()}
                </Select>
              </FormControl>
              <FormControl>
                <FormLabel>City</FormLabel>
                <Select placeholder="Select City" onChange={cityHandler}>
                  {renderCity()}
                </Select>
              </FormControl>
              {/* <FormControl>
                <FormLabel>Provinsi</FormLabel>
                <Select
                  ref={inputProvince}
                  ml="20px"
                  width="340px"
                  border="2px"
                  borderColor="#285430"
                >
                  <option
                    // selected={data.Profile?.gender === ""}
                    value=""
                  >
                    Pilih Provinsi
                  </option>
                  <option value="6">DKI Jakarta</option>
                  <option value="9">Jawa Barat</option>
                  <option value="3">Banten</option>
                </Select>
              </FormControl> */}
              {/* <FormControl>
                <FormLabel>Kota/Kabupaten</FormLabel>
                <Select
                  ref={inputCity}
                  ml="20px"
                  width="340px"
                  border="2px"
                  borderColor="#285430"
                >
                  <option
                    // selected={data.Profile?.gender === ""}
                    value=""
                  >
                    Pilih Kota/Kabupaten
                  </option>
                  <option value="154">Jakarta Timur</option>
                  <option value="55">Kota Bekasi</option>
                  <option value="457">Kota Tangerang Selatan</option>
                  <option value="153">Kota Jakarta Selatan</option>
                  <option value="151">Kota Jakarta Barat</option>
                  <option value="152">Kota Jakarta Pusat</option>
                  <option value="79">Kota Bogor</option>
                  <option value="155">Kota Jakarta Utara</option>
                </Select>
              </FormControl> */}
              <FormControl>
                <FormLabel>Kode Pos</FormLabel>
                <Input
                  ref={inputPostalCode}
                  ml={"20px"}
                  width="340px"
                  border="2px"
                  borderColor="#285430"
                ></Input>
              </FormControl>
              <FormControl>
                <FormLabel>Detail Alamat</FormLabel>
                <Textarea
                  ref={inputDetail}
                  placeholder="e.g. Blok/Lantai"
                ></Textarea>
              </FormControl>
              <Checkbox mb={"20px"}>Set as Default Address</Checkbox>
              <FormControl>
                <FormLabel>Nama Penerima</FormLabel>
                <Flex>
                  <Input ref={inputReceiverName} placeholder="Name"></Input>
                </Flex>
              </FormControl>
              <FormControl>
                <FormLabel>No. Telepon Penerima</FormLabel>
                <Input
                  ref={inputReceiverPhone}
                  placeholder="08xxx"
                  type={"text"}
                  ml={"20px"}
                  width="340px"
                  border="2px"
                  borderColor="#285430"
                ></Input>
              </FormControl>
              <FormControl>
                <FormLabel>Email Penerima</FormLabel>
                <Input
                  ref={inputReceiverEmail}
                  placeholder="yourname@example.com"
                  ml={"20px"}
                  width="340px"
                  border="2px"
                  borderColor="#285430"
                ></Input>
              </FormControl>
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
            </Stack>
          </Box>
        </Box>
      </Center>
    </div>
  );
};