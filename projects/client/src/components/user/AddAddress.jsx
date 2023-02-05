import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import Axios from "axios";
import Swal from "sweetalert2";
import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Select,
  Stack,
  Textarea,
} from "@chakra-ui/react";

export const AddAddress = () => {
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

  const fetchPostal = async () => {
    try {
      const response = await Axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/address/city/${selectedProvince}`
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
            value={province?.rajaongkir?.results?.province_id}
            placeholder="Select Province"
            onChange={provinceHandler}
            ref={inputProvince}
          >
            {renderProvince()}
          </Select>
        </FormControl>
        <FormControl>
          <FormLabel>City</FormLabel>
          <Select
            value={city?.rajaongkir?.results?.city_id}
            placeholder="Select City"
            onChange={cityHandler}
            ref={inputCity}
          >
            {renderCity()}
          </Select>
        </FormControl>

        <FormControl>
          <FormLabel>Kode Pos</FormLabel>
          <Select
            placeholder="Select Postal Code"
            ml={"20px"}
            width="340px"
            border="2px"
            borderColor="#285430"
            onChange={postalHandler}
            ref={inputPostalCode}
          >
            {renderPostal()}
          </Select>
        </FormControl>
        <FormControl>
          <FormLabel>Detail Alamat</FormLabel>
          <Textarea ref={inputDetail} placeholder="e.g. Blok/Lantai"></Textarea>
        </FormControl>
        {/* <Checkbox mb={"20px"}>Set as Default Address</Checkbox> */}
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
    </div>
  );
};
