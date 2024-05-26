// Form related interfaces.
export interface LoginInput {
    email: string
    password: string
}

// Model related interfaces.
export interface User {
    id: number,
    name: string,
    email: string,
    role?: string
    address?: Address
    courses?: Course[]
    activities?: Activity[]
}

export interface Address {
    line_1: string
    line_2: string
    city: string,
    zip_code: string
}

export interface Course {
    id: number
    name: string
    grade: string,
    students?: User[]
}

export interface Activity {
    id: number
    name: string
    subject: string
    score: number
}