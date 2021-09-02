import { Collection, CurrentTask, Task } from "../Task";
import { QTask } from "../components/QuickTask";
import { LocaleName } from "../App";

export type TaskListener = (tasks: Collection<Task>) => void;
export type CurrentTaskWithName = CurrentTask & { name: string };
export type PropertyName = "tasks" | "currentTask" | "quickTasks" | "locale";

export default abstract class Store {
    /**
     * Adds a new listener to the tasks
     * Gets triggered immediately after registering and on every new change later
     */
    public abstract registerTaskListener(listener: TaskListener): Promise<void>;

    public abstract removeTaskListener(listener: TaskListener): Promise<void>;

    public async getCurrentTask(): Promise<CurrentTask | null> {
        return this.get("currentTask", null);
    }

    public async start(name?: string): Promise<CurrentTask> {
        const task: CurrentTask = {
            name: name || null, // firebase does not like undefined
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

        await Promise.all([this.push("tasks", newTask), this.set("currentTask", null)]);

        return newTask;
    }

    public async cancel() {
        await this.set("currentTask", null);
    }

    public async updateCurrentTask(task: CurrentTask | null) {
        await this.set("currentTask", task);
    }

    public async getTasks(): Promise<Collection<Task>> {
        return await this.get<Collection<Task>>("tasks", {});
    }

    public getQuickTasks(): Promise<Collection<QTask>> {
        return this.get("quickTasks", {});
    }

    public async removeQuickTask(id: string) {
        console.log("removed quicktask... unless?");
    }

    public async addQuickTask(task: QTask) {
        await this.push("quickTasks", task);
    }

    public async setLocale(name: LocaleName) {
        await this.set("locale", name);
    }

    public getLocale(): Promise<LocaleName> {
        return this.get("locale", "en");
    }

    protected abstract get<T>(name: PropertyName, defaultValue: T): Promise<T>;

    protected abstract set<T>(name: PropertyName, value: T): Promise<void>;

    protected abstract push<T>(name: PropertyName, value: T): Promise<void>;
}
