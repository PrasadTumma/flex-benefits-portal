import Header from "../components/layout/Header";
import TopSummaryBar from "../components/layout/TopSummaryBar";
import BenefitsTabs from "../components/layout/BenefitsTabs";

import GroupInsuranceSection from "../components/benefits/group/GroupInsuranceSection";
import WellnessSection from "../components/benefits/wellness/WellnessSection";
import PersonalInsuranceSection from "../components/benefits/personal/PersonalInsuranceSection";
import CartSidebar from "../components/cart/CartSidebar";
import LogoutIcon from "@mui/icons-material/Logout";
import { IconButton, Tooltip,Box } from "@mui/material";
import { useNavigate } from "react-router-dom";


const FlexBenefitsPage = () => {
  const navigate = useNavigate();

const handleLogout = () => {
  localStorage.removeItem("eb360_logged_in");
  navigate("/", { replace: true });
};

  return (
    <div>
      <Header />
<div style={{ paddingTop: 130 }}>
  <div style={{ maxWidth: 1280, margin: "0 auto" }}>
    <BenefitsTabs />

    <div id="group-section">
      <GroupInsuranceSection />
    </div>

    <div id="wellness-section">
      <WellnessSection />
    </div>

    <div id="personal-section">
      <PersonalInsuranceSection />
    </div>
  </div>

  <CartSidebar />
</div>



      <Box sx={{
  width: "100%",
  bgcolor: "#000",
  color: "#fff",
  textAlign: "center",
  py: 1,
  fontSize: 12,
  mt: 5
}}>
  © Copyright 2025. All rights reserved Alliance Insurance Brokers Pvt. Ltd.
</Box>

    </div>
  );
};

export default FlexBenefitsPage;
