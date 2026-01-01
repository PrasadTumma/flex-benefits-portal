import React from "react";
import { Box, Container, Typography, Grid } from "@mui/material";
import { groupBenefits } from "../../../constants/benefitsData";
import { filterByClient } from "../../../utils/clientFilter";
import GroupInsuranceCard from "./GroupInsuranceCard";

const GroupInsuranceSection = () => {

  // 🔐 Client based filtering
  const filteredGroups = filterByClient(groupBenefits, "group");

  return (
    <Box sx={{ bgcolor: "#EFF9FF", py: 5 }}>
      <Container maxWidth="xl">
        <Box textAlign="center" mb={4}>
          <Typography variant="h5" fontWeight={700} color="#003E8C">
            Group Insurance Benefits
          </Typography>
          <Typography color="#555">
            Get covered with group health, accident, and term insurance designed for you.
          </Typography>
        </Box>

        <Grid container spacing={1} justifyContent="center">
          {filteredGroups.map((g) => (
            <Grid item key={g.id}>
              <GroupInsuranceCard data={g} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default GroupInsuranceSection;
