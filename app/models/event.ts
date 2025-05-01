export interface Event {
    id: string,
    type: string,
    date: Date,
    note: string,
    mlConsumed?: number, 
    duration?: number,
    wet?: boolean,
    poopy?: boolean,
}