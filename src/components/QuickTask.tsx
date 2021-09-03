import React from "react";
import { Button } from "react-bootstrap";

export type QTask = string;

interface QuickTaskProps {
    name: QTask;
    handler: () => void;
    highlight?: boolean;
}

const QuickTask = ({ highlight, name, handler }: QuickTaskProps) => {
    return (
        <Button onClick={handler} variant={highlight ? "success" : "outline-success"} className="m-1">
            {name}
        </Button>
    );
};

export default QuickTask;
