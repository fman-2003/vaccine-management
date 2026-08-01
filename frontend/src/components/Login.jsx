import React from "react";
import { useNavigate, Link, useSearchParams } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import {
  Alert,
  Box,
  Collapse,
  Typography,
  TextField,
  InputLabel,
  Button,
  Input,
  FormControl,
  InputAdornment,
  IconButton,
  ListItem,
  List,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import CircularProgress from "@mui/material/CircularProgress";
import CloseIcon from "@mui/icons-material/Close";
// import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutlined";

import haceyLogo from "../assets/hacey-svg.svg";
import boyGettingVaccine from "../assets/boy-vaccine.svg";
import ArrowBackSharpIcon from "@mui/icons-material/ArrowBackSharp";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { login, signup } from "../query";
import hasKeyName from "../helper/has-key-name";

export default function Login() {
  const [openAlert, setOpenAlert] = React.useState(true);
  const [showPassword, setShowPassword] = React.useState(false);
  const [showPassword2, setShowPassword2] = React.useState(false);
  const [signupErrors, setSignupErrors] = React.useState({});
  const [loginErrors, setLoginErrors] = React.useState({});
 

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  // const handleClickShowPassword1 = () => setShowPassword1((show) => !show);
  const handleClickShowPassword2 = () => setShowPassword2((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (event) => {
    event.preventDefault();
  };

  const handleMouseDownPassword2 = (event) => {
    event.preventDefault();
  };

  const handleMouseUpPassword2 = (event) => {
    event.preventDefault();
  };
  const signupMutation = useMutation({
    mutationFn: signup,
  });

  const loginMutation = useMutation({
    mutationFn: login,
  });
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const isLogin = searchParams.get("mode") === "login";


  const handleSignUpSubmit = (event) => {
    event.preventDefault();
    const signupFormData = new FormData(event.target);

    const signupDetails = {
      username: signupFormData.get("username"),
      email: signupFormData.get("email"),
      password: signupFormData.get("password"),
    };
    signupMutation.mutate(signupDetails, {
      onSuccess: (data) => {
        console.log(data);
        navigate("?mode=login");
      },
      onError: (error) => {
        setSignupErrors({});
        console.log(error);
        if (error.message.includes("422")) {
          setSignupErrors((prev) => {
            return {
              ...prev,
              validationError: error.response.data.errors,
            };
          });
        }
        setSignupErrors((prev) => {
          return {
            ...prev,
            error: error.response.data.message,
          };
        });
        navigate("?mode=signup");
      },
    });
    console.log(signupDetails);
  };
  console.log(signupErrors);

  const handleLoginSubmit = (event) => {
    event.preventDefault();
    const loginFormData = new FormData(event.target);

    const loginDetails = {
      username: loginFormData.get("loginUsername"),
      password: loginFormData.get("loginPassword"),
    };
    loginMutation.mutate(loginDetails, {
      onSuccess: (data) => {
        console.log(data);
        navigate("/dashboard");
      },
      onError: (error) => {
        setLoginErrors({});
        console.log(error);
        if (error.message.includes("422")) {
          setLoginErrors((prev) => {
            return {
              ...prev,
              validationError: error.response.data.errors,
            };
          });
        }
        setLoginErrors((prev) => {
          return {
            ...prev,
            error: error.response.data.message,
          };
        });
        navigate("?mode=login");
      },
    });
    console.log(loginDetails);
  };
  console.log(loginErrors);

  return (
    <Box
      sx={{
        minWidth: "100%",
        maxHeight: "100vh",
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
          top: "20%",
          // bottom: "-50%"
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
            {openAlert && signupMutation.isSuccess && signupMutation.data && (
              <Collapse in={openAlert}>
                <Alert
                  action={
                    <IconButton
                      aria-label="close"
                      color="inherit"
                      size="small"
                      onClick={() => {
                        setOpenAlert(false);
                      }}
                    >
                      <CloseIcon fontSize="inherit" />
                    </IconButton>
                  }
                  variant="filled"
                  role="status"
                  severity="success"
                >
                  {signupMutation.data.message}
                </Alert>
              </Collapse>
            )}
            {signupMutation.isError && signupErrors.validationError && (
              <Box sx={{ marginBottom: "5px" }}>
                <ul>
                  {signupErrors.validationError.map((valErr) => {
                    return (
                      <li
                        style={{ color: "red", fontSize: "15px" }}
                        key={valErr.msg}
                      >
                        {valErr.msg}
                      </li>
                    );
                  })}
                </ul>
              </Box>
            )}
            {signupMutation.isError && signupErrors.error && (
              <Box sx={{ marginBottom: "5px" }}>
                <ul>
                  <li style={{ color: "red", fontSize: "15px" }}>
                    {signupErrors.error}
                  </li>
                </ul>
              </Box>
            )}
            {loginMutation.isError && loginErrors.validationError && (
              <Box sx={{ marginBottom: "5px" }}>
                <ul>
                  {loginErrors.validationError.map((valErr) => {
                    return (
                      <li
                        style={{ color: "red", fontSize: "15px" }}
                        key={valErr.path}
                      >
                        {valErr.msg}
                      </li>
                    );
                  })}
                </ul>
              </Box>
            )}
            {loginMutation.isError && loginErrors.error && (
              <Box sx={{ marginBottom: "5px" }}>
                <ul>
                  <li style={{ color: "red", fontSize: "15px" }}>
                    {loginErrors.error}
                  </li>
                </ul>
              </Box>
            )}
            <form onSubmit={isLogin ? handleLoginSubmit : handleSignUpSubmit}>
              {isLogin ? (
                <>
                  <Box sx={{ marginBottom: "45px" }}>
                    <TextField
                      name="loginUsername"
                      label="Username"
                      type="text"
                      sx={{ width: "400px" }}
                      variant="standard"
                      // error={
                      //   Object.keys(loginErrors).length !== 0 &&
                      //   loginErrors.error.message &&
                      //   loginErrors.validationError &&
                      //   (loginErrors.error.includes("username") ||
                      //     hasKeyName(
                      //       loginErrors.validationError,
                      //       "path",
                      //       "username",
                      //     ))
                      // }
                      required
                    />
                  </Box>
                  <Box sx={{ marginBottom: "45px" }}>
                    <FormControl sx={{ width: "400px" }} variant="standard">
                      <InputLabel htmlFor="standard-adornment-password">
                        Password
                      </InputLabel>
                      <Input
                        name="loginPassword"
                        required
                        // value={loginDetails.password}
                        // onChange={(event) => {
                        //   handleLoginPasswordChange(event);
                        //   handleLoginChange(event);
                        // }}
                        // error={
                        //   Object.keys(loginErrors).length !== 0 &&
                        //   loginErrors.error.message &&
                        //   loginErrors.validationError &&
                        //   (loginErrors.error.message.includes("password") ||
                        //     hasKeyName(
                        //       loginErrors.validationError,
                        //       "path",
                        //       "password",
                        //     ))
                        // }
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
                      {/* <Typography
                        sx={{
                          fontWeight: 300,
                          fontSize: "12px",
                          color: "#FF3B3B",
                        }}
                      >
                        {loginPasswordHelperText}
                      </Typography> */}
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
                      // error={
                      //   Object.keys(signupErrors).length !== 0 &&
                      //   signupErrors.error.message &&
                      //   signupErrors.validationError(
                      //     signupErrors.error.message.includes("username") ||
                      //       hasKeyName(
                      //         signupErrors.validationError,
                      //         "path",
                      //         "username",
                      //       ),
                      //   )
                      // }
                      required
                    />
                  </Box>
                  <Box sx={{ marginBottom: "25px" }}>
                    <TextField
                      name="email"
                      label="Email Address"
                      type="text"
                      sx={{ width: "400px" }}
                      variant="standard"
                      required
                      // error={
                      //   Object.keys(signupErrors).length !== 0 &&
                      //   signupErrors.error.message &&
                      //   signupErrors.validationError(
                      //     signupErrors.error.message.includes("email") ||
                      //       hasKeyName(
                      //         signupErrors.validationError,
                      //         "path",
                      //         "email",
                      //       ),
                      //   )
                      // }
                      // helperText={
                      //   signupMutation.isError ? signupMutation.error : ""
                      // }
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
                        // error={
                        //   Object.keys(signupErrors).length !== 0 &&
                        //   signupErrors.error.message &&
                        //   signupErrors.validationError &&
                        //   (signupErrors.error.message.includes("password") ||
                        //     hasKeyName(
                        //       signupErrors.validationError,
                        //       "path",
                        //       "password",
                        //     ))
                        // }
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
                      {/* <Typography
                        sx={{
                          fontWeight: 300,
                          fontSize: "12px",
                          color: "#FF3B3B",
                        }}
                      >
                        {signUpPasswordHelperText}
                      </Typography> */}
                    </FormControl>
                  </Box>
                </>
              )}
              <Button
                type="submit"
                // onClick={isLogin ? handleLoginSubmit : handleSignUpSubmit}
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
