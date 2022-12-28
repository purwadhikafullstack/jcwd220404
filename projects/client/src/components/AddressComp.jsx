import {
  AspectRatio,
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
import React from "react";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import Swal from "sweetalert2";

export const AddressComp = () => {
  const inputAddressLine = useRef("");
  const inputCityId = useRef("");
  const inputProvinceId = useRef("");
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
        cityId: inputCityId.current.value,
        provinceId: inputProvinceId.current.value,
        postalCode: inputPostalCode.current.value,
        detail: inputDetail.current.value,
        receiverName: inputReceiverName.current.value,
        receiverPhone: inputReceiverPhone.current.value,
        // receiverEmail: inputReceiverEmail.current.value,
      };

      const res = await Axios.post(
        `http://localhost:8000/address/create`,
        addAddress
      );
      Swal.fire({
        icon: "success",
        text: "Email has changed",
        // text: `${result.data}`,
      });
      navigate("/account/address");
      // setTimeout(() => window.location.replace("/account/address"), 2000);
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <Stack spacing={"10px"} mt={"20px"}>
        <FormControl>
          <FormLabel>Alamat</FormLabel>
          <Input
            ref={inputAddressLine}
            placeholder="Alamat"
            mb={"20px"}
          ></Input>
          <AspectRatio ratio={16 / 9}>
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3963.952912260219!2d3.375295414770757!3d6.5276316452784755!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103b8b2ae68280c1%3A0xdc9e87a367c3d9cb!2sLagos!5e0!3m2!1sen!2sng!4v1567723392506!5m2!1sen!2sng" />
          </AspectRatio>
        </FormControl>
        <FormLabel>Kecamatan</FormLabel>
        <Input ref={inputAddressLine} mb={"20px"}></Input>
        <FormControl>
          <FormLabel>Kota/Kabupaten</FormLabel>
          <Select ref={inputCityId}>
            <option
              // selected={data.Profile?.gender === ""}
              value=""
            >
              Pilih Kota/Kabupaten
            </option>
            <option
              // selected={data.Profile?.gender === "male"}
              value="154"
            >
              Kota Jakarta Timur
            </option>
            <option
              // selected={data.Profile?.gender === "female"}
              value="55"
            >
              Kota Bekasi
            </option>
            <option
              // selected={data.Profile?.gender === "female"}
              value="457"
            >
              Kota Tangerang Selatan
            </option>
          </Select>
          <FormLabel>Provinsi</FormLabel>
          <Select ref={inputProvinceId}>
            <option
              // selected={data.Profile?.gender === ""}
              value=""
            >
              Pilih Provinsi
            </option>
            <option
              // selected={data.Profile?.gender === "male"}
              value="6"
            >
              DKI Jakarta
            </option>
            <option
              // selected={data.Profile?.gender === "female"}
              value="9"
            >
              Jawa Barat
            </option>
            <option
              // selected={data.Profile?.gender === "female"}
              value="3"
            >
              Banten
            </option>
          </Select>
        </FormControl>
        <FormControl>
          <FormLabel>Kode Pos</FormLabel>
          <Input ref={inputPostalCode}></Input>
        </FormControl>
        <FormControl>
          <FormLabel>Detail Alamat</FormLabel>
          <Textarea ref={inputDetail} placeholder="e.g. Blok/Lantai"></Textarea>
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
              // ref={inputReceiverEmail}
              placeholder="yourname@example.com"
            ></Input>
          </FormControl>
        </FormControl>
        <Button onClick={onCreate}>Add Address</Button>
      </Stack>
    </div>
  );
};
