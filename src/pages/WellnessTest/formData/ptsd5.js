export default {
  title: "Primary Care PTSD Screen (PC-PTSD-5)",
  time: "5 min",
  description:
    "The Primary Care PTSD Screen (PC-PTSD-5) is a short, 5-item screen designed to identify individuals with probable PTSD",
  prompt:
    "Sometimes things happen to people that are unusually or especially frightening, horrible, or traumatic. For example: a serious accident or fire, a physical or sexual assault or abuse, an earthquake or flood, a war, seeing someone be killed or seriously injured, having a loved one die through homicide or suicide.",
  promptTwo: "In the past month, have you",
  questions: [
    {
      question: "Have you ever experienced this kind of event?",
      name: "experiencedTrauma",
    },
    {
      question:
        "had nightmares about the event(s) or thought about the event(s) when you did not want to?",
      name: "nightmares",
    },
    {
      question:
        "tried hard not to think about the event(s) or went out of your way to avoid situations that reminded you of the event(s)?",
      name: "tryToAvoid",
    },
    {
      question: "been constantly on guard, watchful, or easily startled?",
      name: "onGuard",
    },
    {
      question:
        "felt numb or detached from people, activities, or your surroundings?",
      name: "numbAndDetached",
    },
    {
      question:
        "felt guilty or unable to stop blaming yourself or others for the event(s) or any problems the event(s) may have caused?",
      name: "feelGuilty",
    },
  ],
  scale: ["Yes", "No"],
  scaleTwoStart: 2,
  scaleTwo: ["Yes", "No"],
  /*
  Question 1 is to determine if there was trauma.
  Questions 2-6 screen for PTSD.
  Patients receive 1 point for every "yes" answer.
  */
  getScore: (selectedFormData, values) => {
    const { questions, scale = {}, scaleTwo = {} } = selectedFormData;
    console.log(values);
    return questions.reduce(
      (acc, question, index) => {
        const questionValue = values[question.name];
        acc.originalValues[question.name] = questionValue;
        if (![1].includes(index + 1)) {
          acc.score = acc.score + (1 -scale.indexOf(questionValue));
          acc.values[index + 1] = 1 - scale.indexOf(questionValue);
        } else {
          acc.values[index + 1] = 1 - scale.indexOf(questionValue);

        }
        return acc;
      },
      { score: 0, values: {}, originalValues: {} }
    );
  },
  minScore: 0,
  maxScore: 5,
  higherScoreWorse: true,
  scoreNotes: "Question 1 is not scored. Traditionally, Q1 is required to be scored as a 'Yes' for the screening to identify PTSD. However today many things can cause and trigger PTSD so while we continue to keep the question, we are not adjusting the score because of it.",
  labels: [
    {
      range: "0-2",
      description: "--",
    },
    {
      range: "3",
      description: "Probable PTSD",
    },
    {
      range: "4-5",
      description: "Likely PTSD",
    },
  ],
};
