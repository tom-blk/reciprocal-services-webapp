export interface Provider{
    id: number;
    firstName: string | undefined;
    lastName: string | undefined;
    userName: string;
    profilePicture: boolean;
    profileDescription: string;
    rating: number;
    ratingCount: number;
    country: number;
    postCode: number;
    city: string;
    travellingForOrders: boolean;
}

export interface ServiceSpecificProvider{
    id: number;
    firstName: string | undefined;
    lastName: string | undefined;
    userName: string;
    profilePicture: boolean;
    profileDescription: string;
    rating: number;
    ratingCount: number;
    country: number;
    postCode: number;
    city: string;
    travellingForOrders: boolean;
    creditsPerHour: number;
}

export interface User{
    id: number;
    firstName: string | undefined;
    lastName: string | undefined;
    userName: string;
    email: string;
    profilePicture: boolean;
    credits: number;
    rating: number;
    ratingCount: number;
    profileDescription: string;
    country: number;
    postcode: number;
    city: string;
    travellingForOrders: boolean;
}