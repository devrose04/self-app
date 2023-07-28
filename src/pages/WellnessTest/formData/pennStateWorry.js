export default {
  title: "Penn State Worry Questionnaire (PSWQ)",
  time: "3 min",
  description:
    "The scale measures three dimensions of anxiety: excessiveness, generality, and uncontrollability.",
  prompt:
    "Rate each of the following statements on a scale “not at all typical of me” to “very typical of me”. Please do not leave any items blank.",
  questions: [
    {
      question:
        "If I do not have enough time to do everything, I do not worry about it.",
      name: "1",
    },
    {
      question: "My worries overwhelm me.",
      name: "2",
    },
    {
      question: "I do not tend to worry about things.",
      name: "3",
    },
    {
      question: "Many situations make me worry.",
      name: "4",
    },
    {
      question:
        "I know I should not worry about things, but I just cannot help it.",
      name: "5",
    },
    { question: "When I am under pressure I worry a lot.", name: "6" },
    {
      question: "I am always worrying about something.",
      name: "7",
    },
    {
      question: "I find it easy to dismiss worrisome thoughts.",
      name: "8",
    },
    {
      question:
        "As soon as I finish one task, I start to worry about everything else I have to do.",
      name: "9",
    },
    {
      question: "I never worry about anything.",
      name: "10",
    },
    {
      question:
        "When there is nothing more I can do about a concern, I do not worry about it any more.",
      name: "11",
    },
    {
      question: "I have been a worrier all my life.",
      name: "12",
    },
    {
      question: "I notice that I have been worrying about things.",
      name: "13",
    },
    {
      question: "Once I start worrying, I cannot stop",
      name: "14",
    },
    {
      question: "I worry all the time.",
      name: "15",
    },
    {
      question: "I worry about projects until they are all done.",
      name: "16",
    },
  ],
  conversationStarter: [
    {
      question:
        "Hey! I'm glad you are doing this checkin with me. We're going to go over just 16 short questions - it should take just 3-4 minutes and we'll provide you with the possible reponses to make the asessment easier and more accurate.",
      name: "intro",
    },
  ],
  conversationConclusion: [
    {
      question:
        "Thanks! I hope that was easier than you anticipated. Let's go see the results on the next page",
      name: "conclusion",
    },
  ],
  conversationQuestions: [
    {
      question:
        "Here's the first question. Have you been feeling nervous, anxious or on edge?",
      name: "nervous",
    },
    {
      question:
        "I appreciate the response. Have you been feeling nervous, anxious or on edge?",
      name: "nervous",
    },
    {
      question: "Thanks. Have you not been able to stop or control worrying?",
      name: "control",
    },
    {
      question: "Worrying too much about different things?",
      name: "different",
    },
    {
      question: "Trouble relaxing?",
      name: "relaxing",
    },
    {
      question: "Being so restless that it is hard to sit still?",
      name: "restless",
    },
    { question: "Becoming easily annoyed or irritable?", name: "annoyed" },
    {
      question: "Feeling afraid as if something awful might happen?",
      name: "afraid",
    },
  ],
  scale: [
    "Not at all typical of me",
    "Not so typical of me",
    "In the middle",
    "Typical of me",
    "Very typical of me",
  ],
  // Questions #1, 3, 8, 10, and 11 are reverse scored. Each question is worth at least 1 and at most 5
  getScore: (selectedFormData, values) => {
    const { questions, scale = {}, scaleTwo = {} } = selectedFormData;
    console.log(values);
    return questions.reduce(
      (acc, question, index) => {
        const questionValue = values[question.name];
        acc.originalValues[question.name] = questionValue;
        if (![1, 3, 8, 10, 11].includes(index + 1)) {
          acc.score = acc.score + (scale.indexOf(questionValue) + 1);
          acc.values[index + 1] = scale.indexOf(questionValue) + 1;
        } else {
          acc.score = acc.score + (5 - scale.indexOf(questionValue));
          acc.values[index + 1] = 5 - scale.indexOf(questionValue);
        }
        return acc;
      },
      { score: 0, values: {}, originalValues: {} }
    );
  },
  minScore: 16,
  maxScore: 80,
  higherScoreWorse: true,
  labels: [
    {
      range: "16-39",
      description: "Low Worry",
    },
    {
      range: "40-59",
      description: "Moderatee Worry",
    },
    {
      range: "60-80",
      description: "High Worry",
    },
  ],
};

/*

Scores range from 16 to 80 with higher scores indicative of higher levels of trait worry. Scores can be in the following severity ranges.
29 or less: Not anxious or a worrier
30-52: Bothered by worries but below clinical range for worry
52-65: Currently have some problems with worry and may benefit from treatment
66 or more: Chronic worrier and in need of treatment to target this problem

*/
