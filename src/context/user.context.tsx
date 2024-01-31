import React, { createContext, useEffect, useState } from "react";
import { getUser } from "../api/auth/get-user";
import { getUserSpecificServices } from "../api/users/read";
import { ChildrenProps } from "../types/general";
import { UserSpecificService } from "../types/services";
import { toast } from "react-toastify";
import AlertMessageComponent from "../components/alerts/alert-message.component";
import { errorMessageOptions } from "../components/alerts/alertMessageTypes";

export interface User{
    id: number;
    firstName: string | undefined;
    lastName: string | undefined;
    userName: string;
    email: string;
    profilePicture: boolean;
    profileDescription: string | undefined;
    credits: number;
    rating: number;
    country: number | undefined;
    postCode: number | undefined;
    city: string | undefined;
    travellingForOrders: boolean;
}

interface UserContextType{
    user: User | undefined;
    fetchUser:() => void;
    setUser: (user: User | undefined) => void;
    userServices: UserSpecificService[] | undefined;
}

export const UserContext = createContext<UserContextType>({} as UserContextType);

export const UserContextProvider: React.FC<ChildrenProps> = ({children}) => {

    const [user, setUser] = useState<User | undefined>(undefined);
    const [userServices, setUserServices] = useState<UserSpecificService[]>([]);

    useEffect(() => {
        fetchUser()   
    }, [])

    useEffect(() => {
        if(user)
        getUserSpecificServices(user.id)
            .then(response => setUserServices(response))
            .catch(error => {toast(<AlertMessageComponent errorMessage={error.message}/>, errorMessageOptions)})
    }, [user])

    const fetchUser = () => {
        getUser()
            .then(response => {
                setUser(response)
            })
            .catch(error => {
                console.log('User not authenticated, please log in.')
            }); 
    }

    const value = {
        user,
        fetchUser,
        setUser, // For Logout
        userServices
    }

    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    );
}

export default UserContextProvider;