import { useEffect, useRef, useState } from 'react';
import './App.css'

function App() {
  const [input, setInput] = useState([])
  const [inputRule, setInputRule] = useState([])
  const [winner, setWinner] = useState('')
  const [rule, setRule] = useState('')
  const [spin, setSpin] = useState(false)
  const [randomSpin, setRandomSpin] = useState('')
  const [popUpResult, setPopUpResult] = useState(false)
  const [radius, setRadius] = useState('')
  const [radiusRule, setRadiusRule] = useState('')
  const wheel = useRef()
  const wheelRule = useRef()
  const angle = useRef(0)


  function cal(radius, input){
    const sin = Math.sin((Math.PI*(90-(360/input)/2))/180)
    const b = radius*sin
    const bPercent = b*100/radius
    return bPercent
  }

  function width(radius, input){
    const cos = Math.cos(Math.PI*(90 - 360/(input*2))/180)
    const a = radius*cos
    return 2*a
  }

  function handleChange(event){
    let value = event.target.value.split('\n')[event.target.value.split('\n').length-1]
    if(value) {
      setInput(event.target.value.split('\n'))
    }
  }

  function handleChangeRule(event){
    let value = event.target.value.split('\n')[event.target.value.split('\n').length-1]
    if(value) {
      setInputRule(event.target.value.split('\n'))
    }
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
    if(el1[0].className == 'rotate-thing'){
      setWinner(winners.sort((a, b)=>{
        return b.getBoundingClientRect().right - a.getBoundingClientRect().right
      })[0])
    }
    if(el1[0].className == 'rotate-thing-rule'){
      setRule(winners.sort((a, b)=>{
        return b.getBoundingClientRect().right - a.getBoundingClientRect().right
      })[0])
    }
    setPopUpResult(true)
  } 

  function handleSpin(){
    setSpin(true)
    wheelRule.current.addEventListener('transitionend', ()=>{
      checkWinner(document.querySelectorAll('.rotate-thing'), document.querySelector('.check-point'))
      checkWinner(document.querySelectorAll('.rotate-thing-rule'), document.querySelector('.check-point-rule'))
    })
  }

  function handlePopUpWindow( ){
    setPopUpResult(false)
    setSpin(false)
    angle.current = randomSpin
    setRandomSpin((Math.floor(Math.random() * (6000 - 5000))) + 5000 + angle.current)
  }

  function windowResize(){
      setRadius(wheel.current.clientWidth/2)
      setRadiusRule(wheelRule.current.clientWidth/2)
  }

  useEffect(()=>{
    const wheel1 = document.querySelector('.main-wheel')
    const wheelRule1 = document.querySelector('.wheel-rule-cover')
    window.addEventListener('resize', windowResize)
    setRandomSpin(Math.floor(Math.random() * (6000 - 5000))+5000)
    setRadius(wheel1.clientWidth/2)
    setRadiusRule(wheelRule1.clientWidth/2)
  }, [])

  return (
    <div className='main'>
      <div className='main-wheel'>




        {
          input[0]? 
            <div className='wheel' ref={wheel} style={spin?{transition:`transform 8s ease 0s`, transform:`rotate(${randomSpin}deg)`}:{transform:`rotate(${angle.current}deg)`}}>
              {
                input.map((rotate, index)=>{
                let randomColor = Math.floor(Math.random()*16777215).toString(16);
                return (<div 
                className='rotate-thing' 
                key={index} 
                style={{clipPath: `polygon(0 ${100-cal(radius, input.length)}%, 0 0, 100% 0, 100% ${100-cal(radius, input.length)}%, 50% 100%)`,
                transform:`rotate(${index*360/input.length}deg)`,
                backgroundColor:`#${randomColor}`,
                width: `${width(radius, input.length)}px`}}>
                  <p>{rotate}</p>
                </div>)
                })
              }
            </div>
          :<div className='rotate-thing-default'>hello there</div>
        }




        <div className='wheel-rule-cover' ref={wheelRule}>
          {
            inputRule[0] && 
              <div className='wheel-rule' style={spin?{transition:`transform 9s ease 0s`, transform:`rotate(-${randomSpin+100}deg)`}:{transform:`rotate(-${angle.current+100}deg)`}}>
                {
                  inputRule.map((rotate, index)=>{
                    let randomColor = Math.floor(Math.random()*16777215).toString(16);
                    return (<div
                      className='rotate-thing-rule' 
                      key={index} 
                      style={{clipPath: `polygon(0 ${100-cal(radiusRule, inputRule.length)}%, 0 0, 100% 0, 100% ${100-cal(radiusRule, inputRule.length)}%, 50% 100%)`,
                      transform:`rotate(${index*360/inputRule.length}deg)`,
                      backgroundColor:`#${randomColor}`,
                      width: `${width(radiusRule, inputRule.length)}px`}}>
                    <p>{rotate}</p>
                  </div>)
                  })
                }
              </div>
            }
          <div className='check-point-rule-overlay'>
            <div className='check-point-rule'></div>
          </div>
        </div>




      {input[0] && <button className='spin-btn' onClick={handleSpin}>spin</button>}
        <div className='check-point-overlay'>
          <div className='check-point'></div>
        </div>
      </div>

      <textarea onChange={handleChange} className='input-field'></textarea>

      <textarea onChange={handleChangeRule} className='input-field-rule'></textarea>

      {popUpResult && 
      <div className='pup-up-winner' onClick={handlePopUpWindow}> 
        <div className='winner-is' onClick={(e)=>{e.stopPropagation()}}>
          <p>{winner.querySelector('p').innerHTML} sẽ làm {rule.querySelector('p').innerHTML}</p>
        </div>
      </div>}
    </div>
  );
}

export default App;