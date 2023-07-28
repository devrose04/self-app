export const MBTI = [
  "INTJ",
  "INFJ",
  "ISTJ",
  "ISTP",
  "INTP",
  "INFP",
  "ISFJ",
  "ISFP",
  "ENTJ",
  "ENFJ",
  "ESTJ",
  "ESTP",
  "ENTP",
  "ENFP",
  "ESFJ",
  "ESFP",
];

const range = (startingNumber, endingNumber) => {
  let ans = [];
  for (let i = startingNumber; i <= endingNumber; i++) {
    ans.push(i);
  }
  return ans;
};

export const ENNEAGRAM_TYPE = range(1, 9);

export const ENNEAGRAM_WING = range(1, 9);

export const ENNEAGRAM_TRITYPE = [
  125, 126, 127, 135, 136, 137, 145, 146, 147, 152, 153, 154, 162, 163, 164,
  172, 173, 174, 215, 216, 217, 251, 258, 259, 261, 268, 269, 271, 278, 279,
  285, 286, 287, 295, 296, 297, 315, 316, 317, 351, 358, 359, 361, 368, 369,
  371, 378, 379, 385, 386, 387, 395, 396, 397, 415, 416, 417, 451, 458, 459,
  461, 468, 469, 471, 478, 479, 485, 486, 487, 495, 496, 497, 512, 513, 514,
  521, 528, 531, 538, 539, 541, 548, 549, 582, 583, 584, 592, 593, 594, 612,
  613, 614, 621, 628, 629, 631, 638, 639, 641, 648, 649, 682, 683, 684, 692,
  693, 694, 712, 713, 714, 721, 728, 729, 731, 738, 739, 741, 748, 749, 782,
  783, 784, 792, 794, 825, 826, 827, 835, 836, 837, 845, 846, 847, 852, 853,
  854, 862, 863, 864, 872, 873, 874, 925, 926, 927, 935, 936, 937, 945, 946,
  947, 952, 953, 954, 962, 963, 964, 972, 973, 974,
];

export const BIG_FIVE_VALUES = range(1, 120);

export const IQ = range(60, 180);

export const EQ = range(0, 25);

export const ZODIAC = [
  "Capricorn",
  "Aquarius",
  "Pisces",
  "Aries",
  "Taurus",
  "Gemini",
  "Cancer",
  "Leo",
  "Virgo",
  "Libra",
  "Scorpio",
  "Sagittarius",
];

export const ELEMENTS = ["Air", "Earth", "Fire", "Water"];

export const MINDSET = [
  "Strong Growth Mindset",
  "Growth Mindset with some Fixed Ideas",
  "Fixed Mindset with some Growth Ideas",
  "Strong Fixed Mindset",
];

export const LOVE_LANGUAGES = range(0, 100);

export const ATTACHMENT_STYLE = [
  "Anxious",
  "Avoidant",
  "Disorganized / Fearful-Avoidant",
  "Secure",
];

export const FLIRTING_STYLE = [
  "0-10",
  "10-20",
  "20-30",
  "30-40",
  "40-50",
  "50-60",
  "60-70",
  "70-80",
  "80-90",
  "90-100",
];

export const FTI = range(0, 100);

export const GALLUPSTRENGTHSFINDER = [
  "Analytical",
  "Context",
  "Futuristic",
  "Ideation",
  "Input",
  "Intellection",
  "Learner",
  "Strategic",
  "Adaptability",
  "Connectedness",
  "Developer",
  "Empathy",
  "Harmony",
  "Includer",
  "Individualization",
  "Positivity",
  "Relator",
  "Activator",
  "Command",
  "Communication",
  "Competition",
  "Maximizer",
  "Self-Assurance",
  "Significance",
  "Woo",
  "Achiever",
  "Arranger",
  "Belief",
  "Consistency",
  "Deliberative",
  "Discipline",
  "Focus",
  "Responsibility",
  "Restorative",
];

export const DISC = range(0, 100);

export const VIA_CARRER_STRENGTHS = [
  "Bravery",
  "Love",
  "Prudence",
  "Teamwork",
  "Creativity",
  "Fairness",
];

// wellness

export const MENTAL_HEALTH_QUOTIENT = range(-100, 200);
export const WHO_5 = range(0, 100);
export const SELF_ESTEEM_ROSENBERG = range(0, 40);
export const SELF_ESTEEM_OVERALL = range(20, 100);
export const SELF_ESTEEM_PERFORMANCE = range(7, 35);
export const SELF_ESTEEM_SOCIAL = range(7, 35);
export const SELF_ESTEEM_APPEARANCE = range(6, 30);

export const STRESS = range(0, 40);
export const PHQ_9 = range(0, 27);
export const QIDS_SR_16 = range(0, 27);
export const MDI = range(0, 50);
export const GADT_7 = range(0, 21);
export const HAMILTON = range(0, 56);

export const LONELINESS = range(20, 80);
export const EAT_26 = range(0, 78);
export const EATING_DISORDER_EXAMINATION = range(0, 78);
export const DRUG_ABUSE = range(0, 10);
export const ALCOHOL = range(0, 40);
