const service0 = {
    id: 0,
    name: "Knitting",
    description: "Production of textile products.",
    creditsPerHour: 2,
    avgTimeToAcquire: 2,
    providers: [0],
    weeklyOrderCount: 22
}

const service1 = {
    id: 1,
    name: "Chiropractics",
    description: "Pressure treatment to alleviate back problems.",
    creditsPerHour: 12,
    avgTimeToAcquire: 24,
    providers: [0],
    weeklyOrderCount: 430
}

const service2= {
    id: 2,
    name: "Security",
    description: "Personal protection from possible threats.",
    creditsPerHour: 6,
    avgTimeToAcquire: 12,
    providers: [2],
    weeklyOrderCount: 82
}

const service3 = {
    id: 3,
    name: "Electronics",
    description: "Design and implementation of electical circuits",
    creditsPerHour: 12,
    avgTimeToAcquire: 24,
    providers: [1],
    weeklyOrderCount: 1021
}

const service4 = {
    id: 4,
    name: "Covert Ops",
    description: "Accomplishment of tasks without raising awareness of third parties.",
    creditsPerHour: 24,
    avgTimeToAcquire: 48,
    providers: [3],
    weeklyOrderCount: 5
}

export const services = [service0, service1, service2, service3, service4];