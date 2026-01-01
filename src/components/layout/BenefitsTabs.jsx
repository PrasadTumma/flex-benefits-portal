import React, { useState } from "react";
import { Box, Tabs, Tab, Container } from "@mui/material";

const BenefitsTabs = ({ onTabChange }) => {
  const [activeTab, setActiveTab] = useState(0);

  const handleChange = (event, newValue) => {
  setActiveTab(newValue);

  const sectionIds = [
    "group-section",
    "wellness-section",
    "personal-section"
  ];

  const element = document.getElementById(sectionIds[newValue]);
  if (element) {
    element.scrollIntoView({ behavior: "smooth", block: "start" });
  }
};


  return (
    <Box
      sx={{
        width: "100%",
        backgroundColor: "#fff",
        borderBottom: "1px solid #eee",
      }}
    >
      <Container maxWidth="xl">
        <Tabs
          value={activeTab}
          onChange={handleChange}
          textColor="primary"
          indicatorColor="primary"
          sx={{
            "& .MuiTab-root": {
              fontWeight: 600,
              textTransform: "none",
              minWidth: "auto",
              marginRight: "20px",
              fontSize: "15px",
            },
          }}
        >
          <Tab label="Group Insurance Benefits" />
          <Tab label="Wellness Benefits" />
          <Tab label="Personal Insurance Benefits" />
        </Tabs>
      </Container>
    </Box>
  );
};

export default BenefitsTabs;
