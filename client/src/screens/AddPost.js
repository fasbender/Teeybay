import React, { useState } from 'react'

import { useMutation } from "@apollo/client"
import { CREATE_POST } from '../components/Mutation'

import { ToastContainer, toast } from 'react-toastify'
import { Input, Button } from 'semantic-ui-react'

const AddPost = ({ refetch }) => {

    const [content, setContent] = useState({
        title: '',
        desc: ''
    })
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    const [createPost] = useMutation(CREATE_POST)
    const { title, desc } = content

    const handChange = (e) => {
        const { name, value } = e.target
        setError('')
        setContent({
            ...content,
            [name]: value
        })
    }

    const addPost = async() => {
        try {
            if(title === "" || desc === ""){
               return setError("Fields are empty")
            }
            setLoading(true)
           await createPost({
            variables: {
                title: title,
                description: desc
            }
        })
            setContent({
                title: '',
                desc: ''
            })
            refetch()
        } catch (error) {
            return toast.error('failure')
        }
        setLoading(false)
        toast.success("great success!")
    }

    return (
        <div>
            <Input focus placeholder='title' name="title" value={title} onChange={handChange}/>
            <Input focus placeholder='description' name="desc" value={desc} onChange={handChange}/>
            <div>
                {error ? <span style={{color: 'red'}}>{error}</span> : null}
            </div>
            {loading ? <Button primary disabled>Loading....</Button> : <Button primary onClick={addPost}>add</Button>}
            <ToastContainer 
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                pauseOnHover
            />
        </div>
    )
}

export default AddPost
