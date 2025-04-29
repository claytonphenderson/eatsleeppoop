export interface Event {
    id: string,
    type: string,
    date: Date,
    note: string,
    duration?: number,
    wet?: boolean,
    poopy?: boolean,
}