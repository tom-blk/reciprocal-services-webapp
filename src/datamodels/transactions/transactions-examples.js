const transaction0 = {
    id: 0,
    serviceId:1,
    completed: false,
    hoursProvided: 1,
    creditsAwarded: 3,
    receivingUserId: 3,
    providingUserId: 0,
    dateIssued: "22.09.2022",
    dateCompleted: undefined
}

const transaction1 = {
    id: 1,
    serviceId:2,
    completed: false,
    hoursProvided: 2,
    creditsAwarded: 16,
    receivingUserId: 2,
    providingUserId: 3,
    dateIssued: "30.02.2022",
    dateCompleted: undefined
}

const transaction2 = {
    id: 2,
    serviceId:3,
    completed: true,
    hoursProvided: 3,
    creditsAwarded: 10,
    receivingUserId: 3,
    providingUserId: 2,
    dateIssued: "16.04.2020",
    dateCompleted: "03.06.2020"
}

const transaction3 = {
    id: 3,
    serviceId:2,
    completed: false,
    hoursProvided: 3,
    creditsAwarded: 24,
    receivingUserId: 0,
    providingUserId: 2,
    dateIssued: "09.06.2021",
    dateCompleted: undefined
}

const transaction4 = {
    id: 4,
    serviceId:0,
    completed: true,
    hoursProvided: 2,
    creditsAwarded: 10,
    receivingUserId: 3,
    providingUserId: 0,
    dateIssued: "03.01.2021",
    dateCompleted: "02.03.2021"
}

export const transactions = [transaction0, transaction1, transaction2, transaction3, transaction4];