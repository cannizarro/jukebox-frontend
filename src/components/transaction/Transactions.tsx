import { useEffect, useReducer } from "react";
import transactionReducer, { intialValue } from "../../reducers/transactionReducer";
import { getTransactions } from "../../actions/transactionActions";
import CustomToast from "../common/CustomToast";
import { ActionType, CLEAR_TRANSACTION_ERROR, UPDATE_SORT_DIRECTIION } from "../../actions/constants/actionTypes";
import ReactDataGrid from "react-data-grid";
import { columns, sortColumns } from "./gridProperties";
import "react-data-grid/lib/styles.css";
import { Pagination, PaginationItem, PaginationLink } from "reactstrap";


export default function Transactions(){

    const [transactionPage, dispatch] = useReducer(transactionReducer, intialValue);

    useEffect(() => {
        getTransactions(transactionPage.request, dispatch);
    }, [transactionPage.request])

    function getPage(){
        return transactionPage.pageKeys && 
            transactionPage.pageKeys.length;
    }

    function getPrevKey(pageKeys: Array<string>): string{
        return pageKeys[transactionPage.pageKeys.length-2];
    }

    function handleNext(){
        getTransactions(
            {startKey: transactionPage.nextKey, ascending: transactionPage.request.ascending, fulfilled: transactionPage.request.fulfilled},
             dispatch
        );
    }

    function handlePrev(){
        getTransactions(
            {startKey: getPrevKey(transactionPage.pageKeys), ascending: transactionPage.request.ascending, fulfilled: transactionPage.request.fulfilled},
            dispatch
        );
    }

    function handleHeaderClick(){
        dispatch({
            type: UPDATE_SORT_DIRECTIION
        } as ActionType)
    }

    function getSortDirection(ascending: boolean){
        return ascending ? "ASC" : "DESC";

    }

    return (
        <div
			className="activity d-flex flex-column p-4"
		>
            {
                transactionPage.error && 
                <CustomToast
                    title="Transaction Error" 
                    error={"Some error occured while fetching transactions. " + transactionPage.error}
                    dismiss={() => dispatch({type: CLEAR_TRANSACTION_ERROR} as ActionType)}
                />
            }
            {
                transactionPage.transactions &&
                <ReactDataGrid className="rounded rdg-light" columns={columns(handleHeaderClick)} rows={transactionPage.transactions} sortColumns={sortColumns(getSortDirection(transactionPage.request.ascending))}/>
            }
            <Pagination className="align-self-end justify-content-center mt-2">
                <PaginationItem disabled={transactionPage.currentKey==="firstKey"}>
                    <PaginationLink onClick={handlePrev} previous/>
                </PaginationItem>
                <PaginationItem>
                    <PaginationLink disabled={true}>{getPage()}</PaginationLink>
                </PaginationItem>
                <PaginationItem disabled={transactionPage.nextKey==="lastKey"}>
                    <PaginationLink onClick={handleNext} next/>
                </PaginationItem>
            </Pagination>
        </div>
    );
}