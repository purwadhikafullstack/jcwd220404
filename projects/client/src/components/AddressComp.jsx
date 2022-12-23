import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Select,
  Stack,
  Textarea,
} from "@chakra-ui/react";
import React from "react";
import { useNavigate } from "react-router-dom";

export const AddressComp = () => {
  const navigate = useNavigate();
  const toDetail = () => {};
  return (
    <div>
      <Stack mt={"20px"}>
        <FormControl>
          <FormLabel>Alamat</FormLabel>
          <Textarea></Textarea>
        </FormControl>
        <FormControl>
          <FormLabel>Kelurahan</FormLabel>
          <Select>
            <option>Menteng</option>
          </Select>
        </FormControl>
        <FormControl>
          <FormLabel>Kecamatan</FormLabel>
          <Select>
            <option>Setiabudi</option>
            <option>Tanahabang</option>
          </Select>
        </FormControl>
        <FormControl>
          <FormLabel>Kota/Kabupaten</FormLabel>
          <Select>
            <option>Jakarta Selatan</option>
            <option>Jakarta Pusat</option>
          </Select>
        </FormControl>
        <FormControl>
          <FormLabel>Kode Pos </FormLabel>
          <Input></Input>
        </FormControl>
        <FormControl>
          <FormLabel>Detail Alamat</FormLabel>
          <Textarea></Textarea>
        </FormControl>

        <Button>Add Address</Button>
      </Stack>
    </div>
  );
};
