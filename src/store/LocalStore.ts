import { CurrentTask, Task } from "../Task";
import { QTask } from "../components/QuickTask";

type LocalStorageIndex = "tasks" | "currentTask" | "quickTasks";

type TaskListener = (tasks: Task[]) => void;

let listeners: TaskListener[] = [];

function get<T>(name: LocalStorageIndex, defaultValue: T): T {
    const item = localStorage.getItem(name);
    if (!item) {
        return defaultValue;
    }
    return JSON.parse(item);
}

function set<T>(name: LocalStorageIndex, value: T) {
    const string = JSON.stringify(value);
    localStorage.setItem(name, string);
}

export function getCurrentTask(): CurrentTask | null {
    return get("currentTask", null);
}

export function start(name?: string): CurrentTask {
    const task: CurrentTask = {
        name,
        start: Date.now(),
        breaks: [],
    };
    set("currentTask", task);
    return task;
}

type CurrentTaskWithName = CurrentTask & { name: string };

export function stop({ start, name, breaks }: CurrentTaskWithName): Task {
    const end = Date.now();
    const newTask: Task = {
        start,
        end,
        breaks,
        name,
    };

    const tasks = get<Task[]>("tasks", []);
    tasks.push(newTask);
    set("tasks", tasks);
    set("currentTask", null);

    listeners.forEach((l) => l(tasks));

    return newTask;
}

export function cancel() {
    set("currentTask", null);
}

export function updateCurrentTask(task: CurrentTask | null) {
    set("currentTask", task);
}

type TaskPredicate = (t: Task) => boolean;

export function getTasks(predicate?: TaskPredicate): Task[] {
    let tasks = get<Task[]>("tasks", []);

    if (predicate) {
        tasks = tasks.filter(predicate);
    }
    return tasks;
}

export function getQuickTasks(): QTask[] {
    return get("quickTasks", []);
}

export function setQuickTasks(tasks: QTask[]) {
    set("quickTasks", tasks);
}

export function registerTaskListener(listener: TaskListener): number {
    return listeners.push(listener) - 1;
}

export function removeTaskListener(listener: number) {
    listeners.splice(listener, 1);
}