export interface Task {
    start: number,
    name: string,
    end: number,
    breaks: Array<{ start: number, end: number }>
}

export interface CurrentTask {
    start: number,
    name?: string,
    breaks: Array<{ start: number, end: number }>,
    currentBreakStart?: number,
}

export function totalCurrentTaskTime(task: CurrentTask): number {
    const breaks = task.breaks.map(br => br.end - br.start).reduce(((a, b) => a + b), 0);
    const endTime = task.currentBreakStart || Date.now();
    return endTime - task.start - breaks;
}

export function totalTaskTime(task: Task): number {
    const breaks = task.breaks.map(br => br.end - br.start).reduce((a, b) => a + b);
    return task.end - task.start - breaks;
}