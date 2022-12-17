import React from "react";
import { useState } from 'react';
import {
    Heading,
    Box,
    Center,
    Image,
    Flex,
    Text,
    Stack,
    Button,
    FormControl,
    FormLabel,
    Input,
    InputGroup,
    InputRightElement,
    VStack,
  } from '@chakra-ui/react';
  import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
  import OnlyFreshLogo from "../OnlyFresh.jpg";
  import  LogoHeader  from "../logoheader.jpg";
  import Axios from "axios";
  import * as Yup from "yup";
  import {  Link ,useNavigate } from "react-router-dom";
  import { Field, ErrorMessage, Formik, Form } from "formik";

  import Swal from 'sweetalert2';

  const url = "http://localhost:8000/user/register"
  
  export const RegisterPage = () => {
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    
    const registerSchema = Yup.object().shape({
        name: Yup.string().required().min(5, "Name  min 5 Character"),
        phoneNumber: Yup.string().required().min(12, "Phone Number must max 12 character"),
        email: Yup.string().email().required(),
        password: Yup.string().required().min(8, "Password min 8 Character"),
        password_confirmation: Yup.string().oneOf([Yup.ref('password'), null], "password tak sama")
    });

    const onRegister = async (data) => {
        try {
            if (data.password !== data.password_confirmation) {
                return Swal.fire({
                icon: 'error',
                title: 'Oooops ...',
                text: 'make sure password and confirm password match',
                timer: 2000,
                customClass: {
                    container: 'my-swal'
                }
            });
            }
            const result = await Axios.post(url, data);
            Swal.fire({
                icon: 'success',
                title: 'Good Job',
                text: `${result.data.massage}`,
                timer: 2000,
                customClass: {
                    container: 'my-swal'
                }
            })
            setTimeout(() => navigate(`/verification/${result.data.token}`), 8000);

        } catch (err) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: `${err.response.data}`,
                customClass: {
                    container: 'my-swal'
                }
            })
            
        }
    };
    return (
        <>
      <Center py={6}>
      <Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}
    >
        <Box
          w={'full'}
          boxShadow={'2xl'}
          rounded={'md'}
          overflow={'hidden'}>
          <Image
            h={'200px'}
            w={'full'}
            src={LogoHeader}
            objectFit={'cover'}
          />
          <Flex justify={'center'} mt={-12}>
          <Box h={100} w={100} borderWidth='2px' >
      <Image src={OnlyFreshLogo}  height="100%"/>
      </Box>
          </Flex>
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Stack align={'center'}>
          <Heading fontSize={'4xl'}>Sign up to make account</Heading>
          <Text fontSize={'lg'} color={'gray.600'}>
            to enjoy all of our cool <Text as={Link} color={'green.400'} to='/'>features</Text> ✌️
          </Text>
        </Stack>
        <Box
          rounded={'lg'}
          boxShadow={'lg'}
          p={8}>
        <Formik
            initialValues={{
            name: "",
            phoneNumber: "",
            email: "",
            password: "",
            password_confirmation: "",
            }}
            validationSchema={registerSchema}
            onSubmit={(values, action) => {
            onRegister(values);
            action.setFieldValue("name", "");
            action.setFieldValue("phoneNumber", "");
            action.setFieldValue("email", "");
            action.setFieldValue("password", "");
            action.setFieldValue("password_confirmation", "");
            }}
        >
        {(props)=>{
            return(
                <>
                <Form>
                <VStack spacing={4} align="flex-start">
            <FormControl isRequired>
              <FormLabel htmlFor="name">Name</FormLabel>
              <Field as={Input} type="text" name="name" variant="filled" />
                <ErrorMessage
                style={{ color: "red" }}
                component="div"
                name="name"
                />
            </FormControl>
            <FormControl  isRequired>
              <FormLabel htmlFor="name">Phone Number</FormLabel>
              <Field as={Input} type="text" name="phoneNumber" variant="filled" />
                <ErrorMessage
                style={{ color: "red" }}
                component="div"
                name="phoneNumber"
                />
            </FormControl>
          <FormControl isRequired>
          <FormLabel htmlFor="email">Email</FormLabel>
          <Field as={Input} type="email" name="email" variant="filled" />
               <ErrorMessage
               style={{ color: "red" }}
               component="div"
               name="email"
               />
            </FormControl>
            <FormControl  isRequired>
              <FormLabel htmlFor="password">Password</FormLabel>
              <InputGroup>
                <Field as={Input} type={showPassword ? 'text' : 'password'} name="password" variant="filled"  />
                <InputRightElement h={'full'}>
                <ErrorMessage
                component="div"
                name="password"
                style={{ color: "red" }}
                />
                <Button
                 variant={'ghost'}
                 onClick={() =>
                 setShowPassword((showPassword) => !showPassword)
                }>{showPassword ? <ViewIcon /> : <ViewOffIcon />}
                </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>
            <FormControl isRequired>
              <FormLabel htmlFor="password_confirmation">Confirm Password</FormLabel>
              <InputGroup>
                <Field as={Input} type={showPassword ? 'text' : 'password'} name="password_confirmation" variant="filled"  />
                <InputRightElement h={'full'}>
                <ErrorMessage
                component="div"
                name="password_confirmation"
                style={{ color: "red" }}
                />
                <Button
                 variant={'ghost'}
                 onClick={() =>
                 setShowPassword((showPassword) => !showPassword)
                }>{showPassword ? <ViewIcon /> : <ViewOffIcon />}
                </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>
            <Button
                type="submit"
                width="100%"
                bg={'green.400'}
                color={'white'}
                _hover={{
                 bg: 'green.500',
                }}>
                Sign up
              </Button>
          <Text align={'center'}>
           Already a user? <Text as={Link} color={'green.400'} to='/login'>Login</Text>
          </Text>
          </VStack>
          </Form>
                </>
                        )
                }}
                        </Formik>
                    </Box>
                </Stack>
            </Box>
        </Flex>
    </Center>
</>
    );
    
    
  }
  