//import logo from './logo.svg';
import { useState } from 'react';
import './search.css';

const pare = [
    ["木","本"],["品","晶"],["齋","齊"],["緑","縁"],["日","曰"],
    ["複","復"],["石","右"],["宇","字"],["午","牛"],["柴","紫"],
    ["詑","詫"],["眠","眼"],["綱","網"],["衝","衛"],["妺","妹"],
];

let fin = false;
export default function Main(){
    //console.log("main");
    let max = 64; // 文字の個数
    let Q = 10; // 問題数
    const [time, setTime] = useState(0);
    const [pointtime, setPointtime] = useState(0);
    const [count, setCount] = useState(0);
    const [f01, setF01] = useState(Array(pare.length).fill(0)); // 2択
    const [F, setF] = useState(0);
    const [ptext, setPtext] = useState('');
    const [num, setNum] = useState(Array(pare.length).fill(0)); // 文字選択
    const [event, setEvent] = useState(0); // 0: タイトル, 1: ゲーム, 2: 結果
    let Sis;
    let show;

    //console.log(num);

    switch (event) {
        case 0:
            show = 
            <div>
                <p>{max}個の文字から仲間外れを探すゲーム</p>
                <p>タイムアタック：10問連続正解のタイムアタック</p>
                <button className="mode1" onClick={mode1}>タイムアタック</button>
            </div>
            Sis = null;
            function mode1(){
                setF(Math.floor(Math.random() * max));
                const random = getRandomNumbers(0, pare.length-1, Q);
                setNum(random);
                const random2 = f01list(Q);
                setF01(random2);
                setEvent(1);
                setPointtime(Date.now());
                fin = false;
            }
            function mode2(){
                setF(Math.floor(Math.random() * max));
                setEvent(2);
            }
            break;
        case 1:
            const charToShow = pare[num[count]][f01[count]];
            const char = Array(max).fill(charToShow).map((char, index) => {
                const X = f01[count] === 0 ? 1 : 0
                const charToShow2 = pare[num[count]][X];
                return index === F ? <div key={index} className="F" onClick={taF}>{charToShow2}</div> : <div key={index} className='T' onClick={taT}>{char}</div>;
            });
            show = <div>{char}</div>;
            if(!fin){
                const timeInterval = setInterval(() => {
                    setTime(((Date.now() - pointtime)/1000).toFixed(2));
                    clearInterval(timeInterval);
                },10);
            }
            
            Sis = 
                <div>
                    <span className='count'>{count+1}/{Q}</span>
                    <span>Time：{time}</span>
                </div>;
            
            function taT(){
                if(fin)return;
                fin = true;
                setPtext(<p className='text' style={{color:'blue'}}>不正解</p>);
                const charF =  document.querySelector('.F');
                charF.style.backgroundColor = 'green';
                setTimeout(() => {
                    setPtext('');
                    charF.style.removeProperty('background-color');
                    setCount(0);
                    setEvent(0);
                    setTime(0);
                },2000);
            }
            function taF(){
                if(fin)return;
                setPtext(<p className='text' style={{color:'red'}}>正解</p>);
                setTimeout(() => {
                    setPtext('');
                    if(count===Q-1){
                        fin = true;
                    }
                    else{
                        setF(Math.floor(Math.random() * max));
                        setCount(count+1);
                    }
                },1000);
            }
            break;
        case 2:
            show = <div>結果画面</div>;
            break;
        default:
            show = null;
    }
    return (
        <div className="App">
            <div className='container'>
                <div className='title'>仲間外れ探し</div>
                {Sis}
                <div id="show" className='show'>
                    {ptext}
                    {show}
                </div>
            </div>
        </div>
    );
};

function getRandomNumbers(min, max, count) {
    if (count > max - min + 1 || max < min) {
      return [];
    }
    var numbers = [];
    while (numbers.length < count) {
      var randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
      if (!numbers.includes(randomNumber)) {
        numbers.push(randomNumber);
      }
    }
    return numbers;
}
function f01list(count){
    let numbers = [];
    while(numbers.length<count){
        numbers.push(Math.floor(Math.random() * 2));
    }
    return numbers;
}
