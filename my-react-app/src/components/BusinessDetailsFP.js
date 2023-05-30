
import {useEffect, useState} from "react"
import { useAuth } from "../hooks/useAuth"


const BusinessDetailsFP = ({businessId}) => {
    const [file, setFile] = useState(null)
    const [fileUploadResult, setFileUploadResult] = useState(null)
    
    const { user } = useAuth()
    
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

    const handleUpload = async (event) =>{
        // Sample Upload:
        // curl -X POST -F "file=@/Users/eugenelin/dev_insure/myproject/readme.txt" -F "remark=foobar2" http://127.0.0.1:8000/file/upload/
        const postToFileUpload = async () =>{
            
            let headers = new Headers()
            const token = user['token']
            console.log('TOKEN: '+token)
            const auth_str = 'Token '+token
            console.log('auth_str: '+auth_str)
            headers.set('Authorization', auth_str)
            //headers.set('Content-Type', 'application/json')
            const formData = new FormData()
            formData.append('file', file)
            formData.append('remark', 'foobar2')
            formData.append('businessId', businessId)
            const res = await fetch('http://localhost:8000/file/upload/',{
                method:'POST',
                body: formData,
                headers: headers
            })
            const data = await res.json()
            console.log(data)
            return data
        }
        setFileUploadResult('Uploading...')
        const uploadResult = await postToFileUpload()
        if(uploadResult['id']){
            console.log('uploadResult id is '+uploadResult['id'])
            setFileUploadResult('Upload Success')
        } 
    }




  return (
    <div className='container'>
        <h2>First Page</h2>
        <input type="file" onChange={handleFileChange} />
        <div>{file && `${file.name} - ${file.type}`}</div>
        <button onClick={handleUpload}>Upload</button>
        {fileUploadResult && <div>{fileUploadResult}</div>}
    </div>
  )
}

export default BusinessDetailsFP