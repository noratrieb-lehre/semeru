import Store, { PropertyName, TaskListener } from "./Store";
import firebase from "firebase/compat";

type FirebaseListener = (a: firebase.database.DataSnapshot, b?: string | null) => any;

export default class CloudStore extends Store {
    _user: firebase.User;
    // we need to map our listeners to firebase listeners, because we cannot use firebase listeners directly,
    // because the LocalStore cannot call firebase listeners.
    // we need to store the firebase listeners here, because we need to be able to remove them later
    _listenerMap: Map<TaskListener, FirebaseListener>;

    constructor(user: firebase.User) {
        super();
        console.log("create CloudStore");
        this._user = user;
        this._listenerMap = new Map();
    }

    async registerTaskListener(listener: TaskListener) {
        console.log("add firebase listener");
        const firebaseListener: FirebaseListener = (snapshot) => listener(snapshot.val());
        this._listenerMap.set(listener, firebaseListener);
        firebase.database().ref(`users/${this._user.uid}/tasks`).on("value", firebaseListener);
    }

    async removeTaskListener(listener: TaskListener) {
        console.log("remove firebase listener");
        const firebaseListener = this._listenerMap.get(listener);
        firebase.database().ref(`users/${this._user.uid}/tasks`).off("value", firebaseListener);
    }

    protected async set<T>(name: PropertyName, value: T): Promise<void> {
        console.log("set firebase value", name);
        return firebase.database().ref(`users/${this._user.uid}/${name}`).set(value);
    }

    protected async get<T>(name: PropertyName, defaultValue: T): Promise<T> {
        console.log("get firebase value", name);
        return firebase
            .database()
            .ref(`users/${this._user.uid}/${name}`)
            .get()
            .then((value) => value.val() || defaultValue);
    }
}
