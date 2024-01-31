export interface Order{
    id: number;
    serviceId: number;
    providingUserId: number;
    receivingUserId: number;
    hoursProvided: number | null;
    creditsAwarded: number | null;
    dateIssued: string;
    dateCompleted: string | null;
    status:number | undefined;
    message: string;
    creditsPerHour: number
}

export interface SortedOrders{
    new: Order[];
    accepted: Order[];
    fulfilled: Order[];
    completed: Order[];
    denied: Order[];
}