import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Stack,
  Button,
  Box,
  Avatar,
} from "@mui/material";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import SecurityIcon from "@mui/icons-material/Security";

// fallback icons pool
const fallbackIcons = [
  <LocalHospitalIcon />,
  <FitnessCenterIcon />,
  <DirectionsCarIcon />,
  <SecurityIcon />,
];



const BenefitCard = ({
  title,
  icon,
  cover,
  premium,
  members = [],
  addOns = [],
  isAdded,
  onAddToCart,
}) => {
  // random fallback icon (stable per title)
  const fallbackIndex = title
    ? title.length % fallbackIcons.length
    : 0;

  return (
    <Card
      sx={{
    width: 280,              // 🔒 fixed width
    height: "100%",          // allow grid to control height
    minHeight: 230,          // 🔒 fixed minimum height
    display: "flex",
    flexDirection: "column",
    borderRadius: "14px",
    border: "1px solid #e0e0e0",
  }}
    >
      {/* CONTENT */}
      <CardContent sx={{ flexGrow: 1 }}>
        {/* ICON + TITLE */}
        <Stack direction="row" spacing={2} alignItems="center">
          <Avatar
    variant="rounded"
    sx={{
      width: 48,
      height: 48,
      minWidth: 48,
      bgcolor: "#e3f2fd",
      color: "#0d47a1",
    }}
  >
    {icon ? (
      <img
        src={icon}
        alt={title}
        style={{ width: 28, height: 28, objectFit: "contain" }}
      />
    ) : (
      fallbackIcons[fallbackIndex]
    )}
  </Avatar>

          <Typography variant="subtitle1" fontWeight={700}>
            {title}
          </Typography>
        </Stack>

        {/* DETAILS */}
        <Box sx={{ mt: 2 }}>
          <Typography variant="body2">
            <strong>Cover:</strong> {cover}
          </Typography>

          <Typography variant="body2">
            <strong>Premium:</strong>{" "}
            {premium === "Dynamic" ? (
              "Calculated Later"
            ) : (
              <>₹{Number(premium).toLocaleString()}</>
            )}
          </Typography>

          {members.length > 0 && (
            <Typography
              variant="caption"
              sx={{ display: "block", mt: 1 }}
            >
              <strong>Members:</strong> {members.join(", ")}
            </Typography>
          )}
        </Box>
      </CardContent>

      {/* ACTION BUTTON – ALWAYS BOTTOM */}
      <Box sx={{ p: 1.5 }}>
        <Button
          fullWidth
          variant={isAdded ? "outlined" : "contained"}
          color={isAdded ? "success" : "primary"}
          sx={{
            textTransform: "none",
            fontWeight: 600,
          }}
          onClick={onAddToCart}
        >
          {isAdded ? "View Cart" : "Add to Cart +"}
        </Button>
      </Box>
    </Card>
  );
};

export default BenefitCard;
