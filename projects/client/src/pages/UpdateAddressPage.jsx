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
import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Axios from "axios";
import Swal from "sweetalert2";
import { syncData } from "../redux/addressSlice";
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowBackIcon } from "@chakra-ui/icons";

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
                <FormLabel ml={"20px"}>Kota/Kabupaten</FormLabel>
                {/* <Input ref={inputCity} defaultValue={data?.city}></Input> */}
                <Select
                  ref={inputCity}
                  ml={"20px"}
                  width="340px"
                  border="2px"
                  borderColor="#285430"
                >
                  <option color="#E5D9B6" selected={data?.city === ""} value="">
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
                <FormLabel ml={"20px"}>Provinsi</FormLabel>
                {/* <Input ref={inputProvince} defaultValue={data?.province}></Input> */}
                <Select
                  ref={inputProvince}
                  ml={"20px"}
                  width="340px"
                  border="2px"
                  borderColor="#285430"
                >
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
                <Checkbox iconColor='#285430' iconSize='1rem' mt="10px" mb={"10px"} ml={"20px"}>
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
    </div>
  );
};
