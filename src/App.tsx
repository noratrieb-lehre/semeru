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
    const [quickTasks, setQuickTasks] = useState<QTask[]>([]);
    const [user, setUser] = useState<firebase.User | null>(null);

    useEffect(() => {
        store.getQuickTasks().then((qTasks) => setQuickTasks(qTasks));
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

    const setQuickTasksHandler = (tasks: QTask[]) => {
        store.setQuickTasks(tasks).then();
        setQuickTasks(tasks);
    };

    const changeLocale = (name: LocaleName) => {
        setLocale(locales[name]);
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
                                    <Settings setQuickTasks={setQuickTasksHandler} quickTasks={quickTasks} />
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
