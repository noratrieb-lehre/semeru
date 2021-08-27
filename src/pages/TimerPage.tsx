import React, {useContext, useEffect, useState} from 'react';
import {LocalContext} from "../App";
import {Button, Col, Row} from "react-bootstrap";
import * as store from "../Store"
import {CurrentTask, totalCurrentTaskTime} from "../Types";
import {updateCurrentTask} from "../Store";


const TimerPage = () => {
    const local = useContext(LocalContext);
    const [task, setCurrentTask] = useState<CurrentTask | null>(store.getCurrentTask);


    const startHandler = (name?: string) => {
        const task = store.start(name);
        setCurrentTask(task);
    }

    const pauseHandler = () => {
        setCurrentTask(task => {
            const next = task && {
                ...task,
                currentBreakStart: Date.now(),
            }
            store.updateCurrentTask(next);
            return next;
        })
    }

    const resumeHandler = () => {
        setCurrentTask(task => {
            if (!task?.currentBreakStart) {
                return task;
            }
            const next = task && {
                start: task.start,
                name: task.name,
                breaks: [...task.breaks, {
                    start: task.currentBreakStart,
                    end: Date.now(),
                }]
            }
            updateCurrentTask(next);
            return next;
        })
    }

    const stopHandler = () => {
        if (!task) {
            return;
        }
        let name = task.name;
        if (!name) {
            const input = window.prompt(local.timer.enterTaskName);
            if (!input) {
                return;
            }
            name = input;
        }
        const namedTask = {...task, name};
        store.stop(namedTask);
        setCurrentTask(null);
    }

    return (
        <Col>
            <Row>
                <Button variant="success" onClick={() => startHandler()}>{local.timer.start}</Button>
            </Row>
            <Row>
                <Col>
                    <Timer task={task}/>
                </Col>
            </Row>
            <Row>
                <Col>
                    {
                        task?.currentBreakStart ?
                            <Button variant="info" onClick={resumeHandler}>{local.timer.resume}</Button>
                            :
                            <Button variant="info" onClick={pauseHandler}>{local.timer.pause}</Button>
                    }
                </Col>
                <Col>
                    <Button variant="danger" onClick={() => stopHandler()}>{local.timer.stop}</Button>
                </Col>
            </Row>
        </Col>
    );
};

interface TimerProps {
    task: CurrentTask | null
}

const Timer = (props: TimerProps) => {
    return <h1><TimerInner {...props}/></h1>
}

const TimerInner = ({task}: TimerProps) => {
    const [, setRefresh] = useState(0);

    useEffect(() => {
        if (task) {
            const i = setInterval(() => {
                setRefresh(refresh => refresh + 1);
            }, 500);
            return () => clearInterval(i);
        }
    }, [task])

    return (
        <>
            {task ? formatTime(totalCurrentTaskTime(task)) : "00:00:00"}
        </>
    );
}

function formatTime(time: number): string {
    time = time / 1000;
    const seconds = time % 60;
    let minutes = time / 60;
    let hours = 0;
    if (minutes > 60) {
        hours = minutes / 60;
        minutes = minutes % 60;
    }

    return `${Math.floor(hours).toString().padStart(2, "0")}:` +
        `${Math.floor(minutes).toString().padStart(2, "0")}:` +
        `${Math.floor(seconds).toString().padStart(2, "0")}`;
}

export default TimerPage;

