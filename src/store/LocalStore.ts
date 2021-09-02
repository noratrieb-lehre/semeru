import { Collection, Task } from "../Task";
import Store, { CurrentTaskWithName, PropertyName, TaskListener } from "./Store";

export default class LocalStore extends Store {
    listeners: TaskListener[] = [];

    public async stop({ start, name, breaks }: CurrentTaskWithName): Promise<Task> {
        const newTask = await super.stop({ start, name, breaks });
        // this is not strictly needed, because we already get all tasks in super.stop, but get is fast enough to not care about it
        const tasks = await this.get<Collection<Task>>("tasks", {});

        this.listeners.forEach((l) => l(tasks));

        return newTask;
    }

    public async registerTaskListener(listener: TaskListener) {
        this.listeners.push(listener);
        listener(await this.getTasks());
    }

    public async removeTaskListener(listener: TaskListener) {
        this.listeners = this.listeners.filter((l) => !Object.is(listener, l));
    }

    async get<T>(name: PropertyName, defaultValue: T): Promise<T> {
        const item = localStorage.getItem(name);
        if (!item) {
            return defaultValue;
        }
        return JSON.parse(item);
    }

    async set<T>(name: PropertyName, value: T) {
        const string = JSON.stringify(value);
        localStorage.setItem(name, string);
    }

    protected async push<T>(name: PropertyName, value: T): Promise<void> {
        const id = `id${Date.now()}_${Math.floor(Math.random() * 100)}`; // very very cool id
        const values = await this.get<Collection<T>>(name, {});
        values[id] = value;
        await this.set(name, values);
    }
}
