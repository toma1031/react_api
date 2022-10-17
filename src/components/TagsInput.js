// https://dev.to/prvnbist/create-a-tags-input-component-in-reactjs-ki

import React from "react";
const TagsInput = () => {
    const [tags, setTags] = React.useState([]);
    const addTags = event => {
      if (event.key === "Enter" && event.target.value !== "") {
          setTags([...tags, event.target.value]);
          event.target.value = "";
      }
    };
    const removeTags = index => {
      setTags([...tags.filter(tag => tags.indexOf(tag) !== index)]);
    };

    return (
        <div className="tags-input">
            <>
                {tags.map((tag, index) => (
                    <div className="tag tag-flex" key={index}>
                            <p className="tag-p">{tag}</p>
                            {/* <p className="" onClick={() => removeTags(index)} > X</p> */}
                    </div>
                ))}
            </>
            <input
                type="text"
                onKeyUp={event => addTags(event)}
                placeholder="Press enter to add tags"
            />
        </div>
    );
};
export default TagsInput;