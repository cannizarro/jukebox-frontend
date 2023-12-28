import { faCloud } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ReadyState } from "react-use-websocket";
import { formatDateTo12Hour } from "../../utils/genericUtils.ts";
import { colors } from "../../constants/colors.ts";
import { DeviceType } from "../Home.tsx";

export default function ConnectionInfo(props: PropType){
    return (
        <>
            <div className="m-2 mb-0 align-self-end">
                <FontAwesomeIcon className="me-2" icon={faCloud} color={props.readyState === ReadyState.OPEN ? colors.success : colors.danger}/>
                {props.timestamp && "Last refresh: ".concat(formatDateTo12Hour(props.timestamp))}
            </div>
            <p className="m-2 mt-0 align-self-end">
            {
                props.readyState === ReadyState.OPEN && props.device && props.device.name ?
                    "Connected to: ".concat(props.device.name) :
                    "Disconnected"
            }
            </p>
        </>
    );
}

type PropType = {
    timestamp: string;
    readyState: ReadyState;
    device: DeviceType
}