import React from "react";
import {
  Dialog, DialogTitle, DialogContent,
  Box, Typography, Stack, Divider
} from "@mui/material";
import WalletIcon from "../../assets/images/wallet.svg";
import { useFlexBenefits } from "../../context/FlexBenefitsContext";

const WalletHistoryDialog = ({ open, onClose }) => {
  const { walletHistory, walletBalance } = useFlexBenefits();

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle>
        <Stack direction="row" spacing={1} alignItems="center">
          <Box component="img" src={WalletIcon} width={26} />
          <Typography fontWeight={700}>Wallet Balance History</Typography>
        </Stack>
      </DialogTitle>

      <DialogContent>

        <Stack direction="row" justifyContent="space-between" mb={2}>
          <Typography>Total Wallet Balance</Typography>
          <Typography fontWeight={700}>₹{walletBalance.toLocaleString()}</Typography>
        </Stack>

        <Divider />

        <Box sx={{ mt: 2 }}>
          <Stack direction="row" fontSize={13} fontWeight={600} mb={1}>
            <Box flex={1}>Date</Box>
            <Box flex={2}>Plan Name</Box>
            <Box flex={1}>Amount</Box>
            <Box flex={1}>Balance</Box>
          </Stack>

          {walletHistory.map((txn) => (
            <Stack
              key={txn.id}
              direction="row"
              fontSize={12}
              py={1}
              borderBottom="1px dashed #ddd"
            >
              <Box flex={1}>{txn.date}</Box>
              <Box flex={2}>{txn.description}</Box>
              <Box flex={1} color={txn.amount < 0 ? "red" : "green"}>
                {txn.amount < 0 ? "-" : "+"}₹{Math.abs(txn.amount)}
              </Box>
              <Box flex={1}>₹{txn.balance}</Box>
            </Stack>
          ))}
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default WalletHistoryDialog;
