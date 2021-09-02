import Store, { PropertyName, TaskListener } from "./Store";
import firebase from "firebase/compat";
import { CurrentTask } from "../Task";

type FirebaseListener = (a: firebase.database.DataSnapshot, b?: string | null) => any;

export default class CloudStore extends Store {
    _user: firebase.User;
    // we need to map our listeners to firebase listeners, because we cannot use firebase listeners directly,
    // because the LocalStore cannot call firebase listeners.
    // we need to store the firebase listeners here, because we need to be able to remove them later
    _listenerMap: Map<TaskListener, FirebaseListener>;

    constructor(user: firebase.User) {
        super();
        this._user = user;
        this._listenerMap = new Map();
    }

    public getCurrentTask(): Promise<CurrentTask | null> {
        return this.get("currentTask", null);
    }

    async registerTaskListener(listener: TaskListener) {
        const firebaseListener: FirebaseListener = (snapshot) => listener(snapshot.val() || []);
        this._listenerMap.set(listener, firebaseListener);
        await firebase.database().ref(`users/${this._user.uid}/tasks`).on("value", firebaseListener);
    }

    async removeTaskListener(listener: TaskListener) {
        const firebaseListener = this._listenerMap.get(listener);
        await firebase.database().ref(`users/${this._user.uid}/tasks`).off("value", firebaseListener);
    }

    protected set<T>(name: PropertyName, value: T): Promise<void> {
        return firebase.database().ref(`users/${this._user.uid}/${name}`).set(value);
    }

    protected get<T>(name: PropertyName, defaultValue: T): Promise<T> {
        return firebase
            .database()
            .ref(`users/${this._user.uid}/${name}`)
            .get()
            .then((value) => value.val() || defaultValue);
    }

    protected async push<T>(name: PropertyName, value: T): Promise<void> {
        await firebase.database().ref(`users/${this._user.uid}/${name}`).push(value);
    }

    public async removeQuickTask(id: string): Promise<void> {
        await firebase.database().ref(`users/${this._user.uid}/quickTasks/${id}`).set(null);
    }
}
