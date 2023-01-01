import React from 'react'
import Intro from './components/Intro'
import Quiz from './components/Quiz'

export default function App(){
    const [start, setStart] = React.useState(false)
    
    function startQuiz(){
        setStart(true)  
    }

    return (
        <main className='main'>
            <img className='blob-yellow' src='./img/blob-yellow.png'/>
            <img className='blob-blue' src='./img/blob-blue.png'/>
            
            {start ? <Quiz/> : <Intro startQuiz={startQuiz}/>}
        </main>
    )
}