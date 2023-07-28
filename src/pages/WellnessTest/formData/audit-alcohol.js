export default {
  title: "AUDIT (Alcohol Use Disorders Identification Test)",
  time: "2 min",
  description: "Based on the data from a multinational World Health Organization collaborative study, the AUDIT has become the world’s most widely used alcohol screening instrument since its publication in 1989.",
  prompt: "The AUDIT questionnaire is designed to help in the self-assessment of alcohol consumption and to identify any implications for your health and wellbeing, now and in the future.",
  questions: [
    {
      question: "How often do you have a drink containing alcohol?",
      name: "frequency",
      answers: [
        "Never",
        "Monthly or less",
        "2-4 times a month",
        "2-3 times a week",
        "4 or more times a week"
      ]
    },
    {
      question:
        "How many standard drinks containing alcohol do you have on a typical day when drinking?",
      name: "intensity",
      answers: ["1 or 2", "3 or 4", "5 or 6", "7 to 9", "10 or more"]
    },
    {
      question: "How often do you have six or more drinks on one occasion?",
      name: "moreThanSix",
      answers: [
        "Never",
        "Less than monthly",
        "Monthly",
        "Weekly",
        "Daily or almost daily"
      ]
    },
    {
      question:
        "During the past year, how often have you found that you were not able to stop drinking once you had started?",
      name: "cantStop",
      answers: [
        "Never",
        "Less than monthly",
        "Monthly",
        "Weekly",
        "Daily or almost daily"
      ]
    },
    {
      question:
        "During the past year, how often have you failed to do what was normally expected of you because of drinking?",
      name: "affectedYou",
      answers: [
        "Never",
        "Less than monthly",
        "Monthly",
        "Weekly",
        "Daily or almost daily"
      ]
    },
    {
      question:
        "During the past year, how often have you needed a drink in the morning to get yourself going after a heavy drinking session?",
      name: "morningDrink",
      answers: [
        "Never",
        "Less than monthly",
        "Monthly",
        "Weekly",
        "Daily or almost daily"
      ]
    },
    {
      question:
        "During the past year, how often have you had a feeling of guilt or remorse after drinking?",
      name: "guilty",
      answers: [
        "Never",
        "Less than monthly",
        "Monthly",
        "Weekly",
        "Daily or almost daily"
      ]
    },
    {
      question:
        "During the past year, how often have you been unable to remember what happened the night before because you had been drinking?",
      name: "blackout",
      answers: [
        "Never",
        "Less than monthly",
        "Monthly",
        "Weekly",
        "Daily or almost daily"
      ]
    },
    {
      question:
        "Have you or someone else been injured as a result of your drinking?",
      name: "causeHarm",
      answers: [
        "No",
        "Yes, but not in the past year",
        "Yes, during the past yeary"
      ]
    },
    {
      question:
        "Has a relative or friend, doctor or other health worker been concerned about your drinking or suggested you cut down?",
      name: "othersConcerned",
      answers: [
        "No",
        "Yes, but not in the past year",
        "Yes, during the past yeary"
      ]
    }
  ],
  scale: null,
  /*
    The AUDIT has 10 questions and the possible responses to each question are
    scored 0, 1, 2, 3 or 4, with the exception of questions 9 and 10 which have possible responses of 0, 2 and 4.
  */
  getScore: (selectedFormData, values) => {
    const { questions, scale = {}, scaleTwo = {} } = selectedFormData;
    return questions.reduce((acc, question, index) => {
      const questionValue = values[question.name];
      if (![9, 10].includes(index + 1)) {
        acc.score = acc.score + question.answers.indexOf(questionValue);
        acc.values[index + 1] = question.answers.indexOf(questionValue);
      } else {
        const i = question.answers.indexOf(questionValue);
        const answerValue = i === 2 ? 4 :
          i === 1 ? 2
          : 0
        acc.values[index + 1] = answerValue;
        acc.score = acc.score + answerValue;
      }
      return acc
    }, {score: 0, values: {}})
  },
  minScore: 0,
  maxScore: 40,
  higherScoreWorse: true,
  labels: [
    {
      range: "0-7",
      description: "Low-risk"
    },
    {
      range: "8-15",
      description: "Moderate Risk"
    },
    {
      range: "16-19",
      description: "Harmful and hazardous"
    },
    {
      range: "20-40",
      description: "Alcohol Dependence"
    }
  ]
}

/*
The range of possible scores is from 0 to 40 where
0 indicates an abstainer who has never had any problems from alcohol.
A score of 1 to 7 suggests low-risk consumption according to WHO guidelines.
Scores from 8 to 14 suggest hazardous or harmful alcohol consumption
and a score of 15 or more indicates the likelihood of alcohol dependence (moderate-severe alcohol use disorder).
*/
