import Select from 'react-select' // https://react-select.com/home
import {useState} from 'react'
import Button from "@mui/material/Button"
import NewClient from './NewClient'


const Clients = ({clients, client}) => {
    
    const [checked, setChecked] = useState(false)

    const clientOptions = clients.map(
        (client)=>({
            value:client.id,
            label: client.last_name + ', '+client.first_name+' (SIN:'+client.sin+')'
        })
    )

    const handleChange = ()=>{
        setChecked(!checked)
    }
  return (
    <div>
        {!checked && (
        <div>
            <label>Select from existing clients:</label>
            <Select options={clientOptions} disabled={true}/>
            <Button disabled={checked}>Next</Button>
        </div>
        )}
        <div>
            <label>
                <input 
                    type="checkbox"
                    checked={checked}
                    onChange={handleChange}
                />
                Create new client
            </label>
        </div>
        <div>
            {checked && <NewClient client={client}></NewClient>}
        </div>
    </div>
  )
}

export default Clients