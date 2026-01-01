import React from "react";
import { Box, Container, Typography, Grid, Divider } from "@mui/material";
import PersonalInsuranceImageCard from "./PersonalInsuranceImageCard";
import { personalBenefits } from "../../../constants/benefitsData";
import { filterByClient } from "../../../utils/clientFilter";
import { useFlexBenefits } from "../../../context/FlexBenefitsContext";

const PersonalInsuranceSection = () => {

  const { addToCart, isAdded, toggleCart } = useFlexBenefits();

  // 🔐 Client based filtering
  const filteredPersonal = filterByClient(personalBenefits, "personal");

  return (
    <Box sx={{ width: "100%", py: 5, bgcolor: "#fafafa" }} id="personal">
      <Container maxWidth="xl">

        <Box sx={{ textAlign: "center", mb: 4 }}>
          <Typography variant="h5" sx={{ fontWeight: 700, mb: 1, color: "#003E8C" }}>
            Personal Insurance Benefits
          </Typography>

          <Typography variant="body2" sx={{ color: "#555" }}>
            Choose from a range of personal insurance plans to secure yourself and your family.
          </Typography>
        </Box>

        <Divider sx={{ mb: 4 }} />

        <Grid container spacing={1}>
          {filteredPersonal.map(p => {
  const title = (p.title || "").toLowerCase();
  const isMotor = title.includes("car") || title.includes("bike") || title.includes("two");

  return (
    <Grid key={p.id} item xs={12} sm={6} md={3} display="flex" justifyContent="center">
      <PersonalInsuranceImageCard
        data={p}
        inCart={isAdded(p.id)}
        onAdd={(item) => {
          if (isMotor) return;       // 🚫 Block motor from cart
          addToCart(item);
          toggleCart();
        }}
        onView={toggleCart}
        isMotor={isMotor}           // 🔐 Pass motor flag to card
      />
    </Grid>
  );
})}

        </Grid>

      </Container>
    </Box>
  );
};

export default PersonalInsuranceSection;
