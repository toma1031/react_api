import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { useForm } from "react-hook-form";
import { SettingsPhoneTwoTone } from '@material-ui/icons';

const Student = (props) => {
  const [ posts, setPosts] = useState([]);
  const [ allPosts, setAllPosts] = useState([]);
  const { register, handleSubmit } = useForm();

  // Gradeの平均スコアを出す関数
  const gradesAverage = (grades) => {
    let sum = 0;
    grades.forEach(function(score) {
      sum += Number(score);
    });
    let ave = sum / grades.length
    return ave;
  };

  // ユーザーの入力キーワードをState化する,検索キーワードをstateとして持つ
  const [searchKeyword, setSearchKeyword] = React.useState("");
  console.log(searchKeyword)


  const [show, setShow] = useState(true)


  return (
    <div>
      <div>
      {posts ?
      <>
        {posts.map((props, i) =>
          <div key={i}>
          <div className="flex">
          <div className="image">
          <img src={props.pic} className="profile" />
          </div>
          <div>
          <p className="name">{props.firstName} {props.lastName}</p>
          <button onClick={() => setShow(!show)}>
            {show? <div>+</div>:<div>-</div>}
          </button>
          <div className="info">
          <p>Email: {props.email}</p>
          <p>Company: {props.company}</p>
          <p>Skill: {props.skill}</p>
          <p>Average Grade: {gradesAverage(props.grades)}%</p>
          {show ?
          <>
            <p>Test 1: {props.grades[0]}%</p>
            <p>Test 2: {props.grades[1]}%</p>
            <p>Test 3: {props.grades[2]}%</p>
            <p>Test 4: {props.grades[3]}%</p>
            <p>Test 5: {props.grades[4]}%</p>
            <p>Test 6: {props.grades[5]}%</p>
            <p>Test 7: {props.grades[6]}%</p>
            <p>Test 8: {props.grades[7]}%</p>
          </>

          :
          ''
          }

          </div>
          </div>
          </div>
          </div>
        )}
      </>
      :
      <div>
        <p>Not Found!</p>
      </div>
      }
      </div>
    </div>
  );
}
export default Student;