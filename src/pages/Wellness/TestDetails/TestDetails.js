import "./TestDetails.css";
import { useParams } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { db, auth } from "../../../firebase.config";
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { useEffect, useState } from "react";
import { CircleIcon } from "../../../images/icons.js";
import formTestsData from "../../WellnessTest/formData";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const TestDetails = () => {
  const { testId } = useParams();
  const [user] = useAuthState(auth);
  const className = "TestDetails";
  const [testsData, setTestsData] = useState();

  const selectedTest = formTestsData[testId];

  useEffect(() => {
    if (user) {
      const testsRef = collection(db, "WellnessTestResults");
      const q = query(
        testsRef,
        where("user", "==", user.uid),
        where("formType", "==", testId)
      );
      getDocs(q).then((res) => {
        const tests = [];
        res.forEach((doc) => {
          tests.push(doc.data());
        });

        setTestsData(tests.sort((a, b) => a.created - b.created));
      });
    }
  }, [user]);

  if (!testsData) return null;

  const formatLowerRange = (range) => {
    if (!range.includes("-")) return range;
    return range.split("-")[0];
  };
  const rangeColors = ["green", "#C1B10C", "#D28B04", "#B8310B"];
  const getRangeColorForLegend = (index) => {
    if (selectedTest.higherScoreWorse) {
      if (!index) return "white";
      if (index === rangeColors.length) return 'black';
      return rangeColors[index];
    }
    return rangeColors[rangeColors.length - index];
  };
  const getRangeColor = (index) => {
    if (selectedTest.higherScoreWorse) {
      if (index === rangeColors.length) return 'black';
      return rangeColors[index];
    }
    return rangeColors[rangeColors.length - index];
  };
  const getStepSize = () =>
    Math.round((selectedTest.maxScore - selectedTest.minScore) / 10);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        // position: "top",
        display: false,
      },
      title: {
        // display: false
      },
    },
    scales: {
      y: {
        suggestedMin: selectedTest.minScore,
        min: selectedTest.minScore,
        max: selectedTest.maxScore,
        suggestedMax: selectedTest.maxScore,
        ticks: {
          stepSize: getStepSize(),
        },
      },
    },
  };
  const labels = testsData.map((test) =>
    new Date(test.created).toLocaleDateString()
  );
  const data = {
    labels,
    datasets: selectedTest.labels.map((label, index) => {
      console.log(label, index);
      if (index === 0) {
        return {
          label: "Score results",
          data: testsData.map((test) => test.score),
          borderColor: "rgb(34, 126, 229 )",
          backgroundColor: "rgba(34, 126, 229, .5)",
          pointRadius: 8,
          pointHoverRadius: 10,
        };
      } else {
        return {
          label: label.description,
          yAxesGroup: index,
          data: testsData.map(() => formatLowerRange(label.range)),
          borderColor: getRangeColor(index),
          pointRadius: 0,
          borderWidth: 0.8,
          borderDash: [10, 5],
        };
      }
    }),
    // {
    //   label: "Score results",
    //   data: testsData.map((test) => test.score),
    //   borderColor: "blue",
    //   backgroundColor: "blue",
    // },
    // {
    //   label: "Mild",
    //   yAxesGroup: "B",
    //   data: testsData.map(() => 5),
    //   borderColor: "green",
    //   pointRadius: 0,
    //   borderWidth: .75

    // },
    // {
    //   label: "Moderate",
    //   yAxesGroup: "C",
    //   data: testsData.map(() => 10),
    //   borderColor: "yellow",
    //   pointRadius: 0,
    //   borderWidth: .75

    // },
    // {
    //   label: "Moderately Severe",
    //   yAxesGroup: "D",
    //   data: testsData.map(() => 15),
    //   backgroundColor: "orange",
    //   borderColor: "orange",
    //   pointRadius: 0,
    //   borderWidth: .75
    // },
    // {
    //   label: "Severe",
    //   yAxesGroup: "E",
    //   data: testsData.map(() => 20),
    //   backgroundColor: "#880808",
    //   borderColor: "#880808",
    //   pointRadius: 0,
    //   borderWidth: .75
    // },
  };

  return (
    <div className={className}>
      {console.log(testsData, selectedTest)}
      <div className={`${className}__title`}>{selectedTest.title}</div>
      <div className={`${className}__chartContainer`}>
        <Line options={options} data={data} />
      </div>
      <div className={`${className}__dataContainer`}>
        <div>
          <div className={`${className}__subTitle`}>Test results</div>
          <ul className={`${className}__dataList`}>
            {testsData.map((testResult) => {
              return (
                <li
                  key={`test-${testResult.created}`}
                  className={`${className}__dataListItem ${className}__dataResultListItem`}
                >
                  <div>
                    Completed:{" "}
                    {new Date(testResult.created).toLocaleDateString()}
                  </div>
                  <div>Score: {testResult.score}</div>
                </li>
              );
            })}
          </ul>
        </div>
        <div>
          <div className={`${className}__subTitle`}>Range labels:</div>
          {selectedTest.labels && (
            <ul className={`${className}__dataList`}>
              {selectedTest.labels.map((label, index) => {
                return (
                  <li
                    key={`label-${label.range}`}
                    className={`${className}__dataListItem`}
                  >
                    <CircleIcon color={getRangeColorForLegend(index)} />
                    <div>{label.range}</div>
                    <div>{label.description}</div>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default TestDetails;
