import { useRef, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Axios from "axios";
import Swal from "sweetalert2";
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
import { ArrowBackIcon } from "@chakra-ui/icons";
import { syncData } from "../../redux/addressSlice";

export const UpdateAddressPage = () => {
  const [province, setProvince] = useState([]);
  const [city, setCity] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState(0);
  const [selectedCity, setSelectedCity] = useState(0);
  const { data } = useSelector((state) => state.addressSlice.value);
  const { id } = useSelector((state) => state.userSlice.value);
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
      const result = await Axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/address/findById/${id}`,
        { id: params.id }
      );
      console.log(result.data);
      dispatch(syncData(result.data));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getData();
  }, [id]);

  const setDefault = async () => {
    try {
      const updateDefault = {
        defaultAddress: inputDefaultAddress.current.value,
      };
      const result = await Axios.patch(
        `${process.env.REACT_APP_API_BASE_URL}/address/setDefault/${params.id}`,
        updateDefault
      );
      getData();
      setTimeout(() => window.location.replace("/account/address"), 2000);
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

  const onRefresh = () => {
    window.location.replace(`/account/address/${id}`);
  };

  return (
    <>
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
            <Box as="button" onClick={onRefresh}>
              <ArrowBackIcon
                mt={"-15px"}
                ml={"20px"}
                pos={"fixed"}
                color="#285430"
                fontSize={"25px"}
              />
            </Box>
            <Box margin={"auto"} alignItems={"center"} textColor="#285430">
              <Text as={"b"} fontSize="xl">
                EDIT ADDRESS
              </Text>
            </Box>
          </Box>
          <Box
            mt={"80px"}
            pt={"3px"}
            className="body"
            bgColor="white"
            h={"850px"}
            w={"390px"}
          >
            <Stack spacing={"10px"} mt={"10px"} textColor="#285430">
              <FormControl>
                <FormLabel ml={"20px"}>Alamat</FormLabel>
                <Input
                  ref={inputAddressLine}
                  placeholder="Alamat"
                  ml="20px"
                  width="340px"
                  border="2px"
                  borderColor="#285430"
                  defaultValue={data?.addressLine}
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
                  defaultValue={data?.district}
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
                <Select
                  placeholder="Select City"
                  onChange={cityHandler}
                  ml={"20px"}
                  width="340px"
                  border="2px"
                  borderColor="#285430"
                >
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
                  defaultValue={data?.postalCode}
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
                  defaultValue={data?.detail}
                ></Textarea>
                <Checkbox
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
                      defaultValue={data?.receiverName}
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
                    defaultValue={data?.receiverPhone}
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
                    defaultValue={data?.receiverEmail}
                  ></Input>
                </FormControl>
              </FormControl>
              <Center>
                <Button
                  onClick={() => onUpdate(data.id)}
                  bgColor={"#A4BE7B"}
                  borderColor="#285430"
                  border="2px"
                  fontSize="18px"
                  color="gray.800"
                  width={"160px"}
                  justifyContent="center"
                >
                  Confirm
                </Button>
              </Center>
            </Stack>
          </Box>
        </Box>
      </Center>
    </>
  );
};
