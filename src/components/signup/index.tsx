import React from 'react';
import {
  Flex,
  Box,
  FormControl,
  Input,
  Button,
  Image,
  FormHelperText,
  Link
} from '@chakra-ui/react';
import { updateUserData, registerUser, resetUserData } from '@/src/slices/user';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '@/src/hooks';
import { useState } from 'react';

const SignUp = () => {
  const dispatch = useDispatch();
  const user = useAppSelector((state) => state.user);

  const [emailErr, setEmailErr] = useState(false);
  const [passwordErr, setPasswordErr] = useState(false);
  const validEmail = new RegExp('^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$');
  const validPassword = new RegExp('^(?=.*?[A-Za-z])(?=.*?[0-9]).{6,}$');

  if (!user.isCreating && user.message === 'success') {
    dispatch(resetUserData());
    alert('SignUp successfully');
  }

  const validate = () => {
    if (!validEmail.test(user.email)) {
      setEmailErr(true);
    } else {
      setEmailErr(false);
    }
    if (!validPassword.test(user.password)) {
      setPasswordErr(true);
    } else {
      setPasswordErr(false);
    }
  };

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const payload = {
      type: name,
      value: value
    };

    await dispatch(updateUserData(payload));
    validate();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await dispatch(registerUser());

    // if (!user.isCreating && user.message === 'success') {
    //   alert('SignUp successfully');
    // }
  };

  return (
    <>
      <Box display="flex">
        <Image
          height="30px"
          ml="auto"
          mr="auto"
          my="40px"
          src="/trello-logo.svg"
          display="inline-block"
          alt="brand logo"
        />
      </Box>
      <Flex
        alignItems="center"
        flexDirection={['column', 'column', 'row', 'row']}
        justifyContent="center">
        <Image
          position="absolute"
          bottom="5%"
          left="5%"
          src="/signup/sign-up-left.svg"
          alt=" team work illustration"
          width={[0, '25%']}
        />
        <Image
          position="absolute"
          bottom="5%"
          right="5%"
          src="/signup/sign-up-right.svg"
          alt="work together illustration"
          width={[0, '25%']}
          borderRadius="3px"
        />
        <Box
          p="25px 40px"
          width={['80%', '60%', '45%', '25%']}
          borderRadius="3px"
          bg="white"
          boxShadow="rgb(0 0 0 / 10%) 0 0 10px">
          <Box
            textAlign="center"
            color="#5E6C84"
            mt="5"
            mb="25"
            fontSize={['10px', '10px', '15px', '15px']}
            fontWeight="semibold"
            lineHeight="normal">
            <h1>Sign up for your account</h1>
          </Box>
          <Box my={4} textAlign="left">
            <FormControl isRequired>
              <Input
                type="email"
                name="email"
                value={user.email}
                placeholder="Enter Email"
                onChange={handleChange}
              />
              {emailErr && <FormHelperText>Invalid email.</FormHelperText>}
            </FormControl>
            <FormControl my="8">
              <Input
                type="password"
                name="password"
                value={user.password}
                placeholder="Create password"
                onChange={handleChange}
              />
              {passwordErr && <FormHelperText>Invalid password.</FormHelperText>}
            </FormControl>
            <FormControl my="8">
              <Input
                type="password"
                name="confirmPassword"
                value={user.confirmPassword}
                placeholder="Confirm password"
                onChange={handleChange}
              />
            </FormControl>
            <Button
              fontWeight="semibold"
              width="full"
              mt={4}
              disabled={user.password !== user.confirmPassword}
              bg="success"
              color="white"
              onClick={handleSubmit}>
              Sign up
            </Button>
            <Box m="5" textAlign="center">
              <Link href="/login" color="brand" p="2">
                Already have an account? Log in.
              </Link>
            </Box>
          </Box>
        </Box>
      </Flex>
    </>
  );
};

export default SignUp;
