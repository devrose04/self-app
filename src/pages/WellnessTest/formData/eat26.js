export default {
  title: "Eating Attitudes Test (EAT-26)",
  time: "5 min",
  description:
    "The Eating Attitudes Test (EAT-26) is a widely recognized tool used to screen for potential eating disorders.",
  prompt: "Check a response for each of the following statements:",
  promptTwo: "In the past 6 months have you experienced any of the following:",
  questions: [
    {
      question: "Terrified about being overweight.",
      name: "terrifiedOverweight",
    },
    {
      question: "Avoid eating when you are hungry.",
      name: "avoidEating",
    },
    {
      question: "Find yourself preoccupied with food.",
      name: "preoccupiedFood",
    },
    {
      question:
        "Have gone on eating binges where you feel that you may not be able to stop",
      name: "binge",
    },
    {
      question: "Cut your food into small pieces.",
      name: "smallPieces",
    },
    {
      question: "Aware of the calorie content of foods that your eat.",
      name: "calorieCount",
    },
    {
      question:
        "Particularly avoid food with a high carbohydrate content (i.e. bread, rice, potatoes, etc.)",
      name: "avoidCarbs",
    },
    {
      question: "Feel that others would prefer if you ate more.",
      name: "knowTooEatMore",
    },
    {
      question:
        "Vomit after you had eaten?",
      name: "vomit",
    },
    {
      question:
        "Feel extremely guilty after eating.",
      name: "feelGuilty",
    },
    {
      question: "Are preoccupied with a desire to be thinner.",
      name: "preoccupiedThinner",
    },
    {
      question: "Think about burning up calories when you exercise.",
      name: "exerciseToBurnCalories",
    },
    {
      question: "Other people think that you are too thin.",
      name: "othersThinkImThin",
    },
    {
      question: "Are preoccupied with the thought of having fat on your body.",
      name: "preoccupiedWithHavingFat",
    },
    {
      question: "Take longer than others to eat your meals.",
      name: "eatSlowly",
    },
    {
      question: "Avoid foods with sugar in them.",
      name: "avoidSugar",
    },
    {
      question: "Eat diet foods.",
      name: "eatDietFoods",
    },
    {
      question: "Feel that food controls your life.",
      name: "controlledByFood",
    },
    {
      question: "Display self-control around food.",
      name: "displaySelfControl",
    },
    {
      question: "Feel that others pressure you to eat.",
      name: "pressuredByOthers",
    },
    {
      question: "Give too much time and thought to food.",
      name: "thinkAboutFood",
    },
    {
      question: "Feel uncomfortable after eating sweets.",
      name: "uncomfortableWithSweets",
    },
    {
      question: "Engage in dieting behavior.",
      name: "diet",
    },
    {
      question: "Like your stomach to be empty.",
      name: "likeEmptyStomach",
    },
    {
      question: "Have the impulse to vomit after meals.",
      name: "impulseToVomit",
    },
    {
      question: "Enjoy trying new rich foods.",
      name: "enjoyNewFoods",
    },
    {
      question:
        "Gone on eating binges where you feel that you may not be able to stop?",
      name: "uncontrollableEatingBinge",
    },
    {
      question:
        "Ever made yourself sick (vomited) to control your weight or shape?",
      name: "vomitedForWeight",
    },
    {
      question:
        "Ever used laxatives, diet pills or diuretics (water pills) to control your weight or shape?  ",
      name: "usedPillsForWeight",
    },
    {
      question:
        "Exercised more than 60 minutes a day to lose or to control your weight?",
      name: "exerciseMoreThanHourForWeight",
    },
    // TODO: FIX THIS
    // {
    //   question: "Lost 20 pounds or more in the past 6 months",
    //   name: "lostTwentyPounds",
    // },
  ],
  scale: ["Always", "Usually", "Often", "Sometimes", "Rarely", "Never"],
  scaleTwoStart: 27,
  scaleTwo: [
    "Never",
    "Once a month or less",
    "2-3 times a month",
    "Once a week",
    "2-6 times a week",
    "Once a day or more",
  ],
  scaleThreeStart: 31,
  scaleThree: ["Yes", "No"],
  /*
    The Eat26 is scored:
    Questions 1-25:
    3 for Always, 2 for Usually, 1 for Often, 0 for others
    Question 26:
    3 for Never, 2 for Rarely, 1 for Sometimes, 0 for others
    Behavioral Questions 27-30 using ScaleTwo and 31 using ScaleThree:
    A index > 1 = High Concern
    B, C index > 0 = High Concern
    D index === 5 = High Concern
    E = index === 0 = High Concern
  */
  getScore: (selectedFormData, values) => {
    const { questions, scale = {}, scaleTwo = {} } = selectedFormData;
    return questions.reduce(
      (acc, question, index) => {
        const questionValue = values[question.name];
        acc.originalValues[question.name] = questionValue;

        let questionScore;
        if ([27].includes(index + 1)) {
          // acc.values[index + 1] = scaleTwo.indexOf(questionValue);
          if (scaleTwo.indexOf(questionValue) > 1) acc.other.concern = true;
        }
        if ([28, 29].includes(index + 1)) {
          // acc.values[index + 1] = scaleTwo.indexOf(questionValue);
          if (scaleTwo.indexOf(questionValue) > 0) acc.other.concern = true;
        }
        if ([30].includes(index + 1)) {
          // acc.values[index + 1] = scaleTwo.indexOf(questionValue);
          if (scaleTwo.indexOf(questionValue) === 5) acc.other.concern = true;
        }
        // if ([31].includes(index + 1)) {
        //   acc.values[index + 1] = scale.indexOf(questionValue);
        //   if (scale.indexOf(questionValue) === 0) acc.other.concern = true
        // }
        const scoreIndex = scale.indexOf(questionValue);
        if (![26].includes(index + 1)) {
          if (scoreIndex === 0) questionScore = 3;
          else if (scoreIndex === 1) questionScore = 2;
          else if (scoreIndex === 2) questionScore = 1;
          else questionScore = 0;
          acc.score = acc.score + questionScore;
          acc.values[index + 1] = questionScore;
        } else if (26 === index + 1) {
          if (scoreIndex === 5) questionScore = 3;
          else if (scoreIndex === 4) questionScore = 2;
          else if (scoreIndex === 3) questionScore = 1;
          else questionScore = 0;
          acc.score = acc.score + questionScore;
          acc.values[index + 1] = questionScore;
        }

        return acc;
      },
      { score: 0, values: {}, originalValues: {}, other: {} }
    );
  },
  minScore: 0,
  maxScore: 78,
  higherScoreWorse: true,
  labels: [
    {
      range: "0-20",
      description: "Not high concern",
    },
    {
      range: "20-78",
      description: "High level of concern",
    },
  ],
};
