export const Open = 'Open' as const
export const InProgress = 'InProgress' as const
export const Done = 'Done' as const
export const TaskStatuses = [Open, InProgress, Done] as const
export type TaskStatus = typeof TaskStatuses[number]
