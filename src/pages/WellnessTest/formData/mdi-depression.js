export default {
  title: "Major Depression Index",
  time: "2 min",
  description:
    "The Major Depression Inventory (MDI) is a self-report mood questionnaire developed by the World Health Organization’s Collaborating Center in Mental Health. This index calculator screens the presence and severity of a depressive disorder based on the most commonly met clinical symptoms",
  prompt:
    "How often have you been bothered by the following over the past 2 weeks?",
  questions: [
    {
      question: "Have you felt low in spirits or sad?",
      name: "sad",
    },
    {
      question: "Have you lost interest in your daily activities?",
      name: "lostInterest",
    },
    {
      question: "Have you felt lacking in energy and strength?",
      name: "lackingEnergy",
    },
    { question: "Have you felt less self-confident?", name: "lessConfident" },
    {
      question: "Have you had a bad conscience or feelings of guilt?",
      name: "guilty",
    },
    {
      question: "Have you felt that life wasn’t worth living?",
      name: "notWorthLiving",
    },
    {
      question: "Have you had difficulty in concentrating?",
      name: "difficultyConcentrating",
    },
    {
      question: "Have you felt very restless?",
      name: "restless",
    },
    {
      question: "Have you felt subdued or slowed down?",
      name: "slow",
    },
    {
      question: "Have you had trouble sleeping at night?",
      name: "troubleSleeping",
    },
    {
      question: "Have you suffered from reduced appetite?",
      name: "reducedAppetite",
    },
    {
      question: "Have you suffered from increased appetite?",
      name: "increasedAppetite",
    },
  ],
  scale: [
    "At no time",
    "Some of the time",
    "Less than half of the time",
    "More than half of the time",
    "Most of the time",
    "All of the time",
  ],
  /*
    Questions 8 and 9 are really 8a and 8b and we score the highest of the 2
    Questions 11 and 12 are really 10a and 10b and we score the highest of the 2
  */
  getScore: (selectedFormData, values) => {
    const { questions, scale = {}, scaleTwo = {} } = selectedFormData;
    console.log(values);
    return questions.reduce(
      (acc, question, index) => {
        const questionValue = values[question.name];
        if (![8, 9, 11, 12].includes(index + 1)) {
          acc.score = acc.score + scale.indexOf(questionValue);
          acc.values[index + 1] = scale.indexOf(questionValue);
        } else {
          if ([8, 11].includes(index + 1)) {
            acc.values[index + 1] = scale.indexOf(questionValue);
          }
        }
        if ([9, 12].includes(index + 1)) {
          acc.values[index + 1] = scale.indexOf(questionValue);
          const higherScore = Math.max(
            acc.values[index],
            acc.values[index + 1]
          );
          acc.score = acc.score + higherScore;
        }
        return acc;
      },
      { score: 0, values: {} }
    );
  },
  minScore: 0,
  maxScore: 50,
  higherScoreWorse: true,
  labels: [
    {
      range: "0-20",
      description: "No Depression",
    },
    {
      range: "21-25",
      description: "Mild Depression",
    },
    {
      range: "26-30",
      description: "Moderate Depression",
    },
    {
      range: "31-50",
      description: "Severe Depression",
    },
  ],
};

/*
The total score range is 0-50.
0-20 indicates depression does not exist or its existence is doubtful,
21-25 indicates mild depression,
26-30 indicates moderate depression,
and 31-50 indicates severe depression.
*/

// https://www.thecalculator.co/health/Major-Depression-Index-MDI-Calculator-810.html#:~:text=This%20major%20depression%20index%20MDI%20calculator,the%20score%20interpretation%20below%20the%20form.&text=This%20major%20depression%20index,interpretation%20below%20the%20form.&text=depression%20index%20MDI%20calculator,the%20score%20interpretation%20below
