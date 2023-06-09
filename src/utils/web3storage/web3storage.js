import { Web3Storage } from "web3.storage";

const client = new Web3Storage({ token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDYwNzczRDBiMTNkNWU1YzRlNTU4NjlDMEY5Y2JFNjRFNzJlZjJCZTQiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2ODI1MDQxODI4MTUsIm5hbWUiOiJwcm9tZXRoZXVzLXRva2VuIn0.m8aLgQtzZ3h9bX9JcdIqBzPCyyvblojEVZfhkrlmjLA'});

export const uploadFile = async (file) => {

    try{
        const rootCid = await client.put(file);
        return rootCid;
    } catch(error){
        console.log(error.message)
        throw new Error('Failed to upload file to web3 storage...')
    }
}

export const retrieveFile = async (rootCid) => {

    try{
        const response = await client.get(rootCid);
        const files = await response.files();
        return files;
    }catch(error){
        console.log(error.message)
        throw new Error('Failed to retrieve file from web3 storage...')
    }
}

export const getFileUrl = async (rootCid) => {

    try{
        const response = await client.get(rootCid);
        const files = await response.files();
        return URL.createObjectURL(files[0]);
    }catch(error){
        console.log(error.message)
        throw new Error('Failed to retrieve file url from web3 storage...')
    }
}