import React, {useState} from "react";
import classes from './Quiz.module.css';
import ActiveQuiz from "../../components/ActiveQuiz/ActiveQuiz";
import FinishedQuiz from "../../components/FinishedQuiz/FinishedQuiz";
// import {useParams} from "react-router-dom";

const quizDefault = [
    {
        question: 'Какого цвета небо?',
        rightAnswerId: 2,
        id: 1,
        answers: [
            {text: 'Черный', id: 1},
            {text: 'Синий', id: 2},
            {text: 'Красный', id: 3},
            {text: 'Зеленый', id: 4},
        ]
    },
    {
        question: 'Второй вопрос?',
        rightAnswerId: 3,
        id: 2,
        answers: [
            {text: '12', id: 1},
            {text: '13', id: 2},
            {text: '14', id: 3},
            {text: '15', id: 4},
        ]
    },
];

const Quiz = () => {
    const [results, setResults] = useState({}); //{[id]: 'success', 'error'}
    const [isFinished, setIsFinished] = useState(false);
    const [activeQuestion, setActiveQuestion] = useState(0);
    const [answerState, setAnswerState] = useState(null);
    const [quiz] = useState(quizDefault);

    const onAnswerClickHandler = (answerId) => {
        if (answerState) {
            const [key] = Object.keys(answerState);
            if (answerState[key] === 'success') {
                return;
            }
        }
        const question = quiz[activeQuestion];
        const currentResults = results;
        if (question.rightAnswerId === answerId) {
            if (!currentResults[question.id]) {
                currentResults[question.id] = 'success';
            }
            setAnswerState({[answerId]: 'success'})
            setResults(currentResults);
            const timeout = window.setTimeout(() => {
                if (isQuizFinished()) {
                        setIsFinished(true);
                } else {
                        setActiveQuestion(activeQuestion + 1);
                        setAnswerState(null);
                }
                window.clearTimeout(timeout);
            }, 1000)

        } else {
            results[question.id] = 'error';
                setAnswerState({[answerId]: 'error'});
                setResults(currentResults);
        }
    }

    function isQuizFinished() {
        return activeQuestion + 1 === quiz.length;
    }

    const retryHandler = () => {
            setActiveQuestion(0);
            setAnswerState(null);
            setIsFinished( false);
            setResults({});
    }

    return (
        <div className={classes.Quiz}>

            <div className={classes.QuizWrapper}>
                <h1>
                    Ответьте на все вопросы
                </h1>
                {
                    isFinished ?
                        <FinishedQuiz
                            results={results}
                            quiz={quiz}
                            onRetry={retryHandler}
                        /> :
                        <ActiveQuiz
                            question={quiz[activeQuestion].question}
                            answers={quiz[activeQuestion].answers}
                            onAnswerClick={onAnswerClickHandler}
                            quizLength={quiz.length}
                            answerNumber={activeQuestion + 1}
                            state={answerState}
                        />
                }
            </div>
        </div>
    );
}

export default Quiz;