import { ChangeEvent, useEffect, useState } from 'react';
import { PaymentType, getCountries, getPaymentsForCountry } from '../../data/DataFunctions';
import PaymentTableRow from './PaymentTableRow';
import './Transactions.css';
import { AxiosResponse } from 'axios';
import { useSearchParams } from 'react-router-dom';

const Transactions  = () : JSX.Element => {

    const [searchParams, setSearchParams] = useSearchParams();
    const [uniqueCountries, setUniqueCountries] = useState<string[]>([]);
    const [payments, setPayments] = useState<PaymentType[]>([]);
    const [selectedCountry , setSelectedCountry] = useState<string>(searchParams.get("country") || "")



    //get the list of countries on first render
    useEffect( () => {
        const countriesPromise : Promise<AxiosResponse<string[]>> = getCountries();
            countriesPromise
            .then ( result => {
                if (result.status === 200) {
                    setUniqueCountries(result.data.sort());
                }
                else {
                   console.log("something went wrong " + result.status)
                }
            }).catch ( error => {
                console.log("something bad happened " + error);
            })
        
    }, [] );

    useEffect( () => {
         //get the payments for the selected country
    if (selectedCountry !== "") {
        const paymentsPromise : Promise<AxiosResponse<PaymentType[]>> = 
            getPaymentsForCountry(selectedCountry);
        paymentsPromise
            .then ( result => {
                if (result.status === 200) {
                    setPayments(result.data)
                }
                else {
                    console.log("something went wrong")
                }
            })
        //don't forget to do .catch
        }
    }, [selectedCountry])

    const countryOptions : JSX.Element[] = 
    uniqueCountries.map(c => <option key={c} value={c}>{c}</option>);
    
   
    
    const changeCountry = (e : ChangeEvent<HTMLSelectElement>) => {
        const option = e.target.value;
        setSelectedCountry(option);
        setSearchParams({country: option});

    }
    
    const countrySelector : JSX.Element = 
    <select id="countrySelector" onChange={changeCountry} value={selectedCountry}>
        
        <option value="" disabled={true}  >--select--</option>
    {countryOptions}
    </select>;
    
    return (<>
        <div className="transactionsCountrySelector">
        {uniqueCountries.length > 0 && <div>Select country: {countrySelector} </div> }
        {uniqueCountries.length === 0 && <p>Please wait...</p>}
        
        </div>
        <table className="transactionsTable">
        <thead>
        <tr><th>Id</th><th>orderId</th><th>Date</th><th>Country</th><th>Currency</th><th>Amount</th></tr>
        </thead>
        <tbody>
        {payments.filter(payment=>payment.country===selectedCountry)
            .map((payment) => <PaymentTableRow key={payment.id} {...payment} />)}
            </tbody>
            </table>
            </>
            );
        }
        
        export default Transactions
        