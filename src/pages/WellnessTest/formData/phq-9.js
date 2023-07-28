export default {
  title: "PHQ-9",
  time: "1 min",
  description:
    "The PHQ-9 is the most commonly used screener for depression. It’s been used for the past 24 years and across hundreds of thousands of people.",
  prompt:
    "Over the last 2 weeks, how often have you been bothered by any of the following problems?",
  questions: [
    {
      question: "Little interest or pleasure in doing things",
      name: "pleasure",
    },
    { question: "Feeling down, depressed, or hopeless", name: "down" },
    {
      question: "Trouble falling or staying asleep, or sleeping too much",
      name: "sleep",
    },
    { question: "Feeling tired or having little energy", name: "energy" },
    { question: "Poor appetite or overeating", name: "eating" },
    {
      question:
        "Feeling bad about yourself - or that you are a failure or have let yourself or your family down",
      name: "failure",
    },
    {
      question:
        "Trouble concentrating on things, such as reading the newspaper or watching television",
      name: "concentrating",
    },
    {
      question:
        "Moving or speaking so slowly that other people could have noticed? Or the opposite - being so fidgety or restless that you have been moving around a lot more than usual",
      name: "fidget",
    },
    {
      question:
        "Thoughts that you would be better off dead or of hurting yourself in some way",
      name: "suicide",
    },
  ],
  scale: [
    "Not at all",
    "Several days",
    "More than half the days",
    "Nearly every day",
  ],
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
