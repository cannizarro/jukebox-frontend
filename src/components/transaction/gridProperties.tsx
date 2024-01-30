import { Badge } from "reactstrap";
import { formatStringTo12HourDate } from "../../utils/genericUtils";
import { TransactionType } from "../../reducers/transactionReducer";

type FormatterInput = {
    row: TransactionType
}

function dateFormatter(value: FormatterInput) {
    return formatStringTo12HourDate(value.row.createTimestamp);
}

function statusForamtter(value : FormatterInput) {
    return <Badge color={value.row.fulfilled ? "success" : "danger"}>{value.row.fulfilled ? "Fulfilled" : "Unfulfilled"}</Badge>;
}

function redirectFormatter(value : FormatterInput) {
    return <a href={value.row.trackUrl} target="_blank">Go To Song↗</a>;
}

export const columns = [
    { key: "createTimestamp", name: "Queued At", renderCell: dateFormatter},
    { key: "customerName", name: "Customer Name" },
    { key: "fulfilled", name: "Status", renderCell: statusForamtter},
    { key: "price", name: "Price"},
    { key:"trackUrl", name: "Spotify Redirect",  renderCell: redirectFormatter}
]