import React, { useContext } from "react";
import QuickTask, { QTask } from "./QuickTask";
import { Button, Col, Container, Row } from "react-bootstrap";
import { LocaleContext, StoreContext, UserContext } from "../App";
import { Collection } from "../Task";

interface SettingsProps {
    quickTasks: Collection<QTask>;
    upload: () => void;
    download: () => void;
}

const Settings = ({ quickTasks, upload, download }: SettingsProps) => {
    const locale = useContext(LocaleContext);
    const user = useContext(UserContext);
    const store = useContext(StoreContext);

    const newQuickTask = async () => {
        const task = window.prompt(locale.settings.newTaskMessage);
        if (!task) {
            return;
        }
        await store.addQuickTask(task);
    };

    const removeQuickTaskHandler = (id: string) => store.removeQuickTask(id).then();

    return (
        <Container>
            <Row>
                <Row className="mb-4">
                    <h2>{locale.settings.quickTasks}</h2>
                    {Object.entries(quickTasks).map(([id, task]) => (
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
                <Row className="mb-4">
                    <h2>{locale.settings.synchronizeTitle}</h2>
                    {user ? (
                        <>
                            {locale.settings.syncExplain}
                            <h5>{locale.settings.fromCtoL}</h5>
                            <Button onClick={upload}>{locale.settings.upload}</Button>
                            <h5>{locale.settings.fromLtoC}</h5>
                            <Button onClick={download}>{locale.settings.download}</Button>
                        </>
                    ) : (
                        <h5>{locale.settings.mustBeLoggedIn}</h5>
                    )}
                </Row>
            </Row>
        </Container>
    );
};

export default Settings;
