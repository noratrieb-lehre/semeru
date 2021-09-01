import React, { useState } from "react";
import de from "./local/de.json";
import en from "./local/en2.json";
import Menu from "./components/Menu";
import * as store from "./Store";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import TimerPage from "./components/TimerPage";
import { QTask } from "./components/QuickTask";

type Local = typeof de;
type LocalName = "en" | "de";

type Locals = {
    [name in LocalName]: Local;
};

const locals: Locals = {
    de,
    en,
};

const LocalContext = React.createContext(en);

const App = () => {
    const [local, setLocal] = useState<Local>(en);
    const [quickTasks, setQuickTasks] = useState<QTask[]>(
        store.getQuickTasks()
    );

    const addQuickTask = (task: QTask) => {
        const tasks = [...quickTasks, task];
        store.setQuickTasks(tasks);
        setQuickTasks(tasks);
    };

    const changeLocal = (name: LocalName) => {
        setLocal(locals[name]);
    };

    return (
        <div>
            <BrowserRouter>
                <LocalContext.Provider value={local}>
                    <Menu changeLocal={changeLocal} />
                    <Switch>
                        <Route path="/">
                            <TimerPage quickTasks={quickTasks} />
                        </Route>
                    </Switch>
                </LocalContext.Provider>
            </BrowserRouter>
        </div>
    );
};

export default App;
export { LocalContext };
export type { LocalName };
