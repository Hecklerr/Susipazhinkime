import React, {useMemo, useState} from 'react'
import shuffle from "lodash/shuffle"
import {Button, notification, Result} from 'antd'
import styled from 'styled-components'
import {Link, useParams} from 'react-router-dom'

import {Word} from './Types'

const TestWrapper = styled.div`
    max-width: 41rem;
    width: 100%;
    margin: 0 auto;
`

const Answer = styled.div`
    border: 1px solid black;
    border-radius: 0.4rem;
    cursor: pointer;
    margin: 0.4rem;
    padding: 0.2rem;
  
    &:hover {
        background: #364d79;
        color: white !important;
    }
`

export const Test = () => {
    const {id: pageCategory} = useParams();
    const [currentWord, setCurrentWord] = useState<number>(0)
    const [question, answer] = useMemo(() => shuffle(['title', 'translate']), [])
    const data = require('../db/words.json')
    const words = useMemo(() =>
        shuffle(data.filter(({category}: Word) => category === parseInt(pageCategory!))).map((word, index) => ({...word, index}))
        , [])

    const answers = useMemo(() => words.reduce((acc, word) => ({...acc, [word.index]: {title: word[answer], value: word.index}})
            , {})
        , [words])

    const [questions, setQuestions] = useState(words)

    const copyAnswers = {...answers}
    const {index} = questions[currentWord] || {}
    delete copyAnswers[index]

    const variations = shuffle([answers[index], ...shuffle(Object.values(copyAnswers)).slice(0, 3)])

    const tryAnswer = (value: number) => {
        if (questions[currentWord].index !== value) {
            notification.error({message: 'Fail!', duration: 2, description: 'Shame on You!'})
            setQuestions([...questions, questions[currentWord]])
            return setCurrentWord(currentWord + 1)
        }
        notification.success({message: 'Success!', duration: 2})
        return setCurrentWord(currentWord + 1)
    }

    return (
        <TestWrapper>
            {
                questions[currentWord] ? (
                    <>
                        <h3>{questions[currentWord][question]}</h3>

                        {variations.map(({value, title}) => <Answer key={value} onClick={() => tryAnswer(value)}>{title}</Answer>)}
                    </>
                ) : (
                    <Result
                        status='success'
                        title='Test passed successfully'
                        extra={[
                            <Link to={'../..'} >
                                <Button type="primary">
                                    Go to main page
                                </Button>
                            </Link>,
                            <Link onClick={() => window.location.reload()} to={`learn/${pageCategory}`} >
                                <Button key="buy">Again</Button>
                            </Link>
                        ]}
                    />
                )
            }
        </TestWrapper>
    )
}