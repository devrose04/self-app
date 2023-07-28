const formCategories = [
  {
    title: "Mental Health Quotient",
    tests: [],
  },
  {
    title: "Who-5",
    tests: [
      {
        key: "who5",
        url: "/wellness/test/who5",
      },
    ],
  },
  {
    title: "Self-Esteem",
    tests: [
      {
        title: "The Rosenberg Self Esteem Scale",
        key: "rosenberg-self-esteem",
        url: "/wellness/test/rosenberg-self-esteem",
      },
      // {
      //   title: "State Self Esteem Scale (SSES)",
      //   key: "state-self-esteem-state",
      //   url: "/wellness/test/state-self-esteem-state",
      // }
    ],
  },
  {
    title: "Depression",
    tests: [
      {
        title: "PHQ-9",
        key: "phq-9",
        url: "/wellness/test/phq-9",
      },
      // {
      //   title: "QIDS-SR-16",
      //   key: "qids-sr-16",
      //   url: "/wellness/test/qids-sr-16",
      // },
      {
        title: "Major Depression Index (MDI)",
        key: "mdi-depression",
        url: "/wellness/test/mdi-depression",
      },
      {
        title: "Beck Depression Index (BDI)",
        key: "beck-depression",
        url: "/wellness/test/beck-depression",
      },
      {
        title: "Beck Hopelessness Scale",
        key: "beck-hopelessness",
        url: "/wellness/test/beck-hopelessness",
      },
      {
        title: "Edinburgh Postnatal Depression Scale (EPDS)",
        key: "edinburgh-postnatal-depression",
        url: "/wellness/test/edinburgh-postnatal-depression",
      },
    ],
  },
  {
    title: "Anxiety",
    tests: [
      {
        title: "GAD_7",
        key: "gad-7",
        url: "/wellness/test/gad-7",
      },
      {
        title: "Penn State Worry Questionnaire (PSWQ)",
        key: "pennStateWorry",
        url: "/wellness/test/pennStateWorry",
      },
    ],
  },
  {
    title: "Stress",
    tests: [
      {
        title: "Personal stress assessment",
        key: "pss",
        url: "/wellness/test/pss",
      },
    ],
  },
  {
    title: "Loneliness",
    tests: [
      {
        title: "UCLA loneliness",
        key: "ucla-loneliness",
        url: "/wellness/test/ucla-loneliness",
      },
    ],
  },
  {
    title: "Eating",
    tests: [
      // {
      //   title: "Eating Disorder Examination Short (EDE-QS)",
      //   key: "eatingDisorderExaminationShort",
      //   url: "/wellness/test/eatingDisorderExaminationShort",
      // },
      {
        title: "Eating Attitudes Test (EAT-26)",
        key: "eat26",
        url: "/wellness/test/eat26",
      },
    ],
  },
  {
    title: "Addictions",
    tests: [
      {
        title: "Drug Abuse Screening Test (10)",
        key: "dast10",
        url: "/wellness/test/dast10",
      },
      // {
      //   title: "Drug Abuse Screening Test (20)",
      //   key: "dast20",
      //   url: "/wellness/test/dast20",
      // },
      {
        title: "Alcohol Use Disorders Identification Test",
        key: "audit-alcohol",
        url: "/wellness/test/audit-alcohol",
      },
    ],
  },
  {
    title: "Trauma",
    tests: [
      {
        title: "Primary Care PTSD Screen (PC-PTSD-5)",
        key: "ptsd5",
        url: "/wellness/test/ptsd5",
      },
      {
        title: "Posttraumatic Checklist for DSM-5 (PCL-5)",
        key: "pcl5",
        url: "/wellness/test/pcl5",
      },
    ],
  },
  {
    title: "Other",
    tests: [
      {
        title: "Mood Disorder Questionnaire",
        key: "mdq",
        url: "/wellness/test/mdq",
      },
    ],
  },
];

export default formCategories;
