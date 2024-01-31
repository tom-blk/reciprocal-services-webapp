interface minimalPropertiesToAssertName{
    firstName: string | undefined;
    lastName: string | undefined;
    userName: string;
}

// Return full name if possible, if undefined return first- or username
export const assertDisplayName = (user: minimalPropertiesToAssertName) => {
    if(user.firstName && user.lastName){
        return(user.firstName + ' ' + user.lastName);
    } else if (user.firstName && !user.lastName){
        return user.firstName;
    } else if (!user.firstName && !user.lastName){
        return user.userName;
    }
}