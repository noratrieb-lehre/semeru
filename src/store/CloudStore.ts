import Store, { Listener, PropertyName } from "./Store";
import firebase from "firebase/compat/app";

type FirebaseListener = (a: firebase.database.DataSnapshot, b?: string | null) => any;

export default class CloudStore extends Store {
    _user: firebase.User;
    // we need to map our listeners to firebase listeners, because we cannot use firebase listeners directly,
    // because the LocalStore cannot call firebase listeners.
    // we need to store the firebase listeners here, because we need to be able to remove them later
    _listenerMap: Map<Listener<any>, { name: PropertyName; listener: FirebaseListener }>;

    constructor(user: firebase.User) {
        super();
        this._user = user;
        this._listenerMap = new Map();
    }

    public async removeListener(listener: Listener<any>): Promise<void> {
        const firebaseListener = this._listenerMap.get(listener);
        if (!firebaseListener) {
            return;
        }
        firebase.database().ref(this.path(firebaseListener.name)).off("value", firebaseListener.listener);
    }

    public async removeQuickTask(id: string): Promise<void> {
        await firebase
            .database()
            .ref(`${this.path("quickTasks")}/${id}`)
            .set(null);
    }

    public getOnce<T>(name: PropertyName, defaultValue: T): Promise<T> {
        return firebase
            .database()
            .ref(this.path(name))
            .get()
            .then((val) => val.val());
    }

    protected async set<T>(name: PropertyName, value: T): Promise<void> {
        await firebase.database().ref(this.path(name)).set(value);
    }

    protected async push<T>(name: PropertyName, value: T): Promise<void> {
        firebase.database().ref(this.path(name)).push(value);
    }

    protected async get<T>(name: PropertyName, defaultValue: T, listener: Listener<T>): Promise<void> {
        const firebaseListener: FirebaseListener = (data) => listener(data.val() || defaultValue);
        this._listenerMap.set(listener, { name, listener: firebaseListener });
        firebase.database().ref(this.path(name)).on("value", firebaseListener);
    }

    private path(name: string): string {
        return `users/${this._user.uid}/${name}`;
    }
}
