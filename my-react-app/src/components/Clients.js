import Select from 'react-select' // https://react-select.com/home


const Clients = ({clients}) => {
    

    const clientOptions = clients.map(
        (client)=>({
            value:client.id,
            label: client.last_name + ', '+client.first_name+' (SIN:'+client.sin+')'
        })
    )

  return (
    <div><Select options={clientOptions} /></div>
  )
}

export default Clients