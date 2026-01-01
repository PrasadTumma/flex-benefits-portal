import health from "../images/group-health.png";
import parents from "../images/group-parents.png";
import accident from "../images/group-accident.png";
import term from "../images/group-term.png";

export const groupBenefits = [
  {
    id: "grp-health",
    title: "Health Insurance",
    image: health,
    baseCover: "₹5 Lakh",
    basePrice: 0,
    coins: 0,
    members: ["Self"]
  },
  {
    id: "grp-parents",
    title: "Parents Health Insurance",
    image: parents,
    baseCover: "₹5 Lakh",
    basePrice: 8450,
    coins: 0,
    members: ["Father"]
  },
  {
    id: "grp-accident",
    title: "Personal Accident Insurance",
    image: accident,
    baseCover: "₹30 Lakh",
    basePrice: 4200,
    coins: 0,
    members: ["Self"]
  },
  {
    id: "grp-term",
    title: "Term Life Insurance",
    image: term,
    baseCover: "₹50 Lakh",
    basePrice: 6350,
    coins: 0,
    members: ["Self"]
  }
];
