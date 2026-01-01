import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Button,
  RadioGroup,
  FormControlLabel,
  Radio,
  Select,
  MenuItem
} from "@mui/material";
import CoinIcon from "../../../assets/images/coin.svg";

const PersonalInsuranceImageCard = ({ data, inCart, onAdd, onView, isMotor }) => {

  const isWomen = data.id === "women";

  const buyingOptions = isWomen
    ? ["Spouse", "Daughter"]
    : ["Self", "Self + Spouse", "Self + Spouse + 2 Kids"];

  const coverOptions = data.covers?.slice(0, 3) || [];

  const [buyer, setBuyer] = useState(buyingOptions[0]);
  const [cover, setCover] = useState(coverOptions[0]);

  useEffect(() => {
    setBuyer(buyingOptions[0]);
    setCover(coverOptions[0]);
  }, [data.id]);

  const premium =
    data.type === "dynamic"
      ? Math.round(data.basePremium * (cover / coverOptions[0]))
      : data.price;

  const isUnlock = data.type === "unlock";
const title = (data.title || "").toLowerCase();
const isCar = title.includes("car");
const isBike = title.includes("two") || title.includes("bike") || title.includes("wheeler");
 

const handleMotorRedirect = () => {
  if (isCar) {
    window.open("https://elephant.in/motor-insurance/car-insurance", "_blank");
  }
  if (isBike) {
    window.open("https://elephant.in/motor-insurance/two-wheeler-insurance", "_blank");
  }
};


  return (
    <Box sx={{
      width: 300,
      height: 540,
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

        <Typography fontWeight={600} mb={.5} fontSize={13}>
          {data.subtitle || " "}
        </Typography>

        {data.features.map((b, i) => (
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


        {/* BUYING FOR */}
        <Box mt={1}>
          <Typography sx={{ fontSize: 12, fontWeight: 600, color: "#555", mb: .5 }}>
            Buying For
          </Typography>

          <Select
  fullWidth
  size="small"
  value={buyer}
  onChange={(e) => setBuyer(e.target.value)}
  MenuProps={{
    disablePortal: true,
    disableScrollLock: true,
    PaperProps: {
      sx: { maxHeight: 180 }
    }
  }}
  sx={{
    fontSize: 12,
    height: 32,
    "& .MuiSelect-select": { py: .5 }
  }}
>

            {buyingOptions.map(opt => (
              <MenuItem key={opt} value={opt}>{opt}</MenuItem>
            ))}
          </Select>
        </Box>

        {/* COVER AMOUNT */}
        {coverOptions.length > 0 && (
          <Box mt={1}>
            <Typography sx={{ fontSize: 12, fontWeight: 600, color: "#555" }}>
              Cover Amount
            </Typography>

            <RadioGroup row value={cover} onChange={(e) => setCover(Number(e.target.value))}>
              {coverOptions.map(c => (
                <FormControlLabel
                  key={c}
                  value={c}
                  control={<Radio size="small" />}
                  label={`₹${c / 100000} Lakh`}
                  sx={{ "& .MuiFormControlLabel-label": { fontSize: 12 } }}
                />
              ))}
            </RadioGroup>
          </Box>
        )}
      </Box>

      {/* CTA */}
      {isMotor ? (
  <Button
    fullWidth
    sx={{ bgcolor: "#003E8C", color: "#fff", py: 1.5, borderRadius: 0 }}
    onClick={() => {
      const t = data.title.toLowerCase();
      if (t.includes("car"))
        window.open("https://elephant.in/motor-insurance/car-insurance", "_blank");
      else
        window.open("https://elephant.in/motor-insurance/two-wheeler-insurance", "_blank");
    }}
  >
    BUY NOW
  </Button>
) : inCart ? (
  <Button fullWidth sx={{ bgcolor: "#000", color: "#fff", py: 1.5 }} onClick={onView}>
    VIEW CART
  </Button>
) : isUnlock ? (
  <Button fullWidth sx={{ bgcolor: "#ff6a00", color: "#fff", py: 1.5 }}
    onClick={() => onAdd({ ...data, price: 0, coins: 400, type: "personal" })}>
    UNLOCK NOW
  </Button>
) : (
  <Button fullWidth sx={{ bgcolor: "#ff6a00", color: "#fff", py: 1.5 }}
    onClick={() => onAdd({ ...data, cover, price: premium, coins: 400, type: "personal" })}>
    ADD TO CART ₹{premium}
  </Button>
)}


      {/* COINS FOOTER */}
      <Box
  sx={{
    textAlign: "center",
    py: 0.8,
    fontSize: 12,
    bgcolor: "#fff3e0",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: .5
  }}
>
  Unlock this with
  <Box component="img" src={CoinIcon} sx={{ width: 14, height: 14 }} />
  400
</Box>

    </Box>
  );
};

export default PersonalInsuranceImageCard;
