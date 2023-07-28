export default {
  title: "Posttraumatic Checklist for DSM-5 (PCL-5)",
  time: "5 min",
  description:
    "The Posttraumatic Stress Disorder (PTSD) Checklist (PCL-5) is known as the PCL, it is a self-screening tool to help in the diagnosis of PTSD.",
  prompt: "In the past month, how much were you bothered by:",
  promptTwo: "In the past month, have you",
  questions: [
    {
      question:
        "Repeated, disturbing, and unwanted memories of the stressful experience?",
      name: "repeatedMemories",
    },
    {
      question: "Repeated, disturbing dreams of the stressful experience?",
      name: "repeatedDreams",
    },
    {
      question:
        "Suddenly feeling or acting as if the stressful experience were actually happening again (as if you were actually back there reliving it)?",
      name: "relivingExperience",
    },
    {
      question:
        "Feeling very upset when something reminded you of the stressful experience?",
      name: "upsetWhenReminded",
    },
    {
      question:
        "Having strong physical reactions when something reminded you of the stressful experience (for example, heart pounding, trouble breathing, sweating)?",
      name: "physicalReaction",
    },
    {
      question:
        "Avoiding memories, thoughts, or feelings related to the stressful experience?",
      name: "avoidMemories",
    },
    {
      question:
        "Avoiding external reminders of the stressful experience (for example, people, places, conversations, activities, objects, or situations)?",
      name: "avoidReminders",
    },
    {
      question:
        "Trouble remembering important parts of the stressful experience?",
      name: "troubleRemembering",
    },
    {
      question:
        "Having strong negative beliefs about yourself, other people, or the world (for example, having thoughts such as: l am bad, there is something seriously wrong with me, no one can be trusted, the world is completely dangerous)",
      name: "negativeBeliefs",
    },
    {
      question:
        "Blaming yourself or someone else for the stressful experience or what happened after it?",
      name: "blameYourselfForExperience",
    },
    {
      question:
        "Having strong negative feelings such as fear, horror, anger, guilt, or shame?",
      name: "strongNegativeFeelings",
    },
    {
      question: "Loss of interest in activities that you used to enjoy?",
      name: "lossOfInterest",
    },
    {
      question: "Feeling distant or cut off from other people?",
      name: "feelingDistant",
    },
    {
      question:
        "Trouble experiencing positive feelings (for example, being unable to feel happiness or have loving feelings for people close to you)?",
      name: "troubleExperiencingPositiveFeelings",
    },
    {
      question: "Irritable behavior, angry outbursts, or acting aggressively?",
      name: "irritableAngryAggressive",
    },
    {
      question:
        "Taking too many risks or doing things that could cause you harm?",
      name: "riskyBehavior",
    },
    {
      question: "Being 'superalert' or watchful or on guard?",
      name: "superAlert",
    },
    {
      question: "Feeling jumpy, or easily startled?",
      name: "feelingJumpy",
    },
    {
      question: "Having difficulty concentrating?",
      name: "difficultyConcentrating",
    },
    {
      question: "Trouble falling or staying asleep?",
      name: "troubleSLeeping",
    },
  ],
  scale: [
    "Not at all",
    "A little bit",
    "Moderately",
    "Quite a bit",
    "Extremely",
  ],
  scaleTwoStart: null,
  scaleTwo: ["Yes", "No"],
  /*
  The self-report rating scale is 0-4 for each symptom.
  */
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
  maxScore: 80,
  higherScoreWorse: true,
  labels: [
    {
      range: "0-30",
      description: "--",
    },
    {
      range: "31-80",
      description: "Probable PTSD",
    },
  ],
};
/*
DSM-5 symptom cluster severity scores can be obtained by summing the scores for the items within a given cluster, i.e., cluster B (items 1-5), cluster C (items 6-7), cluster D (items 8-14), and cluster E (items 15-20).
A provisional PTSD diagnosis can be made by treating each item rated as 2 = "Moderately" or higher as a symptom endorsed, then following the DSM-5 diagnostic rule which requires at least: 1 B item (questions 1-5), 1 C item (questions 6-7), 2 D items (questions 8-14), 2 E items (questions 15-20).

A cut-off raw score is 38 for a provisional diagnosis of PTSD. This cut-off has high sensitivity (.78) and specificity (.98) (Cohen et al., 2015).

Examine items rated as 2=”Moderately” or higher as an endorsed symptom, then following the DSM-5 diagnostic rule which requires at least: 1 B item (questions 1-5), 1 C item (questions 6-7), 2 D items (questions 8-14), 2 E items (questions 15-20).

Re-experiencing (items 1-5 – max score = 20) (criterion B)
Avoidance (items 6-7 – max score = 8) (criterion C)
Negative alterations in cognition and mood (items 8-14 – max score = 28) (criterion D)
Hyper-arousal (items 15-20 – max score = 24) (criterion E)
*/
