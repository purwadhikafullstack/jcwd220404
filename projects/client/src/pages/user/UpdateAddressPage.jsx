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
import { syncData } from "../../redux/addressSlice";
import { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ArrowBackIcon } from "@chakra-ui/icons";

export const UpdateAddressPage = () => {
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
  const navigate = useNavigate();

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

  const onRefresh = () => {
    setTimeout(() => window.location.replace(`/account/address/${id}`), 2000);
  };

  return (
    <div>
      <Box>
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
            pos="fixed"
            top={"0"}
            zIndex={"2"}
          >
            <Box
              // as={Link}
              // to={`/account/address/${id}`}
              as="button"
              onClick={onRefresh}
            >
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
            <Stack spacing={"10px"} mt={"20px"} textColor="#285430">
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
                <FormLabel>Kecamatan</FormLabel>
                <Input
                  ref={inputDistrict}
                  ml="20px"
                  width="340px"
                  border="2px"
                  borderColor="#285430"
                  defaultValue={data?.district}
                ></Input>
              </FormControl>
              <FormControl>
                <FormLabel>Kota/Kabupaten</FormLabel>
                {/* <Text>{data?.city}</Text> */}
                <Select ref={inputCity} defaultValue={data?.city}>
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
              </FormControl>
              <FormControl>
                <FormLabel>Provinsi</FormLabel>
                {/* <Text>{data?.province}</Text> */}
                <Select ref={inputProvince}>
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
                <FormLabel>Kode Pos</FormLabel>
                <Input
                  ref={inputPostalCode}
                  defaultValue={data?.postalCode}
                ></Input>
              </FormControl>
              <FormControl>
                <FormLabel>Detail Alamat</FormLabel>
                <Textarea
                  ref={inputDetail}
                  placeholder="e.g. Blok/Lantai"
                  defaultValue={data?.detail}
                ></Textarea>
                <Checkbox mb={"20px"}>Set as Default Address</Checkbox>
                <FormControl>
                  <FormLabel>Nama Penerima</FormLabel>
                  <Flex>
                    <Input
                      ref={inputReceiverName}
                      defaultValue={data?.receiverName}
                      placeholder="Name"
                      ml="20px"
                      width="340px"
                      border="2px"
                      borderColor="#285430"
                    ></Input>
                  </Flex>
                </FormControl>
                <FormControl>
                  <FormLabel>No. Telepon Penerima</FormLabel>
                  <Input
                    ref={inputReceiverPhone}
                    placeholder="08xxx"
                    type={"text"}
                    defaultValue={data?.receiverPhone}
                    ml="20px"
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
                    defaultValue={data?.receiverEmail}
                    ml="20px"
                    width="340px"
                    border="2px"
                    borderColor="#285430"
                  ></Input>
                </FormControl>
              </FormControl>
              <Button
                bgColor={"#A4BE7B"}
                borderColor="#285430"
                border="2px"
                fontSize="18px"
                color="gray.800"
                width={"160px"}
                justifyContent="center"
                onClick={() => onUpdate(data.id)}
              >
                Confirm
              </Button>
            </Stack>
          </Box>
        </Center>
      </Box>
    </div>
  );
};
