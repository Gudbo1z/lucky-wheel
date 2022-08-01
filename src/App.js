import { useEffect, useRef, useState } from 'react';
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';

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
  const [inputField, setInputField]= useState(false)
  const [resultIsChoose, setResultIsChoose] = useState(false)
  const wheel = useRef()
  const wheelRule = useRef()
  const angle = useRef(0)
  const dataRef = useRef([])
  const color = ['#fff161', '#f6be64', '#ed8b67', '#e25069', '#df486a', '#a52868', '#732766', '#fde961', '#f4b464', '#eb8167', '#e1486a', '#d02a6b', '#9d2868', '#6b2665', '#fce162', '#f3ad65', '#e97967', '#e0426b', '#c92a6a', '#972868', '#5d2665', '#fad962', '#f1a565', '#e97268', '#df3b6b', '#c22a6a', '#8e2767', '#5d2665', '#f9d162', '#f09e66', '#e76968', '#de356b', '#bb2a6a', '#872766', '#542563', '#f7c962', '#ef9666', '#e56168', '#dd2d6c', '#b32969', '#802767', '#4e2563', '#f6bf64', '#ed8c66', '#e45669', '#db216d', '#ac2869', '#772665', '#462462']
  const dataLanguage = {
    'English': ['option', 'language', 'result', 'chart'],
    'Tiếng Việt': ['chế độ chơi', 'ngôn ngữ', 'kết quả', 'thống kê']
  }
  const [languages, setLanguage] = useState(dataLanguage['English'])
  const [data, setData] = useState([])
  const inputFieldContent = (
    <div className='input-field-main' onClick={(e)=>{
      e.stopPropagation()
    }}>
      <div className='options'>
        <p>OPTION</p>
        <ul>
          <li><p>single</p></li>
          <li><p>dual</p></li>
          <li><p>challenges</p></li>
        </ul>
      </div>
  </div>)
  const language = (
      <div className='language' onClick={(e)=>{
        e.stopPropagation()
      }}>
        <p>LANGUAGE</p>
        <ul>
          <li className='active'>English</li>
          <li>Tiếng Việt</li>
          <li>Français</li>
          <li>中国人</li>
          <li>German</li>
          <li>Русский</li>
          <li>عربي</li>
          <li>한국어</li>
          <li>日本</li>
          <li>മലേഷ്യൻ</li>
          <li>ປະເທດລາວ</li>
          <li>ໄທ</li>
        </ul>
      </div>
    )
  const result =(
    <div className='result'>
      <p>RESULT</p>
      <div className='result-content'>
        <div className='players'>
          <p>player's names</p>
          <ul>{input.map((input, index)=>{
              return (
                  <li key={index}>{input}</li>
              )
            })}
          </ul>
        </div>
        <div className='shots'>
          <p>total shots</p>
          <ul>
            {
              data.map((data, index)=>{
                return <li key={index}>{data.data}</li>
              })
            }
          </ul>
        </div>
      </div>
    </div>
  )
  const options = {
    accessibility:{
      enabled: false
    },

    title: {
      text: 'result'
  },

  subtitle: {
      text: Date()
  },

  yAxis: {
      title: {
          text: 'total shots'
      }
  },

  xAxis: {
      accessibility: {
          rangeDescription: 'Range: 2010 to 2017'
      }
  },

  legend: {
      layout: 'vertical',
      align: 'right',
      verticalAlign: 'middle'
  },

  plotOptions: {
      series: {
          label: {
              connectorAllowed: false
          },
          pointStart: 2010
      }
  },

  series: [{
      name: 'Installation',
      data: [43934, 52503, 57177, 69658, 97031, 119931, 137133, 154175]
  }, {
      name: 'Manufacturing',
      data: [24916, 24064, 29742, 29851, 32490, 30282, 38121, 40434]
  }, {
      name: 'Sales & Distribution',
      data: [11744, 17722, 16005, 19771, 20185, 24377, 32147, 39387]
  }, {
      name: 'Project Development',
      data: [null, null, 7988, 12169, 15112, 22452, 34400, 34227]
  }, {
      name: 'Other',
      data: [12908, 5948, 8105, 11248, 8989, 11816, 18274, 18111]
  }],

  responsive: {
      rules: [{
          condition: {
              maxWidth: 500
          },
          chartOptions: {
              legend: {
                  layout: 'horizontal',
                  align: 'center',
                  verticalAlign: 'bottom'
              }
          }
      }]
  }
  }
  const chart =(
    <div className='chart' id='chart'>
      <p>RESULT CHART</p>
      <HighchartsReact
        highcharts={Highcharts}
        options={options}
      />
    </div>
  )
  
  const [popUpContent, setPopUpConTent] = useState(inputFieldContent)

    
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
    const newWinner = winners.sort((a, b)=>{
      return b.getBoundingClientRect().right - a.getBoundingClientRect().right
    })[0]
    if(el1[0].className == 'rotate-thing'){
      setWinner(newWinner)
    }
    if(el1[0].className == 'rotate-thing-rule'){
      setRule(newWinner)
    }
    setData(prev => prev.map((e, index)=>{
      console.log(e.name, 'vs', newWinner.querySelector('p').innerHTML)
      if(e.name == newWinner.querySelector('p').innerHTML) return ({
        ...e, data: e.data+1
      })
      else return e
    }))
    setPopUpResult(true)
  }
  console.log(data)

  function handleSpin(e){
    e.preventDefault()
    setSpin(true)
    wheelRule.current.addEventListener('transitionend', ()=>{
      checkWinner(document.querySelectorAll('.rotate-thing-rule'), document.querySelector('.check-point-rule'))
    })
    wheel.current.addEventListener('transitionend', ()=>{
      checkWinner(document.querySelectorAll('.rotate-thing'), document.querySelector('.check-point'))
    })
  }

  function handlePopUpWindow( ){
    setPopUpResult(false)
    setSpin(false)
    angle.current = randomSpin
    setRandomSpin((Math.floor(Math.random() * (6000 - 5000))) + 5000 + angle.current)
  }

  function windowResize(){
      if(input[1])setRadius(wheel.current.clientWidth/2)
      setRadiusRule(wheelRule.current.clientWidth/2)
  }

  function handleInputField(){
    setInputField(false)
    setResultIsChoose(false)
  }
  useEffect(()=>{setData(input.map((input, index)=>{
      return ({
        name: input,
        data: 0
      })
    }))
    dataRef.current = input
  }, [input])
  // console.log(data)
  // useEffect(()=>{
  //   if(winner != '') {
  //     setData(prev => prev.map((e, index)=>{
  //     if(e.name == winner.querySelector('p').innerHTML) return {
  //       ...e, data: e.data+1
  //     }
  //     else return e
  //   }))
  // }
  // }, [winner])
  useEffect(()=>{
    const list = document.querySelectorAll('.language > ul >li')
    for(let i = 0; i< list.length; i++){
      list[i].addEventListener('click', ()=>{
        if(list[i].innerHTML == 'English' || list[i].innerHTML == 'Tiếng Việt'){
          let currentList = document.querySelector('.active')
          currentList.removeAttribute('class')
          list[i].setAttribute('class', 'active')
          setLanguage(dataLanguage[list[i].innerHTML])
        }
        else alert(list[i].innerHTML+' is not available')
      })
    }
  }, [popUpContent])

  useEffect(()=>{
    const listNavbar = document.querySelectorAll('.navbar >ul >li')
    for(let i = 0; i<listNavbar.length; i++){
      listNavbar[i].addEventListener('click', ()=>{
        setInputField(true)
        if(listNavbar[0]==listNavbar[i]) setPopUpConTent(inputFieldContent)
        if(listNavbar[1]==listNavbar[i]) setPopUpConTent(language)
        if(listNavbar[2]==listNavbar[i]) setResultIsChoose(true)
        if(listNavbar[3]==listNavbar[i]) setPopUpConTent(chart)
      })
    }
    const wheel1 = document.querySelector('.main-wheel')
    const wheelRule1 = document.querySelector('.wheel-rule-cover')
    window.addEventListener('resize', windowResize)
    setRandomSpin(Math.floor(Math.random() * (6000 - 5000))+5000)
    setRadius(wheel1.clientWidth/2)
    setRadiusRule(wheelRule1.clientWidth/2)
  }, [])

  return (
    <div className='main'>

      <div className='navbar'>
        <ul>
          {
            languages.map((lang, index)=>{
              return (
                <li key={index}><p>{lang}</p></li>
              )
            })
          }
        </ul>
      </div>

      <div className='main-wheel' ref={wheel} >
        {
          input[1]? 
            <div className='wheel' style={spin?{transition:`transform 8s ease 0s`, transform:`rotate(${randomSpin}deg)`}:{transform:`rotate(${angle.current}deg)`}}>
              {
                input.map((rotate, index)=>{
                let randomColor = color[index]
                return (<div 
                className='rotate-thing' 
                key={index} 
                style={{clipPath: `polygon(0 ${100-cal(radius, input.length)}%, 0 0, 100% 0, 100% ${100-cal(radius, input.length)}%, 50% 100%)`,
                transform:`rotate(${index*360/input.length}deg)`,
                backgroundColor:`${randomColor}`,
                width: `${width(radius, input.length)}px`}}>
                  <p>{rotate}</p>
                </div>)
                })
              }
            </div>
          :<div className='rotate-thing-default'>HELLO THERE! <i className="fa-solid fa-heart-pulse"></i></div>
        }


{/* let randomColor = Math.floor(Math.random()*16777215).toString(16); */}

        <div className='wheel-rule-cover' style={inputRule[1]?{}:{boxShadow:'none', border:'none'}} ref={wheelRule}>
          { inputRule[1] &&
              <div className='wheel-rule' style={spin?{transition:`transform 9s ease 0s`, transform:`rotate(-${randomSpin+100}deg)`}:{transform:`rotate(-${angle.current+100}deg)`}}>
                {
                  inputRule.map((rotate, index)=>{
                    let randomColor = color.reverse()[index]
                    return (<div
                      className='rotate-thing-rule' 
                      key={index} 
                      style={{clipPath: `polygon(0 ${100-cal(radiusRule, inputRule.length)}%, 0 0, 100% 0, 100% ${100-cal(radiusRule, inputRule.length)}%, 50% 100%)`,
                      transform:`rotate(${index*360/inputRule.length}deg)`,
                      backgroundColor:`${randomColor}`,
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




      {input[1] && <button className='spin-btn' onClick={handleSpin}>SPIN !</button>}
        <div className='check-point-overlay'>
          <div className='check-point'></div>
        </div>
      </div>
      <div className='input'>
        <p>INPUT</p>
        <div className='input-main'>
          <div className='input-main-child'>
            <p>players's names</p>
            <textarea onChange={handleChange} className='input-field-wheel'></textarea>
          </div>
          <div className='input-main-child'>
            <p>challenges</p>
            <textarea onChange={handleChangeRule} className='input-field-rule'></textarea>
          </div>
        </div>
      </div>

      <div className='input-field' onClick={handleInputField} style={inputField? {display:'block'}:{display:'none'}}>
            {resultIsChoose? result:popUpContent}
            {/* {chart} */}
      </div>


      {popUpResult && 
      <div className='pup-up-winner' onClick={handlePopUpWindow}> 
        <div className='winner-is' onClick={(e)=>{e.stopPropagation()}}>
          <p> {winner.querySelector('p').innerHTML} sẽ uống {rule?rule.querySelector('p').innerHTML: ''}</p>
        </div>
      </div>}
    </div>
  );
}

export default App;