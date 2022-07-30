import { useEffect, useRef, useState } from 'react';
import './App.css'
function App() {
  const [input, setInput] = useState([''])
  const [winner, setWinner] = useState('')
  const [spin, setSpin] = useState(false)
  const [randomSpin, setRandomSpin] = useState('')
  const [popUpResult, setPopUpResult] = useState(false)
  const angle = useRef(0)
  const ref = useRef()
  function cal(){
    const sin = Math.sin((Math.PI*(90-(360/input.length)/2))/180)
    const b = 250*sin
    const bPercent = b*100/250
    return bPercent
  }
  function width(){
    const cos = Math.cos(Math.PI*(90 - 360/(input.length*2))/180)
    const a = 250*cos
    return 2*a
  }
  function handleChange(event){
    setInput(event.target.value.split('\n'))
  }
  function checkWinner(el1, el2){
    const {top, bottom, left, right} = el2.getBoundingClientRect()
    const winners= []
    for(let i = 0; i < el1.length; i++){
      if(el1[i].getBoundingClientRect().top < top 
      && el1[i].getBoundingClientRect().bottom > bottom
      && el1[i].getBoundingClientRect().right > right
      && el1[i].getBoundingClientRect().left < left){
        winners.push(el1[i])
      }
    }
    setWinner(winners.sort((a, b)=>{
      return b.getBoundingClientRect().right - a.getBoundingClientRect().right
    })[0])
    setPopUpResult(true)
  }
  function handleSpin(){
    setSpin(prev=> !prev)
    const wheel = document.querySelector('.wheel')
    wheel.addEventListener('transitionend', ()=>checkWinner(document.querySelectorAll('.rotate-thing'), document.querySelector('.check-point')))
  }
  function handlePopUpWindow(e){
    console.log('xin chao')
    e.stopPropagation()
  }
  useEffect(()=>{
    setRandomSpin(Math.floor(Math.random() * (6000 - 5000) ) + 5000)
    angle.current = winner
  }, [spin])

  return (
    <div className='main'>
      <textarea onChange={handleChange} className='input-field'></textarea>
      <div className='main-wheel'>
        {
          input[0]? 
            <div className='wheel' ref={ref} style={spin?{transition:`transform 8s ease 0s`, transform:`rotate(${randomSpin}deg)`}:{}}>
              {
                  input.map((rotate, index)=>{
                  let randomColor = Math.floor(Math.random()*16777215).toString(16);
                  return (<div 
                  className='rotate-thing' 
                  key={index} 
                  style={{clipPath: `polygon(0 ${100-cal(input.length)}%, 0 0, 100% 0, 100% ${100-cal(input.length)}%, 50% 100%)`,
                  transform:`rotate(${index*360/input.length}deg)`,
                  backgroundColor:`#${randomColor}`,
                  width: `${width()}px`}}>
                    <p>{rotate}</p>
                  </div>)
                })
              }
              <button className='spin-btn' onClick={handleSpin}>spin</button>
            </div>
            :<div className='rotate-thing-default'>hello there</div>
        }
        <div className='check-point-overlay'>
          <div className='check-point'></div>
        </div>
      </div>
      {popUpResult && <div className='pup-up-winner' onClick={handlePopUpWindow}> 
        <div className='winner-is' onClick={()=>{console.log('child')}}><p>{winner.querySelector('p').innerHTML}</p></div>
      </div>}
    </div>
  );
}

export default App;