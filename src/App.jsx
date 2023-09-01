import './App.css'
import Container from './Container'
import Display from './Display';
import BtnContainer from './BtnContainer';
import Button from './Button';
import { useState } from 'react';


 const btnValues = [ 
  ['C','%','+/-','/'],
  [1,2,3,'X'],
  [4,5,6,'+'],
  [7,8,9,'-'],
  [0,'.','=']
 ]

 const toLocaleString = (num) =>
  String(num).replace(/(?<!\..*)(\d)(?=(?:\d{3})+(?:\.|$))/g, "$1 ");

const removeSpaces = (num) => num.toString().replace(/\s/g, "");


function App() {

  const [calc,setCalc] = useState({
    num:0,
    sign: '',
    res: 0
  })


 //clicking on a number
 function onNumHandler(e){
  e.preventDefault();
    const value = e.target.innerHTML;

    if (removeSpaces(calc.num).length < 16) {
      setCalc({
        ...calc,
        num:
          calc.num === 0 && value === "0"
            ? "0"
            : removeSpaces(calc.num) % 1 === 0
            ? toLocaleString(Number(removeSpaces(calc.num + value)))
            : toLocaleString(calc.num + value),
        res: !calc.sign ? 0 : calc.res,
      });
    }
 }


 //clicking on a sign

 function onSignHandler(e){
  e.preventDefault();
  const value = e.target.innerHTML;
  console.log(value)

  setCalc(
    {
      ...calc,
      sign: value,
      res: !calc.res && calc.num ? calc.num : calc.res,
      num: 0,
    }
  );
 }


 //clicking equals sign

 function onEqualsHandler(){
  if(calc.sign && calc.num){
    const math = (a,b,sign) =>  //definition of function math consists of a signle expression
      sign === '+'
        ? a + b
        : sign === '-'
        ? a - b
        :sign === 'X'
        ? a * b
        : a / b

    

    setCalc(
      {
        ...calc,
        res: calc.num === '0' && calc.sign === '/'
          ? `can't divide with zero`
          :toLocaleString(
            math(
              Number(removeSpaces(calc.res)),
              Number(removeSpaces(calc.num)),
              calc.sign
            )
          ),
        sign: '',
        num: 0,
      }
    );
  }
 }

 //invert operation
 
 function onInvertHandler(){
  setCalc(
   {
    ...calc,
    num: calc.num ? toLocaleString(removeSpaces(calc.num) * -1) : 0,
    res: calc.res ? toLocaleString(removeSpaces(calc.res) * -1) : 0,
    sign: '',
   }
  );
 }


 //percentage operation

 function onPercentageHandler(){
  let num = calc.num ? parseFloat(removeSpaces(calc.num)) : 0;
  let res = calc.res ? parseFloat(removeSpaces(calc.res)) : 0;
   setCalc(
    {
      ...calc,
      num: (num/Math.pow(100,1)),
      res: (res/Math.pow(100,1)),
      sign: '',
    }
  )
 }


 //reset operation

 function onResetHandler(){
  setCalc(
    {
      ...calc,
      sign: '',
      num: 0,
      res: 0
    }

  )
 }

 //decimal operation

 function onDecimalHandler(e){
  e.preventDefault();
  const value = e.target.innerHTML;
  setCalc(
    {
      ...calc,
      num: !calc.num.toString().includes('.') ? calc.num + value : calc.num,
    }
  )
 }


  return (
    <>
     <Container>
      <Display value={calc.num ? calc.num : calc.res} />
      <BtnContainer>
      {
        btnValues.flat().map((btn,i)=>{
          return(
            <Button 
              key={i}
              value={btn}
              className={btn === '=' ? 'equals' : ''}
              onclick={
                btn === 'C'
                  ? onResetHandler
                  : btn === '+/-'
                  ? onInvertHandler
                  : btn === '%'
                  ? onPercentageHandler
                  : btn === '='
                  ? onEqualsHandler
                  : btn === '/'|| btn === 'X'|| btn === '+' | btn=== '-'
                  ? onSignHandler
                  :btn === '.'
                  ? onDecimalHandler
                  : onNumHandler
              }
              
            />

          )
        })
      }
        
      </BtnContainer>
     </Container>
    </>
  )
}

export default App
