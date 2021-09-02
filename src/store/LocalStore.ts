import { Collection } from "../Task";
import Store, { Listener, PropertyName } from "./Store";
import { QTask } from "../components/QuickTask";

export default class LocalStore extends Store {
    _listeners: Array<{ value: PropertyName; listener: Listener<any>; defaultValue: any }> = [];

    async getSingle<T>(name: PropertyName, defaultValue: T): Promise<T> {
        const item = localStorage.getItem(name);
        if (!item) {
            return defaultValue;
        }
        return JSON.parse(item);
    }

    async set<T>(name: PropertyName, value: T) {
        const string = JSON.stringify(value);
        localStorage.setItem(name, string);
        this._listeners
            .filter(({ value }) => value === name)
            .forEach(({ listener, defaultValue }) => listener(value || defaultValue));
    }

    public async removeQuickTask(id: string): Promise<void> {
        const tasks = await this.getSingle<Collection<QTask>>("quickTasks", {});
        delete tasks[id];
        await this.set("quickTasks", tasks);
    }

    public async removeListener(toRemove: Listener<any>): Promise<void> {
        this._listeners = this._listeners.filter(({ listener }) => listener !== toRemove);
    }

    protected async push<T>(name: PropertyName, value: T): Promise<void> {
        const id = `id${Date.now()}_${Math.floor(Math.random() * 100)}`; // very very cool id
        const values = await this.getSingle<Collection<T>>(name, {});
        values[id] = value;
        await this.set(name, values);
    }

    protected async get<T>(value: PropertyName, defaultValue: T, listener: Listener<T>): Promise<void> {
        this._listeners.push({ value, listener, defaultValue });
        listener(await this.getSingle(value, defaultValue));
    }
}
