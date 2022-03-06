export interface Task {
    id: string;
    title: string;
    description: string;
    status: TaksStatus;
}
export declare enum TaksStatus {
    OPEN = "OPEN",
    IN_PROGRESS = "IN PROGRESS",
    DONE = "DONE"
}
