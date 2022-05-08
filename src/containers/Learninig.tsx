import React, {useRef} from 'react'
import shuffle from 'lodash/shuffle'
import {Card, Carousel} from 'antd'
import styled from 'styled-components'

import {SoundTwoTone} from '@ant-design/icons'

import {Word} from './Types'
import {Link, useParams} from 'react-router-dom'

const CarouselComponent = styled(Carousel)`
    width: 41rem;
    margin: 0 auto;
`
const CardComponent = styled(Card)`
    background: #364d79;
    color: white !important;
`

const Image = styled.img`
    width: 19rem;
    height: 19rem;
    margin: 0 auto 1rem;
`

const LinkComponent = styled(Link)`
    display: block;
    margin: 0 auto;
    width: fit-content;
`

export const Learning = () => {
    const slider = useRef(null);
    const {id: pageCategory} = useParams();
    const data = require('../db/words.json')
    const words = shuffle(data.filter(({category}: Word) => category === parseInt(pageCategory!)))

    const playAudio = (audio: string) => {
        const audioFile = new Audio(`../Audio/${audio}`)
        audioFile.play();
    }

    return (
        <>
            <CarouselComponent ref={slider}>
                {
                    words.map(({title, translate, audio, img = 'unknown.jpeg'}: Word, index: number) => (
                        <CardComponent
                            title={title}
                            extra={audio ? <SoundTwoTone onClick={() => playAudio(audio)} twoToneColor="white"/> : <></>}
                            headStyle={{color: 'white'}}
                            key={index}
                        >
                            <div onClick={() => (slider.current!as any).next()}>
                                <p>{translate}</p>
                                <Image src={`../Images/${img}`}/>
                            </div>
                        </CardComponent>
                    ))
                }
            </CarouselComponent>
            <LinkComponent to={`../..`}>Main Page</LinkComponent>
        </>
    )
}