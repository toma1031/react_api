// https://dev.to/prvnbist/create-a-tags-input-component-in-reactjs-ki
// https://qiita.com/aliceroot0678/items/e4eabcbe3f9f79cada55

import React from "react";
//propsで値を受け取る宣言。
const TagsInput = (props) => {
    //1, 入力したtagをいれておくtags変数を定義。（tags変数の値を親コンポーネントTop.jsに渡したい）
    const [tags, setTags] = React.useState([]);

    console.log(props)

    let tag_list = []
    tag_list.push(tags);


    const addTags = event => {
      if (event.key === "Enter" && event.target.value !== "") {
          setTags([...tags, event.target.value]);
          //2、ここで親であるStudent.jsにtagsの中身を渡す
          props.setStudentTags(tags);
          event.target.value = "";
      }
    };
    const removeTags = index => {
      setTags([...tags.filter(tag => tags.indexOf(tag) !== index)]);
    };

    return (
        <div className="tags-input">
            <div className="tags_section">
                {tags.map((tag, index) => (
                    <div className="tag tag-flex" key={index}>
                            <p className="tag-p">{tag}</p>
                            {/* <p className="" onClick={() => removeTags(index)} > X</p> */}
                    </div>
                ))}
            </div>
            <input
                type="text"
                onKeyUp={event => addTags(event)} 
                placeholder="Press enter to add tags"
            />

        </div>
    );
};
export default TagsInput;