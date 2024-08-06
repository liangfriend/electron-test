import axios from "axios"
import { getWindowMap } from "./windowManager"
import fs from 'fs'
import { or } from "sequelize"
let origin = ''
let isDownloading = true; // 控制标志位
export const chunk = async (st) => {
    isDownloading = true;
    const response=await axios.get('http://localhost:3000/getFileSize')
    const fileSize= response.data.fileSize
    const interval=1024
    let start=0
    let end=interval
  
    if (start !== -1) {
        start = st
        end=st+interval
    }
    if (start === 0) {
       origin=''
   }
    async function download(){
        if (!isDownloading) {
            console.log('下载已停止');
            return;
        }
        if (fileSize <= end) {
            end=fileSize-1
        }
        const dataResponse=await axios.get('http://localhost:3000/download',{
            headers: {
                'range': `${start}-${end}`,
            }
        }).catch((e) => {
            getWindowMap('main').webContents.send('notificationMessage', '出错，停止传输')
             return Promise.reject(e); // 终止函数执行
        })
        origin += dataResponse.data
        const progress=end / fileSize
        console.log("进度:" + progress)
        getWindowMap('main').webContents.send('getFileProgress',end===(fileSize-1)?100:progress,end)
        if (end < fileSize && end!==(fileSize-1)) {
            
            start+=interval
            end += interval
            await download()
        }
        if (end === (fileSize - 1)) {
            origin=''
        }
    }
    await download()
    const filePath='./data/data.zip'
    saveFile(filePath,origin)
    //生成文件

    return ''
}

export function stop() {
    isDownloading=false
}


const saveFile = (filePath, data) => {
    return new Promise((resolve, reject) => {
        fs.writeFile(filePath, data, 'binary', (err) => {
            if (err) {
                return reject(err);
            }
            resolve('File saved successfully!');
        });
    });
};