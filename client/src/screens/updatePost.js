import React, { useState } from 'react'
import { Input, Button } from 'semantic-ui-react'
import { UPDATE_POST } from '../components/Mutation';
import { useMutation } from "@apollo/client"

const UpdatePost = ({ setEdit, posts, refetch }) => {

    const [content, setContent] = useState({
        title: '',
        desc: ''
    })
    const { title, desc } = content

    const handChange = (e) => {
        const { name, value } = e.target
        setContent({
            ...content,
            [name]: value
        })
    }
    
    const [updatePost] = useMutation(UPDATE_POST)

    const EditPost = async(id) => {
    try {
        await updatePost({
          variables: {
            id,
            title: title,
            description: desc
          }
        })
        refetch()
    } catch (error) {
      
    }
    setEdit(false)
  }

    return (
        <div>
            <Input focus placeholder='title' name="title" value={title} onChange={handChange}/>
            <Input focus placeholder='description' name="desc" value={desc} onChange={handChange}/>
            <Button primary onClick={() => EditPost(posts.id)}>Update</Button>
            <Button primary onClick={() => setEdit(false)}>Cancel</Button>
        </div>
    )
}

export default UpdatePost
