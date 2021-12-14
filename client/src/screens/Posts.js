import React, { useState } from 'react'

import AddPost from './AddPost';

import { useQuery } from '@apollo/client';
import UpdatePost from './updatePost';
import { DELETE_POST } from '../components/Mutation';
import { getALL } from '../components/Query'
import { useMutation } from "@apollo/client"

import { Grid, Card, Container, Icon } from 'semantic-ui-react'
import { Link } from 'react-router-dom';

const Posts = ({ user }) => {

  const {loading, error, data, refetch} = useQuery(getALL)
  const [deletePost] = useMutation(DELETE_POST)
  const [edit, setEdit] = useState(false)

    if(loading) return <Icon loading name='spinner' size='huge'></Icon>
    if(error) return "fetching failed"

    const removePost = async(id) => {
      try {
            await deletePost({
            variables: {
              id
            }
          })
        refetch()
      } catch (error) {
        
      }
  }

    return (
      <Container>
        <Grid>
          <Grid.Row>
            <Grid.Column>
                {data.getAll.map(posts => {
                return (
                    <Card key={posts.id}>
                        <Card.Content>
                          <Card.Header>
                            {posts.title}
                          </Card.Header>
                          <Card.Description>
                            {posts.description.substring(0,200)}...<Link to={`/details/${posts.id}`}>read more</Link>
                          </Card.Description>
                        </Card.Content>
                        <Card.Content extra textAlign='center'>
                            {
                              edit ? 
                              <>
                                <UpdatePost setEdit={setEdit} posts={posts} refetch={refetch}/>
                              </>
                              :
                              <>
                              {
                                user ? 
                                <>
                                  <Icon name='delete' size='large' style={{color: 'red', cursor: 'pointer'}} onClick={() => removePost(posts.id)}></Icon>
                                  <Icon name='edit' size='large' style={{color: 'blue', cursor: 'pointer'}} onClick={() => setEdit(true)}></Icon>
                                </>
                                :
                                null
                              }
                              </>
                            }
                        </Card.Content>
                    </Card>
                )
              })}
            </Grid.Column>
          </Grid.Row>
        </Grid>
        <br /><br />
        {
          user ? 
          <AddPost refetch={refetch}/>
          :
          null
        }
      </Container>  
    )
}

export default Posts
