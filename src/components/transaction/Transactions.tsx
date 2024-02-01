import { useEffect, useReducer } from "react";
import transactionReducer, { TransactionPageType } from "../../reducers/transactionReducer";
import { getTransactions } from "../../actions/transactionActions";
import CustomToast from "../common/CustomToast";
import { ActionType, CLEAR_TRANSACTION_ERROR } from "../../actions/constants/actionTypes";
import ReactDataGrid from "react-data-grid";
import { columns } from "./gridProperties";
import "react-data-grid/lib/styles.css";
import { Pagination, PaginationItem, PaginationLink } from "reactstrap";
import { FIRST_PAGE_START_KEY } from "../../constants/constants";


export default function Transactions(){

    const [transactionPage, dispatch] = useReducer(transactionReducer, {currentKey: FIRST_PAGE_START_KEY} as TransactionPageType);

    useEffect(() => {
        getTransactions(undefined, undefined, dispatch);
    }, [])

    function getPage(){
        return transactionPage.pageKeys && 
            transactionPage.pageKeys.length;
    }

    function getPrevKey(pageKeys: Array<string>): string{
        return pageKeys[transactionPage.pageKeys.length-2];
    }

    function handleNext(){
        getTransactions(transactionPage.nextKey, transactionPage.currentKey, dispatch);
    }

    function handlePrev(){
        getTransactions(getPrevKey(transactionPage.pageKeys), undefined, dispatch);
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
                <ReactDataGrid className="rounded rdg-light" columns={columns} rows={transactionPage.transactions}/>
            }
            <Pagination className="justify-content-center mt-2">
                <PaginationItem className="ms-auto" disabled={transactionPage.currentKey==="firstKey"}>
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