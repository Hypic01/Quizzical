import React from 'react';
import ReactDOM from 'react-dom';

export default function Intro(props){
    return (
        <div className='intro'>
            <h1 className='intro__title'>Quizzical</h1>
            <h2 className='intro__description'>Some description if needed</h2>
            <button className='intro__button' onClick={props.startQuiz}>Start quiz</button>
        </div>
    )
}