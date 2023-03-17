// Purpose: Display a single document from the NBF7 collection
// checkbox for submitted - Done
// textbox for notes, such as where the doc is stored.
// allows user to upload a document


import { useEffect, useState } from "react"
import Tooltip from "@mui/material/Tooltip"
import Checkbox from "@mui/material/Checkbox"
const NBF7Doc = ({id, item, collect}) => {
    const [checked, setChecked] = useState(false);
    const handleChange = (event) => {
        console.log(event.target.checked)
        setChecked(event.target.checked);
        //collect()
        collect(id, {'name' : item.document_name, 'selected': event.target.checked})
    };
    const label = {}
  return (
    <div>
        {<div>
                <Checkbox
                    checked={checked}
                    onChange={handleChange}
                    {...label} 
                />
                
            <Tooltip title={item.description}>
                <label>{item.document_name}</label>
            </Tooltip>
        </div>
        }
    </div>
  )
}

export default NBF7Doc