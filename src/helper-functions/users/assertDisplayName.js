// Return full name if possible, if undefined return first- or username
export const assertDisplayName = (user) => {
    if(user.firstName && user.lastName){
        return(user.firstName + ' ' + user.lastName);
    } else if (user.firstName && !user.lastName){
        return user.firstName;
    } else if (!user.firstName && !user.lastName){
        return user.userName;
    }
}