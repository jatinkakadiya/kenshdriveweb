import React, { useState } from "react";
import {
  TextField,
  Button,
  Link,
  Box,
  Typography,
  Container,
  InputAdornment,
  IconButton,
  CircularProgress
} from "@mui/material";
import {
  Person as PersonIcon,
  Email as EmailIcon,
  Lock as LockIcon,
  Phone as PhoneIcon,
  Visibility,
  VisibilityOff
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Don't forget this import
import { Apihelper } from "../service/ApiHelper";

const RegisterForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      if (!name) {
        toast.error("Name is required");
        return;
      }
      if (!phone || phone.length !== 10) {
        toast.error("Valid 10-digit phone number is required");
        return;
      }
      if (!email) {
        toast.error("Email is required");
        return;
      }
      if (!password) {
        toast.error("Password is required");
        return;
      }

      const data = {
        phonenumber: phone,
        name,
        email,
        password,
        role:"admin"

      };

      const result = await Apihelper.Register(data);
      
      if (result.status === 200) {
        toast.success("Registration successful!");
        navigate("/login");
      } else {
        toast.error(result.data?.message || "Registration failed");
      }
    } catch (error) {
      toast.error(error.message || "An error occurred during registration");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'black'
      }}
    >
      <Container
        maxWidth="xs"
        sx={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'black'
        }}
      >
        <Box
          sx={{
            width: '100%',
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
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
              textAlign: 'center',
              fontWeight: 'bold'
            }}
          >
            REGISTER
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
            {/* Name Field */}
            <TextField
              margin="normal"
              required
              fullWidth
              id="name"
              label="Full Name"
              name="name"
              autoComplete="name"
              autoFocus
              value={name}
              onChange={(e) => setName(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PersonIcon sx={{ color: "red" }} />
                  </InputAdornment>
                ),
                sx: { color: "white" }
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": { borderColor: "#333" },
                  "&:hover fieldset": { borderColor: "red" }
                },
              }}
            />

            {/* Email Field */}
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
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
                },
              }}
            />

            {/* Password Field */}
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type={showPassword ? "text" : "password"}
              id="password"
              autoComplete="new-password"
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
                },
              }}
            />

            {/* Phone Number Field */}
            <TextField
              margin="normal"
              required
              fullWidth
              id="phone"
              label="Phone Number"
              name="phone"
              autoComplete="tel"
              value={phone}
              onChange={(e) => {
                const value = e.target.value.replace(/\D/g, '').slice(0, 10);
                setPhone(value);
              }}
              inputProps={{
                inputMode: 'numeric',
                pattern: '[0-9]{10}',
                maxLength: 10,
                minLength: 10,
              }}
              error={phone.length > 0 && phone.length !== 10}
              helperText={phone.length > 0 && phone.length !== 10 ? 'Must be 10 digits' : ''}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PhoneIcon sx={{ color: "red" }} />
                  </InputAdornment>
                ),
                sx: { color: "white" }
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": { borderColor: "#333" },
                  "&:hover fieldset": { borderColor: "red" },
                  "&.Mui-error fieldset": { borderColor: "red" }
                },
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
                  <span style={{ opacity: 0 }}>Register</span>
                </>
              ) : (
                "Register"
              )}
            </Button>

            <Box sx={{ textAlign: 'center' }}>
              <Link
                component="button"
                variant="body2"
                sx={{
                  color: "white",
                  "&:hover": { color: "red" },
                  cursor: "pointer"
                }}
                onClick={() => navigate("/login")}
              >
                Already have an account? Login
              </Link>
            </Box>
          </Box>
        </Box>
      </Container>
      <ToastContainer
        position="top-right"
        autoClose={900}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </Box>
  );
};

export default RegisterForm;