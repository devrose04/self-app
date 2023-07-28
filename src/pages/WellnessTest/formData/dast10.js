export default {
  title: "Drug Abuse Screening Test (DAST-10)",
  time: "2 min",
  description: "The DAST-10",
  prompt: "These questions refer to the past 12 months.",
  questions: [
    {
      question:
        "Have you used drugs other than those required for medical reasons?",
      name: "nonMedical",
    },
    {
      question: "Do you abuse more than one drug at a time",
      name: "simultaneous",
    },
    {
      question:
        "Are you always able to stop using drugs when you want to? (If never use drugs, answer 'Yes.'",
      name: "canStop",
    },
    {
      question:
        "Have you had 'blackouts' or 'flashbacks' as a result of drug use?",
      name: "blackouts",
    },
    {
      question:
        "Do you ever feel bad or guilty about your drug use? If never use drugs, choose 'No.'",
      name: "feelGuilty",
    },
    {
      question:
        "Does your spouse (or parents) ever complain about your involvement with drugs?",
      name: "relativesComplain",
    },
    {
      question: "Have you neglected your family because of your use of drugs?",
      name: "neglectedFamily",
    },
    {
      question:
        "Have you engaged in illegal activities in order to obtain drugs",
      name: "illegalActivities",
    },
    {
      question:
        "Have you ever experienced withdrawal symptoms (felt sick) when you stopped taking drugs?",
      name: "withdrawal",
    },
    {
      question:
        "Have you had medical problems as a result of your drug use (e.g.,          memory loss, hepatitis, convulsions, bleeding, etc.)?",
      name: "medicalConsequences",
    },
  ],
  scale: ["No", "Yes"],
  /*
  Patients receive 1 point for every "yes" answer with
  the exception of question #3, for which a "no" answer receives 1 point.
  */
  getScore: (selectedFormData, values) => {
    const { questions, scale = {}, scaleTwo = {} } = selectedFormData;
    console.log(values);
    return questions.reduce(
      (acc, question, index) => {
        const questionValue = values[question.name];
        acc.originalValues[question.name] = questionValue;
        if (![3].includes(index + 1)) {
          acc.score = acc.score + scale.indexOf(questionValue);
          acc.values[index + 1] = scale.indexOf(questionValue);
        } else {
          acc.score = acc.score + (1 - scale.indexOf(questionValue));
          acc.values[index + 1] = 1 - scale.indexOf(questionValue);
        }
        return acc;
      },
      { score: 0, values: {}, originalValues: {} }
    );
  },
  minScore: 0,
  maxScore: 10,
  higherScoreWorse: true,
  labels: [
    {
      range: "0",
      description: "None",
    },
    {
      range: "1-2",
      description: "Low",
    },
    {
      range: "3-5",
      description: "Moderate",
    },
    {
      range: "6-8",
      description: "Substantial",
    },
    {
      range: "9-10",
      description: "Severe",
    },
  ],
};

/*
DAST-10 Score Drug Abuse Suggested Action
0 No problems reported None at this time
1–2 Low level Monitor, re‐assess at a later date
3–5 Moderate level Further investigation
6–8 Substantial level Intensive assessment
9–10 Severe level Intensive assessment
*/
