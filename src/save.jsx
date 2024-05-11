//import logo from './logo.svg';
import './test.css';

function App() {
  return (
    <div className="App">
      <div className='container'>
        <div className='title'>仲間外れ探し</div>
        <div id="show" className='show'></div>
      </div>
    </div>
  );
}
export default App;

window.onload = game;
window.addEventListener('resize', function() {
  try{
    const char = document.querySelectorAll('.char');

  }
  catch{}
});

function game(){
  let time = 0;
  let count = 0;
  let score = 0;
  let flag = false;
  let event = 0;//0:タイトル,1:ゲーム,2:結果
  //["",""],
  const show = document.getElementById('show');
  const pare = [
    ["木","本"],["品","晶"],["齋","齊"],["緑","縁"],["日","曰"],
    ["複","復"],["石","右"],["宇","字"],["午","牛"],["柴","紫"],
    ["詑","詫"],["眠","眼"],["綱","網"],["衝","衛"],["妺","妹"],
  ];
  const mode = [`
    <p>タイムアタック：10問連続正解のタイムアタック</p>
    <p>3sエンドレス：各問3秒以内で正解するエンドレス</p>
    <button class="mode1">タイムアタック</button>
    <button class="mode2">3sエンドレス</button>
  `];
  let numbers = getRandomNumbers(0, pare.length-1, 10);

  function loop(){
    let stop = false;
    if(event === 0){
      try{
        document.querySelector('#show').replaceChildren();
        document.querySelector('.text').remove();
      }
      catch{}
      show.insertAdjacentHTML('beforeend', mode);
      document.querySelector('.mode1').addEventListener('click', () => {
        flag = true;
        event = 1;
        loop();
      });
      document.querySelector('.mode2').addEventListener('click', () => {
        flag = true;
        event = 2;
        loop();
      });
    }
    else if(event === 1&&flag){
      try{
        document.querySelector('#show').replaceChildren();
        document.querySelector('.text').remove();
      }
      catch{}
      let F =  Math.floor(Math.random() * 100)
      let X = Math.floor(Math.random() * 2)
      let Y = X === 0 ? 1 : 0
      for(let i=0;i<100;i++){
        const char = document.createElement('div');

        if(i===F){
          char.classList.add('char','F');
          char.textContent = pare[numbers[count]][Y];
          // eslint-disable-next-line no-loop-func
          char.onclick = () => {
            if(!stop){
              stop = true;
              const p = document.createElement('p');
              p.classList.add('text');
              p.textContent = '正解';
              p.style.color = 'red';
              show.appendChild(p);
              if(count === 1){
                setTimeout(function(){
                  document.querySelector('.text').remove();
                  show.classList.remove('show');
                  show.style.color = 'antiquewhite'
                  const p = document.createElement('p');
                  p.classList.add('text');
                  p.textContent = 'クリア';
                  p.style.color = 'red';
                  show.appendChild(p);
                },1000);
                
              }
              else{setTimeout(loop, 3000);}
            }
          }
        }
        else{
          char.classList.add('char');
          char.textContent = pare[numbers[count]][X];
          char.onclick = () => {
            if(!stop){
              stop = true;
              const p = document.createElement('p');
              p.classList.add('text');
              p.textContent = '不正解';
              p.style.color = 'blue';
              show.appendChild(p);
              const F =  document.querySelector('.F');
              F.style.backgroundColor = 'green';
              setTimeout(function(){
                const button = document.createElement('button');
                button.textContent = 'リトライ';
                button.classList.add('btn1');
                button.onclick = () => {
                  count = 0;
                  numbers = getRandomNumbers(0, pare.length-1, 10);
                  loop();
                }
                show.appendChild(button);
                const button2 = document.createElement('button');
                button2.classList.add('btn2');
                button2.textContent = 'タイトルに戻る';
                button2.onclick = () => {
                  event = 0;
                  count = 0;
                  numbers = getRandomNumbers(0, pare.length-1, 10);
                  loop();
                }
                show.appendChild(button2);
              },1500);
            } 
          }
        }
        show.appendChild(char);
      }
      count++;
    }
    else if(event === 2&&flag){
      try{
        document.querySelector('#show').replaceChildren();
        document.querySelector('.text').remove();
      }
      catch{}
    }
  }
  function loop2(){
    try{
      document.querySelector('#show').replaceChildren();
      document.querySelector('.text').remove();
    }
    catch{}
    let F =  Math.floor(Math.random() * 100)
    let X = Math.floor(Math.random() * 2)
    let Y = X === 0 ? 1 : 0
    let stop = false;
    for(let i = 0; i < 100; i++){
      const char = document.createElement('div');
      if(i===F){
          char.classList.add('char','F');
          char.textContent = pare[count][Y];
          char.addEventListener('click', () => {
              if(!stop){
                  stop = true;
                  const p = document.createElement('p');
                  p.classList.add('text');
                  p.textContent = '正解';
                  p.style.color = 'red';
                  document.body.appendChild(p);
                  setTimeout(loop, 3000);
              }
          });
      }
      else{
          char.classList.add('char','T');
          char.textContent = pare[count][X];
          char.addEventListener('click', () => {
              if(!stop){
                  stop = true;
                  const p = document.createElement('p');
                  p.classList.add('text');
                  p.textContent = '不正解';
                  p.style.color = 'blue';
                  document.body.appendChild(p);
                  const F =  document.querySelector('.F');
                  F.style.color = 'red';
                  F.style.backgroundColor = 'green';
                  setTimeout(loop, 3000);
              } 
          });
      }
      char.addEventListener('mouseover', () => {
          if(!stop){
              char.style.color = 'green';
              char.style.backgroundColor = 'yellow';
          }
      });
      char.addEventListener('mouseout', () => {
          if(!stop){
              char.style.color = 'black';
              char.style.backgroundColor = 'antiquewhite';
          }
      });
      show.appendChild(char);
  }
  count++;
  if(count === pare.length)count = 0;
  }
  loop();
}
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