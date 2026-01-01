import { Grid, Typography, Box } from "@mui/material";
import { wellnessBenefits } from "../../../constants/benefitsData";
import { filterByClient } from "../../../utils/clientFilter";
import WellnessImageCard from "./WellnessImageCard";
import { useFlexBenefits } from "../../../context/FlexBenefitsContext";

const WellnessSection = () => {

  const { addToCart, isAdded, toggleCart } = useFlexBenefits();

  // 🔐 Client based filtering
  const filteredWellness = filterByClient(wellnessBenefits, "wellness");

  return (
    <Box id="wellness-section" sx={{ mt: 4 }}>

      <Box sx={{ textAlign: "center", mb: 4 }}>
        <Typography variant="h5" sx={{ fontWeight: 700, mb: 1, color: "#003E8C" }}>
          Wellness Benefits
        </Typography>

        <Typography variant="body2" sx={{ color: "#555" }}>
          Enhance your well-being with exclusive wellness benefits for you and your family.
        </Typography>
      </Box>

      <Grid container spacing={1} justifyContent="center">
        {filteredWellness.map((b) => (
          <Grid item key={b.id} xs={12} sm={6} md={3} display="flex" justifyContent="center">
            <WellnessImageCard
              data={b}
              inCart={isAdded(b.id)}
              onAdd={() => {
                addToCart({
                  ...b,
                  type: "wellness",
                  price: Number(b.price) || 0,
                  coins: Number(b.coins) || 0
                });
                toggleCart();
              }}
              onView={toggleCart}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default WellnessSection;
