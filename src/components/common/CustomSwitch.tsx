import { FormGroup, Input, Label } from "reactstrap";

export default function CustomSwitch(props: PropsType){
    return (
        <FormGroup switch className="m-2" disabled={props.disabled}>
            <Input
                type="switch"
                checked={props.checked}
                onChange={props.onChange}
                disabled={props.disabled}
            />
            <Label check>{props.label}</Label>
        </FormGroup>
    );
}

type PropsType = {
    checked: boolean;
    label: string;
    onChange: () => void;
    disabled: boolean;
}