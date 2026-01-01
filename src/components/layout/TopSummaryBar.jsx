import React from "react";
import { Box, Container, Stack, Typography } from "@mui/material";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useFlexBenefits } from "../../context/FlexBenefitsContext";

const TopSummaryBar = () => {
  const { state, dispatch } = useFlexBenefits();

  return (
    <Box
      sx={{
        position: "fixed",
        top: 56,
        width: "100%",
        zIndex: 1100,
        background: "#f7f9fb",
        borderBottom: "1px solid #ddd",
      }}
    >
      <Container maxWidth="xl">
        <Stack direction="row" alignItems="center" justifyContent="space-between" py={1}>
          <Typography fontWeight={600}>Health and Wellness Flex Benefits</Typography>

          <Stack direction="row" spacing={4} alignItems="center">
           <Stack direction="row" spacing={1} alignItems="center">
<AccountBalanceWalletIcon sx={{ color: "#07403c", fill: "#07403c" }} />
  <Typography fontWeight={600}>₹45,000</Typography>
</Stack>


            <Stack direction="row" spacing={1} alignItems="center">
<MonetizationOnIcon sx={{ color: "#E9A200", fill: "#E9A200" }} />
  <Typography fontWeight={600}>5,000 Coins</Typography>
</Stack>

            <Stack
  direction="row"
  spacing={1}
  alignItems="center"
  sx={{ cursor: "pointer" }}
  onClick={() => dispatch({ type: "TOGGLE_CART" })}
>
<ShoppingCartIcon sx={{ color: "#003E8C", fill: "#003E8C" }} />
  <Typography fontWeight={600}>
    My Cart ({state.cartItems.length})
  </Typography>
</Stack>

          </Stack>
        </Stack>
      </Container>
    </Box>
  );
};

export default TopSummaryBar;
