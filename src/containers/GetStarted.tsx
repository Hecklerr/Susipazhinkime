import {Collapse} from 'antd'
import React from 'react'
import {Link} from 'react-router-dom'
import styled from 'styled-components'

import {Category} from './Types'

const {Panel} = Collapse;

const LinkComponent = styled(Link)`
    display: block;
`

export const GetStarted = () => {
    const data = require('../db/categories.json')

    return (
        <>
            {
                data.map(({title, id}: Category) => (
                    <Collapse key={id}>
                        <Panel header={title} key={id}>
                            <LinkComponent to={`./learn/${id}`}>Learning</LinkComponent>
                            <LinkComponent to={`./test/${id}`}>Test</LinkComponent>
                        </Panel>
                    </Collapse>
                ))
            }
        </>
    )
}