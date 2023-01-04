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
  
    // const registerSchema = Yup.object().shape({
    //   username: Yup.string()
    //     .required("Name is a required field")
    //     .min(5, "Name min. 5 characters"),
    //   email: Yup.string().email().required("Email is a required field"),
    //   password: Yup.string()
    //     .required("Password is a required field")
    //     .min(8, "Password min. 8 characters"),
    //   password_confirmation: Yup.string().oneOf(
    //     [Yup.ref("password"), null],
    //     "Password not matched"
    //   ),
    // });
  
    // const onRegister = async (data) => {
    //   try {
    //     if (data.password !== data.password_confirmation) {
    //       return Swal.fire({
    //         icon: "error",
    //         title: "Oooops ...",
    //         text: "make sure password and confirm password match",
    //         timer: 2000,
    //         customClass: {
    //           container: "my-swal",
    //         },
    //       });
    //     }
    //     const result = await Axios.post(
    //       `${process.env.REACT_APP_API_BASE_URL}/admin/register`,
    //       data
    //     );
    //     Swal.fire({
    //       icon: "success",
    //       title: "Good Job",
    //       text: `${result.data.massage}`,
    //       timer: 2000,
    //       customClass: {
    //         container: "my-swal",
    //       },
    //     });
    //   } catch (err) {
    //     Swal.fire({
    //       icon: "error",
    //       title: "Oops...",
    //       text: `${err.response.data}`,
    //       customClass: {
    //         container: "my-swal",
    //       },
    //     });
    //   }
    // };
  
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
          `http://localhost:8000/address/create`,
          addAddress
        );
        Swal.fire({
          icon: "success",
          text: "Success",
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
            <Input ref={inputCity}></Input>
            {/* <Select ref={inputCityId}>
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
                154
              </option>
              <option
                // selected={data.Profile?.gender === "female"}
                value="55"
              >
                55
              </option>
              <option
                // selected={data.Profile?.gender === "female"}
                value="457"
              >
                457
              </option>
              <option
                // selected={data.Profile?.gender === "female"}
                value="115"
              >
                115
              </option>
            </Select> */}
            <FormLabel>Provinsi</FormLabel>
            <Input ref={inputProvince}></Input>
            {/* <Select ref={inputProvinceId}>
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
                6
              </option>
              <option
                // selected={data.Profile?.gender === "female"}
                value="9"
              >
                9
              </option>
              <option
                // selected={data.Profile?.gender === "female"}
                value="3"
              >
                3
              </option>
            </Select> */}
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
                ref={inputReceiverEmail}
                placeholder="yourname@example.com"
              ></Input>
            </FormControl>
          </FormControl>
          <Button onClick={onCreate}>Add Address</Button>
        </Stack>
      </div>
    );
  };