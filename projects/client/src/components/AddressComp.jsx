import {
  AspectRatio,
  Box,
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
import { useNavigate } from "react-router-dom";

export const AddressComp = () => {
  const navigate = useNavigate();
  const toDetail = () => {};
  return (
    <div>
      <Stack spacing={"10px"} mt={"20px"}>
        <FormControl>
          <FormLabel>Alamat</FormLabel>
          <Input placeholder="Alamat" mb={"20px"}></Input>
          <AspectRatio ratio={16 / 9}>
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3963.952912260219!2d3.375295414770757!3d6.5276316452784755!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103b8b2ae68280c1%3A0xdc9e87a367c3d9cb!2sLagos!5e0!3m2!1sen!2sng!4v1567723392506!5m2!1sen!2sng" />
          </AspectRatio>
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
          <Textarea placeholder="e.g. Blok/Lantai"></Textarea>
          <Checkbox>Set as Default Address</Checkbox>
          <FormControl>
            <FormLabel>Nama Penerima</FormLabel>
            <Flex>
              <Input placeholder="Name"></Input>
            </Flex>
          </FormControl>
          <FormControl>
            <FormLabel>No. Telepon Penerima</FormLabel>
            <Input placeholder="08xxx" type={"text"}></Input>
          </FormControl>
          <FormControl>
            <FormLabel>Email Penerima</FormLabel>
            <Input placeholder="yourname@example.com"></Input>
          </FormControl>
        </FormControl>
        <Button>Add Address</Button>
      </Stack>
    </div>
  );
};
