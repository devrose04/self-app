import React, { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import "../styles/chart.scss";
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  maintainAspectRatio: true,
  plugins: {
    legend: {
      position: "top",
    },
  },
};

const Chart = ({ chartdata, testOne, testTwo, resultOne, resultTwo }) => {
  const [scopedData, setScopedData] = useState(chartdata.mbtiEnneagram);
  const [data, setData] = useState(null);

  const dataFactory = (pair) => {
    if (pair === "mbtiLoveLanguages" || pair === "enneagramLoveLanguages") {
      let prefix;
      if (pair === "mbtiLoveLanguages") prefix = "mbti";
      if (pair === "enneagramLoveLanguages") prefix = "enneagram";
      return {
        // labels can be taken from any LLANGUAGES objets, all are 1-100
        labels: Object.keys(chartdata[`${prefix}ActsService`][resultOne]),
        datasets: [
          {
            label: "Acts of Service",
            data: Object.keys(chartdata[`${prefix}ActsService`][resultOne]).map(
              (label) => chartdata[`${prefix}ActsService`][resultOne][label]
            ),
            backgroundColor: "rgba(255, 99, 132, 0.5)",
            barThickness: 3,
            maxBarThickness: 35,
          },
          {
            label: "Quality Time",
            data: Object.keys(chartdata[`${prefix}QualityTime`][resultOne]).map(
              (label) => chartdata[`${prefix}QualityTime`][resultOne][label]
            ),
            backgroundColor: "rgba(255, 0, 0, 0.5)",
            barThickness: 3,
            maxBarThickness: 35,
          },
          {
            label: "Physical Touch",
            data: Object.keys(
              chartdata[`${prefix}PhysicalTouch`][resultOne]
            ).map(
              (label) => chartdata[`${prefix}PhysicalTouch`][resultOne][label]
            ),
            backgroundColor: "rgba(0, 0, 255, 0.5)",
            barThickness: 3,
            maxBarThickness: 35,
          },
          {
            label: "Words of Affirmation",
            data: Object.keys(
              chartdata[`${prefix}WordsAffirmation`][resultOne]
            ).map(
              (label) =>
                chartdata[`${prefix}WordsAffirmation`][resultOne][label]
            ),
            backgroundColor: "rgba(255, 165, 0, 0.5)",
            barThickness: 3,
            maxBarThickness: 35,
          },
          {
            label: "Receiving Gifts",
            data: Object.keys(
              chartdata[`${prefix}ReceivingGifts`][resultOne]
            ).map(
              (label) => chartdata[`${prefix}ReceivingGifts`][resultOne][label]
            ),
            backgroundColor: "rgba(106, 90, 205, 0.5)",
            barThickness: 3,
            maxBarThickness: 35,
          },
        ],
      };
    }

    if (pair === "mbtiFlirtingStyle" || pair === "enneagramFlirtingStyle") {
      let prefix;
      if (pair === "mbtiFlirtingStyle") prefix = "mbti";
      if (pair === "enneagramFlirtingStyle") prefix = "enneagram";

      return {
        // labels can be taken from any FLIRSTING STYLE objets, all are 1-100
        labels: Object.keys(chartdata[`${prefix}Physical`][resultOne]),
        datasets: [
          {
            label: "Physical",
            data: Object.keys(chartdata[`${prefix}Physical`][resultOne]).map(
              (label) => chartdata[`${prefix}Physical`][resultOne][label]
            ),
            backgroundColor: "rgba(255, 99, 132, 0.5)",
            barThickness: 15,
            maxBarThickness: 35,
          },
          {
            label: "Playful",
            data: Object.keys(chartdata[`${prefix}Playful`][resultOne]).map(
              (label) => chartdata[`${prefix}Playful`][resultOne][label]
            ),
            backgroundColor: "rgba(255, 0, 0, 0.5)",
            barThickness: 15,
            maxBarThickness: 35,
          },
          {
            label: "Polite",
            data: Object.keys(chartdata[`${prefix}Polite`][resultOne]).map(
              (label) => chartdata[`${prefix}Polite`][resultOne][label]
            ),
            backgroundColor: "rgba(0, 0, 255, 0.5)",
            barThickness: 15,
            maxBarThickness: 35,
          },
          {
            label: "Sincere",
            data: Object.keys(chartdata[`${prefix}Sincere`][resultOne]).map(
              (label) => chartdata[`${prefix}Sincere`][resultOne][label]
            ),
            backgroundColor: "rgba(255, 165, 0, 0.5)",
            barThickness: 15,
            maxBarThickness: 35,
          },
          {
            label: "Traditional",
            data: Object.keys(chartdata[`${prefix}Traditional`][resultOne]).map(
              (label) => chartdata[`${prefix}Traditional`][resultOne][label]
            ),
            backgroundColor: "rgba(106, 90, 205, 0.5)",
            barThickness: 15,
            maxBarThickness: 35,
          },
        ],
      };
    }

    if (pair === "mbtiFTI" || pair === "enneagramFTI") {
      let prefix;
      if (pair === "mbtiFTI") prefix = "mbti";
      if (pair === "enneagramFTI") prefix = "enneagram";
      return {
        // labels can be taken from any FLIRSTING STYLE objets, all are 1-100
        labels: Object.keys(chartdata[`${prefix}Explorer`][resultOne]),
        datasets: [
          {
            label: "Explorer",
            data: Object.keys(chartdata[`${prefix}Explorer`][resultOne]).map(
              (label) => chartdata[`${prefix}Explorer`][resultOne][label]
            ),
            backgroundColor: "rgba(255, 99, 132, 0.5)",
            barThickness: 3,
            maxBarThickness: 35,
          },
          {
            label: "Builder",
            data: Object.keys(chartdata[`${prefix}Builder`][resultOne]).map(
              (label) => chartdata[`${prefix}Builder`][resultOne][label]
            ),
            backgroundColor: "rgba(255, 0, 0, 0.5)",
            barThickness: 3,
            maxBarThickness: 35,
          },
          {
            label: "Director",
            data: Object.keys(chartdata[`${prefix}Director`][resultOne]).map(
              (label) => chartdata[`${prefix}Director`][resultOne][label]
            ),
            backgroundColor: "rgba(0, 0, 255, 0.5)",
            barThickness: 3,
            maxBarThickness: 35,
          },
          {
            label: "Negotiator",
            data: Object.keys(chartdata[`${prefix}Negotiator`][resultOne]).map(
              (label) => chartdata[`${prefix}Negotiator`][resultOne][label]
            ),
            backgroundColor: "rgba(255, 165, 0, 0.5)",
            barThickness: 3,
            maxBarThickness: 35,
          },
        ],
      };
    }
    return {
      labels: Object.keys(chartdata[pair][resultOne]),
      datasets: [
        {
          label: `${resultOne}`,
          data: Object.keys(chartdata[pair][resultOne]).map(
            (label) => chartdata[pair][resultOne][label]
          ),
          backgroundColor: "rgba(255, 99, 132, 0.5)",
          barThickness: 30,
          maxBarThickness: 35,
        },
      ],
    };
  };

  useEffect(() => {
    // mbti-enneagram 1
    if (testOne === "MBTI" && testTwo === "Enneagram") {
      setScopedData(chartdata.mbtiEnneagram);
      setData(dataFactory("mbtiEnneagram"));
    }
    // mbti-LL-Receiving-gifts 2
    if (testOne === "MBTI" && testTwo === "Astrology") {
      setScopedData(chartdata.mbtiSun);
      setData(dataFactory("mbtiSun"));
    }
    // mbti-Love languages 3
    if (testOne === "MBTI" && testTwo === "Love Languages") {
      setScopedData(chartdata.mbtiSun);
      setData(dataFactory("mbtiLoveLanguages"));
    }
    if (testOne === "MBTI" && testTwo === "Flirting Style") {
      setData(dataFactory("mbtiFlirtingStyle"));
    }
    if (testOne === "MBTI" && testTwo === "Attachment Style") {
      setData(dataFactory("mbtiAttachmentStyle"));
    }
    if (testOne === "MBTI" && testTwo === "FTI") {
      setData(dataFactory("mbtiFTI"));
    }
    if (testOne === "Enneagram" && testTwo === "MBTI") {
      setData(dataFactory("enneagramMbti"));
    }
    if (testOne === "Enneagram" && testTwo === "Astrology") {
      setData(dataFactory("enneagramSun"));
    }
    if (testOne === "Enneagram" && testTwo === "Flirting Style") {
      setData(dataFactory("enneagramFlirtingStyle"));
    }
    if (testOne === "Enneagram" && testTwo === "FTI") {
      setData(dataFactory("enneagramFTI"));
    }
    if (testOne === "Enneagram" && testTwo === "Attachment Style") {
      setData(dataFactory("enneagramAttachmentStyle"));
    }
    if (testOne === "Enneagram" && testTwo === "Love Languages") {
      setData(dataFactory("enneagramLoveLanguages"));
    }
  }, [chartdata, resultOne, scopedData, testOne, testTwo]);

  return (
    <div className="chartContainer">
      {data && (
        <Bar
          options={options}
          data={data}
          style={{ height: "auto", backgroundColor: "#F8F8F8", padding: 10 }}
        />
      )}
    </div>
  );
};

export default Chart;
