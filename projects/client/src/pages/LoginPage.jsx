import React from "react";
import { useRef, useState } from "react";
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
    Checkbox,
    InputGroup,
    InputRightElement,
  } from '@chakra-ui/react';
  import Axios from "axios";
  import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
  import OnlyFreshLogo from "../OnlyFresh.jpg";
  import { useDispatch } from "react-redux";
  import { login } from "../redux/userSlice";
  import { Navigate, Link } from "react-router-dom";
  import {ForgotPasswordPage} from "./ForgotPasswordPage";
  import Swal from 'sweetalert2'
  
  const url = "http://localhost:8000/user/login"

  export const LoginPage = () => {
    const [showPassword, setShowPassword] = useState(false);
    const phoneNumberEmail = useRef("");
    const password = useRef("");
    const dispatch = useDispatch();
    const [move, setMove] = useState(false);

    const onLogin = async () => {

        try {
            const user = {
                password: password.current.value,
                data: phoneNumberEmail.current.value,
            };

            const result = await Axios.post(url, user);
        
            dispatch(login({
                id: result.data.isAccountExist.id,
                phoneNumber: result.data.isAccountExist.phoneNumber,
                email: result.data.isAccountExist.email,
                profilePic: result.data.isAccountExist.profilePic,
                isVerified: result.data.isAccountExist.isVerified
            }));

            localStorage.setItem("token", result.data.token);

            setMove(true);
        
        } catch (err) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: `${err.response.data}`,
                timer: 1000,
                customClass: {
                    container: 'my-swal'
                }
            })
        }
    };

    return move ? (
      <Navigate to="/" />
    ):(
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
          src={
            'https://cdn-2.tstatic.net/tribunnews/foto/bank/images/ilustrasi-makanan-sayuran-dan-buah-buahan.jpg'
          }
          objectFit={'cover'}
        />
        <Flex justify={'center'} mt={-12}>
        <Box h={100} w={100} borderWidth='2px' >
    <Image src={OnlyFreshLogo}  height="100%"/>
    </Box>
        </Flex>
    <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
      <Stack align={'center'}>
        <Heading fontSize={'4xl'}>Sign in to your account</Heading>
        <Text fontSize={'lg'} color={'gray.600'}>
          to enjoy all of our cool <Text as={Link} color={'green.400'} to='/'>features</Text> ✌️
        </Text>
      </Stack>
      <Box
        rounded={'lg'}
        boxShadow={'lg'}
        p={8}>
        <Stack spacing={4}>
        <FormControl>
        <FormLabel htmlFor="email">Phone Number or Email</FormLabel>
        <Input type="email" name="email" variant="filled" ref={phoneNumberEmail} />
        </FormControl>
          <FormControl id="password" isRequired>
            <FormLabel>Password</FormLabel>
            <InputGroup>
              <Input type={showPassword ? 'text' : 'password'} ref={password} />
              <InputRightElement h={'full'}>
                <Button
                  variant={'ghost'}
                  onClick={() =>
                    setShowPassword((showPassword) => !showPassword)
                  }>
                  {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                </Button>
              </InputRightElement>
            </InputGroup>
          </FormControl>
          <Stack spacing={10}>
            <Stack
              direction={{ base: 'column', sm: 'row' }}
              align={'start'}
              justify={'space-between'}>
              <Checkbox>Remember me</Checkbox>
              <ForgotPasswordPage/>
            </Stack>
            <Button
              onClick={onLogin}
              bg={'green.400'}
              color={'white'}
              _hover={{
                bg: 'green.500',
              }}>
              Sign in
            </Button>
            <Text align={'center'}>
             Dont have an Account? <Text as={Link} color={'green.400'} to='/register' >Register</Text>
            </Text>
          </Stack>
        </Stack>
      </Box>
    </Stack>
      </Box>
      </Flex>
    </Center>
    </>
    )
  }
  