import { Alert, Button, Card, CardImg, CardSubtitle, CardText, CardTitle } from "reactstrap";
import { TrackType } from "../dashboard/Home";
import { MouseEventHandler, SyntheticEvent, useReducer } from "react";
import paymentReducer, { PaymentStateType } from "../../reducers/paymentReducer";
import { CUSTOMER_SEARCH_PLACEHOLDER, PAYMENT_SUCCESS_MESSAGE } from "../../constants/messageConstants";
import { pay } from "../../actions/customerActions";

export default function Payment(props: PropsType){

    const [paymentState, dispatch] = useReducer(paymentReducer, {} as PaymentStateType)

    function handlePay(e: SyntheticEvent): void{
        e.stopPropagation();
        pay(props.track, props.username, dispatch);
    }

    return (
        <>
        <Card onClick={props.onClick} className="p-4">
            <div className="d-flex flex-row my-2">
                <CardImg
                    alt="Selected Track Image"
                    src={props.track.image}    
                    className="w-25 h-100"
                />
                <div className="ms-4 me-2">
                    <CardTitle tag="h4">{props.track.name}</CardTitle>
                    <CardSubtitle>{props.track.album}</CardSubtitle>
                    <CardText>{props.track.artists.join(", ")}</CardText>
                    {props.secondsQueued && <p>{CUSTOMER_SEARCH_PLACEHOLDER(props.secondsQueued)}</p>}
                </div>
                <div className="ms-auto my-auto" >
                    {paymentState.loading ?
                        <div className="dot-pulse ms-auto me-auto my-4" /> :
                        <Button color="primary" onClick={handlePay}>Pay</Button>
                    }
                </div>
            </div>
            {paymentState.error && <Alert className="mt-2" color="danger">{paymentState.error}</Alert>}
            {paymentState.success && <Alert className="mt-2" color="success">{PAYMENT_SUCCESS_MESSAGE}</Alert>}
        </Card>
        </>
    )

}

type PropsType = {
    track: TrackType;
    secondsQueued: number | null;
    onClick: MouseEventHandler<HTMLElement>;
    username: string | null;
}