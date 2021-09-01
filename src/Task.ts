export interface Task {
    start: number;
    name: string;
    end: number;
    breaks: Array<{ start: number; end: number }>;
}

export interface CurrentTask {
    start: number;
    name?: string;
    breaks: Array<{ start: number; end: number }>;
    currentBreakStart?: number;
}

export function totalCurrentTaskTime(task: CurrentTask): number {
    const breaks = task.breaks
        .map((br) => br.end - br.start)
        .reduce((a, b) => a + b, 0);
    const endTime = task.currentBreakStart || Date.now();
    return endTime - task.start - breaks;
}

export function totalTaskTime(task: Task): number {
    const breaks = task.breaks.map((br) => br.end - br.start).reduce(add, 0);
    return task.end - task.start - breaks;
}

export interface TaskTime {
    name: string;
    time: number;
}

export type TaskTimes = TaskTime[];

export function timeForTasksSince(tasks: Task[], timeSince: number): TaskTimes {
    interface TaskTimesObj {
        [name: string]: TaskTime;
    }

    const results: TaskTimesObj = {};
    tasks
        .map((task) => ({ ...task, start: Math.max(task.start, timeSince) })) // only count the time that was actually spent in the requested timeframe
        .filter((task) => task.end > timeSince)
        .forEach((task) => {
            results[task.name] = results[task.name] ?? {
                name: task.name,
                time: 0,
            };
            results[task.name].time += totalTaskTime(task);
        });

    return Object.entries(results)
        .sort(([, a], [, b]) => b.time - a.time)
        .map(([name, { time }]) => ({ name, time }));
}

const add = (a: number, b: number) => a + b;
