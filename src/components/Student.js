import React, {useState} from 'react';

const Student = (props) => {
const [show, setShow] = useState(false)

// Gradeの平均スコアを出す関数
  const gradesAverage = (grades) => {
    let sum = 0;
    grades.forEach(function(score) {
      sum += Number(score);
    });
    let ave = sum / grades.length
    return ave;
  };

  return (
    <div className="flex">
        <div className="image">
            <img src={props.data.pic} className="profile" />
        </div>
        <div>
            <p className="name">{props.data.firstName} {props.data.lastName}</p>
            <button className="button" onClick={() => setShow(!show)}>
                {show? <div className="button_p">-</div>:<div className="button_p">+</div>}
            </button>
            <div className="info">
                <p>Email: {props.data.email}</p>
                <p>Company: {props.data.company}</p>
                <p>Skill: {props.data.skill}</p>
                <p>Average Grade: {gradesAverage(props.data.grades)}%</p>
                {show &&
                    <>
                        <p>Test 1: {props.data.grades[0]}%</p>
                        <p>Test 2: {props.data.grades[1]}%</p>
                        <p>Test 3: {props.data.grades[2]}%</p>
                        <p>Test 4: {props.data.grades[3]}%</p>
                        <p>Test 5: {props.data.grades[4]}%</p>
                        <p>Test 6: {props.data.grades[5]}%</p>
                        <p>Test 7: {props.data.grades[6]}%</p>
                        <p>Test 8: {props.data.grades[7]}%</p>
                    </>
                }
            </div>
        </div>
    </div>
  );
}
export default Student;



// １、
// Q, AxiosでデータをGetしたり、mapを回すのは親コンポーネント（Top.js）

// A, まず大前提として、今回の実装ケースではそのような構成になっているということです。
// 場合によっては、子コンポーネントでaxiosでリクエストを送ったり、mapを回すケースも十分にあります。
// 例えばStudentにpropsとして渡しているデータ、つまり生徒一人ひとりの情報の中に、リストが含まれているとすれば、子コンポーネントの中でもmapを使うことになります。


// ２、
// Q, そのGetしたデータを親コンポーネントでMapで一つづつ
// Student data={渡したいデータ}という形式で
// 子コンポーネントに渡す
// ここでは
// {posts.map((data, i) =>
//           <Student data={data} />
//         )}
// としているので
// 渡したいデータ=dataにはPostの情報が入っている。
// これを子コンポーネントに送っている。
// これによりStudentのPostを一つづつ部品化し
// 独立して操作するとこができる

// A, はい、その通りです！

// ３、
// Q, Gradeの平均スコアを出す関数gradesAverageは
// 子コンポーネントに書くことにより、
// その生徒の平均点を出すことができる。
// 親コンポーネントに書くものではない。

// A, これも正直どちらでも良いです！
// propsで渡せるのは、変数だけでなく関数も可能です。
// 親コンポーネントでgradesAverage()を定義しておいて、子コンポーネントにpropsとしてその関数を渡して使う、ということも可能です。
// 今回は、そのpropsで関数を渡す処理を書くのがめんどくさかったので子コンポーネントで定義しただけです。親コンポーネントでも子コンポーネントでも共通して使いたい関数がある場合、通常は親で定義してpropsとして子に渡します。

// ４、
// Q, 子コンポーネントで使われているprops.dataというのは
// 親コンポーネントから渡されてきたPostのデータが入っている。
// propsというのはある種の親のデータを受け取りますよという宣言みたいなもの、
// そしてdataは親で使用した、<Student data={xxx} />の部分のdataの部分である。
// つまり、{props.data.取り出したいデータの値のキー}
// みたない感じで書くことにより、
// 親で定義されているpost変数に詰め込まれているデータを取り出すことができる。

// A, はい、その通りです！！！ちなみにpropsでは複数のデータを渡すことも可能です。
// ex)
// <Student data={xxx} data2={yyy} data3={zzz} />


// ５、
// Q, 最後に親コンポーネントで
// {posts.map((data, i) =>
//           <Student data={data} />
//         )}
// と書くことにより、次々と
// 子コンポーネントにデータが渡っていき、
// データの数だけStudentコンポーネントが表示される

// A, 今回はmapの中に子コンポーネントを埋め込んでいるのでそうなります。
// 子コンポーネントである<Student/>はある意味部品みたいなもので、propsで中身のデータさえ与えてやれば、複数部品を表示しても全部同じ動作をしてくれます。これが、部品として生徒の情報を何人も表示させていながらも、各部品の中でトグルのstateを独立して持っているので、生徒ごとに点数を開いたり閉じたりできるような仕組みになっています。