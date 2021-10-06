import React, {useState} from "react";
import { FormControl, Stack, Typography, Divider } from "@mui/material";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { styled } from '@mui/system';

import CustomTextField from "./TextField/CustomTextField";
import SquareButton from "./SquareButton";
import RegisterDialog from "./RegisterDialog";
import {ReactComponent as GoogleAccount} from '../assets/google-account.svg';
import { useHistory } from "react-router-dom";

const SignIn = styled(Typography)({
  fontWeight: '500',
  fontSize: '36px',
  lineHeight: '42px',
  color: '#FE793D',
  paddingTop: '10%',
});

const theme = createTheme({
  components: {
    // Name of the component
    MuiDivider: {
      styleOverrides: {
        // Name of the slot
        root: {
          ":before, :after": {
            top: '0',
          },
        },
      },
    },
  },
});

function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [open, setOpen] = useState(false);
  const history = useHistory();

  const showRegister = () => {
    setOpen(true);
  };

  const handleLogin = () => {
    history.push('/');
  };

  return (
    <Stack
      direction="column"
      justifyContent="flex-start"
      alignItems="center"
      sx={{ background: '#F9FAF9', borderRadius: '10px', width: '458px', height: '601px' }}
      spacing={3}
    >
      <SignIn component="h1" variant="h2" align="center">Sign In</SignIn>
      <FormControl>
        <CustomTextField id="username" name="Username" value={username} setValue={setUsername}  width="362px"/>
        <CustomTextField id="password" name="Password" value={password} setValue={setPassword}  width="362px" type="password"/>
      </FormControl>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{width: '78%'}}
      >
        <SquareButton name="Login" onClick={handleLogin}/>
        <SquareButton name="Register" onClick={showRegister}/>
      </Stack>
      <ThemeProvider theme={theme}>
        <Divider variant="middle" sx={{color: '#9D9D9D', width: '78%'}}>or</Divider>
      </ThemeProvider>
      <GoogleAccount />
      <RegisterDialog open={open} setOpen={setOpen} />
    </Stack>
  )
}

export default LoginForm;