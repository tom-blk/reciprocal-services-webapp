export interface Service{
    id: number;
    name: string;
    description: string;
    icon: boolean;
    weeklyOrderCount: number;
}

export interface ServiceData{
    name: string;
    description: string;
    userId: number | undefined;
    creditsPerHour: number | undefined;
    picture: File | undefined;
}

export interface UserSpecificService{
    id: number;
    name: string;
    description: string;
    userId: number | undefined;
    creditsPerHour: number;
    icon: boolean;
    weeklyOrderCount: number;
}

export interface MaybeUserSpecificService{
    id: number;
    name: string;
    description: string;
    userId: number | undefined;
    creditsPerHour: number | undefined;
    icon: boolean;
    weeklyOrderCount: number;
}

export interface SelectableService{
    id: number;
    name: string;
    description: string;
    userId: number | undefined;
    embersPerHour: number | undefined;
    icon: boolean;
    weeklyOrderCount: number;
    isSelected: boolean;
    selectionStatusWasChanged: boolean;
    embersPerHourChanged: boolean
}