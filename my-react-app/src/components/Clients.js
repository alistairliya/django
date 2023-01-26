import Select from 'react-select' // https://react-select.com/home
import {useState} from 'react'
import Button from "@mui/material/Button"
import NewClient from './NewClient'


const Clients = ({clients, client, setClient, onNextClicked}) => {
    
    const [checked, setChecked] = useState(false)
    const [clientId, setClientId] = useState()

    const clientOptions = clients.map(
        (client)=>({
            value:client.id,
            label: client.last_name + ', '+client.first_name+' (SIN:'+client.sin+')'
        })
    )

    const handleChange = ()=>{
        setChecked(!checked)
    }
    const buttonClicked = ()=>{
        console.log(clientId)
        
        setClient({clientId:clientId})
        onNextClicked()
    }
    const handleSelection = (selected)=>{
        console.log('handleSelection')
        console.log(selected)
        setClientId(selected)
    }

  return (
    <div>
        {!checked && (
        <div>
            <label>Select from existing clients:</label>
            <Select 
                options={clientOptions} 
                disabled={true}
                onChange={handleSelection}
            />
            <Button onClick={buttonClicked} disabled={checked}>Next</Button>
        </div>
        )}
        {checked && <div><NewClient setClient={setClient} onNextClicked={onNextClicked} client={client}></NewClient></div>}
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
    </div>
  )
}

export default Clients