import React from 'react';
import ReactDOM from 'react-dom';
import Question from './Question'

export default function Quiz(){
    
    const [questions, setQuestions] = React.useState([])
    const [choice, setChoice] = React.useState([[false, false, false, false],[false, false, false, false],[false, false, false, false],[false, false, false, false],[false, false, false, false]])
    const [quiz, setQuiz] = React.useState(true)
    const [answer, setAnswer] = React.useState([false, false, false, false, false])
    const [answerCount, setAnswerCount] = React.useState(0)

        React.useEffect(() => {
            const fetchData = async () => {
                const response = await fetch('https://opentdb.com/api.php?amount=5&type=multiple'); 
                const data = await response.json();
                const results = data.results;                 
                setQuestions(createQuestions(results));
            }
            fetchData()
        }, []);  
    
    ///////////////////////////////

    const resetQuiz = async () => {
        const response = await fetch('https://opentdb.com/api.php?amount=5&type=multiple'); 
        const data = await response.json();
        const results = data.results;                 
        setQuestions(createQuestions(results));
        setQuiz(true);
        setChoice([[false, false, false, false],[false, false, false, false],[false, false, false, false],[false, false, false, false],[false, false, false, false]]);
        setAnswerCount(0)
        setAnswer([false, false, false, false, false])
    }

    /////////////////////
    
    function selectChoice(qIndex, aIndex){
        setChoice(prev => prev.map((q, i) => {
            // const temp = [false, false, false, false]
            if(i === qIndex){
                q[aIndex] = true;
            }
            return q;
        }))
        
        
        // const wholeCopy = choice;
        // const choiceCopy = [false, false, false, false];
        // choiceCopy[aIndex] = true;
        // wholeCopy[qIndex] = choiceCopy
        // setChoice(wholeCopy)
    }
    
    // function selectChoiceStyle(qIndex, aIndex){
    //     return {backgroundColor: true ? '#D6DBF5' : 'transparent'}
    //     // {backgroundColor: choice[qIndex][aIndex] ? '#D6DBF5' : 'transparent'}
    // }
    
    function createQuestions(data){
        // console.log(data)
        let array = data.map((q, i) => {
            const [arr, answerIndex] = shuffleAnswer(q["correct_answer"], q["incorrect_answers"]);
            return {
                question: q.question,
                questionNum: i,
                answer: arr,
                answerIndex: answerIndex,
            }
        })
        return array;
    }
    
    function answerArray(){
        const aArray = []
        questions.map(q => {
            aArray.push(q.answerIndex)
        })
        return aArray
    }
    // console.log(answerArray())
    
    function shuffleAnswer(answer, choices){
        let array = [];
        const index = Math.floor(Math.random() * 4);
        for(let i = 0; i< 4 ; i++){
            i === index ? array.push(answer) : array.push(choices.shift())
        }
        return [array, index];
    }
    
    // function quizStatus(){
    //     return quiz;
    // }
    
    const questionElements = questions.map((q, i) => {
        return <Question 
            key={i} 
            question={q.question} 
            questionNum={q.questionNum} 
            answer={q.answer} 
            answerIndex={q.answerIndex}
            selectChoice={selectChoice}
            choice={choice[i]}
            // selectChoiceStyle={selectChoiceStyle}
            quiz={quiz}
        />
    })
    
    function submitAnswer(){
        setQuiz(false);
        let answers = []
        let counter = 0
        const answerIndex = answerArray()
        console.log(answerIndex)
        choice.map((a, i) => {
            // console.log(a)
            // const correctIndex = answerArray[i]
            if(a[answerIndex[i]]) {
                answers.push(true)
                counter++
                // console.log(`counter added! ${counter}`)
            } else {
                answers.push(false)
            }
        })
        setAnswer(answers)
        setAnswerCount(counter)
    }
    
    // console.log(answerCount)
    
    
    return (
        <div className='quiz'>
            <div className='question--container'>
                {questionElements}
            </div>
            {quiz ? <button className='quiz__button' onClick={submitAnswer}>Submit Answers</button> : <div className='quiz__result--container'>
                <h2 className='quiz__result--score'>You scored {answerCount}/5 correct answers</h2>
                <button className='quiz__result--button' onClick={resetQuiz}>Play Again</button>
            </div>}
            
            
        </div>
    )
}

// 해야할것: 퀴즈 끝나면 onClick Disable 하기
// 정답 개수 오류






















    // const [questions, setQuestions] = React.useState([]);
    
    // React.useEffect(() => {
    //     const fetchData = async () => {
    //         const response = await fetch('https://opentdb.com/api.php?amount=5&type=multiple'); 
    //         const data = await response.json();
    //         const results = data.results;                 
    //         setQuestions(createQuestions(results));
    //     }
    //     fetchData()
    // }, []);
    
    // function createQuestions(data){
    //     // console.log(data)
    //     let array = data.map((q, i) => {
    //         const [arr, answerIndex] = shuffleAnswer(q["correct_answer"], q["incorrect_answers"]);
    //         return {
    //             questionNum: i,
    //             question: q.question,
    //             answer: arr,
    //             answerIndex: answerIndex,
    //             selectedIndex: '',
    //         }
    //     })
    //     return array;
    // }
    
    // function shuffleAnswer(answer, choices){
    //     let array = [];
    //     const index = Math.floor(Math.random() * 4);
    //     for(let i = 0; i< 4 ; i++){
    //         i === index ? array.push(answer) : array.push(choices.shift())
    //     }
    //     return [array, index];
    // }
    
    // function selectAnswer(questionNum, answerIndex){
    //     setQuestions(prevQuestions => prevQuestions.map((q, index) => {
    //         return index === questionNum ? {...q, selectedIndex: answerIndex} : q
    //     }))
    // }
    
    // function selectedStyle(answerIndex){
    //     // console.log(questions[0].selectedIndex)
    //     const boolean = questions.selectedIndex === answerIndex ?  true : false;
    //     return boolean;
    // }
    
    
    
    // // console.log(questions)
    // const questionElements = questions.map((q, i) => {
    //     return <Question key={i} question={q.question} answer={q.answer} answerIndex={q.answerIndex} selectAnswer={selectAnswer} selectedStyle={selectedStyle}/>
    // })
    
    // // console.log(questionElements)
    
    
    
    // // [{category: "General Knowledge", type: "multiple", difficulty: "easy", question: "Which company did Valve cooperate with in the creation of the Vive?", correct_answer: "HTC", incorrect_answers: ["Oculus", "Google", "Razer"]}, {category: "Geography", type: "multiple", difficulty: "medium", question: "What is the capital of the US state Nevada?", correct_answer: "Carson City", incorrect_answers: ["Las Vegas", "Henderson", "Reno"]}, {category: "Entertainment: Video Games", type: "multiple", difficulty: "easy", question: "When was the game &#039;Portal 2&#039; released?", correct_answer: "2011", incorrect_answers: ["2014", "2009", "2007"]}, {category: "History", type: "multiple", difficulty: "medium", question: "When did the United States formally declare war on Japan, entering World War II?", correct_answer: "December 8, 1941", incorrect_answers: ["June 6, 1944", "June 22, 1941", "September 1, 1939"]}, {category: "Entertainment: Film", type: "multiple", difficulty: "medium", question: "What is the name of the character Nicolas Cage plays in the movie &quot;National Treasure?&quot;", correct_answer: "Benjamin Franklin Gates", incorrect_answers: ["Thomas Jefferson Walker", "George Washington Swanson", "John Quincy Beckett"]}]
    
    // return (
    //     <div className='quiz'>
    //         <div className='question__container'>
    //             {questionElements}
    //         </div>
    //         <button className='quiz__button'>Check Answers</button>
    //     </div>
    // )