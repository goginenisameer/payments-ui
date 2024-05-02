import { ChangeEvent, FormEvent, useEffect, useReducer, useRef, useState } from "react";
import { PaymentType, addNewTransaction } from "../../data/DataFunctions";
import { useNavigate } from "react-router-dom";

const NewTransaction = () : JSX.Element => {

    // {field : "country", value : "bel"}
    const reducerFunction = (state : PaymentType , data : {field : string, value : any} ) => {
            return {...state, [data.field] : data.value}
    }

    const initialNewTransactionState: PaymentType = {
        id : null,
        orderId: "",
        date: new Date().toISOString().slice(0, 10),
        amount: 0,
        country: "USA",
        currency: "USD",
        taxCode: 0,
        taxRate: 0.21,
        type: "SALE",
      };
    

    const [newTransaction, dispatch] = useReducer(reducerFunction, initialNewTransactionState )
    const  navigate=useNavigate();
    const handleSubmit = (e : FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        console.log("saving " , newTransaction);
        addNewTransaction(newTransaction).then((result)=>{
            console.log(result.data);
            const country=result.data.country
            navigate("/find?country="+country)
        });
    }
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch({field : e.target.id, value : e.target.value});
    }
    const orderIdInput = useRef<HTMLInputElement | null>(null);
    useEffect( () => {
        orderIdInput.current?.focus(); 
    }, [])
    
    return (<form className="addTransactionsForm" onSubmit={handleSubmit}>
    <h2>New transaction</h2>
    <label htmlFor="orderId">Order Id</label>
    <input type="text" id="orderId" ref={orderIdInput} onChange={handleChange} value={newTransaction.orderId}/>
    <br/>
    <label htmlFor="date">Date</label>
    <input type="date" id="date"  onChange={handleChange} value={newTransaction.date}/>
    <br/>
    <label htmlFor="country">Country</label>
    <input type="text"  id="country" onChange={handleChange} value={newTransaction.country} />
    <br/>
    <label htmlFor="currency">Currency</label>
    <input type="text"  id="currency"  onChange={handleChange} value={newTransaction.currency}/>
    <br/>
    <label htmlFor="amount">Amount</label>
    <input type="text"  id="amount"  onChange={handleChange} value={newTransaction.amount}/>
    <br/>
    <label htmlFor="taxCode">Tax Code</label>
    <input type="text"  id="taxCode"  onChange={handleChange} value={newTransaction.taxCode}/>
    <br/>
    <label htmlFor="taxRate">Tax Rate</label>
    <input type="text"  id="taxRate"  onChange={handleChange} value={newTransaction.taxRate}/>
    <br/>
    <label htmlFor="type">Type</label>
    <input type="text"  id="type"  onChange={handleChange} value={newTransaction.type} />
    <br/>
    <button type="submit">Save</button>
</form>);

}

export default NewTransaction;