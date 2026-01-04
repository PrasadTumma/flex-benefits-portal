import React, { createContext, useContext, useMemo, useState, useEffect } from "react";

const FlexBenefitsContext = createContext(null);

const STORAGE_KEY = "EB360_FLEX_STATE_V1";

// ✅ Change these defaults as needed
const DEFAULT_STATE = {
  walletBalance: 45000,
  coinBalance: 5000,
  cartOpen: false,
  cartItems: [],
  walletHistory: [],
  coinHistory: []
};



const safeNumber = (v) => {
  const n = Number(v);
  return Number.isFinite(n) ? n : 0;
};

export const FlexBenefitsProvider = ({ children }) => {
  const [state, setState] = useState(DEFAULT_STATE);
// const walletHistory = useMemo(() => {
//   return state.cartItems.map(item => ({
//     id: item.id,
//     date: new Date().toLocaleDateString("en-IN", {
//       day: "2-digit", month: "short", year: "numeric"
//     }),
//     description: item.title,
//     amount: -safeNumber(item.price),
//     balance: state.walletBalance
//   }));
// }, [state.cartItems, state.walletBalance]);

// const coinHistory = useMemo(() => {
//   return state.cartItems.map(item => ({
//     id: item.id,
//     date: new Date().toLocaleDateString("en-IN", {
//       day: "2-digit", month: "short", year: "numeric"
//     }),
//     description: item.title,
//     coins: -safeNumber(item.coins),
//     balance: state.coinBalance
//   }));
// }, [state.cartItems, state.coinBalance]);


  // ----------------------------
  // Ledger helpers (optional usage)
  // ----------------------------
  // const addWalletTxn = (txn) => {
  //   setState((prev) => ({
  //     ...prev,
  //     walletHistory: [txn, ...prev.walletHistory]
  //   }));
  // };

  // const addCoinTxn = (txn) => {
  //   setState((prev) => ({
  //     ...prev,
  //     coinHistory: [txn, ...prev.coinHistory]
  //   }));
  // };

  // ✅ Restore state from localStorage
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      const parsed = JSON.parse(raw);

      setState((prev) => ({
        ...prev,
        walletBalance: safeNumber(parsed.walletBalance ?? prev.walletBalance),
        coinBalance: safeNumber(parsed.coinBalance ?? prev.coinBalance),
        cartOpen: !!parsed.cartOpen,
        cartItems: Array.isArray(parsed.cartItems) ? parsed.cartItems : [],
        walletHistory: Array.isArray(parsed.walletHistory) ? parsed.walletHistory : [],
        coinHistory: Array.isArray(parsed.coinHistory) ? parsed.coinHistory : []   // ✅ FIX
      }));
    } catch {
      // ignore restore errors
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ✅ Persist to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      // ignore save errors
    }
  }, [state]);

  // -----------------------------------------
  // Helpers
  // -----------------------------------------
  const toggleCart = () => {
    setState((prev) => ({ ...prev, cartOpen: !prev.cartOpen }));
  };

  const openCart = () => setState((prev) => ({ ...prev, cartOpen: true }));
  const closeCart = () => setState((prev) => ({ ...prev, cartOpen: false }));

  const isAdded = (id) => state.cartItems.some((x) => x.id === id);

  // -----------------------------------------
  // ✅ ADD TO CART (DEDUCT WALLET + COINS + LEDGER)
  // -----------------------------------------
  // const addToCart = (item) => {
  //   if (!item?.id) return;

  //   setState((prev) => {
  //     // Prevent duplicates
  //     if (prev.cartItems.some((x) => x.id === item.id)) return prev;

  //     const price = safeNumber(item.price); // ₹
  //     const coins = safeNumber(item.coins); // 🪙

  //     const nextWallet = prev.walletBalance - price;
  //     const nextCoins = prev.coinBalance - coins;

  //     const dateStr = new Date().toLocaleDateString("en-IN", {
  //       day: "2-digit",
  //       month: "short",
  //       year: "numeric"
  //     });

      

  //     return {
  //       ...prev,
  //       walletBalance: nextWallet,
  //       coinBalance: nextCoins,
  //       cartItems: [
  //         ...prev.cartItems,
  //         {
  //           ...item,
  //           price,
  //           coins
  //         }
  //       ]
  //     };
  //   });
  // };

const addToCart = (item) => {
  setState(prev => {
    if (prev.cartItems.some(x => x.id === item.id)) return prev;

    const price = safeNumber(item.price);
    const coins = safeNumber(item.coins);

    const nextWallet = prev.walletBalance - price;
    const nextCoins = prev.coinBalance - coins;

    const date = new Date().toLocaleDateString("en-IN",{day:"2-digit",month:"short",year:"numeric"});

    return {
      ...prev,
      walletBalance: nextWallet,
      coinBalance: nextCoins,
      cartItems: [...prev.cartItems, item],

      walletHistory: [
        { id: Date.now(), date, description: item.title, amount: -price, balance: nextWallet },
        ...prev.walletHistory
      ],

      coinHistory: coins ? [
        { id: Date.now()+1, date, description: item.title, coins: -coins, balance: nextCoins },
        ...prev.coinHistory
      ] : prev.coinHistory
    };
  });
};



  // -----------------------------------------
  // ✅ REMOVE FROM CART (RESTORE WALLET + COINS + LEDGER)
  // -----------------------------------------
  const removeFromCart = (id) => {
  setState(prev => {
    const removed = prev.cartItems.find(x => x.id === id);
    if (!removed) return prev;

    const price = safeNumber(removed.price);
    const coins = safeNumber(removed.coins);

    const nextWallet = prev.walletBalance + price;
    const nextCoins = prev.coinBalance + coins;

    const date = new Date().toLocaleDateString("en-IN",{day:"2-digit",month:"short",year:"numeric"});

    return {
      ...prev,
      walletBalance: nextWallet,
      coinBalance: nextCoins,
      cartItems: prev.cartItems.filter(x => x.id !== id),

      walletHistory: [
        { id: Date.now(), date, description:`Refund - ${removed.title}`, amount: price, balance: nextWallet },
        ...prev.walletHistory
      ],

      coinHistory: coins ? [
        { id: Date.now()+1, date, description:`Refund - ${removed.title}`, coins: coins, balance: nextCoins },
        ...prev.coinHistory
      ] : prev.coinHistory
    };
  });
};


  const clearCart = () => {
  setState(prev => ({ ...prev, cartItems: [] }));
};


  // -----------------------------------------
  // ✅ Totals (derived)
  // -----------------------------------------
  const totals = useMemo(() => {
    const totalAmount = state.cartItems.reduce((s, x) => s + safeNumber(x.price), 0);
    const totalCoins = state.cartItems.reduce((s, x) => s + safeNumber(x.coins), 0);
    return { totalAmount, totalCoins };
  }, [state.cartItems]);

  const value = useMemo(
  () => ({
    walletBalance: state.walletBalance,
    coinBalance: state.coinBalance,
    cartOpen: state.cartOpen,
    cartItems: state.cartItems,
    totals,
    toggleCart,
    openCart,
    closeCart,
    addToCart,
    removeFromCart,
    clearCart,
    isAdded,
    walletHistory: state.walletHistory,
coinHistory: state.coinHistory
  }),
  [state, totals]
);


  return <FlexBenefitsContext.Provider value={value}>{children}</FlexBenefitsContext.Provider>;
};

export const useFlexBenefits = () => {
  const ctx = useContext(FlexBenefitsContext);
  if (!ctx) throw new Error("useFlexBenefits must be used inside FlexBenefitsProvider");
  return ctx;
};
