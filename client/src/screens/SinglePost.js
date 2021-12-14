import React from 'react'

import { Container, Item } from 'semantic-ui-react'

import { SINGLE_POST } from '../components/Query'
import { useQuery } from '@apollo/client';
import { useParams } from 'react-router-dom';

import BuyButton from '../components/BuyButton';


const SinglePost = ({ user }) => {

    const { id } = useParams()
    const { data} = useQuery(SINGLE_POST, { variables: { id: id } })

    return (
        <Container textAlign='center'>
             <Item>
                <Item.Content>
                    <Item.Header>
                        {data && data.singlePost.title}
                    </Item.Header>
                    <br /><br />
                    <Item.Meta>
                        {data && data.singlePost.description}
                    </Item.Meta>
                </Item.Content>     
            </Item>
            {user && <BuyButton/>}           
        </Container>
    )
}

export default SinglePost
