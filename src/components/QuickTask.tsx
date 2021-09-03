import React from "react";
import { Button } from "react-bootstrap";

export type QTask = string;

interface QuickTaskProps {
    name: QTask;
    handler: () => void;
}

const QuickTask = ({ name, handler }: QuickTaskProps) => {
    return (
        <Button onClick={handler} variant="outline-success" className="m-1">
            {name}
        </Button>
    );
};

export default QuickTask;
