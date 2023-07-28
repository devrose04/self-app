export default {
  title: "Eating Disorder Examination Questionnaire Short (EDE-QS)",
  time: "3 min",
  description:
    "The PHQ-9 is the most commonly used screener for depression. It’s been used for the past 24 years and across hundreds of thousands of people.",
  prompt: "On how many of the past 7 days...",
  promptTwo: "Over the past 7 days...",
  questions: [
    {
      question:
        "Have you been deliberately trying to limit the   amount of food you eat to influence your weight or shape (whether or not you have succeeded)?",
      name: "limitFood",
    },
    {
      question:
        "Have you gone for long periods of time (e.g., 8 or more waking hours) without eating anything at all in order to influence your weight or shape?",
      name: "fasting",
    },
    {
      question:
        "Has thinking about food, eating or calories made it very difficult to concentrate on things you are interested in (such as working, following a conversation or reading)?",
      name: "thinkingAboutFood",
    },
    {
      question:
        "Has thinking about your weight or shape made it very difficult to concentrate on things you are interested in (such as working, following a  conversation or reading)?",
      name: "thinkingAboutWeight",
    },
    {
      question: "Have you had a definite fear that you might gain weight? ",
      name: "fearOfWeightGain",
    },
    {
      question: "Have you had a strong desire to lose weight?",
      name: "desireToLoseWeight",
    },
    {
      question:
        "Have you tried to control your weight or shape by making yourself sick (vomit) or taking laxatives?",
      name: "bulemia",
    },
    {
      question:
        "Have you exercised in a driven or compulsive way as a means of controlling your weight, shape or body fat, or to burn off calories?",
      name: "exerciseTooMuch",
    },
    {
      question:
        "Have you had a sense of having lost control over your eating (at the time that you were eating)?",
      name: "loseControlEating",
    },
    {
      question:
        "On how many of these days (i.e., days on which you had a sense of having lost control over your eating) did you eat what other people would regard as an unusually large amount of food in one go?",
      name: "eatTooMuchFood",
    },
    {
      question:
        "Has your weight or shape influenced how you think about (judge) yourself as a person?",
      name: "selfWorth",
    },
    {
      question: "How dissatisfied have you been with your weight or shape?",
      name: "dissatisfied",
    },
  ],
  scale: ["0 days", "1-2 days", "3-5 days", "6-7 days"],
  scaleTwoStart: 11,
  scaleTwo: ["Not at all", "Slightly", "Moderately", "Markedly"],
  getScore: (selectedFormData, values) => {
    const { questions, scale = {}, scaleTwo = {} } = selectedFormData;
    console.log(values);
    return questions.reduce(
      (acc, question, index) => {
        const questionValue = values[question.name];
        acc.originalValues[question.name] = questionValue;
        acc.values[index + 1] = scale.indexOf(questionValue);
        acc.score = acc.score + scale.indexOf(questionValue);
        return acc;
      },
      { score: 0, values: {}, originalValues: {} }
    );
  },
  minScore: 0,
  maxScore: 27,
  higherScoreWorse: true,
  labels: [
    {
      range: "0-4",
      description: "None - minimal",
    },
    {
      range: "5-9",
      description: "Mild",
    },
    {
      range: "10-14",
      description: "Moderate",
    },
    {
      range: "15-19",
      description: "Moderately Severe",
    },
    {
      range: "20-27",
      description: "Severe",
    },
  ],
};
