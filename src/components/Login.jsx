import React from "react";
import { useNavigate, Link, useSearchParams } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import {
  Box,
  Typography,
  TextField,
  InputLabel,
  Button,
  Input,
  FormControl,
  InputAdornment,
  IconButton,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import CircularProgress from "@mui/material/CircularProgress";

import haceyLogo from "../assets/hacey-svg.svg";
import boyGettingVaccine from "../assets/boy-vaccine.svg";
import ArrowBackSharpIcon from "@mui/icons-material/ArrowBackSharp";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { Login as LoginUser, Signup } from "../query";

export default function Login() {
  const [showPassword, setShowPassword] = React.useState(false);
  const [showPassword1, setShowPassword1] = React.useState(false);
  const [showPassword2, setShowPassword2] = React.useState(false);
  const [signupDetails, setSignupDetails] = React.useState({});
  const [loginDetails, setLoginDetails] = React.useState({});
  const [signUpPassword, setSignUpPassword] = React.useState("");
  // const [loginPassword, setLoginPassword] = React.useState("");
  const [signUpConfirmPassword, setSignUpConfirmPassword] = React.useState("");
  const [signUpPasswordError, setSignUpPasswordError] = React.useState(false);
  const [loginPasswordError, setLoginPasswordError] = React.useState(false);
  const [signUpConfirmPasswordError, setSignUpConfirmPasswordError] =
    React.useState(false);
  const [signUpPasswordHelperText, setSignUpPasswordHelperText] =
    React.useState("");
  const [loginPasswordHelperText, setLoginPasswordHelperText] =
    React.useState("");
  const [signUpConfirmPasswordHelperText, setSignUpConfirmPasswordHelperText] =
    React.useState("");

  const validatePassword = (value) => {
    const lengthError = value.length < 8;

    const specialCharError = !/[!@#$%^&*(),.?":{}|<>]/.test(value);

    if (lengthError) {
      setSignUpPasswordError(true);
      setSignUpPasswordHelperText("Password must be at least 8 characters.");
    } else if (specialCharError) {
      setSignUpPasswordError(true);
      setSignUpPasswordHelperText(
        "Password must contain at least one special character."
      );
    } else {
      setSignUpPasswordError(false);
      setSignUpPasswordHelperText("");
    }
  };

  const validateLoginPassword = (value) => {
    const lengthError = value.length < 8;

    const specialCharError = !/[!@#$%^&*(),.?":{}|<>]/.test(value);

    if (lengthError) {
      setLoginPasswordError(true);
      setLoginPasswordHelperText("Password must be at least 8 characters.");
    } else if (specialCharError) {
      setLoginPasswordError(true);
      setLoginPasswordHelperText(
        "Password must contain at least one special character."
      );
    } else {
      setLoginPasswordError(false);
      setLoginPasswordHelperText("");
    }
  };

  const handlePasswordChange = (event) => {
    const value = event.target.value;
    setSignUpPassword(value);
    validatePassword(value);

    if (signUpConfirmPassword) {
      validateConfirmPassword(signUpConfirmPassword);
    }
  };

  const handleLoginPasswordChange = (event) => {
    const value = event.target.value;
    // setLoginPassword(value);
    validateLoginPassword(value);
  };

  const handleConfirmPasswordChange = (event) => {
    const value = event.target.value;
    setSignUpConfirmPassword(value);
    validateConfirmPassword(value);
  };

  const validateConfirmPassword = (value) => {
    if (value !== signUpPassword) {
      setSignUpConfirmPasswordError(true);
      setSignUpConfirmPasswordHelperText("Passwords do not match.");
    } else {
      setSignUpConfirmPasswordError(false);
      setSignUpConfirmPasswordHelperText("");
    }
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleClickShowPassword1 = () => setShowPassword1((show) => !show);
  const handleClickShowPassword2 = () => setShowPassword2((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (event) => {
    event.preventDefault();
  };

  const handleMouseDownPassword1 = (event) => {
    event.preventDefault();
  };

  const handleMouseUpPassword1 = (event) => {
    event.preventDefault();
  };

  const handleMouseDownPassword2 = (event) => {
    event.preventDefault();
  };

  const handleMouseUpPassword2 = (event) => {
    event.preventDefault();
  };
  const signupMutation = useMutation({
    mutationFn: Signup,
    onSuccess: (data) => {
      console.log(data);
      navigate("?mode=login");
    },
    onError: (error) => {
      console.log(error);
      navigate("?mode=signup");
    },
  });

  const loginMutation = useMutation({
    mutationFn: LoginUser,
  });
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const isLogin = searchParams.get("mode") === "login";

  // let emailExist =
  const handleSignUpChange = (event) => {
    const { name, value } = event.target;
    setSignupDetails((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleLoginChange = (event) => {
    const { name, value } = event.target;
    setLoginDetails((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSignUpSubmit = (event) => {
    event.preventDefault();
    signupMutation.mutate(signupDetails);
    console.log(signupDetails);
  };

  const handleLoginSubmit = (event) => {
    event.preventDefault();
    loginMutation.mutate(loginDetails, {
      onError: (error) => {
        navigate("?mode=login");
        console.error(error);
      },
      onSuccess: (data) => {
        // localStorage.setItem("token", JSON.stringify(data.data.accessToken));
        navigate("/dashboard");
        console.log(data.data);
      },
    });
    console.log(loginDetails);
  };

  return (
    <Box
      sx={{
        minWidth: "100%",
        height: "100vh",

        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundColor: "#1F8E1F4D",
        position: "relative",
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "#1F8E1F4D",
          zIndex: 1,
          opacity: 0.1,
        },
      }}
    >
      <Box
        sx={{
          position: "absolute",
          display: "flex",
          flexDirection: "column",
          gap: "24px",
          left: "0",
          opacity: 1,
          zIndex: 1000,
          height: "100vh",
          width: "50%",
        }}
      >
        <img
          src={boyGettingVaccine}
          style={{ minHeight: "100%", minWidth: "100%", objectFit: "cover" }}
          alt=""
        />
      </Box>
      <Box
        sx={{
          position: "absolute",
          zIndex: "1000",
          right: "10%",
          top: "25%",
        }}
      >
        <Grid
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            width: "100%",
            gap: 4,
          }}
        >
          <Button
            onClick={() => navigate("/")}
            variant="text"
            sx={{
              textTransform: "none",
              display: "flex",
              flexDirection: "row",
              gap: "5px",
              marginBottom: "5px",
            }}
            disableRipple
          >
            <ArrowBackSharpIcon sx={{ color: "#1F8E1F" }} />{" "}
            <Typography
              sx={{ color: "#000000", fontSize: "16px", fontWeight: 400 }}
            >
              Back
            </Typography>
          </Button>
          <Typography
            sx={{
              width: "100%",
              color: "#000000",
              fontWeight: 600,
              fontSize: "24px",
              lineHeight: "36px",
              marginBottom: "5px",
            }}
          >
            {isLogin ? "Login" : "Sign Up"}
          </Typography>
          <Grid sx={{ width: "100%" }}>
            <form onSubmit={isLogin ? handleLoginSubmit : handleSignUpSubmit}>
              {isLogin ? (
                <>
                  <Box sx={{ marginBottom: "45px" }}>
                    <TextField
                      name="username"
                      label="Username"
                      type="text"
                      value={loginDetails.username}
                      onChange={handleLoginChange}
                      sx={{ width: "400px" }}
                      variant="standard"
                      required
                    />
                  </Box>
                  <Box sx={{ marginBottom: "45px" }}>
                    <FormControl sx={{ width: "400px" }} variant="standard">
                      <InputLabel htmlFor="standard-adornment-password">
                        Password
                      </InputLabel>
                      <Input
                        name="password"
                        required
                        value={loginDetails.password}
                        onChange={(event) => {
                          handleLoginPasswordChange(event);
                          handleLoginChange(event);
                        }}
                        error={loginPasswordError}
                        type={showPassword ? "text" : "password"}
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={handleClickShowPassword}
                              onMouseDown={handleMouseDownPassword}
                              onMouseUp={handleMouseUpPassword}
                            >
                              {showPassword ? (
                                <VisibilityOff />
                              ) : (
                                <Visibility />
                              )}
                            </IconButton>
                          </InputAdornment>
                        }
                      />
                      <Typography
                        sx={{
                          fontWeight: 300,
                          fontSize: "12px",
                          color: "#FF3B3B",
                        }}
                      >
                        {loginPasswordHelperText}
                      </Typography>
                    </FormControl>
                  </Box>
                </>
              ) : (
                <>
                  <Box sx={{ marginBottom: "25px" }}>
                    <TextField
                      name="username"
                      label="Username"
                      type="text"
                      sx={{ width: "400px" }}
                      variant="standard"
                      value={signupDetails.username}
                      onChange={handleSignUpChange}
                      required
                    />
                  </Box>
                  <Box sx={{ marginBottom: "25px" }}>
                    <TextField
                      name="email"
                      label="Email Address"
                      type="email"
                      sx={{ width: "400px" }}
                      value={signupDetails.email}
                      onChange={handleSignUpChange}
                      variant="standard"
                      required
                      error={signupMutation.isError}
                      helperText={
                        signupMutation.isError ? "Email used already!" : ""
                      }
                    />
                  </Box>
                  <Box sx={{ marginBottom: "25px" }}>
                    <FormControl sx={{ width: "400px" }} variant="standard">
                      <InputLabel htmlFor="standard-adornment-password">
                        Password
                      </InputLabel>
                      <Input
                        id="standard-adornment-password"
                        name="password"
                        type={showPassword2 ? "text" : "password"}
                        required
                        value={signupDetails.password}
                        onChange={(event) => {
                          handleSignUpChange(event);
                          handlePasswordChange(event);
                        }}
                        error={signUpPasswordError}
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={handleClickShowPassword2}
                              onMouseDown={handleMouseDownPassword2}
                              onMouseUp={handleMouseUpPassword2}
                            >
                              {showPassword2 ? (
                                <VisibilityOff />
                              ) : (
                                <Visibility />
                              )}
                            </IconButton>
                          </InputAdornment>
                        }
                      />
                      <Typography
                        sx={{
                          fontWeight: 300,
                          fontSize: "12px",
                          color: "#FF3B3B",
                        }}
                      >
                        {signUpPasswordHelperText}
                      </Typography>
                    </FormControl>
                  </Box>
                  <Box sx={{ marginBottom: "25px" }}>
                    <FormControl sx={{ width: "400px" }} variant="standard">
                      <InputLabel htmlFor="standard-adornment-password">
                        Confirm Password
                      </InputLabel>
                      <Input
                        name="confirmPassword"
                        required
                        value={signupDetails.confirmPassword}
                        onChange={(event) => {
                          handleSignUpChange(event);
                          handleConfirmPasswordChange(event);
                        }}
                        error={signUpConfirmPasswordError}
                        type={showPassword1 ? "text" : "password"}
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={handleClickShowPassword1}
                              onMouseDown={handleMouseDownPassword1}
                              onMouseUp={handleMouseUpPassword1}
                            >
                              {showPassword1 ? (
                                <VisibilityOff />
                              ) : (
                                <Visibility />
                              )}
                            </IconButton>
                          </InputAdornment>
                        }
                      />
                      <Typography
                        sx={{
                          fontWeight: 300,
                          fontSize: "12px",
                          color: "#FF3B3B",
                        }}
                      >
                        {signUpConfirmPasswordHelperText}
                      </Typography>
                    </FormControl>
                  </Box>
                </>
              )}
              <Button
                type="submit"
                // onClick={isLogin ? handleLogin : handleSignup}
                sx={{
                  textTransform: "none",
                  width: "100%",
                  backgroundColor: "#1F8E1F",
                  color: "#FFFFFF",
                  fontWeight: 400,
                  fontSize: "16px",
                  paddingY: "12px",
                  paddingX: "36px",
                  borderRadius: "400px",
                  marginTop: "4%",
                  marginBottom: "4%",
                }}
                variant="contained"
              >
                {isLogin ? (
                  loginMutation.isPending ? (
                    <CircularProgress color="inherit" />
                  ) : (
                    "Login"
                  )
                ) : signupMutation.isPending ? (
                  <CircularProgress color="inherit" />
                ) : (
                  "Sign Up"
                )}
              </Button>
            </form>
            {isLogin ? (
              <Typography
                sx={{
                  color: "#000000",
                  fontSize: "16px",
                  fontWeight: 400,
                  textAlign: "center",
                  marginBottom: "20px",
                }}
              >
                Create an account if you do not have one{" "}
                <Link
                  to={`?mode=${isLogin ? "signup" : "login"}`}
                  style={{ color: "#1F8E1F", textDecoration: "none" }}
                >
                  Sign up
                </Link>
              </Typography>
            ) : (
              <Typography
                sx={{
                  color: "#000000",
                  fontSize: "16px",
                  fontWeight: 400,
                  textAlign: "center",
                  marginBottom: "20px",
                }}
              >
                Already a user?{" "}
                <Link
                  style={{ color: "#1F8E1F", textDecoration: "none" }}
                  to={`?mode=${isLogin ? "signup" : "login"}`}
                >
                  Login
                </Link>
              </Typography>
            )}

            <Box
              sx={{
                margin: "auto",
                display: "flex",
                flexDirection: "row",
                width: "100%",
                textAlign: "center",
                alignItems: "center",
                marginTop: "10px",
                justifyContent: "center",
                gap: 1,
              }}
            >
              <Typography>Powered by</Typography>
              <img src={haceyLogo} alt="" />
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
