import { CurrentTask, Task } from "../Task";
import { QTask } from "../components/QuickTask";

export type TaskListener = (tasks: Task[]) => void;
export type CurrentTaskWithName = CurrentTask & { name: string };
export type TaskPredicate = (t: Task) => boolean;
export type PropertyName = "tasks" | "currentTask" | "quickTasks";

export default abstract class Store {
    public abstract registerTaskListener(listener: TaskListener): Promise<void>;

    public abstract removeTaskListener(listener: TaskListener): Promise<void>;

    public async getCurrentTask(): Promise<CurrentTask | null> {
        return this.get("currentTask", null);
    }

    public async start(name?: string): Promise<CurrentTask> {
        const task: CurrentTask = {
            name,
            start: Date.now(),
            breaks: [],
        };
        await this.set("currentTask", task);
        return task;
    }

    public async stop({ start, name, breaks }: CurrentTaskWithName): Promise<Task> {
        const end = Date.now();
        const newTask: Task = {
            start,
            end,
            breaks,
            name,
        };

        const tasks = await this.get<Task[]>("tasks", []);
        tasks.push(newTask);
        await Promise.all([this.set("tasks", tasks), this.set("currentTask", null)]);

        return newTask;
    }

    public async cancel() {
        await this.set("currentTask", null);
    }

    public async updateCurrentTask(task: CurrentTask | null) {
        await this.set("currentTask", task);
    }

    public async getTasks(predicate?: TaskPredicate): Promise<Task[]> {
        let tasks = await this.get<Task[]>("tasks", []);

        if (predicate) {
            tasks = tasks.filter(predicate);
        }
        return tasks;
    }

    public async getQuickTasks(): Promise<QTask[]> {
        return this.get("quickTasks", []);
    }

    public async setQuickTasks(tasks: QTask[]) {
        await this.set("quickTasks", tasks);
    }

    protected abstract get<T>(name: PropertyName, defaultValue: T): Promise<T>;

    protected abstract set<T>(name: PropertyName, value: T): Promise<void>;
}
