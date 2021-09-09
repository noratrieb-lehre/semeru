import React, { useContext } from "react";
import QuickTask, { QTask } from "./QuickTask";
import { Button, Col, Container, Row } from "react-bootstrap";
import { ErrorContext, LocaleContext, StoreContext, UserContext } from "../App";
import { Collection } from "../Task";

interface SettingsProps {
    quickTasks: Collection<QTask>;
    upload: () => void;
    download: () => void;
}

const Settings: React.FC<SettingsProps> = ({ quickTasks, upload, download }) => {
    const locale = useContext(LocaleContext);
    const user = useContext(UserContext);
    const store = useContext(StoreContext);
    const error = useContext(ErrorContext);

    const newQuickTask = async () => {
        const task = window.prompt(locale.settings.newTaskMessage);
        if (!task) {
            return;
        }
        await store.addQuickTask(task).catch(error(locale.errors.addQuickTask));
    };

    const removeQuickTaskHandler = (id: string) =>
        store.removeQuickTask(id).catch(error(locale.errors.removeQuickTask));

    return (
        <Container>
            <Row>
                <Row className="mb-4">
                    <h2>{locale.settings.quickTasks}</h2>
                    {Object.entries(quickTasks).map(([id, task]) => (
                        <Row key={id}>
                            <Col xs={10}>
                                <QuickTask name={task} handler={() => {}} />
                                <Button
                                    className="m-1"
                                    onClick={() => removeQuickTaskHandler(id)}
                                    variant="outline-danger"
                                >
                                    X
                                </Button>
                            </Col>
                        </Row>
                    ))}
                    <Row>
                        <Col>
                            <Button variant="outline-primary" className="m-1" onClick={newQuickTask}>
                                {locale.settings.new}
                            </Button>
                        </Col>
                    </Row>
                </Row>
                <Row className="mb-4">
                    <h2>{locale.settings.synchronizeTitle}</h2>
                    {user ? (
                        <Col>
                            {locale.settings.syncExplain}
                            <h5>{locale.settings.fromCtoL}</h5>
                            <Button variant="outline-primary" onClick={upload}>
                                {locale.settings.upload}
                            </Button>
                            <h5 className="mt-3">{locale.settings.fromLtoC}</h5>
                            <Button variant="outline-primary" onClick={download}>
                                {locale.settings.download}
                            </Button>
                            <h5 className="mt-3">{locale.settings.deleteData}</h5>
                            <Button variant="outline-primary" onClick={download}>
                                {locale.settings.delete}
                            </Button>
                        </Col>
                    ) : (
                        <h5>{locale.settings.mustBeLoggedIn}</h5>
                    )}
                </Row>
            </Row>
        </Container>
    );
};

export default Settings;
