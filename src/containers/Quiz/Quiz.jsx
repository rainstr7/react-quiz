import React, {useEffect} from "react";
import classes from './Quiz.module.css';
import ActiveQuiz from "../../components/ActiveQuiz/ActiveQuiz";
import FinishedQuiz from "../../components/FinishedQuiz/FinishedQuiz";
import {useParams} from "react-router-dom";
import Loader from "../../components/UI/Loader/Loader";
import {connect} from "react-redux";
import {fetchQuizById, quizAnswerClick, retryQuiz} from "../../store/actions/quiz";

// const quizDefault = [
//     {
//         question: 'Какого цвета небо?',
//         rightAnswerId: 2,
//         id: 1,
//         answers: [
//             {text: 'Черный', id: 1},
//             {text: 'Синий', id: 2},
//             {text: 'Красный', id: 3},
//             {text: 'Зеленый', id: 4},
//         ]
//     },
//     {
//         question: 'Второй вопрос?',
//         rightAnswerId: 3,
//         id: 2,
//         answers: [
//             {text: '12', id: 1},
//             {text: '13', id: 2},
//             {text: '14', id: 3},
//             {text: '15', id: 4},
//         ]
//     },
// ];

const Quiz = (props) => {
    const {id} = useParams();
    const {fetchQuizById} = props;

    useEffect(() => {
        fetchQuizById(id);
    }, [id, fetchQuizById]);


    return (
        <div className={classes.Quiz}>

            <div className={classes.QuizWrapper}>
                <h1>
                    Ответьте на все вопросы
                </h1>
                {props.loading || !props.quiz ?
                    <Loader/> : props.isFinished ?
                    <FinishedQuiz
                        results={props.results}
                        quiz={props.quiz}
                        onRetry={props.retryQuiz}
                    /> :
                    <ActiveQuiz
                        question={props.quiz[props.activeQuestion].question}
                        answers={props.quiz[props.activeQuestion].answers}
                        onAnswerClick={props.quizAnswerClick}
                        quizLength={props.quiz.length}
                        answerNumber={props.activeQuestion + 1}
                        state={props.answerState}
                    />
                }
            </div>
        </div>
    );
}
function mapStateToProps(state) {
    return {
        results: state.quiz.results,
        isFinished: state.quiz.isFinished,
        activeQuestion: state.quiz.activeQuestion,
        answerState: state.quiz.answerState,
        quiz: state.quiz.quiz,
        loading: state.quiz.loading
    };
}

function mapDispatchToProps(dispatch) {
    return {
        fetchQuizById: (id) => dispatch(fetchQuizById(id)),
        quizAnswerClick: (answerId) => dispatch(quizAnswerClick(answerId)),
        retryQuiz: () => dispatch(retryQuiz()),
    };
}


export default connect(mapStateToProps, mapDispatchToProps)(Quiz);