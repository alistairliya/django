import Select from 'react-select' // https://react-select.com/home
import Button from "@mui/material/Button"


const Clients = ({clients}) => {
    

    const clientOptions = clients.map(
        (client)=>({
            value:client.id,
            label: client.last_name + ', '+client.first_name+' (SIN:'+client.sin+')'
        })
    )

  return (
    <div><Select options={clientOptions} /><Button>Use selected client</Button></div>
  )
}

export default Clients