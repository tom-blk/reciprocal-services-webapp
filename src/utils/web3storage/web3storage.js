import { Web3Storage } from "web3.storage";

const client = new Web3Storage({ token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDYwNzczRDBiMTNkNWU1YzRlNTU4NjlDMEY5Y2JFNjRFNzJlZjJCZTQiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2ODI1MDQxODI4MTUsIm5hbWUiOiJwcm9tZXRoZXVzLXRva2VuIn0.m8aLgQtzZ3h9bX9JcdIqBzPCyyvblojEVZfhkrlmjLA'});

export const uploadFile = async (file, onSuccessFunction, onErrorFunction) => {

    try{
        console.log(file);
        const rootCid = await client.put(file);
        onSuccessFunction('Upload Successful!');
        return rootCid;
    } catch(error){
        onErrorFunction(error);
    }
}

export const retrieveFile = async (rootCid, onErrorFunction) => {

    try{
        const response = await client.get(rootCid);
        const files = await response.files();
        return files;
    }catch(error){
        onErrorFunction(error);
    }
}

export const getFileUrl = async (rootCid, onErrorFunction) => {

    try{
        const response = await client.get(rootCid);
        const files = await response.files();
        return URL.createObjectURL(files[0]);
    }catch(error){
        onErrorFunction(error);
    }
}

export const deleteFile = async (rootCid, onErrorFunction) => {

    try{
        const response = await client.delete(rootCid);
    }catch(error){
        onErrorFunction(error);
    }
}