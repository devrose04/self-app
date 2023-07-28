export default {
  title: "Mood Disorder Questionnaire (MDQ)",
  time: "5 min",
  description:
    "The Mood Disorder Questionnaire (MDQ) was developed as a screening instrument for bipolar spectrum disorders. It includes 13 yes/no questions about bipolar symptoms and two additional questions about symptom co-occurrence and impaired functioning. The MDQ takes about 5 minutes to complete and has been translated into 19 languages.",
  prompt:
    "Has there ever been a period of time when you were not your usual self and…:",
  promptTwo: "In the past month, have you",
  questions: [
    {
      question:
        "…you felt so good or so hyper that other people thought you were not your normal self or you were so hyper that you got into trouble?",
      name: "hyper",
    },
    {
      question:
        "…you were so irritable that you shouted at people or started fights or arguments?",
      name: "irritableAndFighting",
    },
    {
      question: "…you felt much more self-confident than usual?",
      name: "overlySelfConfident",
    },
    {
      question:
        "…you got much less sleep than usual and found you didn’t really miss it?",
      name: "doNotNeedSleep",
    },
    {
      question: "…you were much more talkative or spoke faster than usual?",
      name: "talkativeAndSpeakFast",
    },
    {
      question:
        "…thoughts raced through your head or you couldn’t slow your mind down?",
      name: "thoughtsRacing",
    },
    {
      question:
        "…you were so easily distracted by things around you that you had trouble concentrating or staying on track?",
      name: "easilyDistracted",
    },
    {
      question: "…you had much more energy than usual?",
      name: "moreEnergy",
    },
    {
      question:
        "…you were much more active or did many more things than usual?",
      name: "moreActive",
    },
    {
      question:
        "…you were much more social or outgoing than usual, for example, you telephoned friends in the middle of the night?",
      name: "moreOutgoing",
    },
    {
      question: "…you were much more interested in sex than usual?",
      name: "interestedInSex",
    },
    {
      question:
        "…you did things that were unusual for you or that other people might have thought were excessive, foolish, or risky?",
      name: "didRiskyThings",
    },
    {
      question: "…spending money got you or your family in trouble?",
      name: "spentMoneyRecklessly",
    },
    {
      question:
        "If you checked YES to more than one of the above, have several of these ever happened during the same period of time?",
      name: "multipleAtOnce",
    },
    {
      question:
        "Have any of your blood relatives (ie, children, siblings, parents, grandparents, aunts, uncles) had manic-depressive illness or bipolar disorder?",
      name: "genetic",
    },
    {
      question:
        "Has a health professional ever told you that you have manic-depressive illness or bipolar disorder?",
      name: "healthProfessionalThoughts",
    },
    {
      question:
        "How much of a problem did any of these cause you — like being able to work; having family, money, or legal troubles; getting into arguments or fights?",
      name: "causeProblems",
    },
  ],
  scale: ["Yes", "No"],
  scaleTwoStart: 17,
  scaleTwo: [
    "No problem",
    "Minor problem",
    "Moderate problem",
    "Serious problem",
  ],
  questionsNotToScore: [14, 15, 16, 17],
  /*
  Question 14 is necessary for the screening to be positive
  Questions 15 and 16 are not included.
  The self-report rating scale is 0-4 for each symptom.

  In order to meet the threshold for bipolar disorder the traditional scoring method is as follows:
  - A score of 7 or more for questions 1-13
  - Check “yes” for the item asking if the symptoms clustered in the same time period (question 14)
  - Symptoms caused either “moderate” or “serious” problems
(question 15).
  */
  getScore: (selectedFormData, values) => {
    const {
      questions,
      questionsNotToScore,
      scale = {},
      scaleTwo = {},
    } = selectedFormData;
    console.log(values);
    return questions.reduce(
      (acc, question, index) => {
        const questionValue = values[question.name];
        acc.originalValues[question.name] = questionValue;

        if (questionsNotToScore.includes(index + 1)) {
          if (index + 1 === 17) {
            // Q17 (usually 15) must be "moderate" or "serious", or score = 0
            const i = scaleTwo.indexOf(questionValue);
            acc.values[index + 1] = i;
            if ([0, 1].includes(i)) {
              acc.score = 0;
            }
          } else if (index + 1 === 14) {
            // Q14 must be “yes”, or score = 0
            acc.score = acc.score * (1 - scale.indexOf(questionValue));
          } else {
            acc.values[index + 1] = 1 - scale.indexOf(questionValue);
          }
          return acc;
        } else {
          acc.values[index + 1] = 1 - scale.indexOf(questionValue);
          acc.score = acc.score + (1 - scale.indexOf(questionValue));
        }

        return acc;
      },
      { score: 0, values: {}, originalValues: {} }
    );
  },
  minScore: 0,
  maxScore: 16,
  higherScoreWorse: true,
  scoreNotes: "For the MDQ, two of the questions must have certain values for your score to have any meaning. If your score is 0, it may be because you answered those questions in the negative.",
  labels: [
    {
      range: "0-6",
      description: "Doesn't meet the threshold",
    },
    {
      range: "7-13",
      description: "Meets the threshold",
    },
  ],
};
/*
- Positive Activation (items 3, 4, 8, 9): assesses increased energy/activity, grandiosity, and decreased need for sleep. Individuals endorsing symptoms defining Positive Activation are not likely to report significant levels of negative affect and are likely to be
energetic and extraverted. Individuals scoring high on Positive Activation may be less likely to rate their symptoms as impairing given that increased levels of energy and activity may be experienced as advantageous to some degree, especially if they are mild in nature. This factor is strongly associated with a BD diagnosis.

- Negative Activation (items 1, 2, 6, 7, 12, 13): assesses irritability, racing thoughts, levels of negative affectivity, and distractibility. This factor is strongly associated with BD as well as a a range of other
disorders, many of them (e.g. depressive disorders, PDs, PTSD, GAD, substance use disorders) characterised by emotion dysregulation and/or transdiagnostic personality traits such as neuroticism and disinhibition. Clients high in Negative Activation may be at risk for engaging in impulsive behavior in emotional situations.
*/
