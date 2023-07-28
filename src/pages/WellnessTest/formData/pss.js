export default {
  title: "Perceived Stress Scale (PSS)",
  time: "1 min",
  description: "The PSS...",
  prompt:
    "How often have you been bothered by the following over the past 2 weeks?",
  questions: [
    {
      question:
        "have you been upset because of something that happened unexpectedly?",
      name: "upset",
    },
    {
      question:
        "felt that you were unable to control the important things in your life?",
      name: "control",
    },
    {
      question: "felt nervous and stressed?",
      name: "stress",
    },
    {
      question:
        "felt confident about your ability to handle your personal problems?",
      name: "confident",
    },
    {
      question: "felt that things were going your way?",
      name: "optimistic",
    },
    {
      question:
        "found that you could not cope with all the things that you had to do?",
      name: "coping",
    },
    {
      question: "been able to control irritations in your life?",
      name: "irritations",
    },
    {
      question: "felt that you were on top of things?",
      name: "order",
    },
    {
      question:
        "been angered because of things that happened that were outside of your control?",
      name: "anger",
    },
    {
      question:
        " felt difficulties were piling up so high that you could not overcome them?",
      name: "overwhelmed",
    },
  ],
  scale: ["Never", "Almost never", "Sometimes", "Fairly Often", "Very Often"],
  /* Scoring: PSS scores are obtained by reversing responses
  (e.g., 0 = 4, 1 = 3, 2 = 2, 3 = 1 & 4 = 0) to the four positively stated items
  (items 4, 5, 7, & 8) and then summing across all scale items. */
  getScore: (selectedFormData, values) => {
    const { questions, scale = {}, scaleTwo = {} } = selectedFormData;
    console.log(values);
    return questions.reduce(
      (acc, question, index) => {
        const questionValue = values[question.name];
        acc.originalValues[question.name] = questionValue;
        if (![4, 5, 7, 8].includes(index + 1)) {
          acc.score = acc.score + scale.indexOf(questionValue);
          acc.values[index + 1] = scale.indexOf(questionValue);
        } else {
          acc.score = acc.score + (4 - scale.indexOf(questionValue));
          acc.values[index + 1] = 4 - scale.indexOf(questionValue);
        }
        return acc;
      },
      { score: 0, values: {}, originalValues: {} }
    );
  },
  minScore: 0,
  maxScore: 40,
  higherScoreWorse: true,
  labels: [
    {
      range: "0-13",
      description: "Low stress",
    },
    {
      range: "14-26",
      description: "Moderate stress",
    },
    {
      range: "27-40",
      description: "High perceived stress",
    },
  ],
};
