import React, { useCallback, useEffect, useState } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import firebase from "firebase/compat";
import { QTask } from "./components/QuickTask";
import Menu from "./components/Menu";
import TimerPage from "./components/TimerPage";
import Settings from "./components/Settings";
import Stats from "./components/Stats";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import Store, { Listener } from "./store/Store";
import LocalStore from "./store/LocalStore";
import CloudStore from "./store/CloudStore";
import { Collection, collectionToArray, CurrentTask, Task } from "./Task";
import de from "./locale/de.json";
import en from "./locale/en2.json";
import { Alert } from "react-bootstrap";

export type ErrorHandler = (msg: string) => () => void;

type Locale = typeof de;
type LocaleName = "en" | "de";

type Locales = {
    [name in LocaleName]: Locale;
};

const locales: Locales = {
    de,
    en,
};

const globalLocalStore = new LocalStore();

const LocaleContext = React.createContext(en);
const UserContext = React.createContext<firebase.User | null>(null);
const StoreContext = React.createContext<Store>(globalLocalStore);
const ErrorContext = React.createContext<ErrorHandler>(() => () => {});

const App = () => {
    const errorHandler = useCallback(
        (msg: string) => () => {
            console.error(msg);
            setError(msg);
            setTimeout(() => setError(null), 3000);
        },
        []
    );

    const [locale, setLocale] = useState<Locale>(en);
    const [store, setStore] = useState<Store>(globalLocalStore);
    const [quickTasks, setQuickTasks] = useState<Collection<QTask>>({});
    const [user, setUser] = useState<firebase.User | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const listener = (newLocale: LocaleName) => setLocale(locales[newLocale]);
        store.getLocale(listener).catch();

        return () => {
            store.removeListener(listener).catch(errorHandler(locale.errors.getQuickTasks));
        };
    }, [locale, errorHandler, store]);

    useEffect(() => {
        const listener = (qTasks: Collection<QTask>) => setQuickTasks(qTasks);
        store.getQuickTasks(listener).catch(errorHandler(locale.errors.getQuickTasks));

        return () => {
            store.removeListener(listener).catch(errorHandler(locale.errors.getQuickTasks));
        };
    }, [locale, errorHandler, store]);

    useEffect(() => {
        firebase.auth().onAuthStateChanged((newUser) => {
            setUser(newUser);
            if (!newUser) {
                setStore(globalLocalStore);
            } else {
                setStore(new CloudStore(newUser));
            }
        });
    }, []);

    const changeLocale = (name: LocaleName) => store.setLocale(name).catch(errorHandler(locale.errors.setLocale));

    return (
        <div lang={locale.name}>
            <BrowserRouter>
                <LocaleContext.Provider value={locale}>
                    <UserContext.Provider value={user}>
                        <StoreContext.Provider value={store}>
                            <ErrorContext.Provider value={errorHandler}>
                                <Menu changeLocale={changeLocale} />
                                <Switch>
                                    <Route path="/settings">
                                        <Settings
                                            /* casts are valid because user must exist for these to be used */
                                            quickTasks={quickTasks}
                                            upload={() => localToCloud(globalLocalStore, store as CloudStore)}
                                            download={() => cloudToLocal(store as CloudStore, globalLocalStore)}
                                        />
                                    </Route>
                                    <Route path="/stats">
                                        <Stats />
                                    </Route>
                                    <Route path="/sign-in" component={SignIn} />
                                    <Route path="/sign-up" component={SignUp} />
                                    <Route path="/">
                                        <TimerPage quickTasks={quickTasks} />
                                    </Route>
                                </Switch>
                                <footer>
                                    <Alert variant="danger" show={!!error}>
                                        {error}
                                    </Alert>
                                </footer>
                            </ErrorContext.Provider>
                        </StoreContext.Provider>
                    </UserContext.Provider>
                </LocaleContext.Provider>
            </BrowserRouter>
        </div>
    );
};

const cloudToLocal = async (source: CloudStore, target: LocalStore) => {
    await target.clear();

    const getTasks: Listener<Collection<Task>> = (tasks) => target.pushAll("tasks", tasks);
    await source.getTasks(getTasks);
    await source.removeListener(getTasks);

    const getLocale = (locale: LocaleName) => target.setLocale(locale);
    await source.getLocale(getLocale);
    await source.removeListener(getLocale);

    const getQuickTasks = (quickTasks: Collection<QTask>) => target.pushAll("quickTasks", quickTasks);
    await source.getQuickTasks(getQuickTasks);
    await source.removeListener(getQuickTasks);

    const getCurrentTask = (currentTask: CurrentTask | null) => target.updateCurrentTask(currentTask);
    await source.getCurrentTask(getCurrentTask);
    await source.removeListener(getCurrentTask);
};

const localToCloud = async (source: LocalStore, target: CloudStore) => {
    await target.clear();

    const getTasks: Listener<Collection<Task>> = (tasks) =>
        collectionToArray(tasks).forEach((task) => target.addTask(task));
    await source.getTasks(getTasks);
    await source.removeListener(getTasks);

    const getLocale = (locale: LocaleName) => target.setLocale(locale);
    await source.getLocale(getLocale);
    await source.removeListener(getLocale);

    const getQuickTasks = (quickTasks: Collection<QTask>) =>
        collectionToArray(quickTasks).forEach((quickTask) => target.addQuickTask(quickTask));
    await source.getQuickTasks(getQuickTasks);
    await source.removeListener(getQuickTasks);

    const getCurrentTask = (currentTask: CurrentTask | null) => target.updateCurrentTask(currentTask);
    await source.getCurrentTask(getCurrentTask);
    await source.removeListener(getCurrentTask);
};

export default App;
export { LocaleContext, UserContext, StoreContext, ErrorContext };
export type { LocaleName };
