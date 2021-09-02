import { Collection, CurrentTask, Task } from "../Task";
import { QTask } from "../components/QuickTask";
import { LocaleName } from "../App";

export type Listener<T> = (values: T) => void;

export type CurrentTaskWithName = CurrentTask & { name: string };
export type PropertyName = "tasks" | "currentTask" | "quickTasks" | "locale";

export default abstract class Store {
    public async start(name?: string): Promise<void> {
        const task: CurrentTask = {
            name: name || null, // firebase does not like undefined
            start: Date.now(),
            breaks: [],
        };
        await this.set("currentTask", task);
    }

    public async stop({ start, name, breaks }: CurrentTaskWithName): Promise<void> {
        const end = Date.now();
        const newTask: Task = {
            start,
            end,
            breaks,
            name,
        };

        await Promise.all([this.addTask(newTask), this.set("currentTask", null)]);
    }

    public async clear(): Promise<void> {
        await this.set("tasks", {});
        await this.set("currentTask", {});
        await this.set("quickTasks", {});
        await this.set("locale", "en");
    }

    public async addTask(task: Task): Promise<void> {
        await this.push("tasks", task);
    }

    public async cancel() {
        await this.set("currentTask", null);
    }

    public async updateCurrentTask(task: CurrentTask | null) {
        await this.set("currentTask", task);
    }

    public async setLocale(name: LocaleName) {
        await this.set("locale", name);
    }

    public async addQuickTask(task: QTask) {
        await this.push("quickTasks", task);
    }

    public getTasks(listener: Listener<Collection<Task>>): Promise<void> {
        return this.get("tasks", {}, listener);
    }

    public getQuickTasks(listener: Listener<Collection<QTask>>): Promise<void> {
        return this.get("quickTasks", {}, listener);
    }

    public getLocale(listener: Listener<LocaleName>): Promise<void> {
        return this.get("locale", "en", listener);
    }

    public getCurrentTask(listener: Listener<CurrentTask | null>): Promise<void> {
        return this.get("currentTask", null, listener);
    }

    public abstract removeQuickTask(id: string): Promise<void>;

    public abstract removeListener(listener: Listener<any>): Promise<void>;

    protected abstract get<T>(name: PropertyName, defaultValue: T, listener: Listener<T>): Promise<void>;

    protected abstract set<T>(name: PropertyName, value: T): Promise<void>;

    protected abstract push<T>(name: PropertyName, value: T): Promise<void>;
}
