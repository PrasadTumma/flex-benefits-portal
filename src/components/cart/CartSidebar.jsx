import React from "react";
import {
  Box,
  Typography,
  Drawer,
  Divider,
  IconButton,
  Stack,
  Button
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";
import { useFlexBenefits } from "../../context/FlexBenefitsContext";
import CoinIcon from "../../assets/images/coin.svg";
import { Dialog, DialogContent, CircularProgress } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const CartSidebar = () => {

  const {
    cartOpen,
    toggleCart,
    cartItems,
    removeFromCart,
    totals,
    proceedCart    
  } = useFlexBenefits();

  const wellness = cartItems.filter(x => x.type === "wellness");
  const personal = cartItems.filter(x => x.type === "personal");
  const group = cartItems.filter(x => x.type === "group");
const [payOpen, setPayOpen] = React.useState(false);
const [payStep, setPayStep] = React.useState("REDIRECT");


  return (
    <Drawer
  anchor="right"
  open={cartOpen}
  onClose={toggleCart}
  PaperProps={{
    sx: {
      mt: "110px",                     // push below header
      height: "calc(100% - 110px)",    // remaining height
      borderTopLeftRadius: 12,
      boxShadow: "0 0 30px rgba(0,0,0,.25)"

    }
  }}
>
      <Box sx={{ width: 360, p: 2 }}>

        {/* Header */}
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Typography fontWeight={700}>My Cart</Typography>
          <IconButton size="small" onClick={toggleCart}><CloseIcon /></IconButton>
        </Stack>
        <Divider sx={{ my: 2 }} />

        {/* GROUP INSURANCE */}
<Typography fontWeight={600} fontSize={12} mb={1}>
<u>GROUP INSURANCE BENEFITS:</u></Typography>

{group.length === 0 ? (
  <Typography variant="caption">Not Selected</Typography>
) : group.map(item => (
  <Stack key={item.id} direction="row" justifyContent="space-between" alignItems="center" mb={1}>
    <Box>
      <Typography fontSize={13} fontWeight={600}>{item.title}:</Typography>
      <Typography variant="caption">
        {item.price === 0 ? "Company Paid" : `₹${item.price}`}
      </Typography>
    </Box>
    <IconButton size="small" onClick={() => removeFromCart(item.id)}>
      <DeleteIcon fontSize="small" />
    </IconButton>
  </Stack>
))}


        <Divider sx={{ my: 2 }} />

        {/* WELLNESS */}
       <Typography fontWeight={600} fontSize={12} mb={1}>
<u>WELLNESS BENEFITS:</u></Typography>
        {wellness.length === 0 ? (
          <Typography variant="caption">Not Selected</Typography>
        ) : wellness.map(item => (
          <Stack key={item.id} direction="row" justifyContent="space-between" alignItems="center" mb={1}>
            <Box>
              <Typography fontSize={13} fontWeight={600}>{item.title}:</Typography>
              <Stack direction="row" spacing={1} alignItems="center">
  <Typography variant="caption">₹{item.price}</Typography>

  <Stack direction="row" spacing={0.5} alignItems="center">
    <Box component="img" src={CoinIcon} sx={{ width: 13, height: 13 }} />
    <Typography variant="caption">{item.coins}</Typography>
  </Stack>
</Stack>


            </Box>
            <IconButton size="small" onClick={() => removeFromCart(item.id)}>
              <DeleteIcon fontSize="small" />
            </IconButton>
          </Stack>
        ))}

        <Divider sx={{ my: 2 }} />

        {/* PERSONAL */}
        
       <Typography fontWeight={600} fontSize={12} mb={1}>
<u>PERSONAL INSURANCE BENEFITS:</u></Typography>
        {personal.length === 0 ? (
          <Typography variant="caption">Not Selected</Typography>
        ) : personal.map(item => (
          <Stack key={item.id} direction="row" justifyContent="space-between" alignItems="center" mb={1}>
            <Box>
              <Typography fontSize={13} fontWeight={600}>{item.title}:</Typography>
              <Stack direction="row" spacing={1} alignItems="center">
  <Typography variant="caption">₹{item.price}</Typography>

  <Stack direction="row" spacing={0.5} alignItems="center">
    <Box component="img" src={CoinIcon} sx={{ width: 13, height: 13 }} />
    <Typography variant="caption">{item.coins}</Typography>
  </Stack>
</Stack>

            </Box>
            <IconButton size="small" onClick={() => removeFromCart(item.id)}>
              <DeleteIcon fontSize="small" />
            </IconButton>
          </Stack>
        ))}

        <Divider sx={{ my: 2 }} />

        {/* PRICE SUMMARY */}
        <Typography
  fontWeight={800}
  sx={{ color: "#2E7D32", fontSize: 15 }}
>
  TOTAL PRICE SUMMARY:
</Typography>

        <Stack spacing={0.5}>

  <Typography variant="caption">
    Total Amount: ₹{totals.totalAmount}
  </Typography>

  <Stack direction="row" spacing={0.5} alignItems="center">
    <Typography variant="caption">Total Coins:</Typography>
    <Box component="img" src={CoinIcon} sx={{ width: 14, height: 14 }} />
    <Typography variant="caption">{totals.totalCoins}</Typography>
  </Stack>

</Stack>


        <Divider sx={{ my: 2 }} />

        {/* WALLET Code commented as per observations */}
        {/* <Typography fontWeight={700}>SELECT PAYMENT METHOD</Typography>
        <Stack direction="row" spacing={3} alignItems="center">

  <Typography variant="caption">
    Wallet Balance: ₹{walletBalance}
  </Typography>

  <Stack direction="row" spacing={0.5} alignItems="center">
    <Typography variant="caption">Coin Balance:</Typography>
    <Box component="img" src={CoinIcon} sx={{ width: 13, height: 13 }} />
    <Typography variant="caption">{coinBalance}</Typography>
  </Stack>

</Stack> */}

       <Button
  fullWidth
  variant="contained"
  disabled={totals.totalAmount === 0 && totals.totalCoins === 0}
  sx={{
    mt: 2,
    bgcolor: "#003E8C",
    opacity: totals.totalAmount === 0 && totals.totalCoins === 0 ? 0.4 : 1
  }}
  onClick={() => {
  setPayStep("SUCCESS");
  setPayOpen(true);

  setTimeout(() => {
    //clearCart();
    setPayOpen(false);
    proceedCart();

    //toggleCart();
  }, 2000);
}}
>
  CONFIRM & PROCEED
</Button>


      </Box>

      <Dialog open={payOpen} maxWidth="xs" fullWidth>
  <DialogContent sx={{ textAlign:"center", py:5 }}>

   

    {payStep === "SUCCESS" && (
      <>
      
        <CheckCircleIcon sx={{ fontSize:60, color:"#4CAF50" }} />
        <Typography mt={2} fontWeight={700}>
          Order Placed Successfully 🎉
        </Typography>
      </>
    )}

  </DialogContent>
</Dialog>

    </Drawer>
  );
};

export default CartSidebar;
