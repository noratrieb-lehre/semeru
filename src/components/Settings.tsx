import React, { useContext } from "react";
import QuickTask, { QTask } from "./QuickTask";
import { Button, Col, Container, Row } from "react-bootstrap";
import { LocalContext } from "../App";

interface SettingsProps {
    quickTasks: QTask[];
    setQuickTasks: (task: QTask[]) => void;
}

const Settings = ({ quickTasks, setQuickTasks }: SettingsProps) => {
    const local = useContext(LocalContext);

    const newQuickTask = () => {
        const task = window.prompt(local.settings.newTaskMessage);
        if (!task) {
            return;
        }
        setQuickTasks([...quickTasks, task]);
    };
    const removeQuickTask = (index: number) => {
        setQuickTasks(quickTasks.filter((_, i) => i !== index));
    };

    return (
        <Container>
            <Row>
                <h2>{local.settings.quickTasks}</h2>
                {quickTasks.map((task, i) => (
                    <Row key={task}>
                        <Col xs={10}>
                            <QuickTask name={task} handler={() => {}} />
                        </Col>
                        <Col xs={2}>
                            <Button
                                onClick={() => removeQuickTask(i)}
                                variant="danger"
                            >
                                X
                            </Button>
                        </Col>
                    </Row>
                ))}
                <Row>
                    <Col>
                        <Button onClick={newQuickTask}>
                            {local.settings.new}
                        </Button>
                    </Col>
                </Row>
            </Row>
        </Container>
    );
};

export default Settings;
