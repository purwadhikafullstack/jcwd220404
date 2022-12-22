import {
    Stack,
    Flex,
    Button,
    Text,
    VStack,
    useBreakpointValue,
    Center
  } from '@chakra-ui/react';
  import { useNavigate } from "react-router-dom";



  export const WindowComp = () => {
    const navigate = useNavigate();
    
    const toRegister = () => {
        navigate("/register");
      };
      const toLogin = () => {
        navigate("/login");
      };

    return (
 
      <Flex
        w={'full'}
        h={'100vh'}
        backgroundImage={
          'url(https://www.goodnewsfromindonesia.id/wp-content/uploads/images/source/_novitacaesaria/20193007mediaindonesiacom.jpg)'
        }
        backgroundSize={'cover'}
        backgroundPosition={'center center'}>
        <VStack
          w={'full'}
          justify={'center'}
          px={useBreakpointValue({ base: 4, md: 8 })}
          bgGradient={'linear(to-r, blackAlpha.1000, transparent)'}>
          <Stack maxW={'2xl'} align={'flex-start'} spacing={6}>
            <Text
              color={'white'}
              fontWeight={500}
              fontSize={useBreakpointValue({ base: '1xl', md: '2xl' })}>
              Produk Segar
            </Text>
            <Text
              color={'white'}>
              Produk Segar, dari petani lokal langsung ketempat anda.
            </Text>
            <Stack direction={'row'}>
              <Button
                onClick={toLogin}
                height='38px'
                width='150px'
                bg={'white'}
                color={'green.500'}
                _hover={{ bg: 'whiteAlpha.200' }}>
                Masuk
              </Button>
              <Button
                onClick={toRegister}
                height='38px'
                width='150px'
                bg={'green.400'}
                color={'white'}
                _hover={{ bg: 'green.500' }}>
                Daftar
              </Button>
            </Stack>
          </Stack>
          <Text
              color={'white'}
              fontWeight={10}>
            Versi Aplikasi - 2.5.0
            </Text>
            <Text
              color={'white'}
              fontWeight={10}>
            Versi Bundle - 21.3 (430f8bc)
            </Text>
        </VStack>
      </Flex>
    );
  }