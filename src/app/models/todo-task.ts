export interface TodoTask {
    taskName: string;
    id: string;
    completed?: boolean;
    isEditing?: boolean;// Frontend specific property
}