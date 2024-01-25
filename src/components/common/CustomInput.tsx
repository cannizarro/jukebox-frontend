import { Button, Input, InputGroup } from "reactstrap";

export default function CustomInput(props: PropsType){
    return (
        <InputGroup className="px-2 pb-2">
            <Input
                placeholder={props.placeholder}
                id={props.id}
                disabled = {props.disabled}
            />
            <Button color="primary" onClick={props.buttonClick} disabled={props.disabled}>
                {props.buttonText}
            </Button>
        </InputGroup>
    );
}

type PropsType = {
    buttonClick: () => void;
    disabled: boolean;
    placeholder: string;
    buttonText: string;
    id: string;
}