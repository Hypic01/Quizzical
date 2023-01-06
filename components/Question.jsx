import React from 'react'

export default function Question(props){
    // key={i} 
    // question={q.question} 
    // questionNum={q.questionNum} 
    // answer={q.answer} 
    // answerIndex={q.answerIndex}
    // selectChoice={selectChoice}
    // choice={choice[i]}
    // selectChoiceStyle={selectChoiceStyle}
    
    // const [state, setState] = React.useState(props.choice)
    const [choice, setChoice] = React.useState(props.choice)
    const quiz = props.quiz;
    // const [test, setTest] = React.useState(props.quiz)
    // console.log(`${props.questionNum}: ${choice}`)
    
    
    // function selectChoice(index){
    //     const choiceCopy = [false, false, false, false];
    //     choiceCopy[index] = true;
    //     setChoice(choiceCopy)
    // }
    
    React.useEffect(() => {
        setChoice(props.choice)
    }, [props.choice]);
    
    ///////////////////////////////
    //Correct: #94D7A2;
    //Wrong: #F8BCBC;
    //Opacity: opacity: 0.5;
    ////////////////////////////////
    
    
    
    function selectAnswer(qIndex, aIndex){
        let copy = [false, false, false, false]
        copy[aIndex] = true;
        props.selectChoice(qIndex, aIndex)
        setChoice(copy)
    }
    
    const test = {
        opacity: '0.5'
    }
    
    const answerButtons = props.answer.map((answer, index) => {
        // const tmp = test[index]
        // console.log(tmp)
        
            return <button 
            key={index}
            className='answer' 
            disabled={!quiz}
            onClick={() => selectAnswer(props.questionNum, index)}
            // () => props.selectChoice(props.questionNum, index)
            
            style= 
            {quiz ? {backgroundColor: choice[index] ? '#D6DBF5' : 'transparent'} : 
            {opacity: index === props.answerIndex ? '1' : '0.5', 
            backgroundColor: choice[index] ? index === props.answerIndex ? '#94D7A2' : '#F8BCBC': index === props.answerIndex ? '#94D7A2' : 'transparent'}
            }
            
            // {backgroundColor: choice[index] === answerIndex ? '#94D7A2' : '#F8BCBC', opacity: index === props.answerIndex ? '1' : '0.5'}
            >
            <p className='answer__text'>{decodeHtml(answer)}</p></button>
        })
    
    
    function decodeHtml(html) {
        var txt = document.createElement("textarea");
        txt.innerHTML = html;
        return txt.value;
    }
     
    return (
        <div>
            <h1 className='question__question'>{decodeHtml(props.question)}</h1>
            <div className='answer__container'>{answerButtons}</div>
            <hr className='question__hr'></hr>
        </div>
    )
}