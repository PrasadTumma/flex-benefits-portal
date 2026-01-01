import React from "react";
import { Box, Button } from "@mui/material";

const InsuranceCardWrapper = ({
  children,
  added,
  onAction
}) => {
  return (
    <Box
      sx={{
        background: "#fff",
        borderRadius: "10px",
        border: "1px solid #d7d7d7",
        display: "flex",
        flexDirection: "column",
        height: "100%",
        justifyContent: "space-between",
        boxShadow: "0px 2px 6px rgba(0,0,0,0.06)",
      }}
    >
      {/* top content */}
      <Box sx={{ padding: "18px" }}>
        {children}
      </Box>

      {/* bottom full-width CTA */}
      <Box
        sx={{
          width: "100%",
          background: added ? "#000" : "#EE6B3C",
          textAlign: "center",
          padding: "12px",
          borderBottomLeftRadius: "10px",
          borderBottomRightRadius: "10px",
          cursor: "pointer",
        }}
        onClick={onAction}
      >
        <Button
          sx={{
            color: "#fff",
            fontWeight: 600,
            width: "100%",
            textTransform: "none",
          }}
        >
          {added ? "VIEW CART" : "ADD TO CART"}
        </Button>
      </Box>
    </Box>
  );
};

export default InsuranceCardWrapper;
