import React, {Fragment, useContext, useEffect} from 'react';
import Transaction from "./Transaction";
import {GlobalContext} from "../context/GlobalState";

const TransactionList = () => {

    const {transactions, getTransactions} = useContext(GlobalContext);

    useEffect(() => {
        getTransactions();
        //eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <Fragment>
            <h3>History</h3>
            <ul id = "list" className = "list">
                {transactions.map(transaction => (
                    <Transaction key = {transaction._id} transaction = {transaction} />
                ))}
            </ul>
        </Fragment>
    )
}

export default TransactionList
