import React, { useState } from "react";
import {
  TextField,
  Button,
  
  Box,
  Typography,
  Container,
  InputAdornment,
  IconButton,
  CircularProgress
} from "@mui/material";
import {
  Email as EmailIcon,
  Lock as LockIcon,
  Visibility,
  VisibilityOff
} from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Apihelper } from "../service/ApiHelper";
import { jwtDecode } from "jwt-decode";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return toast.error("Email is required");
    if (!password) return toast.error("Password is required");

    try {
      setLoading(true);

      const data = {
        emailOrPhone: email,
        password
      };

      navigate("/")
      const result = await Apihelper.Login(data);

      if (result.status === 200) {
        toast.success("Login successful!");
        localStorage.setItem("token", JSON.stringify(result.data.token));
        let user = jwtDecode(result.data.token);
        localStorage.setItem("userinfo", JSON.stringify(user));

        if (user.role === "admin") {
          navigate("/");
        } else {
          navigate("/");
        }
      } else {
        toast.error(result.data.message || "Login failed");
      }
    } catch (error) {
      toast.error(error.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "black"
      }}
    >
      <Container maxWidth="xs">
        <Box
          sx={{
            width: "100%",
            backgroundColor: "#111",
            padding: 4,
            borderRadius: 2,
            boxShadow: "0px 0px 20px rgba(255, 0, 0, 0.3)"
          }}
        >
          <Typography
            component="h1"
            variant="h5"
            sx={{
              color: "white",
              mb: 3,
              textAlign: "center",
              fontWeight: "bold"
            }}
          >
            LOGIN
          </Typography>

          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
              width: "100%",
              '& .MuiFormLabel-root': {
                color: 'white !important'
              }
            }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address or Phone Number"
              placeholder="Enter Email or Phone"
              name="email"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <EmailIcon sx={{ color: "red" }} />
                  </InputAdornment>
                ),
                sx: { color: "white" }
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": { borderColor: "#333" },
                  "&:hover fieldset": { borderColor: "red" }
                }
              }}
            />

            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              placeholder="Enter Password"
              type={showPassword ? "text" : "password"}
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockIcon sx={{ color: "red" }} />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                      sx={{ color: "red" }}
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
                sx: { color: "white" }
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": { borderColor: "#333" },
                  "&:hover fieldset": { borderColor: "red" }
                }
              }}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={loading}
              sx={{
                mt: 3,
                mb: 2,
                py: 1.5,
                backgroundColor: "red",
                "&:hover": { backgroundColor: "darkred" },
                position: "relative"
              }}
            >
              {loading ? (
                <>
                  <CircularProgress
                    size={24}
                    sx={{
                      color: "white",
                      position: "absolute",
                      left: "50%",
                      marginLeft: "-12px"
                    }}
                  />
                  <span style={{ opacity: 0 }}>Sign In</span>
                </>
              ) : (
                "Sign In"
              )}
            </Button>

            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                color: "white",
                fontSize: "14px"
              }}
            >
              {/* <Link ref="#" underline="hover" sx={{ color: "red" }}>
                Forgot password?
              </Link> */}
              <Link to="/register" underline="hover" sx={{ color: "red" }}>
                Don’t have an account? Sign Up
              </Link>
            </Box>
          </Box>
        </Box>
        <ToastContainer />
      </Container>
    </Box>
  );
};

export default LoginForm;
