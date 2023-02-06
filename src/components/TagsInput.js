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
        // ...tags,は一体何をしているのでしょう？
        // props.setStudentTags(tags);
        // これだと、setStudentTagsの引数にTagsInputコンポーネントで定義されたtagsという変数をとってあり、tagsという変数自体が画面が再描画されるまで新たな値を参照できません。つまり再描画前、一週前の状態のtagsが引数に入ります。
        // それに対して、
        // props.setStudentTags([...tags, event.target.value]);
        // これだと、変更前のtags（つまり一週前の状態のtags）に今回更新されたevent.target.valueを追加された配列を引数に取ってくれます。
        // JavaScriptのスプレッド構文です。スプレッド構文を用いることにより、オブジェクトを展開し、要素を追加することが可能です。
        // なので上記二つの違いについてはuseStateの値が更新されるタイミングと、スプレッド構文の基礎を再度復習していただければ違いがわかると思います。
        // https://amateur-engineer.com/react-usestate-object-update/#toc4
        // https://beyondjapan.com/blog/2022/08/spread_syntax/
          setTags([...tags, event.target.value]);
          //2、ここで親であるStudent.jsにtagsの中身を渡す
          props.setStudentTags([...tags, event.target.value]);
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