import React from "react";
import { Modal } from "react-bootstrap";

interface PromptProps {
    text: string;
    show: boolean;
    onInput: (input: string | null) => void;
}

const Prompt = ({ show, text, onInput }: PromptProps) => {
    return (
        <Modal show={show}>
            <Modal.Header>
                <Modal.Title>hi</Modal.Title>
            </Modal.Header>
            <Modal.Body>shuhg</Modal.Body>
        </Modal>
    );
};

export default Prompt;
