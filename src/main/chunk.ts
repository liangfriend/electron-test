import axios from "axios"

export const chunk=async ()=>{
    const response=await axios.get('http://localhost:3000/getFileSize')
    const fileSize= response.data.fileSize

    let start=-1024
    let end=0
    let origin=''
    async function download(){
        start+=1024
        end+=1024
        const dataResponse=await axios.get('http://localhost:3000/download',{
            headers: {
                'range': `${start}-${end}`,
            }
        })
        origin+=dataResponse.data
        console.log("进度:"+end/fileSize)
        if(end<fileSize){
            await download()
        }
    }
    await download()
    
    // console.log(fileSize)
    return ''
}