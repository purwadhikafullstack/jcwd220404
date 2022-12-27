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
  import { loginAdmin } from "../redux/admin/adminSlice";
  import { useNavigate } from "react-router-dom";
  import Swal from 'sweetalert2'
  
  const url = "http://localhost:8000/admin/login"

  export const LoginAdminPage = () => {
    const [showPassword, setShowPassword] = useState(false);
    const inputUsername = useRef("");
    const inputPass     = useRef("");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    

    const onLogin = async () => {
        try {
            const admin = {
                password: inputPass.current.value,
                username: inputUsername.current.value,
            };

            const result = await Axios.post(url, admin);
        
            dispatch(loginAdmin({
                id: result.data.isUserExist.id,
                username: result.data.isUserExist.username,
                email: result.data.isUserExist.email,
                isSuper: result.data.isUserExist.isSuper,
    
            }));
            if ( result.data.isUserExist.isSuper===1){
              localStorage.setItem( "tokenSuper", result.data.token);  
            }else if(result.data.isUserExist.isSuper===0){
              localStorage.setItem( "tokenBranch", result.data.token);
            }
            navigate("/AdminPage")
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
        <Heading fontSize={'4xl'}>Sign in to Admin</Heading>
      </Stack>
      <Box
        rounded={'lg'}
        boxShadow={'lg'}
        p={8}>
        <Stack spacing={4}>
        <FormControl>
        <FormLabel htmlFor="username">Username or Email</FormLabel>
        <Input type="text" name="username" variant="filled" ref={inputUsername} />
        </FormControl>
          <FormControl id="password" isRequired>
            <FormLabel>Password</FormLabel>
            <InputGroup>
              <Input type={showPassword ? 'text' : 'password'} ref={inputPass} />
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
            <Button
              onClick={onLogin}
              bg={'green.400'}
              color={'white'}
              _hover={{
                bg: 'green.500',
              }}>
              Sign in
            </Button>
          
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
  