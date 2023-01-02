const service0 = {
    id: 3,
    name: "Knitting",
    description: "Production of textile products.",
    icon: undefined,
    creditsPerHour: 2,
    avgTimeToAcquire: 2,
    providers: [0],
    weeklyOrderCount: 22
}

const service1 = {
    id: 1,
    name: "Chiropractics",
    description: "Pressure treatment to alleviate back problems.",
    icon: "https://www.svgrepo.com/download/299895/massage-spa.svg",
    creditsPerHour: 12,
    avgTimeToAcquire: 24,
    providers: [0],
    weeklyOrderCount: 430
}

const service2= {
    id: 0,
    name: "Security",
    description: "Personal protection from possible threats.",
    icon: "https://www.svgrepo.com/download/445994/security-shield.svg",
    creditsPerHour: 6,
    avgTimeToAcquire: 12,
    providers: [2],
    weeklyOrderCount: 82
}

const service3 = {
    id: 4,
    name: "Electronics",
    description: "Design and implementation of electical circuits",
    icon: "https://www.svgrepo.com/download/311664/plug-electronics.svg",
    creditsPerHour: 12,
    avgTimeToAcquire: 24,
    providers: [1],
    weeklyOrderCount: 1021
}

const service4 = {
    id: 2,
    name: "Covert Ops",
    description: "Accomplishment of tasks without raising awareness of third parties.",
    icon: "https://www.svgrepo.com/download/441196/hide.svg",
    creditsPerHour: 24,
    avgTimeToAcquire: 48,
    providers: [3],
    weeklyOrderCount: 5
}

export const services = [service0, service1, service2, service3, service4];