export default {
  title: "UCLA Loneliness Scale",
  time: "2 min",
  description: "The UCLA Lonelinesss scale...",
  prompt: "Indicate how often each of the statements is descriptive of you.",
  questions: [
    {
      question: "that you are “in tune” with the people around you?",
      name: "inTune",
    },
    { question: "that you lack companionship?", name: "companionship" },
    { question: "that there is no one you can turn to?", name: "turning" },
    { question: "alone?", name: "alone" },
    { question: "part of a group of friends?", name: "friendGroup" },
    {
      question: "that you have a lot in common with the people around you?",
      name: "commonality",
    },
    { question: "that you are no longer close to anyone?", name: "closeness" },
    {
      question:
        "that your interests and ideas are not shared by those around you?",
      name: "interests",
    },
    { question: "outgoing and friendly?", name: "outgoing" },
    { question: "close to people?", name: "close" },
    { question: "left out?", name: "leftOut" },
    {
      question: "that your relationships with others are not meaningful?",
      name: "meaningful",
    },
    { question: "that no one really knows you well?", name: "known" },
    { question: "isolated from others?", name: "isolated" },
    {
      question: "that you can find companionship when you want it?",
      name: "findCompanionship",
    },
    {
      question: "that there are people who really understand you?",
      name: "understood",
    },
    { question: "shy?", name: "shy" },
    {
      question: "that people are around you but not with you?",
      name: "around",
    },
    { question: "that there are people you can talk to?", name: "talkTo" },
    { question: "that there are people you can turn to?", name: "turnTo" },
  ],
  scale: ["Never", "Rarely", "Sometimes", "Often"],
  /*
  Items 1, 5, 6, 9, 10, 15, 16, 19, 20 are all reverse scored.
  In addition, each question is score 1-4 (not 0-3)
  */
  getScore: (selectedFormData, values) => {
    const { questions, scale = {}, scaleTwo = {} } = selectedFormData;
    console.log(values);
    return questions.reduce(
      (acc, question, index) => {
        const questionValue = values[question.name];
        acc.originalValues[question.name] = questionValue;
        if (![1, 5, 6, 9, 10, 15, 16, 19, 20].includes(index + 1)) {
          acc.score = acc.score + scale.indexOf(questionValue) + 1;
          acc.values[index + 1] = scale.indexOf(questionValue) + 1;
        } else {
          acc.score = acc.score + (4 - scale.indexOf(questionValue));
          acc.values[index + 1] = 4 - scale.indexOf(questionValue);
        }
        return acc;
      },
      { score: 0, values: {}, originalValues: {} }
    );
  },
  minScore: 20,
  maxScore: 80,
  higherScoreWorse: true,
  labels: [
    {
      range: "20-29",
      description: "Low",
    },
    {
      range: "30-50",
      description: "Average",
    },
    {
      range: "51-80",
      description: "High",
    },
  ],
};
