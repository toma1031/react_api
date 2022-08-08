import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { useForm } from "react-hook-form";
​
const Top = () => {
  const [ posts, setPosts] = useState([]);
  const [ allPosts, setAllPosts] = useState([]);
  const { register, handleSubmit } = useForm();
​
  // Gradeの平均スコアを出す関数
  const gradesAverage = (grades) => {
    let sum = 0;
    grades.forEach(function(score) {
      sum += Number(score);
    });
    let ave = sum / grades.length
    return ave;
  };
  // ユーザーの入力キーワードをState化する
  const [searchKeyword, setSearchKeyword] = React.useState("");
​
  useEffect(() => {
    axios.get('https://api.hatchways.io/assessment/students')
    .then(result => {
      setPosts(result.data.students);
      setAllPosts(result.data.students);
    })
  }, []);
​
  const getSearchResult = (data) => {
    // console.log(data.search)
    setSearchKeyword(data.search)
    const result = allPosts.filter((output, index) => {
      return output.firstName.includes(data.search);
    });
    setPosts(result);
  }
​
  return (
    <div>
      <div>
      <form onSubmit={handleSubmit(getSearchResult)}>
      <input placeholder="" className='' {...register('search', { required: true })} />
      <input className='btn btn-secondary' type="submit" value="Search" />
      </form>
      </div>
      <div>
      {searchKeyword &&
      <p>{searchKeyword}で検索</p>
      }
      {posts ?
      <>
        {posts.map((data, i) =>
          <div key={i}>
          <div className="flex">
          <div className="image">
          <img src={data.pic} className="profile" />
          </div>
          <div>
          <p className="name">{data.firstName} {data.lastName}</p>
          <div className="info">
          <p>Email: {data.email}</p>
          <p>Company: {data.company}</p>
          <p>Skill: {data.skill}</p>
          <p>Average Grade: {gradesAverage(data.grades)}%</p>
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
export default Top;