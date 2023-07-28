export default {
  title: "Beck Hopelessness Scale",
  time: "3 min",
  description: "The Beck Hopelessness Scale is a true-false test designed for adults age 17–80, to measure three major aspects of hopelessness: feelings about the future, loss of motivation, and expectations. It was developed by Dr. Aaron Beck, the psychiatrist considered the father of cognitive behavioral therapy (CBT)",
  prompt: "Please answer each question as true or false base on how you have been feeling in the past week.",
  questions: [
    {
      question: "I look forward to the future with hope and enthusiasm",
      name: "hope"
    },
    {
      question:
        "I might as well give up because I can’t make things better for myself",
      name: "giveUp"
    },
    {
      question:
        "When things are going badly, I am helped by knowing they can’t stay that way forever",
      name: "lookingForward"
    },
    {
      question: "I can’t imagine what my life would be like in 10 years",
      name: "imagine"
    },
    {
      question: "I have enough time to accomplish the things I most want to do",
      name: "ampleTime"
    },
    {
      question: "In the future, I expect to succeed in what concerns me most",
      name: "expectPositive"
    },
    { question: "My future seems dark to me", name: "dark" },
    {
      question:
        "I expect to get more good things in life than the average person",
      name: "aboveAverage"
    },
    {
      question:
        "I just don’t get the breaks, and there’s no reason to believe I will in the future",
      name: "noLuckyBreaks"
    },
    {
      question: "My past experiences have prepared me well for the future    ",
      name: "prepared"
    },
    {
      question:
        "All I can see ahead of me is unpleasantness rather than pleasantness",
      name: "unpleasantness"
    },
    {
      question: "I don’t expect to get what I really want",
      name: "lowExpectations"
    },
    {
      question:
        "When I look ahead to the future, I expect I will be happier than I am now",
      name: "optimistic"
    },
    {
      question: "Things just won’t work out the way I want them to",
      name: "dontWorkOut"
    },
    { question: "I have great faith in the future", name: "faith" },
    {
      question: "I never get what I want so it’s foolish to want anything",
      name: "foolish"
    },
    {
      question:
        "It is very unlikely that I will get any real satisfaction in the future",
      name: "noSatisfaction"
    },
    {
      question: "The future seems vague and uncertain to me",
      name: "uncertain"
    },
    {
      question: "I can look forward to more good times than bad times",
      name: "moreGood"
    },
    {
      question:
        "There’s no use in really trying to get something I want because I probably won’t get it",
      name: "rejection"
    }
  ],
  scale: ['True', 'False'],
  /*
  For items 1, 3, 5, 6, 8, 10, 13, 15, and 19, FALSE is equal to 1 point, TRUE equals 0 points
  For items 2, 4, 7, 9, 11, 12, 14, 16, 17, 18, and 20, TRUE is equal to 1 point, FALSE equals 0 points
  */
  getScore: (selectedFormData, values) => {
    const { questions, scale = {}, scaleTwo = {} } = selectedFormData;
    console.log(values);
    return questions.reduce((acc, question, index) => {
      const questionValue = values[question.name];
      if (![2, 4, 7, 9, 11, 12, 14, 16, 17, 18, 20].includes(index + 1)) {
        acc.score = acc.score + scale.indexOf(questionValue);
        acc.values[index + 1] = scale.indexOf(questionValue);
      } else {
        acc.values[index + 1] = 1 - scale.indexOf(questionValue);
        acc.score = acc.score + (1 - scale.indexOf(questionValue));
      }
      return acc
    }, {score: 0, values: {}})
  }
}

/*
Here are the score ranges and their designations:

0-3 = none or minimal
4-8 = mild
9-14 = moderate, which means they might not yet be in immediate danger, but they must be checked on frequently
15-20 = severe, so they need support ASAP
*/
