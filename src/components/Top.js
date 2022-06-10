import React, {useState, useEffect} from 'react';
import axios from 'axios';


const Top = () => {
  const [post, setPosts] = useState([]);

  // Gradeの平均スコアを出す関数
  // 引数であるgradesはJSX内のdata.gradesを引っ張ってきている
  const gradesAverage = (grades) => {
    let sum = 0;
    // grades変数に入っているdata.gradesをforEachでそれぞれ取り出して、score変数に格納
    grades.forEach(function(score) {
      // score変数はそのままだとstr型なのでint型に変換、そしてループを回している間sum変数に足していく
      sum += Number(score);
    });
    // 最後にgrades（教科数）の数で合計を割ると平均点がでる。
    let ave = sum / grades.length
    return ave;
  };


  // console.logだけなら、内容が表示される。
  // returnのJSX内が{post}のままだとエラーが出る。
  // 配列の中身を、mapやfilter関数を使わずにJSXで表示しようとするとそのエラーが出ます。
  console.log(post);
  console.log(post[0]);
  console.log('--------');

  useEffect(() => {
    axios.get('https://api.hatchways.io/assessment/students')
    .then(result => {
      setPosts(result.data.students);
    })
  }, []);

  return (
    <div>
      {post.map((data, i) => 
        // keyは一つの大きな要素に対して一つ、しかもユニークである必要があります。
        // ですので、<div>の中に<p>要素を複数配置するのであれば、大元の<div>にkeyをつけてやるとうまくいくと思います。
        <div key={i}>
        <p >ID: {data.id}</p>
        <p>Name: {data.firstName} {data.lastName}</p>
        <p>City: {data.city}</p>
        <p>Company: {data.company}</p>
        <p>Average Grade:{gradesAverage(data.grades)}</p>
        <p>Email: {data.email}</p>
        <p>Skill: {data.skill}</p>
        <img src={data.pic} />
        </div>
      )}
    </div>
  );
}

export default Top;