import { useEffect } from "react"
const NBF6CheckBoxes = ({items}) => {
  useEffect(()=>{
    console.log('NBF6CheckBoxes useEffect')
    console.log(items)
   } ,[items])


    return (
    <div>
        {
            
        items.map((item)=>(
            
                <label>{item.medical_name}</label>
            
        ))
        }
    </div>
  )
}

export default NBF6CheckBoxes