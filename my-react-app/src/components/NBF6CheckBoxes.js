import { useEffect } from "react"
const NBF6CheckBoxes = ({item}) => {
  useEffect(()=>{
    console.log('NBF6CheckBoxes useEffect')
    console.log(item)
   } ,[item])


    return (
    <div>
        {
            
            
                <label>{item.medical_name}</label>
            
        }
    </div>
  )
}

export default NBF6CheckBoxes