import { CLIENT_PLAN_RULES } from "../constants/benefitsData";

export const filterByClient = (list, type) => {
  const client = localStorage.getItem("eb360_client") || "suzlon";
  const rules = CLIENT_PLAN_RULES[client];

  if (!rules || !rules[type]) return list;   // suzlon default

  return list.filter(item => rules[type].includes(item.id));
};
