import React from "react";
import { Box, Typography, Button,Stack } from "@mui/material";
import CoinIcon from "../../../assets/images/coin.svg";

const WellnessImageCard = ({ data, inCart, onAdd, onView }) => {
  return (
    <Box sx={{
      width: 300,
      height: 560,
      borderRadius: 3,
      overflow: "hidden",
      bgcolor: "#fff",
      boxShadow: 6,
      display: "flex",
      flexDirection: "column"
    }}>

      <img src={data.image} width="100%" height="160" style={{ objectFit: "cover" }} />

      <Box sx={{ bgcolor: "#b9ecff", p: 1.2 }}>
        <Typography fontWeight={700}>{data.title}</Typography>
      </Box>

      <Box sx={{ p: 2, flexGrow: 1 }}>
        <Typography fontWeight={600} mb={1}>{data.subtitle}</Typography>

        {data.bullets.map((b, i) => (
  <Box key={i} sx={{ display: "flex", alignItems: "center", gap: 0.8, mb: .4 }}>
    <Box sx={{
      width: 14,
      height: 14,
      borderRadius: "50%",
      bgcolor: "#4CAF50",
      color: "#fff",
      fontSize: 10,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexShrink: 0
    }}>
      ✓
    </Box>
    <Typography variant="caption" sx={{ lineHeight: 1.4 }}>
      {b}
    </Typography>
  </Box>
))}

      </Box>

      {/* PRICE SECTION – FIXED POSITION */}
      <Box sx={{ p: 2 }}>
        {data.original && (
          <Typography sx={{ textDecoration: "line-through", color: "#aaa" }}>
            ₹{data.original}
          </Typography>
        )}

        <Stack direction="row" spacing={1} alignItems="center">
  <Typography fontWeight={800} fontSize={18}>
    ₹{data.price} +
  </Typography>

  <Box
    component="img"
    src={CoinIcon}
    sx={{ width: 18, height: 18 }}
  />

  <Typography fontWeight={800} fontSize={18}>
    {data.coins}
  </Typography>
</Stack>

      </Box>

      {inCart ? (
  <Button fullWidth sx={{
    bgcolor: "#000",
    color: "#fff",
    borderRadius: 0,
    py: 1.6,
    fontWeight: 800,
    mt: "auto"
  }} onClick={onView}>
    VIEW CART
  </Button>
) : (
  <Button fullWidth sx={{
    bgcolor: "#ff6a00",
    color: "#fff",
    borderRadius: 0,
    py: 1.6,
    fontWeight: 800,
    mt: "auto"
  }} onClick={() => onAdd({ ...data, price: data.price, coins: data.coins, type: "wellness" })}
>
    ADD TO CART
  </Button>
)}
    </Box>
  );
};

export default WellnessImageCard;
