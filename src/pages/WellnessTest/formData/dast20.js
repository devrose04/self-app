export default {
  title: "Drug Abuse Screening Test (DAST-20)",
  time: "4 min",
  description: "The DAST-20",
  prompt: "These questions refer to the past 12 months.",
  questions: [
    {
      question:
        "Have you used drugs other than those required for medical reasons?",
      name: "nonMedical"
    },
    {
      question: "Have you abused prescription drugs?",
      name: "abusePrescription"
    },
    {
      question: "Do you abuse more than one drug at a time",
      name: "simultaneous"
    },
    {
      question: "Can you get through the week without using drugs?",
      name: "getThroughWeek"
    },
    {
      question:
        "Are you always able to stop using drugs when you want to? (If never use drugs, answer 'Yes.'",
      name: "canStop"
    },
    {
      question:
        "Have you had 'blackouts' or 'flashbacks' as a result of drug use?",
      name: "blackouts"
    },
    {
      question:
        "Do you ever feel bad or guilty about your drug use? If never use drugs, choose 'No.'",
      name: "feelGuilty"
    },
    {
      question:
        "Does your spouse (or parents) ever complain about your involvement with drugs?",
      name: "relativesComplain"
    },
    {
      question:
        "Has drug abuse created problems between you and your spouse or your parents?",
      name: "familyProblems"
    },
    {
      question: "Have you lost friends because of your use of drugs?",
      name: "lostFriends"
    },
    {
      question: "Have you neglected your family because of your use of drugs?",
      name: "neglectedFamily"
    },
    {
      question:
        "Have you been in trouble at work (or school) because of drug abuse?",
      name: "schoolOrWorkTrouble"
    },
    {
      question: "Have you lost your job because of drug abuse?",
      name: "lostJob"
    },
    {
      question:
        "Have you gotten into fights when under the influence of drugs?",
      name: "fighting"
    },
    {
      question:
        "Have you engaged in illegal activities in order to obtain drugs",
      name: "illegalActivities"
    },
    {
      question: "Have you been arrested for possession of illegal drugs?",
      name: "arrested"
    },
    {
      question:
        "Have you ever experienced withdrawal symptoms (felt sick) when you stopped taking drugs?",
      name: "withdrawal"
    },
    {
      question:
        "Have you had medical problems as a result of your drug use (e.g.,          memory loss, hepatitis, convulsions, bleeding, etc.)?",
      name: "medicalConsequences"
    },
    {
      question: "Have you gone to anyone for help for a drug problem?",
      name: "seekedHelp"
    },
    {
      question:
        "Have you been involved in a treatment program specifically related to drug use?",
      name: "priorTreatment"
    }
  ],
  scale: ["No","Yes"],
  /*
  Score 1 point for each question answered "yes," except for Questions 4 and 5, for which a "no" receives 1 point.
  */
  getScore: (selectedFormData, values) => {
    const { questions, scale = {}, scaleTwo = {} } = selectedFormData;
    console.log(values);    return questions.reduce(
      (acc, question, index) => {
        const questionValue = values[question.name];
        acc.originalValues[question.name] = questionValue;
        if ([4, 5].includes(index + 1)) {
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
  maxScore: 20,
  higherScoreWorse: true,
  labels: [
    {
      range: "0",
      description: "None",
    },
    {
      range: "1-5",
      description: "Low",
    },
    {
      range: "6-10",
      description: "Intermediate",
    },
    {
      range: "11-15",
      description: "Substantial",
    },
    {
      range: "16-20",
      description: "Severe",
    },
  ],
};

/*
DAST-20
Score Severity Intervention Recommended
0       N/A                   N/A
1 – 5   Low                    Brief Intervention
6-10    Intermediate (likely meets DSM criteria)   Outpatient/ (Intensive)
11-15   Substantial           Intensive
16-20   Severe                Intensive
*/
