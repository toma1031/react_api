import React, {useState} from 'react';

const Student = (props) => {
const [show, setShow] = useState(false)

// Gradeの平均スコアを出す関数
  const gradesAverage = (grades) => {
    let sum = 0;
    grades.forEach(function(score) {
      sum += Number(score);
    });
    let ave = sum / grades.length
    return ave;
  };

  return (
    <div className="flex">
        <div className="image">
            <img src={props.data.pic} className="profile" />
        </div>
        <div>
            <p className="name">{props.data.firstName} {props.data.lastName}</p>
            <button className="button" onClick={() => setShow(!show)}>
                {show? <div className="button_p">-</div>:<div className="button_p">+</div>}
            </button>
            <div className="info">
                <p>Email: {props.data.email}</p>
                <p>Company: {props.data.company}</p>
                <p>Skill: {props.data.skill}</p>
                <p>Average Grade: {gradesAverage(props.data.grades)}%</p>
                {show &&
                    <>
                        <p>Test 1: {props.data.grades[0]}%</p>
                        <p>Test 2: {props.data.grades[1]}%</p>
                        <p>Test 3: {props.data.grades[2]}%</p>
                        <p>Test 4: {props.data.grades[3]}%</p>
                        <p>Test 5: {props.data.grades[4]}%</p>
                        <p>Test 6: {props.data.grades[5]}%</p>
                        <p>Test 7: {props.data.grades[6]}%</p>
                        <p>Test 8: {props.data.grades[7]}%</p>
                    </>
                }
            </div>
        </div>
    </div>
  );
}
export default Student;