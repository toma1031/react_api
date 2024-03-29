import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { useForm } from "react-hook-form";
import { SettingsPhoneTwoTone } from '@material-ui/icons';
import Student from './Student';

const Top = () => {
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

  useEffect(() => {
    axios.get('https://api.hatchways.io/assessment/students')
    .then(result => {
      setPosts(result.data.students);
      setAllPosts(result.data.students);
      console.log(searchKeyword)
      if (searchKeyword) {
        console.log(searchKeyword)
        getSearchResult()
      }
    })}, 
    // onChangeでsearchKeyword変数を更新しているので、その度にgetSearchResult()を発火させたいです。
    // そのためには、searchKeywordが更新されるたびにuseEffectを再発火させたいです。
    // 第2引数に値の配列が渡された場合、useEffectは与えられた値に変化があった場合のみ第１引数の関数を実行します。
    // つまりsearchKeywordが更新されるたびというのはuseEffectの第２引数にsearchKeywordを入れておけば
    // searchKeywordが更新されるたびに、第１引数の中身を実行します
    // 参照
    // https://qiita.com/k-penguin-sato/items/9373d87c57da3b74a9e6
    [searchKeyword]);

  // 検索キーワード（searchKeyword）をstateとして持ち、getSearchResult()で使うようにする
  const getSearchResult = () => {
    // console.log(data.search)
    // setSearchKeyword(data.search)
    console.log(searchKeyword)
    const result = allPosts.filter((output, index) => {
      console.log(output)
      // filterメソッドは、メソッド内で定義した条件がtrueな要素だけ配列として返すという役割を持っています。
      // includesメソッドは、特定の要素が配列に含まれているかどうかを true または false で返します。
      // よって、今回のコードでは
      // allPostsの中でfirstNameが検索ワードと一致する場合、その要素を配列として返す　という処理を行なっています。
      return output.firstName.toLowerCase().includes(searchKeyword.toLowerCase())||output.lastName.toLowerCase().includes(searchKeyword.toLowerCase());
    });
    console.log(result)
    setPosts(result);
  };

  const [show, setShow] = useState(true)

  return (
    <div>
      <div>
      {/* <form onChange={handleSubmit(getSearchResult)}> */}
      <input className="search-box" placeholder="" value={searchKeyword} onChange={(e) => setSearchKeyword(e.target.value)}/>
      {/* <input placeholder="" className='' {...register('search', { required: true })}/> */}
      {/* <input className='btn btn-secondary' type="submit" value="Search" /> */}
      {/* </form> */}
      </div>
      <div>
      {searchKeyword &&
      <p>{searchKeyword}で検索</p>
      }
      {posts ?
      <>
      <Student data="props" />
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