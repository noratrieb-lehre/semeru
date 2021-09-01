import React from "react";
import { Button } from "react-bootstrap";

export type QTask = string;

interface QuickTaskProps {
    name: QTask;
    handler: () => void;
}

const QuickTask = ({ name, handler }: QuickTaskProps) => {
    return (
        <Button onClick={handler} variant="success">
            {name}
        </Button>
    );
};

export default QuickTask;
