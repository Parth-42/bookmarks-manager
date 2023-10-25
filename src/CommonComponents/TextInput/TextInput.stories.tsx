import React,{useState} from 'react'
import TextInput from './TextInput'

export default {
    title: 'TextInput',
    component: TextInput
}

let value = ""


export const Primary = () => {

    const [input, setInput] = useState(value)
    const onValueChange = (s : string)=> {
        setInput(s)
    }

    return (
        <TextInput variant='primary' label='URL' value={input} onValueChange={onValueChange}/>
    )
}

export const Secondary = () => {

    const [input, setInput] = useState(value)
    const onValueChange = (s : string)=> {
        setInput(s)
    }

    return (
    <TextInput variant='secondary' search={true} value={input} onValueChange={onValueChange}/>
    )
}