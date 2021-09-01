import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import firebase from "firebase/compat";
import { QTask } from "./components/QuickTask";
import * as store from "./store/LocalStore";
import de from "./locale/de.json";
import en from "./locale/en2.json";
import Menu from "./components/Menu";
import TimerPage from "./components/TimerPage";
import Settings from "./components/Settings";
import Stats from "./components/Stats";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";

type Locale = typeof de;
type LocaleName = "en" | "de";

type Locals = {
    [name in LocaleName]: Locale;
};

const locales: Locals = {
    de,
    en,
};

const LocaleContext = React.createContext(en);
const UserContext = React.createContext<firebase.User | null>(null);

const App = () => {
    const [local, setLocale] = useState<Locale>(en);
    const [quickTasks, setQuickTasks] = useState<QTask[]>(store.getQuickTasks());

    const [user, setUser] = useState<firebase.User | null>(null);

    useEffect(() => {
        firebase.auth().onAuthStateChanged((user) => {
            console.log("auth state changed 😳😳😳", user);
            setUser(user);
        });
    }, []);

    const setQuickTasksHandler = (tasks: QTask[]) => {
        store.setQuickTasks(tasks);
        setQuickTasks(tasks);
    };

    const changeLocale = (name: LocaleName) => {
        setLocale(locales[name]);
    };

    return (
        <div>
            <BrowserRouter>
                <LocaleContext.Provider value={local}>
                    <UserContext.Provider value={user}>
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
                    </UserContext.Provider>
                </LocaleContext.Provider>
            </BrowserRouter>
        </div>
    );
};

export default App;
export { LocaleContext, UserContext };
export type { LocaleName };
