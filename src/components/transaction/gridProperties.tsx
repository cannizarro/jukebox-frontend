import { Badge } from "reactstrap";
import { formatStringTo12HourDate } from "../../utils/genericUtils";
import { TransactionType } from "../../reducers/transactionReducer";
import { RenderHeaderCellProps, SortColumn, SortDirection } from "react-data-grid";
import { faSortDown, faSortUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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

function renderSortableHeaderCell(props: RenderHeaderCellProps<TransactionType, unknown>, onHeaderClick: ()=>void){
    return <div className="d-flex align-items-center" onClick={onHeaderClick}>
        <span>{props.column.name}</span>
        <FontAwesomeIcon className="ms-auto" icon={props.sortDirection === "ASC" ? faSortUp : faSortDown}/>
    </div>;
}

export const columns = (onHeaderClick: ()=>void) => [
    { key: "createTimestamp", name: "Queued At", renderCell: dateFormatter, sortable: true, renderHeaderCell:(props: RenderHeaderCellProps<TransactionType, unknown>) => renderSortableHeaderCell(props, onHeaderClick) },
    { key: "customerName", name: "Customer Name" },
    { key: "fulfilled", name: "Status", renderCell: statusForamtter},
    { key: "price", name: "Price"},
    { key:"trackUrl", name: "Spotify Redirect",  renderCell: redirectFormatter}
];

export const sortColumns = (direction: SortDirection) => {
    return [{columnKey: "createTimestamp", direction}] as Array<SortColumn>
}
