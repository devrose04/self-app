import './TestsList.css';
import TestLink from "../TestLink";

const TestsList = ({tests}) => {
  const className = 'TestsList';

  return (
    <ul className={`${className}__testList`}>
      {tests.map((test) => {
        return (
          <li key={`test-row-${test.testLink}`} className={`${className}__testListItem`}>
            <div>{test.name}</div>
            {test.duration && (<div>{test.duration}</div>)}
            <div className={`${className}__testLinkColumn`}>
              <TestLink isDone={test.isDone} link={test.testLink} />
            </div>
            <div>{test.isDone ?
              <img className={`${className}__statusIcon`} src={"/icons/check_mark.png"} alt={"check mark icon"}/> :
              <img className={`${className}__statusIcon`} src={"/icons/empty_checkbox.png"}
                   alt={"empty checkbox icon"}/>}</div>
          </li>
        )
      })}
    </ul>
  )
}

export default TestsList;
