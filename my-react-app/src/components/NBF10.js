
import { useEffect, useState } from "react"

const NBF10 = ({data}) => {

    useEffect(()=>{
        console.log('NBF10 useEffect')
        console.log(data)
    },[data])

    return (
    <div>{JSON.stringify(data, null, 4)}</div>
  )
}

export default NBF10