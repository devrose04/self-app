// TODO: Why do we have this file and the constants folder above???

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

export const MBTI_ASSESSMENT_URL = "http://www.michaelcaloz.com/personality/";
export const ENNEAGRAM_ASSESSMENT_URL =
  "https://www.eclecticenergies.com/enneagram/test";
export const BIG_FIVE_ASSESSMENT_URL = "https://bigfive-test.com/test";
export const IQ_ASSESSMENT_URL = "https://www.mensa.org/iq/what-iq";
export const EQ_ASSESSMENT_URL =
  "https://hbr.org/2015/06/quiz-yourself-do-you-lead-with-emotional-intelligence";
export const ASTROLOGY_ASSESSMENT_URL =
  "https://askastrology.com/astrology/birth-natal-chart-calculator/";
export const MINDSET_ASSESSMENT_URL =
  "https://blog.mindsetworks.com/what-s-my-mindset";
export const GRIT_ASSESSMENT_URL = "https://angeladuckworth.com/grit-scale/";
export const LOVE_LANGUAGES_URL =
  "https://5lovelanguages.com/quizzes/love-language";
export const ATTACHMENT_STYLE_ASSESSMENT_URL =
  "https://attachment.personaldevelopmentschool.com/";
export const FLIRTING_STYLE_ASSESSMENT_URL =
  "http://flirtingstyles.dept.ku.edu/#sthash.bqTNaYib.dpbs";
export const FTI_ASSESSMENT_URL =
  "https://theanatomyoflove.com/relationship-quizzes/helen-fishers-personality-test/personality-test-1/";
export const DISC_ASSESSMENT_URL = "https://www.tonyrobbins.com/disc/";
export const VIA_STRENGTHS_ASSESSMENT_URL =
  "https://www.viacharacter.org/survey/account/Register";
export const GALLUP_ASSESSMENT_URL =
  "https://www.gallup.com/cliftonstrengths/en/253868/popular-cliftonstrengths-assessment-products.aspx";

export const BIG_FIVE_LEARN_MORE =
  "https://www.truity.com/book/big-five-personality-traits";
export const MBTI_LEARN_MORE =
  "https://www.truity.com/page/16-personality-types-myers-briggs";
export const ENNEAGRAM_LEARN_MORE =
  "https://www.truity.com/enneagram/what-is-enneagram";
export const MINDSET_LEARN_MORE =
  "https://www.mindtools.com/asbakxx/dwecks-fixed-and-growth-mindsets";
export const GRIT_LEARN_MORE = "https://angeladuckworth.com/qa/";
export const ZODIAC_LEARN_MORE =
  "https://www.rd.com/article/zodiac-signs-elements/";
export const IQ_LEARN_MORE = "https://www.mensa.org/iq/what-iq";
export const EQ_LEARN_MORE =
  "https://www.verywellmind.com/what-is-emotional-intelligence-2795423";

export const LOVE_LANGUAGES_LEARN_MORE = "https://5lovelanguages.com/learn";
export const ATTACHMENT_STYLE_LEARN_MORE =
  "https://www.attachmentproject.com/blog/four-attachment-styles/";
export const FLIRTING_STYLE_LEARN_MORE =
  "https://www.wellandgood.com/how-to-flirt/";
export const FTI_LEARN_MORE = "https://helenfisher.com/personality/";

export const GALLUP_LEARN_MORE =
  "https://www.gallup.com/cliftonstrengths/en/253790/science-of-cliftonstrengths.aspx";
export const VIA_STRENGTHS_LEARN_MORE =
  "https://positivepsychology.com/via-survey/";
export const DISC_LEARN_MORE =
  "https://www.truity.com/book/about-disc-personality-test";
