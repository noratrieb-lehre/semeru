import React, {useState} from 'react';
import de from './local/de.json';
import en from './local/en2.json';
import Menu from "./pages/Menu";
import {BrowserRouter, Switch, Route} from "react-router-dom";
import TimerPage from "./pages/TimerPage";

type Local = typeof de;
type LocalName = 'en' | 'de';

type Locals = {
    [name in LocalName]: Local;
};

const locals: Locals = {
    de,
    en,
}

const LocalContext = React.createContext(en);

const App = () => {
    const [local, setLocal] = useState<Local>(en);

    const changeLocal = (name: LocalName) => {
        setLocal(locals[name])
    }

    return (
        <div>
            <BrowserRouter>
                <LocalContext.Provider value={local}>
                    <Menu changeLocal={changeLocal}/>
                    <Switch>
                        <Route path="/" component={TimerPage}/>
                    </Switch>
                </LocalContext.Provider>
            </BrowserRouter>
        </div>
    );
}

export default App;
export {LocalContext};
export type {LocalName};

