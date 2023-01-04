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
} from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import { useRef } from "react";
import Axios from "axios";
import Swal from "sweetalert2";

export const AddressPage = () => {
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
        <Box w={"390px"} h={"844px"} bgColor="white">
          <Box as={Link} to={"/account/address"}>
            <ArrowBackIcon mt={"20px"} pos={"fixed"} />
          </Box>
          <Box
            mt={"100px"}
            className="body"
            bgColor="white"
            h={"1750px"}
            w={"390px"}
          >
            <Stack spacing={"10px"} mt={"20px"}>
              <FormControl>
                <FormLabel>Alamat</FormLabel>
                <Input
                  ref={inputAddressLine}
                  placeholder="Alamat"
                  mb={"20px"}
                ></Input>
              </FormControl>
              <FormLabel>Kecamatan</FormLabel>
              <Input ref={inputDistrict} mb={"20px"}></Input>
              <FormControl>
                <FormLabel>Kota/Kabupaten</FormLabel>
                <Select ref={inputCity}>
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
                <FormLabel>Provinsi</FormLabel>
                <Select ref={inputProvince}>
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
              </FormControl>
              <FormControl>
                <FormLabel>Kode Pos</FormLabel>
                <Input ref={inputPostalCode}></Input>
              </FormControl>
              <FormControl>
                <FormLabel>Detail Alamat</FormLabel>
                <Textarea
                  ref={inputDetail}
                  placeholder="e.g. Blok/Lantai"
                ></Textarea>
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
                  ></Input>
                </FormControl>
                <FormControl>
                  <FormLabel>Email Penerima</FormLabel>
                  <Input
                    ref={inputReceiverEmail}
                    placeholder="yourname@example.com"
                  ></Input>
                </FormControl>
              </FormControl>
              <Button onClick={onCreate}>Add Address</Button>
            </Stack>
          </Box>
        </Box>
      </Center>
    </div>
  );
};
