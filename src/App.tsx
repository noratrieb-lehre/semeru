import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import firebase from "firebase/compat";
import { QTask } from "./components/QuickTask";
import Menu from "./components/Menu";
import TimerPage from "./components/TimerPage";
import Settings from "./components/Settings";
import Stats from "./components/Stats";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import Store from "./store/Store";
import LocalStore from "./store/LocalStore";
import CloudStore from "./store/CloudStore";

import de from "./locale/de.json";
import en from "./locale/en2.json";
import { Collection, collectionToArray } from "./Task";

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

const App = () => {
    const [locale, setLocale] = useState<Locale>(en);
    const [store, setStore] = useState<Store>(globalLocalStore);
    const [quickTasks, setQuickTasks] = useState<Collection<QTask>>({});
    const [user, setUser] = useState<firebase.User | null>(null);

    useEffect(() => {
        const listener = (locale: LocaleName) => setLocale(locales[locale]);
        store.getLocale(listener).then();

        return () => void store.removeListener(listener);
    }, [store]);

    useEffect(() => {
        const listener = (qTasks: Collection<QTask>) => setQuickTasks(qTasks);
        store.getQuickTasks(listener).then();

        return () => void store.removeListener(listener);
    }, [store]);

    useEffect(() => {
        firebase.auth().onAuthStateChanged((user) => {
            setUser(user);
            if (!user) {
                setStore(globalLocalStore);
            } else {
                setStore(new CloudStore(user));
            }
        });
    }, []);

    const changeLocale = (name: LocaleName) => store.setLocale(name).then();

    return (
        <div>
            <BrowserRouter>
                <LocaleContext.Provider value={locale}>
                    <UserContext.Provider value={user}>
                        <StoreContext.Provider value={store}>
                            <Menu changeLocale={changeLocale} />
                            <Switch>
                                <Route path="/settings">
                                    <Settings
                                        /* casts are valid because user must exist for these to be used*/
                                        quickTasks={quickTasks}
                                        upload={() => copyValues(globalLocalStore, store)}
                                        download={() => copyValues(store, globalLocalStore)}
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
                        </StoreContext.Provider>
                    </UserContext.Provider>
                </LocaleContext.Provider>
            </BrowserRouter>
        </div>
    );
};

const copyValues = async (source: Store, target: Store) => {
    await target.clear();
    await source.getTasks((tasks) => {
        collectionToArray(tasks).forEach((task) => target.addTask(task));
    });
    await source.getLocale((locale) => target.setLocale(locale));
    await source.getQuickTasks((quickTasks) =>
        collectionToArray(quickTasks).forEach((quickTask) => target.addQuickTask(quickTask))
    );
    await source.getCurrentTask((currentTask) => target.updateCurrentTask(currentTask));

    // clear all listeners that were created
    window.location.reload();
};

export default App;
export { LocaleContext, UserContext, StoreContext };
export type { LocaleName };
