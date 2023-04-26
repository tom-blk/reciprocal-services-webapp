import { Web3Storage } from "web3.storage";
import { useContext } from "react";
import { AlertMessageContext } from "../../context/alert-message.context";

const { displayError, displaySuccessMessage } = useContext(AlertMessageContext);

const client = new Web3Storage({ token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDYwNzczRDBiMTNkNWU1YzRlNTU4NjlDMEY5Y2JFNjRFNzJlZjJCZTQiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2ODI1MDQxODI4MTUsIm5hbWUiOiJwcm9tZXRoZXVzLXRva2VuIn0.m8aLgQtzZ3h9bX9JcdIqBzPCyyvblojEVZfhkrlmjLA});

export const uploadFile = async () => {

    try{
        const rootCid = await client.put(file);
        displaySuccessMessage('Upload Successful!');
        return rootCid;
    } catch(error){
        displayError(error);
    }
}

export const retrieveFile = async (rootCid) => {

    try{
        const response = await client.get(rootCid);
        return response;
    }catch(error){
        displayError(error);
    }
}