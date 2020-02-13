import React, { useState, useEffect } from 'react';
import './App.css';
import CurrencyRow from './CurrencyRow.jsx'

const BASE_URL = 'https://api.exchangeratesapi.io/latest'



function App() {

  const [currency, setCurrency] = useState([]);
  const [fromCurrency, setFromCurrency] = useState();
  const [toCurrency, setToCurrency] = useState();
  const [amount, setAmount] = useState(1);
  const [amountFromCurrency, setAmountFromCurrency] = useState(true);
  const [exchangeRate, setExchangeRate] = useState();

  let toAmount, fromAmount

  if (amountFromCurrency) {
    fromAmount = amount;
    toAmount = amount * exchangeRate
  } else {
    toAmount = amount;
    fromAmount = amount / exchangeRate
  }

  useEffect(() => {
    fetch(BASE_URL)
      .then(res => res.json())
      .then(data => {
        const currencyFirst = Object.keys(data.rates)[0];
        setCurrency([data.base, ...Object.keys(data.rates)])
        setFromCurrency(data.base)
        setToCurrency(currencyFirst)
        setExchangeRate(data.rates[currencyFirst])
      })
  }, [])

  useEffect(() => {
    if (fromCurrency != null && toCurrency != null){
      fetch(`${BASE_URL}?base=${fromCurrency}&symbols=${toCurrency}`)
      .then(res => res.json())
      .then(data => setExchangeRate(data.rates[toCurrency]))
    }
  }, [fromCurrency, toCurrency])

  // useEffect(() => {
  //   if (fromCurrency != null && toCurrency != null) {
  //     fetch(`${BASE_URL}?base=${fromCurrency}&symbols=${toCurrency}`)
  //       .then(res => res.json())
  //       .then(data => setExchangeRate(data.rates[toCurrency]))
  //   }
  // }, [fromCurrency, toCurrency])


  function handleFromAmountChange(e) {
    setAmount(e.target.value)
    setAmountFromCurrency(true)
  }
  function handleToAmountChange(e) {
    setAmount(e.target.value)
    setAmountFromCurrency(false)
  }

  return (
    <>
      <h1 className="convert">Convert</h1>
      <CurrencyRow 
        currency={currency}
        selectedCurrency={fromCurrency}
        onChangeCurrency={e => setFromCurrency(e.target.value)}
        amount={fromAmount}
        onChangeAmount={handleFromAmountChange}
      />
      <div className="equals">=</div>
      <CurrencyRow
        currency={currency}
        selectedCurrency={toCurrency}
        onChangeCurrency={e => setToCurrency(e.target.value)}
        amount={toAmount}
        onChangeAmount={handleToAmountChange}
      />
    </>
  );
}

export default App;
