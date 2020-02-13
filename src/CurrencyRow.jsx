import React from 'react'

export default function CurrencyRow(props) {
    const { 
        currency,
        selectedCurrency,
        onChangeCurrency,
        amount,
        onChangeAmount
     } = props;
    return ( 
        <div className="wrapper">
            <input type="number" name="" id="" className="input" value={amount} onChange={onChangeAmount}/>
            <select name="number" id="" value={selectedCurrency} onChange={onChangeCurrency}>
                {currency.map(curr => <option key={curr} value={curr}>{curr}</option>)}
            </select>
        </div>
    )
}