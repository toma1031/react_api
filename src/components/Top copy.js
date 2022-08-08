import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {Button} from '@material-ui/core';
import { useForm } from "react-hook-form";

import escapeStringRegexp from "escape-string-regexp";

const Top = () => {
  // Postがある状態のStateをuseStaeで設定
  const [len,setLen] = useState(0)
  // 「初期画面」を見分ける変数を用意してそこで条件分岐させる
  const [initial_screen, setInitial] = useState(true)

  const [posts, setPosts] = useState([]);
  const { register, handleSubmit } = useForm();
  // Gradeの平均スコアを出す関数
  // 引数であるgradesはJSX内のdata.gradesを引っ張ってきている
  const gradesAverage = (grades) => {
    let sum = 0;
    // grades変数に入っているdata.gradesをforEachでそれぞれ取り出して、score変数に格納
    // forEachは配列専用のループ処理を行います、今回のように配列の処理にはforよりforEachの方がスマートにかけ、
    // 処理も早いので向いています。
    grades.forEach(function(score) {
      // score変数はそのままだとstr型なのでint型に変換、そしてループを回している間sum変数に足していく
      sum += Number(score);
    });
    // 最後にgrades（教科数）の数で合計を割ると平均点がでる。
    let ave = sum / grades.length
    return ave;
  };




  // ユーザーの入力キーワードをState化する
  const [searchKeyword, setSearchKeyword] = React.useState("");





  // console.logだけなら、内容が表示される。
  // returnのJSX内が{post}のままだとエラーが出る。
  // 配列の中身を、mapやfilter関数を使わずにJSXで表示しようとするとそのエラーが出ます。
  console.log(posts);
  // console.log(post[0]);
  console.log('--------');

  useEffect(() => {
    axios.get('https://api.hatchways.io/assessment/students')
    .then(result => {
      setPosts(result.data.students);
    })
  }, []);

  // 検索したPostをGetする用のミニConst
  // getSearchResultの引数にdataが設定されているので、これはformから渡されているものとわかります。
  // つまり、引数として渡されている変数はその関数内ではどこでも参照されるはずです。
  // const getSearchResult = async(data) => {
  //   console.log("getSearchResult発火");
  //   console.log(data)
  //   console.log(searchKeyword)
  // //     hook formの値を受け取る際は、data.xxxという記述をしなければなりません。
  // //     JSXのFORMでregisterを用いて入力された値を‘search’という名（name属性）で取得するようにしているからです。
  // // useStateなどで定義した変数はdata.などと記述する必要はありませんが、hook formで入力値を受け取る際にはこの書き方が必須となります。
  //   // await axios.get('https://api.hatchways.io/assessment/students'+'/?search='+ data.search,
  //   //   {
  //   //     headers: {
  //   //       'Content-Type': 'application/json',
  //   //     },
  //   //   })
  //     .then(result => {
  //       console.log('https://api.hatchways.io/assessment/students'+'/?search='+ data.search)
  //       // ここで検索キーワードをセット
  //       console.log("aaaaaaaaaaaaa")
  //       console.log(data)
  //       console.log(result.data.search)
  //       // 検索欄にキーワードが入力されたらその値を取得し、検索用関数に渡す and 検索用キーワードを変数に格納
  //       setSearchKeyword(result.data.search)

  //       // console.log(result.data.length);
  //       // 検索結果が数を格納
  //       // setLen(result.data.length);
  //       // setPosts(result.data.students);
  //       // 何らかの検索を行なった際には
  //       // setInitial(false)
  //       // とすれば下の検索画面が表示されるはずです。
  //       setInitial(false);
  //       console.log(searchKeyword);
  //       setSearchKeyword(data.search)
  //       console.log(searchKeyword);
  //     })
  //     .catch(err => {
  //       console.log("err");
  //       console.log(err)
  //     });
  // }





  const getSearchResult = (data) => {
    console.log("getSearchResult発火");

    
    // まずはpostsをMapし一つ一つ取り出していく
    // 参照
    // https://www.digitalocean.com/community/tutorials/js-array-search-methods-ja#bonus-filter
    // https://sasasorato.com/javascript-find/
    const mapped_post = posts.map(post => post)
    // 取り出したpostそれぞれに対してfindでフィルタをかけていく
    // サーチしたキーワード（searchKeyword）とpostsのキーの一つであるfirstNameの値が一致したPostだけ
    // search_result変数に代入
    const search_result = mapped_post.find(post => searchKeyword === posts.firstName);



    console.log(data)
    console.log(data.search)
    setSearchKeyword(data.search)
    console.log(searchKeyword);
    console.log(mapped_post);
    console.log(search_result);
    // postに対して、検索ワード（data.search）と部分一致するものだけを取り出し、そいつらを新たにpostにセットしてやるということです。
    // setPosts(search_result)
  }



  return (
    <div>
      <div>
      <form onSubmit={handleSubmit(getSearchResult)}>
      <input placeholder="" className='' {...register('search', { required: true })} />
      <input className='btn btn-secondary' type="submit" value="Search" />
      </form>
      </div>
      <div>


      {/* 検索ボタンが押されたら、全studentsデータのリストから、検索用キーワードに一致するstudentの名前を探して表示する */}
      {/* {searchKeyword === {data.firstName} || searchKeyword === {data.lastName} ?
      検索と一致したStudentだけを表示
      :
      全体を表示
      } */}
      {searchKeyword &&
      <p>{searchKeyword}で検索</p>
      }


      {posts ?
      <>
        {posts.map((data, i) => 
          // keyは一つの大きな要素に対して一つ、しかもユニークである必要があります。
          // ですので、<div>の中に<p>要素を複数配置するのであれば、大元の<div>にkeyをつけてやるとうまくいくと思います。
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