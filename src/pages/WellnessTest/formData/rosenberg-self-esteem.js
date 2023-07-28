export default {
  title: "Rosenberg Self Esteem",
  time: "1 min",
  description:
    "The Rosenberg Self Esteem Scale (RSES) the most-widely used scale to measure self-esteem.",
  prompt:
    "The following list of stateements deal with your general feelings about yourself. Please choose how strongly  you agree or disagree with each statement.",
  questions: [
    {
      question:
        "I feel that I am a person of worth, at least on an equal plane with others.",
      name: "ofWorth",
    },
    {
      question: "I feel that I have a number of good qualities.",
      name: "goodQualities",
    },
    {
      question: "All in all, I am inclined to feel that I am a failure.",
      name: "failure",
    },
    {
      question: "I am able to do things as well as most other people.",
      name: "doThingsWell",
    },
    {
      question: "I feel I do not have much to be proud of.",
      name: "notProud",
    },
    {
      question: "I take a positive attitude toward myself.",
      name: "positiveAttitude",
    },
    {
      question: "On the whole, I am satisfied with myself.",
      name: "satisfied",
    },
    {
      question: "I wish I could have more respect for myself.",
      name: "wantMoreRespect",
    },
    { question: "I certainly feel useless at times.", name: "useless" },
    { question: "At times I think I am no good at all.", name: "noGood" },
  ],
  scale: ["Strongly Agree", "Agree", "Disagree", "Strongly Disagree"],
  /*
  Items 1, 2, 4, 6, 7 are all reverse scored.
  */
  getScore: (selectedFormData, values) => {
    const { questions, scale = {}, scaleTwo = {} } = selectedFormData;
    console.log(values);
    return questions.reduce(
      (acc, question, index) => {
        const questionValue = values[question.name];
        acc.originalValues[question.name] = questionValue;
        if (![1, 2, 4, 6, 7].includes(index + 1)) {
          acc.score = acc.score + scale.indexOf(questionValue);
          acc.values[index + 1] = scale.indexOf(questionValue);
        } else {
          acc.score = acc.score + (3 - scale.indexOf(questionValue));
          acc.values[index + 1] = 3 - scale.indexOf(questionValue);
        }
        return acc;
      },
      { score: 0, values: {}, originalValues: {} }
    );
  },
  minScore: 0,
  maxScore: 40,
  higherScoreWorse: false,
  labels: [
    {
      range: "0-15",
      description: "Low Self-Esteem",
    },
    {
      range: "16-20",
      description: "Normal range",
    },
    {
      range: "21-30",
      description: "High Self-Esteem",
    },
  ],
};

/*
Spanish: https://www.researchgate.net/publication/5853773_The_Rosenberg_Self-Esteem_Scale_Translation_and_Validation_in_University_Students */
