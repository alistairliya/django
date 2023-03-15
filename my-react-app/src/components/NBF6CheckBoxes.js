import { useEffect } from "react"
import Tooltip from "@mui/material/Tooltip"
const NBF6CheckBoxes = ({item}) => {
  useEffect(()=>{
    console.log('NBF6CheckBoxes useEffect')
    console.log(item)
   } ,[item])


    return (
    <div>
        {
            <Tooltip title={item.description}>
                <label>{item.medical_name}</label>
            </Tooltip>
        }
    </div>
  )
}

export default NBF6CheckBoxes