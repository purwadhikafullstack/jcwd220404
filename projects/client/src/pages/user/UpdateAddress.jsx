import { useRef, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Axios from "axios";
import Swal from "sweetalert2";
import {
  Box,
  Button,
  ButtonGroup,
  Center,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverFooter,
  Select,
  Stack,
  Text,
  Textarea,
  useDisclosure,
} from "@chakra-ui/react";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { syncData } from "../../redux/addressSlice";

export const UpdateAddressPage = () => {
  const [province, setProvince] = useState([]);
  const [city, setCity] = useState([]);
  const [postal, setPostal] = useState([]);
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
  const { isOpen, onClose, onToggle } = useDisclosure();

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
      Swal.fire({
        icon: "success",
        text: "Success",
        width: "370px",
      });
      setTimeout(() => window.location.replace("/account/address"), 2000);
    } catch (err) {
    }
  };

  const getData = async () => {
    try {
      const result = await Axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/address/findById/${id}`,
        { id: params.id }
      );
      dispatch(syncData(result.data));
    } catch (err) {
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
      setCity(response.data.rajaongkir.results);
    } catch (err) {
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
        `${process.env.REACT_APP_API_BASE_URL}/address/city/${selectedProvince}`
      );
      setPostal(response.data.rajaongkir.results);
    } catch (err) {
    }
  };

  const renderPostal = () => {
    return Array.from(postal).map((val, i) => {
      return (
        <option value={val.postal_code} key={i}>
          {val.postal_code}
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

  const toListAddress = () => {
    window.location.replace(`/account/address/${id}`);
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
            <Box as="button" onClick={toListAddress}>
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
                <Flex justify={"space-between"}>
                  <FormLabel ml={"20px"}>Province</FormLabel>
                  <FormLabel>{data?.province}</FormLabel>
                </Flex>
                <Select
                  placeholder={data?.province}
                  onChange={provinceHandler}
                  ml={"20px"}
                  width="340px"
                  border="2px"
                  borderColor="#285430"
                  defaultValue={data?.province}
                  ref={inputProvince}
                >
                  {renderProvince()}
                </Select>
              </FormControl>
              <FormControl>
                <Flex justify={"space-between"}>
                  <FormLabel ml={"20px"}>City</FormLabel>
                  <FormLabel>{data?.city}</FormLabel>
                </Flex>
                <Select
                  placeholder={data?.city}
                  onChange={cityHandler}
                  ml={"20px"}
                  width="340px"
                  border="2px"
                  borderColor="#285430"
                  ref={inputCity}
                  defaultValue={data?.city}
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
                {/* <Checkbox
                  iconColor="#285430"
                  iconSize="1rem"
                  mt="10px"
                  mb={"10px"}
                  ml={"20px"}
                >
                  Set as Default Address
                </Checkbox> */}
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
                  onClick={onToggle}
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
                <Popover
                  returnFocusOnClose={false}
                  isOpen={isOpen}
                  placement="auto-end"
                  closeOnBlur={false}
                >
                  <PopoverContent
                    ml="8"
                    mt="275"
                    borderColor="#285430"
                    border="2px"
                    bgColor={"#E5D9B6"}
                  >
                    <PopoverArrow />
                    <PopoverBody textColor={"#285430"}>
                      Data will be saved, are You sure?
                    </PopoverBody>
                    <PopoverFooter display="flex" justifyContent="flex-end">
                      <ButtonGroup size="sm">
                        <Button
                          onClick={onClose}
                          bgColor={"#A4BE7B"}
                          borderColor="#285430"
                          border="2px"
                          fontSize="14px"
                          color="gray.800"
                        >
                          No
                        </Button>
                        <Button
                          onClick={() => onUpdate(data.id)}
                          bgColor="#A4BE7B"
                          borderColor="#285430"
                          border="2px"
                          fontSize="14px"
                          color="gray.800"
                        >
                          Yes
                        </Button>
                      </ButtonGroup>
                    </PopoverFooter>
                  </PopoverContent>
                </Popover>
              </Center>
            </Stack>
          </Box>
        </Box>
      </Center>
    </div>
  );
};
