import React, {
    createContext,
    useReducer
} from "react";
import axios from "axios";
import AppReducer from "./AppReducer";

const initialState = {
    transactions: [],
    error: null,
    loading: true
};

export const GlobalContext = createContext(initialState);

export const GlobalProvider = ({children}) => {
    const [state, dispatch] = useReducer(AppReducer, initialState);

    async function getTransactions() {
        try {
            const response = await axios.get("/api/v1/transactions");
            dispatch({
                type: "GET_TRANSACTIONS",
                payload: response.data.data
            })
        }
        catch (err) {
            dispatch({
                type: "TRANSACTION_ERROR",
                payload: err.response.data.errors
            })
        }
    }

    async function deleteTransaction(id) {
        try {
            await axios.delete(`/api/v1/transactions/${id}`);
            dispatch({
                type: "DELETE_TRANSACTION",
                payload: id
            });
        }
        catch (err) {
            dispatch({
                type: "TRANSACTION_ERROR",
                payload: err.response.data.errors
            })
        }
    };

    async function addTransaction(transaction) {
        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        }
        try {
            const response = await axios.post("/api/v1/transactions", transaction, config);
            dispatch({
                type: "ADD_TRANSACTION",
                payload: response.data.data
            })
        }
        catch (err) {
            dispatch({
                type: "TRANSACTION_ERROR",
                payload: err
            })
        }
    }

    return (<GlobalContext.Provider value = {{
        transactions: state.transactions,
        error: state.error,
        loading: state.loading,
        getTransactions,
        deleteTransaction,
        addTransaction
    }}>
        {children}
    </GlobalContext.Provider>)
}