import React, { useContext, useEffect, useState } from "react";
import { LocaleContext } from "../App";
import { Button, Col, Container, ListGroup, ListGroupItem, Row } from "react-bootstrap";
import * as store from "../store/LocalStore";
import { TaskTimes, timeForTasksSince } from "../Task";

type Time = "day" | "week" | "month" | "all";

const times: Time[] = ["day", "week", "month", "all"];

const Stats = () => {
    const locale = useContext(LocaleContext);

    const [groupedBy, setGroupedBy] = useState<Time>("day");

    const [tasks, setTasks] = useState<TaskTimes>(() => timeForTasksSince(store.getTasks(), toTimestamp(groupedBy)));

    useEffect(() => {
        const newTasks = store.getTasks();
        setTasks(timeForTasksSince(newTasks, toTimestamp(groupedBy)));
        const i = store.registerTaskListener((newTasks) =>
            setTasks(timeForTasksSince(newTasks, toTimestamp(groupedBy)))
        );

        return () => store.removeTaskListener(i);
    }, [groupedBy, setTasks]);

    return (
        <Container>
            <Row>
                {times.map((name) => (
                    <Col key={name}>
                        <Button
                            variant={groupedBy === name ? "secondary" : "outline-secondary"}
                            onClick={() => setGroupedBy(name)}
                        >
                            {locale.stats[name]}
                        </Button>
                    </Col>
                ))}
            </Row>
            <ListGroup>
                {tasks.map((task) => (
                    <ListGroupItem key={task.name}>
                        <Container>
                            <Row>
                                <Col>{task.name}</Col>
                                <Col>{formatTimeText(task.time)}</Col>
                            </Row>
                        </Container>
                    </ListGroupItem>
                ))}
            </ListGroup>
        </Container>
    );
};

const toTimestamp = (time: Time): number => {
    switch (time) {
        case "all":
            return 0;
        case "day": {
            const date = new Date();
            date.setHours(0, 0, 0);
            return date.getTime();
        }
        case "week": {
            const date = new Date();
            const weekDay = (date.getDay() || 7) - 1;
            const newDate = date.getDate() - weekDay;
            date.setDate(newDate);
            date.setHours(0, 0, 0);
            return date.getTime();
        }
        case "month":
            const date = new Date();
            date.setDate(1);
            date.setHours(0, 0, 0);
            return date.getTime();
    }
};

function formatTimeText(time: number) {
    time = time / 1000;
    const seconds = time % 60;
    let minutes = time / 60;
    let hours = 0;
    if (minutes > 60) {
        hours = minutes / 60;
        minutes = minutes % 60;
    }

    return `${Math.floor(hours)}h ` + `${Math.floor(minutes)}min ` + `${Math.floor(seconds)}s`;
}

export default Stats;
