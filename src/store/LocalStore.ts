import { Task } from "../Task";
import Store, { CurrentTaskWithName, PropertyName, TaskListener } from "./Store";

export default class LocalStore extends Store {
    listeners: TaskListener[] = [];

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

    public async stop({ start, name, breaks }: CurrentTaskWithName): Promise<Task> {
        const newTask = await super.stop({ start, name, breaks });
        // this is not strictly needed, because we already get all tasks in super.stop, but get is fast enough to not care about it
        const tasks = await this.get<Task[]>("tasks", []);

        this.listeners.forEach((l) => l(tasks));

        return newTask;
    }

    public async registerTaskListener(listener: TaskListener) {
        this.listeners.push(listener);
    }

    public async removeTaskListener(listener: TaskListener) {
        this.listeners = this.listeners.filter((l) => !Object.is(listener, l));
    }
}
