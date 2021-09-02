export type Collection<T> = {
    [id: string]: T;
};

export interface Task {
    start: number;
    name: string;
    end: number;
    breaks?: Breaks;
}

export interface CurrentTask {
    start: number;
    name: string | null;
    breaks?: Breaks;
    currentBreakStart?: number;
}

export type Breaks = Array<{ start: number; end: number }>;

type WithBreaks<T> = T & { breaks: Breaks };

export type CurrentTaskWB = WithBreaks<CurrentTask>;
export type TaskWB = WithBreaks<Task>;

export function withBreaks<T>(value: T): WithBreaks<T> {
    return {
        breaks: [],
        ...value,
    };
}

export function withBreaksArray<T>(array: T[]): Array<WithBreaks<T>> {
    return array.map((value) => ({
        breaks: [],
        ...value,
    }));
}

export function totalCurrentTaskTime(task: CurrentTaskWB): number {
    const breaks = task.breaks.map((br) => br.end - br.start).reduce((a, b) => a + b, 0);
    const endTime = task.currentBreakStart || Date.now();
    return endTime - task.start - breaks;
}

export function totalTaskTime(task: TaskWB): number {
    const breaks = task.breaks.map((br) => br.end - br.start).reduce(add, 0);
    return task.end - task.start - breaks;
}

export interface TaskTime {
    name: string;
    time: number;
}

export type TaskTimes = TaskTime[];

export function collectionToArray<T>(collection: Collection<T>): T[] {
    return Object.values(collection);
}

export function timeForTasksSince(tasks: Array<TaskWB>, timeSince: number): TaskTimes {
    interface TaskTimesObj {
        [name: string]: TaskTime;
    }

    const results: TaskTimesObj = {};
    tasks
        // only count the time that was actually spent in the requested timeframe
        .map((task) => ({ ...task, start: Math.max(task.start, timeSince) }))
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
