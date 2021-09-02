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
import { Collection } from "./Task";

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

    const addQuickTaskHandler = async (task: QTask) => {
        await store.addQuickTask(task);
        // it is going to get displayed automatically thanks to the listener above, just like the 2 below
    };

    const removeQuickTaskHandler = (id: string) => {
        store.removeQuickTask(id).then();
    };

    const changeLocale = (name: LocaleName) => {
        store.setLocale(name).then();
    };

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
                                        removeQuickTaskHandler={removeQuickTaskHandler}
                                        addQuickTaskHandler={addQuickTaskHandler}
                                        quickTasks={quickTasks}
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

export default App;
export { LocaleContext, UserContext, StoreContext };
export type { LocaleName };
