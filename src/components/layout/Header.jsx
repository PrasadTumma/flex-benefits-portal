import React from "react";
import {
  Box,
  Typography,
  Container,
  Stack,
  Avatar,
  IconButton,
  Divider, // ✅ add this
} from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import WalletIcon from "../../assets/images/wallet.svg";
import CoinIcon from "../../assets/images/coin.svg";

import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useNavigate } from "react-router-dom";
import { useFlexBenefits } from "../../context/FlexBenefitsContext";
import EbLogo from "../../images/eb360-logo.svg";
import SuzlonLogo from "../../images/suzlon.png";
import IntelLogo from "../../images/intel.png";
import DellLogo from "../../images/dell.png";
import { CLIENT_EMPLOYEE_MAP } from "../../constants/benefitsData";
import { Dialog, DialogTitle, DialogContent } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import WalletHistoryDialog from "../wallet/WalletHistoryDialog";

const clientLogoMap = {
  suzlon: SuzlonLogo,
  intel: IntelLogo,
  dell: DellLogo,
};

const Header = () => {
  const navigate = useNavigate();

  const [client, setClient] = React.useState("suzlon");
  const [openWallet, setOpenWallet] = React.useState(false);
  const [openCoins, setOpenCoins] = React.useState(false);

  React.useEffect(() => {
    const stored = localStorage.getItem("eb360_client") || "suzlon";
    setClient(stored);
  }, []);

  const ClientLogo = clientLogoMap[client] || SuzlonLogo;

  const {
    walletBalance,
    coinBalance,
    cartItems,
    toggleCart,
    walletHistory,
    coinHistory,
  } = useFlexBenefits();

  // Running balance calc
  // const totalUsed = coinHistory.reduce((s, x) => s + x.coins, 0);
  // let runningBalance = coinBalance + totalUsed;

  const handleLogout = () => {
    localStorage.removeItem("eb360_logged_in");
    localStorage.removeItem("eb360_client");
    navigate("/", { replace: true });
  };

  const employee = CLIENT_EMPLOYEE_MAP[client];

  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        width: "100%",
        zIndex: 1300,
        background: "#fff",
        borderBottom: "1px solid #ddd",
      }}
    >
      <Container maxWidth="xl">
        {/* ROW 1 */}
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          py={1}
        >
          <Stack direction="row" spacing={2} alignItems="center">
            <Avatar
              src={EbLogo}
              variant="rounded"
              sx={{ width: 90, height: 36 }}
            />
            <Typography fontSize={13} whiteSpace="nowrap">
              Powered by Alliance Insurance Brokers Pvt Ltd
            </Typography>
            <Box sx={{ width: 1, height: 22, bgcolor: "#ccc" }} />
            <Avatar
              src={ClientLogo}
              variant="rounded"
              sx={{ width: 90, height: 36 }}
            />
          </Stack>

          <Stack direction="row" spacing={2} alignItems="center">
            <Typography fontSize={14} fontWeight={600}>
              {employee?.name}
            </Typography>

            <Typography fontSize={12} color="gray">
              {employee?.code}
            </Typography>
            <IconButton size="small" onClick={handleLogout}>
              <LogoutIcon fontSize="small" />
            </IconButton>
          </Stack>
        </Stack>

        {/* ROW 2 */}
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          pb={1}
          mt={2.5}
        >
          <Typography fontWeight={600}>
            Health and Wellness Flex Benefits
          </Typography>

          <Stack direction="row" spacing={4} alignItems="center">
            <Stack
              direction="row"
              spacing={1}
              alignItems="center"
              sx={{ cursor: "pointer" }}
              onClick={() => setOpenWallet(true)}
            >
              <Box
                component="img"
                src={WalletIcon}
                sx={{ width: 20, height: 20 }}
              />
              <Typography>₹{walletBalance.toLocaleString()}</Typography>
            </Stack>

            <Stack
              direction="row"
              spacing={1}
              alignItems="center"
              sx={{ cursor: "pointer" }}
              onClick={() => setOpenCoins(true)}
            >
              <Box
                component="img"
                src={CoinIcon}
                sx={{ width: 20, height: 20 }}
              />
              <Typography>{coinBalance.toLocaleString()} Coins</Typography>
            </Stack>

            <Stack
              direction="row"
              spacing={1}
              alignItems="center"
              sx={{ cursor: "pointer" }}
              onClick={toggleCart}
            >
              <ShoppingCartIcon sx={{ "& path": { fill: "#003E8C" } }} />
              <Typography>My Cart ({cartItems.length})</Typography>
            </Stack>
          </Stack>
        </Stack>
      </Container>
      {/* WALLET POPUP */}
      <Dialog
        open={openWallet}
        onClose={() => setOpenWallet(false)}
        maxWidth="xs"
        fullWidth
        PaperProps={{
          sx: {
            position: "fixed",
            top: 90, // below header
            left: "50%",
            transform: "translateX(-50%)",
          },
        }}
      >
        <DialogTitle>
          Wallet History
          <IconButton
            onClick={() => setOpenWallet(false)}
            sx={{ position: "absolute", right: 8, top: 8 }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <DialogContent>
          <Box sx={{ bgcolor: "#E6F7FB", p: 2, borderRadius: 2, mb: 2 }}>
            <Stack direction="row" justifyContent="space-between">
              <Typography>Wallet Balance</Typography>
              <Typography fontWeight={700}>₹{walletBalance}</Typography>
            </Stack>
          </Box>

          <Box mt={2}>
            <Stack direction="row" fontWeight={600} fontSize={12} mb={1}>
              <Box flex={1}>Date</Box>
              <Box flex={2}>Plan</Box>
              <Box flex={1}>Amount</Box>
              <Box flex={1}>Balance</Box>
            </Stack>
            {[...walletHistory]
              .sort((a, b) => b.id - a.id) // newest first
              .map((txn) => (
                <Stack
                  key={txn.id}
                  direction="row"
                  fontSize={11}
                  py={0.7}
                  borderBottom="1px dashed #ddd"
                >
                  <Box flex={1}>{txn.date}</Box>
                  <Box flex={2}>{txn.description}</Box>
                  <Box flex={1} color="green">
                    ₹{Math.abs(txn.amount)}
                  </Box>
                  <Box flex={1}>₹{txn.balance}</Box>
                </Stack>
              ))}
          </Box>
        </DialogContent>
      </Dialog>

      {/* COINS POPUP */}
      <Dialog
        open={openCoins}
        onClose={() => setOpenCoins(false)}
        maxWidth="xs"
        fullWidth
        PaperProps={{
          sx: {
            position: "fixed",
            top: 90, // below header
            left: "50%",
            transform: "translateX(-50%)",
          },
        }}
      >
        <DialogTitle>
          Benefits Coins History
          <IconButton
            onClick={() => setOpenCoins(false)}
            sx={{ position: "absolute", right: 8, top: 8 }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <Dialog
          open={openCoins}
          onClose={() => setOpenCoins(false)}
          maxWidth="sm"
          fullWidth
          PaperProps={{
            sx: {
              position: "fixed",
              top: 90,
              left: "50%",
              transform: "translateX(-50%)",
              borderRadius: 3,
            },
          }}
        >
          <DialogTitle>
            Benefits Coins History
            <IconButton
              onClick={() => setOpenCoins(false)}
              sx={{ position: "absolute", right: 10, top: 10 }}
            >
              <CloseIcon />
            </IconButton>
          </DialogTitle>

          <DialogContent>
            {/* Summary */}
            <Box sx={{ bgcolor: "#E6F7FB", p: 2, borderRadius: 2, mb: 2 }}>
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <Stack direction="row" spacing={1} alignItems="center">
                  <Box component="img" src={CoinIcon} sx={{ width: 18 }} />
                  <Typography>Coins Balance</Typography>
                </Stack>
                <Typography fontWeight={700}>
                  {coinBalance.toLocaleString()}
                </Typography>
              </Stack>
            </Box>

            {/* Table Header */}
            <Stack
              direction="row"
              fontWeight={700}
              fontSize={12}
              sx={{ color: "#555", mb: 1 }}
            >
              <Box width="25%">Date</Box>
              <Box width="35%">Description</Box>
              <Box width="20%">Coins</Box>
              <Box width="20%">Balance</Box>
            </Stack>
            <Divider sx={{ mb: 1 }} />

            {/* Table Rows */}
            {coinHistory.length === 0 ? (
  <Typography variant="caption" color="text.secondary">
    No transactions yet
  </Typography>
) : (
  [...coinHistory]
    .sort((a, b) => b.id - a.id)   // newest first
    .map(txn => (
      <Stack key={txn.id} direction="row" fontSize={12} py={0.7}>
        <Box width="25%">{txn.date}</Box>
        <Box width="35%">{txn.description}</Box>
        <Box width="20%" color="green">
          {txn.coins}
        </Box>
        <Box width="20%">{txn.balance}</Box>
      </Stack>
    ))
)}

          </DialogContent>
        </Dialog>
      </Dialog>
    </Box>
  );
};

export default Header;
