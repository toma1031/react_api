// https://dev.to/prvnbist/create-a-tags-input-component-in-reactjs-ki
// https://qiita.com/aliceroot0678/items/e4eabcbe3f9f79cada55


import React, { useState } from "react";

//propsで値を受け取る宣言。
const TagsInput = (props) => {
  const [inputValue, setInputValue] = useState(""); // Stateを使ってInputの値を管理
  const handleInputChange = (event) => {
    setInputValue(event.target.value); // 入力された値をStateに設定
    console.log(inputValue);
  };


  const addTags = (event) => {
    if (event.key === "Enter" && event.target.value !== "") {
      props.setTags((prevTags) => {
        return prevTags.map((student) => {
          // student.studentId がnumberなのに対して props.studentId がstringなので厳密等価演算子(===)ではなくただの等価演算子を使用しています。
          if (student.studentId == props.studentId) {
            return {
              ...student,
              tags: [...student.tags, event.target.value],
            };
          } else {
            return student; // 学生オブジェクトを変更せずに返す
          }
        });
      });
      event.target.value = ""; // 入力フィールドの値を空にする
    }
  };

  console.log(props.allTagsList);

  return (
    <div className="tags-input">
      <div className="tags_section">
        {/* props.tagsの中身がある場合はmapでprops.tagsの中身を表示させるようにする、ない場合は表示しない */}
        {props.allTagsList.map((tagList, index) => (
          <>
            {props.studentId == tagList.studentId && (
              <>
              {tagList.tags.map((tag, index) => (
                  <div className="tag tag-flex" key={index}>
                  <p className="tag-p">{tag}</p>
              </div>
                ))}
              </>
            )}
          </>
        ))}
      </div>
      <input
        type="text"
        onKeyUp={(event) => addTags(event)}
        placeholder="Press enter to add tags"
        onChange={handleInputChange}
      />
    </div>
  );
};
export default TagsInput;
