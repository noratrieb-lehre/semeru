import React, { useContext, useRef } from "react";
import { Button, FormControl, FormGroup, FormLabel, Modal } from "react-bootstrap";
import { LocaleContext } from "../App";

interface PromptProps {
    text: string;
    show: boolean;
    onInput: (input: string | null) => void;
}

const Prompt: React.FC<PromptProps> = ({ show, text, onInput }) => {
    const locale = useContext(LocaleContext);

    const inputRef = useRef<HTMLInputElement>(null);

    const onSubmit = () => {
        const input = inputRef.current;
        onInput(input!.value);
    };

    return (
        <Modal show={show}>
            <FormGroup>
                <Modal.Header>
                    <Modal.Title>
                        <FormLabel>{text}</FormLabel>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <FormControl type="text" ref={inputRef} />
                </Modal.Body>
            </FormGroup>
            <Modal.Footer>
                <Button onClick={onSubmit}>{locale.prompt.ok}</Button>
                <Button onClick={() => onInput(null)}>{locale.prompt.cancel}</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default Prompt;
