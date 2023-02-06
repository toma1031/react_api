import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Student from './Student';
//３、子コンポーネントを読み込む
import TagsInput from "./TagsInput";

const Top = () => {
  const [ posts, setPosts] = useState([]);
  const [ allPosts, setAllPosts] = useState([]);



  let tag_list = []
  // ユーザーの入力キーワードをState化する,検索キーワードをstateとして持つ
  const [searchKeyword, setSearchKeyword] = React.useState("");
  const [searchTagKeyword, setTagSearchKeyword] = React.useState("");
  console.log(searchKeyword)

  //６、子コンポーネントからもらったtags変数を貰い受けるtags_from_tagsinput変数を宣言
  const[tags_from_tagsinput, setTagsinput]= useState("");
  console.log(tags_from_tagsinput);

  tags_from_tagsinput_all = []

// ５、ここでTagsInput.jsから引き継いできたtagsをsetTagsinput関数へ渡す
  const setTagsFromStudent = (tags) => {
    setTagsinput(tags);
  };

  useEffect(() => {
    axios.get('https://api.hatchways.io/assessment/students')
    .then(result => {
      setPosts(result.data.students);
      setAllPosts(result.data.students);
      if (searchKeyword) {
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

console.log(posts)
  // 検索キーワード（searchKeyword）をstateとして持ち、getSearchResult()で使うようにする
  const getSearchResult = () => {
    // console.log(data.search)
    // setSearchKeyword(data.search)
    console.log(searchKeyword)
    const result = allPosts.filter((output, index) => {
      // filterメソッドは、メソッド内で定義した条件がtrueな要素だけ配列として返すという役割を持っています。
      // includesメソッドは、特定の要素が配列に含まれているかどうかを true または false で返します。
      // よって、今回のコードでは
      // allPostsの中でfirstNameが検索ワードと一致する場合、その要素を配列として返す　という処理を行なっています。
      return output.firstName.toLowerCase().includes(searchKeyword.toLowerCase())||output.lastName.toLowerCase().includes(searchKeyword.toLowerCase());
    });
    console.log(result)
    setPosts(result);
  };


  
  const getTagSearchResult = () => {
    console.log(searchTagKeyword)
    const result = allPosts.filter((output, index) => {
      return output.lastName.toLowerCase().includes(searchTagKeyword.toLowerCase());
    });
    console.log(result)
    setPosts(result);
  };

  return (
    <div>
      {/* ４、TagsInput.jsを読み込む、読み込みつつtextを更新するsetTagsinput関数を渡す。*/}
      {/* <TagsInput setTagsinput={setTagsinput}/> */}
      <div>
      <input className="search-box" placeholder="" value={searchKeyword} onChange={(e) => setSearchKeyword(e.target.value)}/>
      </div>
      <div>
      <input className="search-box" placeholder="" value={searchTagKeyword} onChange={(e) => setSearchKeyword(e.target.value)}/>
      </div>
      <div>
      {searchKeyword &&
      <p>{searchKeyword}で検索</p>
      }
      {posts ?
      <>
        {posts.map((data, i) =>
        // ４、Student.jsからもらってきたsetStudentTagをsetTagsFromStudent関数に流してやる
          <Student data={data} setStudentTags={setTagsFromStudent} />
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