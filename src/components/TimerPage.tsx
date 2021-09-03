import React, { useContext, useEffect, useState } from "react";
import { ErrorContext, LocaleContext, StoreContext } from "../App";
import { Button, Col, Container, Row } from "react-bootstrap";
import { Collection, collectionToArray, CurrentTask, CurrentTaskWB, totalCurrentTaskTime, withBreaks } from "../Task";
import QuickTask, { QTask } from "./QuickTask";

interface TimerPageProps {
    quickTasks: Collection<QTask>;
}

const TimerPage = ({ quickTasks }: TimerPageProps) => {
    const locale = useContext(LocaleContext);
    const store = useContext(StoreContext);
    const error = useContext(ErrorContext);
    const [task, setCurrentTask] = useState<CurrentTaskWB | null>(null);

    useEffect(() => {
        const listener = (newTask: CurrentTask | null) => setCurrentTask(newTask ? withBreaks(newTask) : null);
        store.getCurrentTask(listener).catch(error(locale.errors.getCurrentTask));

        return () => {
            store.removeListener(listener).catch(error(locale.errors.getCurrentTask));
        };
    }, [locale, error, store]);

    const quickTaskArray = collectionToArray(quickTasks);

    const startHandler = async (name?: string) => {
        await stopHandler();
        await store.start(name);
    };

    const pauseHandler = () => {
        const next = task && {
            ...task,
            currentBreakStart: Date.now(),
        };
        store.updateCurrentTask(next).catch(error(locale.errors.updateCurrentTask));
    };

    const resumeHandler = () => {
        if (!task?.currentBreakStart) {
            return task;
        }
        const next = task && {
            start: task.start,
            name: task.name,
            breaks: [
                ...task.breaks,
                {
                    start: task.currentBreakStart,
                    end: Date.now(),
                },
            ],
        };
        store.updateCurrentTask(next).catch(error(locale.errors.updateCurrentTask));
    };

    const stopHandler = async () => {
        if (!task) {
            return;
        }
        let name = task.name;
        if (!name) {
            const input = window.prompt(locale.timer.enterLastTaskName);
            if (!input) {
                return;
            }
            name = input;
        }
        const namedTask = { ...task, name };
        await store.stop(namedTask);
    };

    const cancelHandler = async () => {
        await store.cancel();
    };

    return (
        <Col className="d-grid justify-content-center">
            <Row>
                <Container className="d-grid justify-content-center">
                    <Timer task={task} />
                </Container>
                <Container className="d-grid justify-content-center">
                    <Col>
                        <Button variant="outline-success" onClick={() => startHandler()}>
                            {locale.timer.start}
                        </Button>
                        {task?.currentBreakStart ? (
                            <Button variant="outline-info" className="m-1" onClick={resumeHandler}>
                                {locale.timer.resume}
                            </Button>
                        ) : (
                            <Button variant="outline-info" className="m-1" onClick={pauseHandler}>
                                {locale.timer.pause}
                            </Button>
                        )}
                        <Button variant="outline-danger" onClick={stopHandler}>
                            {locale.timer.stop}
                        </Button>
                        <Button variant="outline-danger" className="m-1" onClick={cancelHandler}>
                            {locale.timer.cancel}
                        </Button>
                    </Col>
                </Container>
            </Row>
            <div className="m-3" />
            <Row className="d-grid justify-content-center">
                {quickTaskArray.map((quickTask) => (
                    <QuickTask name={quickTask} handler={() => startHandler(quickTask)} key={quickTask} />
                ))}
            </Row>
        </Col>
    );
};

interface TimerProps {
    task: CurrentTaskWB | null;
}

const Timer = (props: TimerProps) => {
    return (
        <h1 style={{ fontSize: 60 }}>
            <TimerInner {...props} />
        </h1>
    );
};

const TimerInner = ({ task }: TimerProps) => {
    const [, setRefresh] = useState(0);

    useEffect(() => {
        if (task) {
            const i = setInterval(() => {
                setRefresh((refresh) => refresh + 1);
            }, 500);
            return () => clearInterval(i);
        }
    }, [task]);

    return <>{task ? formatTime(totalCurrentTaskTime(task)) : "00:00:00"}</>;
};

function formatTime(time: number): string {
    time = time / 1000;
    const seconds = time % 60;
    let minutes = time / 60;
    let hours = 0;
    if (minutes > 60) {
        hours = minutes / 60;
        minutes = minutes % 60;
    }

    return (
        `${Math.floor(Math.max(hours, 0)).toString().padStart(2, "0")}:` +
        `${Math.floor(Math.max(minutes, 0)).toString().padStart(2, "0")}:` +
        `${Math.floor(Math.max(seconds, 0)).toString().padStart(2, "0")}`
    );
}

export default TimerPage;
