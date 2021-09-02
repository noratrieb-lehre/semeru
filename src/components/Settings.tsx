import React, { useContext } from "react";
import QuickTask, { QTask } from "./QuickTask";
import { Button, Col, Container, Row } from "react-bootstrap";
import { LocaleContext } from "../App";
import { Collection } from "../Task";

interface SettingsProps {
    quickTasks: Collection<QTask>;
    addQuickTaskHandler: (task: QTask) => void;
    removeQuickTaskHandler: (id: string) => void;
}

const Settings = ({ quickTasks, addQuickTaskHandler, removeQuickTaskHandler }: SettingsProps) => {
    const locale = useContext(LocaleContext);

    const newQuickTask = () => {
        const task = window.prompt(locale.settings.newTaskMessage);
        if (!task) {
            return;
        }
        addQuickTaskHandler(task);
    };

    return (
        <Container>
            <Row>
                <h2>{locale.settings.quickTasks}</h2>
                {Object.entries(quickTasks).map(([id, task], i) => (
                    <Row key={id}>
                        <Col xs={10}>
                            <QuickTask name={task} handler={() => {}} />
                        </Col>
                        <Col xs={2}>
                            <Button onClick={() => removeQuickTaskHandler(id)} variant="danger">
                                X
                            </Button>
                        </Col>
                    </Row>
                ))}
                <Row>
                    <Col>
                        <Button onClick={newQuickTask}>{locale.settings.new}</Button>
                    </Col>
                </Row>
            </Row>
        </Container>
    );
};

export default Settings;
