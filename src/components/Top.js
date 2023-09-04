import React, { useState, useEffect } from "react";
import axios from "axios";
import Student from "./Student";
//３、子コンポーネントを読み込む
import TagsInput from "./TagsInput";

const Top = () => {
  const [posts, setPosts] = useState([]);
  const [allPosts, setAllPosts] = useState([]);

  // 子であるStudent.jsから、その子であるTagsInput.jsへtagsを渡す方法１、Topで allTagsList setTagsを定義する
  const [allTagsList, setTags] = React.useState([
    {
      studentId: 1,
      tags: [],
    },
    {
      studentId: 2,
      tags: [],
    },
    {
      studentId: 3,
      tags: [],
    },
    {
      studentId: 4,
      tags: [],
    },
    {
      studentId: 5,
      tags: [],
    },
    {
      studentId: 6,
      tags: [],
    },
    {
      studentId: 7,
      tags: [],
    },
    {
      studentId: 8,
      tags: [],
    },
    {
      studentId: 9,
      tags: [],
    },
    {
      studentId: 10,
      tags: [],
    },
    {
      studentId: 11,
      tags: [],
    },
    {
      studentId: 12,
      tags: [],
    },
    {
      studentId: 13,
      tags: [],
    },
    {
      studentId: 14,
      tags: [],
    },
    {
      studentId: 15,
      tags: [],
    },
    {
      studentId: 16,
      tags: [],
    },
    {
      studentId: 17,
      tags: [],
    },
    {
      studentId: 18,
      tags: [],
    },
    {
      studentId: 19,
      tags: [],
    },
    {
      studentId: 20,
      tags: [],
    },
    {
      studentId: 21,
      tags: [],
    },
    {
      studentId: 22,
      tags: [],
    },
    {
      studentId: 23,
      tags: [],
    },
    {
      studentId: 24,
      tags: [],
    },
    {
      studentId: 25,
      tags: [],
    },
  ]);

  let tag_list = [];
  // ユーザーの入力キーワードをState化する,検索キーワードをstateとして持つ
  const [searchKeyword, setSearchKeyword] = React.useState("");
  const [searchTagKeyword, setTagSearchKeyword] = React.useState("");
  console.log(searchKeyword);

  //６、子コンポーネントからもらったtags変数を貰い受けるtags_from_tagsinput変数を宣言
  const [tags_from_tagsinput, setTagsinput] = useState("");
  console.log(tags_from_tagsinput);

  useEffect(
    () => {
      axios
        .get("https://api.hatchways.io/assessment/students")
        .then((result) => {
          setPosts(result.data.students);
          setAllPosts(result.data.students);
          if (searchKeyword) {
            getSearchResult();
          }
          if (searchTagKeyword) {
            getTagSearchResult();
          }
        });
    },
    // onChangeでsearchKeyword変数を更新しているので、その度にgetSearchResult()を発火させたいです。
    // そのためには、searchKeywordが更新されるたびにuseEffectを再発火させたいです。
    // 第2引数に値の配列が渡された場合、useEffectは与えられた値に変化があった場合のみ第１引数の関数を実行します。
    // つまりsearchKeywordが更新されるたびというのはuseEffectの第２引数にsearchKeywordを入れておけば
    // searchKeywordが更新されるたびに、第１引数の中身を実行します
    // 参照
    // https://qiita.com/k-penguin-sato/items/9373d87c57da3b74a9e6
    [searchKeyword, searchTagKeyword]
  );

  console.log(posts);
  // 検索キーワード（searchKeyword）をstateとして持ち、getSearchResult()で使うようにする
  const getSearchResult = () => {
    // console.log(data.search)
    // setSearchKeyword(data.search)
    console.log(searchKeyword);
    const result = allPosts.filter((output, index) => {
      // filterメソッドは、メソッド内で定義した条件がtrueな要素だけ配列として返すという役割を持っています。
      // includesメソッドは、特定の要素が配列に含まれているかどうかを true または false で返します。
      // よって、今回のコードでは
      // allPostsの中でfirstNameが検索ワードと一致する場合、その要素を配列として返す　という処理を行なっています。
      return (
        output.firstName.toLowerCase().includes(searchKeyword.toLowerCase()) ||
        output.lastName.toLowerCase().includes(searchKeyword.toLowerCase())
      );
    });
    console.log(result);
    setPosts(result);
  };

  const getTagSearchResult = () => {
    console.log(searchTagKeyword);
    const result = allTagsList.filter((student) => {
      // 学生のタグ情報を取得
      const studentTags = student.tags;
      console.log(studentTags);
      // 取得できなかったらreturn
      if (studentTags == null) {
        return;
      }
      // 学生のstudentIdに基づいて、該当するpost（Studentコンポーネント）を取得
      const studentPost = posts.find((post) => post.id === student.studentId);
      console.log(posts);
      console.log(studentPost);
      if (studentPost) {
        // 該当するpostが存在し、そのtagsが検索タグのキーワードを含むかどうかチェック
        return studentTags.includes(searchTagKeyword);
      } else {
        console.log("Student post not found");
      }
    });
    console.log(result);
    setPosts(result);
  };

  return (
    <div>
      {/* ４、TagsInput.jsを読み込む、読み込みつつtextを更新するsetTagsinput関数を渡す。*/}
      {/* <TagsInput setTagsinput={setTagsinput}/> */}
      <div>
        <input
          className="search-box"
          placeholder=""
          value={searchKeyword}
          onChange={(e) => setSearchKeyword(e.target.value)}
        />
      </div>
      <div>
        <input
          className="search-box"
          placeholder=""
          value={searchTagKeyword}
          onChange={(e) => setTagSearchKeyword(e.target.value)}
        />
      </div>
      <div>
        {searchKeyword && <p>{searchKeyword}で検索</p>}
        {posts ? (
          <>
            {posts.map((data, i) => (
              // 子であるTagsInput.jsへtagsを渡す方法２A、それを子（Student.jsとTagsInput.js）にpropsで渡していく
              <Student
                data={data}
                allTagsList={allTagsList}
                setTags={setTags}
              />
            ))}
          </>
        ) : (
          <div>
            <p>Not Found!</p>
          </div>
        )}
      </div>
    </div>
  );
};
export default Top;
