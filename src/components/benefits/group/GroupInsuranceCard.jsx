import React, { useState } from "react";
import {
  Box, Typography, Select, MenuItem, Button, Divider, Stack
} from "@mui/material";
import HealthIcon from "../../../assets/images/health-insurance.svg";
import ParentsIcon from "../../../assets/images/parents.svg";
import AccidentIcon from "../../../assets/images/accident.svg";
import TermIcon from "../../../assets/images/term-life-ic.svg";


import { useFlexBenefits } from "../../../context/FlexBenefitsContext";

const iconMap = {
  "Health Insurance": HealthIcon,
  "Parents Health Insurance": ParentsIcon,
  "Personal Accident Insurance": AccidentIcon,
  "Term Life Insurance": TermIcon
};


const GroupInsuranceCard = ({ data }) => {
  const { addToCart, toggleCart, isAdded } = useFlexBenefits();

  const [member, setMember] = useState(data.members[0]);

  const handleAdd = () => {
    addToCart({
      id: data.id,
      title: data.title,
      cover: data.baseCover,
      price: data.basePrice,
      coins: 0,
      type: "group"
    });
    //toggleCart();
  };

  const PlanRow = ({ title, cover, premium, tag }) => (
  <Box sx={{ borderBottom: "1px dashed #ddd", pb: .5 }}>
    <Typography fontSize={12} fontWeight={600}>{title}</Typography>
    <Stack direction="row" justifyContent="space-between" alignItems="center">
      <Typography fontSize={11}>Cover: {cover}</Typography>
      <Stack direction="row" spacing={1} alignItems="center">
        <Typography fontSize={11}>₹{premium}</Typography>
        <Box sx={{
          px: 1.5,
          py: .3,
          fontSize: 10,
          borderRadius: 10,
          border: "1px solid #000",
          bgcolor: tag ? "#007b8f" : "#fff",
          color: tag ? "#fff" : "#000"
        }}>
          {tag ? "ADDED" : "ADD +"}
        </Box>
      </Stack>
    </Stack>
  </Box>
);

  return (
<Box sx={{ width: 300, height: 560, bgcolor: "#fff", borderRadius: 2, overflow: "hidden", boxShadow: 4, display: "flex", flexDirection: "column" }}>      {/* HEADER */}
      <Box sx={{ bgcolor: "#D9F4FF", p: 2 }}>
        <Stack direction="row" spacing={1} alignItems="center">
          <Box
  component="img"
  src={iconMap[data.title]}
  sx={{
    width: 36,
    height: 36,
    objectFit: "contain"
  }}
/>

          <Box>
            <Typography fontWeight={700}>{data.title}</Typography>
            <Typography fontSize={12} color="primary">Know More</Typography>
          </Box>
        </Stack>
      </Box>

      {/* BASE INFO */}
      <Box sx={{ p: 2, bgcolor: "#F5F5F5", display: "flex", justifyContent: "space-between" }}>
        <Box>
          <Typography fontSize={12}>Cover Amount</Typography>
          <Typography fontWeight={700}>{data.baseCover}</Typography>
        </Box>
        <Box>
          <Typography fontSize={12}>Premium Amount</Typography>
          <Typography fontWeight={700}>
            {data.basePrice === 0 ? "Company Paid" : `₹${data.basePrice}`}
          </Typography>
        </Box>
      </Box>

      {/* MEMBER */}
      <Box p={2}>
        <Typography fontSize={12}>Select Members</Typography>
<Select
  fullWidth
  size="small"
  value={member}
  onChange={(e) => setMember(e.target.value)}

  MenuProps={{
    disableScrollLock: true,   // ⭐ THIS IS THE FIX
    PaperProps: { sx: { zIndex: 3000 } }
  }}

  sx={{
    fontSize: 12,
    height: 34,
    "& .MuiSelect-select": { py: .5 }
  }}
>
  {data.members.map(m => (
    <MenuItem key={m} value={m}>{m}</MenuItem>
  ))}
</Select>


      </Box>

      {/* STATIC PLANS (UI ONLY) */}
<Box px={2}>

  <Divider sx={{ my: 1 }} />

  <Stack spacing={1}>

    <PlanRow title="Increase Cover Amount" cover="₹10 Lakh" premium="₹6,050" />
    <PlanRow title="Maternity Cover" cover="₹25,000" premium="₹1,200" />
    <PlanRow title="Co Payment" cover="10%" premium="₹500" tag />
    <PlanRow title="Eye Cataract Limit" cover="₹25,000" premium="₹3,000" />

  </Stack>

  <Divider sx={{ my: 1 }} />

  <Stack direction="row" justifyContent="space-between" alignItems="center">
    <Typography fontSize={12} color="primary">MORE ADD ONS &gt;</Typography>
    <Typography fontSize={12}>Selected 1/10</Typography>
  </Stack>

</Box>

      {/* ADD TO CART */}
      {isAdded(data.id) ? (
<Button fullWidth sx={{ bgcolor: "#000", color: "#fff", py: 1.5, mt: "auto" }} onClick={toggleCart}>
          ✓ VIEW CART
        </Button>
      ) : (
        <Button fullWidth sx={{ bgcolor: "#F26522", color: "#fff", py: 1.5, mt: "auto" }} onClick={handleAdd}>
          ADD TO CART
        </Button>
      )}
    </Box>
  );
};

export default GroupInsuranceCard;
