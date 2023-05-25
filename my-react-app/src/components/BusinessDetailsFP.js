
import {useEffect, useState} from "react"
import { useAuth } from "../hooks/useAuth"


const BusinessDetailsFP = () => {
    const [file, setFile] = useState(null)
    
    useEffect(()=>{
        console.log('BusinessDetailsFP useEffect()')
        console.log(file)
    }, [file])

    const handleFileChange = (event) => {
        const files = event.target.files;

        
        if(files){
            setFile(files[0])
        }
    }

    const handleUpload = (event) =>{
        // Sample Upload:
        // curl -X POST -F "file=@/Users/eugenelin/dev_insure/myproject/readme.txt" -F "remark=foobar2" http://127.0.0.1:8000/file/upload/
        const postToFileUpload = async () =>{
            const formData = new FormData()
            formData.append('file', file)
            const res = await fetch('http://localhost:8000/file/upload/',{
                method:'POST',
                body: formData
            })
            const data = await res.json()
            console.log(data)
        }
        postToFileUpload()
        
    }




  return (
    <div className='container'>
        <h2>First Page</h2>
        <input type="file" onChange={handleFileChange} />
        <div>{file && `${file.name} - ${file.type}`}</div>
        <button onClick={handleUpload}>Upload</button>
    </div>
  )
}

export default BusinessDetailsFP