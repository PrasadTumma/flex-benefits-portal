import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  AppBar,
  Toolbar,
  Stack,
  Avatar,
  IconButton,
  Container,Select, MenuItem
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import EbLogo from "../assets/images/eb360-logo.svg";
import { CLIENTS } from "../constants/benefitsData";


const LoginPage = () => {
  const navigate = useNavigate();

  const [step, setStep] = useState("MOBILE"); // MOBILE | OTP
  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
const [client, setClient] = useState("suzlon");

  // ✅ Mobile validation
  const isValidMobile = (num) => /^[6-9]\d{9}$/.test(num);

  const handleSendOtp = () => {
    if (!isValidMobile(mobile)) {
      setError("Enter a valid 10-digit mobile number starting with 6-9");
      return;
    }
    setError("");
    setStep("OTP");
  };

const handleVerifyOtp = () => {
  if (otp === "123456") {
    localStorage.setItem("eb360_logged_in", "true");
    localStorage.setItem("eb360_client", client);

    navigate("/dashboard", { replace: true });
  } else {
    alert("Invalid OTP");
  }
};


  return (
  <>
    {/* EB360 HEADER */}
<Box sx={{
  bgcolor: "#fff",
  borderBottom: "1px solid #ddd",
  py: 1.5
}}>
  <Container maxWidth="xl">
    <Stack direction="row" spacing={2} alignItems="center">
      <Avatar src={EbLogo} variant="rounded" sx={{ width: 90, height: 36 }} />
      <Typography fontSize={13} whiteSpace="nowrap">
        Powered by Alliance Insurance Brokers Pvt Ltd
      </Typography>
    </Stack>
  </Container>
</Box>


    {/* PAGE */}
    <Box sx={{
      minHeight: "calc(100vh - 120px)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      bgcolor: "#19C3F3"
    }}>
      <Box sx={{
        width: 380,
        bgcolor: "#fff",
        p: 4,
        borderRadius: 3,
        boxShadow: "0 10px 35px rgba(0,0,0,.15)"
      }}>

        {step === "MOBILE" && (
          <>
            <Typography fontWeight={700} mb={1} fontSize={18}>
              Login to EB360
            </Typography>
            <Typography fontSize={12} fontWeight={600} mb={0.5}>
  Select Client
</Typography>

<Select
  fullWidth
  size="small"
  value={client}
  onChange={(e) => setClient(e.target.value)}
  MenuProps={{ disableScrollLock: true }}
  sx={{
    mb: 2,
    height: 44,
    borderRadius: 1.5,
    "& .MuiSelect-select": {
      height: 44,
      display: "flex",
      alignItems: "center",
      fontSize: 14,
      pl: 1.5
    }
  }}
>
  {CLIENTS.map((c) => (
    <MenuItem key={c.id} value={c.id}>{c.name}</MenuItem>
  ))}
</Select>

            <Typography fontSize={13} color="text.secondary" mb={2}>
              Enter your registered mobile number
            </Typography>

            <TextField
  fullWidth
  size="small"
  placeholder="Mobile Number"
  value={mobile}
  inputProps={{ maxLength: 10 }}
  onChange={(e) => setMobile(e.target.value.replace(/\D/g, ""))}
  sx={{
    "& .MuiOutlinedInput-root": {
      height: 44,
      borderRadius: 1.5,
      fontSize: 14
    }
  }}
/>


            {error && <Typography color="error" fontSize={12} mt={.5}>{error}</Typography>}

            <Button fullWidth sx={{ mt: 2, bgcolor: "#F26522", color: "#fff" }} onClick={handleSendOtp}>
              SEND OTP
            </Button>
          </>
        )}

        {step === "OTP" && (
          <>
            <Typography fontWeight={700} mb={1} fontSize={18}>
              Verify OTP
            </Typography>
            <Typography fontSize={13} color="text.secondary" mb={2}>
              OTP sent to +91 {mobile.replace(/(\d{2})\d{6}(\d{2})/, "$1XXXX$2")}
            </Typography>

           <TextField
  fullWidth
  size="small"
  placeholder="Enter OTP"
  value={otp}
  inputProps={{ maxLength: 6 }}
  onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
  sx={{
    "& .MuiOutlinedInput-root": {
      height: 44,
      borderRadius: 1.5,
      fontSize: 14
    }
  }}
/>


            <Button fullWidth sx={{ mt: 2, bgcolor: "#F26522", color: "#fff" }} onClick={handleVerifyOtp}>
              VERIFY OTP
            </Button>
          </>
        )}

      </Box>
    </Box>

    {/* FOOTER */}
    <Box sx={{ textAlign: "center", py: 2, bgcolor: "#f5f5f5", fontSize: 11 }}>
      © {new Date().getFullYear()} Alliance Insurance Brokers Pvt Ltd. All Rights Reserved.
    </Box>
  </>
);

};

export default LoginPage;
