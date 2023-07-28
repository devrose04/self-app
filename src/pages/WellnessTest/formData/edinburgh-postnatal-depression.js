export default {
  title: "Edinburgh Postnatal Depression Scale  (EPDS)",
  time: "3 min",
  description:
    "The Edinburgh Postnatal Depression Scale (EPDS) is a screening instrument that is frequently used to identify women who might be experiencing depression during pregnancy and after giving birth. The United States Preventive Services Task Force recommended in 2016 that all women are given an EPDS screening during and after pregnancy.",
  prompt: "Select which answer is most accurate over the the past 7 days",
  questions: [
    {
      question: "I have been able to laugh and see the funny side of things.",
      name: "laugh",
      answers: [
        "As much as I always could",
        "Not quite so much now",
        "Definitely not so much now",
        "Not at all",
      ],
    },
    {
      question: "I have looked forward with enjoyment to things.",
      name: "lookingForward",
      answers: [
        "As much as I ever did",
        "Rather less than I used to",
        "Definitely less than I used to",
        "Hardly at all",
      ],
    },
    {
      question: "I have blamed myself unnecessarily when things went wrong.",
      name: "blameSelf",
      answers: [
        "Yes, most of the time",
        "Yes, some of the time",
        "Not very often",
        "No, never",
      ],
    },
    {
      question: "I have been anxious or worried for no good reason.",
      name: "anxious",
      answers: [
        "No, not at all",
        "Hardly ever",
        "Yes, sometimes",
        "Yes, very often",
      ],
    },
    {
      question: "I have felt scared or panicky for no very good reason",
      name: "scaredPanic",
      answers: [
        "Yes, quite a lot",
        "Yes, sometimes",
        "No, not much",
        "No, not at all",
      ],
    },
    {
      question: "Things have been getting on top of me.",
      name: "overwhelmed",
      answers: [
        "Yes, most of the time I haven’t been able to cope at all",
        "Yes, sometimes I haven’t been coping as well as usual",
        "No, most of the time I have coped quite well",
        "No, I have been coping as well as ever",
      ],
    },
    {
      question: "I have been so unhappy that I have had difficulty sleeping",
      name: "troubleSleeping",
      answers: [
        "Yes, most of the time",
        "Yes, sometimes",
        "No, not very often",
        "No, not at all",
      ],
    },
    {
      question: "I have felt sad or miserable",
      name: "sad",
      answers: [
        "Yes, most of the time",
        "Yes, quite often",
        "Not very often",
        "No, not at all",
      ],
    },
    {
      question: "I have been so unhappy that I have been crying",
      name: "crying",
      answers: [
        "Yes, most of the time",
        "Yes, quite often",
        "Only occasionally",
        "No, never",
      ],
    },
    {
      question: "The thought of harming myself has occurred to me ",
      name: "selfHarm",
      answers: ["Yes, quite often", "Sometimes", "Hardly ever", "Never"],
    },
  ],
  scale: null,
  /*
    Responses are scored 0, 1, 2 and 3 based on the seriousness of the symptom.
    Items 3, 5-10 are reverse scored (i.e., 3, 2, 1, and 0).
    The total score is found by adding together the scores for each of the 10 items.
  */
  getScore: (selectedFormData, values) => {
    const { questions, scale = {}, scaleTwo = {} } = selectedFormData;
    console.log(values);
    return questions.reduce(
      (acc, question, index) => {
        const questionValue = values[question.name];
        if (![3, 5, 6, 7, 8, 9, 10].includes(index + 1)) {
          acc.score = acc.score + question.answers.indexOf(questionValue);
          acc.values[index + 1] = question.answers.indexOf(questionValue);
        } else {
          acc.values[index + 1] = 3 - question.answers.indexOf(questionValue);
          acc.score = acc.score + (3 - question.answers.indexOf(questionValue));
        }
        return acc;
      },
      { score: 0, values: {} }
    );
  },
};

/*
  Maximum score: 30
  Possible Depression: 10 or greater
  Always look at item 10 (suicidal thoughts)

  The cutoff score is usually a 12, although a score of 10 or higher and an affirmative response on the question pertaining to suicidal thoughts can be indicative of postpartum depression. An affirmative response on the question of whether an individual has experienced thoughts of self-harm, no matter the severity, is enough to warrant further evaluation and possible intervention.
*/
