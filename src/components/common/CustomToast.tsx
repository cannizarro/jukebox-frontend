import { Toast, ToastBody, ToastHeader } from "reactstrap";

export default function CustomToast(props: PropsType){
    return (
        <Toast
            className="fixed-bottom m-4 text-danger"
            isOpen={Boolean(props.error)}
        >
            <ToastHeader
                className="text-danger bg-secondary"
                toggle={props.dismiss}
            >
                {props.title}
            </ToastHeader>
            <ToastBody>{props.error}</ToastBody>
        </Toast>
    );
}

type PropsType = {
    error: string;
    title: string;
    dismiss: () => void;
}