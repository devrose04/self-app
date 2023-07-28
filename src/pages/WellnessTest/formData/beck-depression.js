export default {
  title: "Beck Depression Index",
  time: "4 min",
  description:
    "The Beck Depression Index is one of the most widely used psychometric tests for measuring the severity of depression. It was developed by Dr. Aaron Beck, the psychiatrist considered the father of cognitive behavioral therapy (CBT)",
  prompt:
    "Choose the statement that best describes your health during the past week.",
  questions: [
    {
      question: "",
      name: "sad",
      answers: [
        "I do not feel sad.",
        "I feel sad.",
        "I am sad all the time and I can't snap out of it.",
        "I am so sad and unhappy that I can't stand it.",
      ],
    },
    {
      question: "",
      name: "discouraged",
      answers: [
        "I am not particularly discouraged about the future.",
        "I feel discouraged about the future.",
        "I feel I have nothing to look forward to.",
        "I feel the future is hopeless and that things cannot improve.",
      ],
    },
    {
      question: "",
      name: "failure",
      answers: [
        "I do not feel like a failure.",
        "I feel I have failed more than the average person.",
        "As I look back on my life, all I can see is a lot of failures.",
        "I feel I am a complete failure as a person.",
      ],
    },
    {
      question: "",
      name: "satisfaction",
      answers: [
        "I get as much satisfaction out of things as I used to.",
        "I don't enjoy things the way I used to.",
        "I don't get real satisfaction out of anything anymore.",
        "I am dissatisfied or bored with everything.",
      ],
    },
    {
      question: "",
      name: "guilty",
      answers: [
        "I don't feel particularly guilty",
        "I feel guilty a good part of the time.",
        "I feel quite guilty most of the time.",
        "I feel guilty all of the time.",
      ],
    },
    {
      question: "",
      name: "punished",
      answers: [
        "I don't feel I am being punished",
        "I feel I may be punished",
        "I expect to be punished",
        "I feel I am being punished",
      ],
    },
    {
      question: "",
      name: "disappointed",
      answers: [
        "I don't feel disappointed in myself",
        "I am disappointed in myself",
        "I am disgusted with myself",
        "I hate myself",
      ],
    },
    {
      question: "",
      name: "criticalOfSelf",
      answers: [
        "I don't feel I am any worse than anybody else",
        "I am critical of myself for my weaknesses or mistakes",
        "I blame myself all the time for my faults",
        "I blame myself for everything bad that happens",
      ],
    },
    {
      question: "",
      name: "suicide",
      answers: [
        "I don't have any thoughts of killing myself",
        "I have thoughts of killing myself, but I would not carry them out",
        "I would like to kill myself",
        "I would kill myself if I had the chance",
      ],
    },
    {
      question: "",
      name: "cry",
      answers: [
        "I don't cry any more than usual.",
        "I cry more now than I used to.",
        "I cry all the time now.",
        "I used to be able to cry, but now I can't cry even though I want to.",
      ],
    },
    {
      question: "",
      name: "irritated",
      answers: [
        "I am no more irritated by things than I ever was.",
        "I am slightly more irritated now than usual.",
        "I am quite annoyed or irritated a good deal of the time.",
        "I feel irritated all the time.",
      ],
    },
    {
      question: "",
      name: "lostInterest",
      answers: [
        "I have not lost interest in other people.",
        "I am less interested in other people than I used to be.",
        "I have lost most of my interest in other people.",
        "I have lost all of my interest in other people.",
      ],
    },
    {
      question: "",
      name: "decisionMaking",
      answers: [
        "I make decisions about as well as I ever could.",
        "I put off making decisions more than I used to.",
        "I have greater difficulty in making decisions more than I used to.",
        "I can't make decisions at all anymore.",
      ],
    },
    {
      question: "",
      name: "appearance",
      answers: [
        "I don't feel that I look any worse than I used to.",
        "I am worried that I am looking old or unattractive.",
        "I feel there are permanent changes in my appearance that make me look",
        "unattractive",
        "I believe that I look ugly.",
      ],
    },
    {
      question: "",
      name: "abilityToWork",
      answers: [
        "I can work about as well as before.",
        "It takes an extra effort to get started at doing something.",
        "I have to push myself very hard to do anything.",
        "I can't do any work at all.",
      ],
    },
    {
      question: "",
      name: "sleep",
      answers: [
        "I can sleep as well as usual.",
        "I don't sleep as well as I used to.",
        "I wake up 1-2 hours earlier than usual and find it hard to get back to sleep.",
        "I wake up several hours earlier than I used to and cannot get back to sleep.",
      ],
    },
    {
      question: "",
      name: "tired",
      answers: [
        "I don't get more tired than usual.",
        "I get tired more easily than I used to.",
        "I get tired from doing almost anything.",
        "I am too tired to do anything.",
      ],
    },
    {
      question: "",
      name: "appetite",
      answers: [
        "My appetite is no worse than usual.",
        "My appetite is not as good as it used to be.",
        "My appetite is much worse now.",
        "I have no appetite at all anymore.",
      ],
    },
    {
      question: "",
      name: "weight",
      answers: [
        "I haven't lost much weight, if any, lately.",
        "I have lost more than five pounds.",
        "I have lost more than ten pounds.",
        "I have lost more than fifteen pounds.",
      ],
    },
    {
      question: "",
      name: "worried",
      answers: [
        "I am no more worried about my health than usual.",
        "I am worried about physical problems like aches, pains, upset stomach, or constipation.",
        "I am very worried about physical problems and it's hard to think of much else.",
        "I am so worried about my physical problems that I cannot think of anything else.",
      ],
    },
    {
      question: "",
      name: "interestInSex",
      answers: [
        "I have not noticed any recent change in my interest in sex.",
        "I am less interested in sex than I used to be.",
        "I have almost no interest in sex.",
        "I have lost interest in sex completely.",
      ],
    },
  ],
  scale: null,
  /*
    Responses are scored 0, 1, 2 and 3 based on the
    seriousness of the symptom.
    Items 3, 5 to 10 are reverse scored (i.e., 3, 2, 1, and 0).  -- WRONG
    The total score is found by adding together the scores for each of the 10 items.
  */
  getScore: (selectedFormData, values) => {
    const { questions, scale = {}, scaleTwo = {} } = selectedFormData;
    console.log(values);
    return questions.reduce(
      (acc, question, index) => {
        const questionValue = values[question.name];
        acc.score = acc.score + scale.indexOf(questionValue);
      },
      { score: 0, values: {} }
    );
  },
};

/*
1-10 These ups and downs are considered normal.
11-16 Mild mood disturbances.
17-20 Bordeline clinical depression.
21-30 Moderate depression.
31-40 Severe depression.
over 40 Extreme depression.
*/
