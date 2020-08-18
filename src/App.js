import React, { useState, useEffect } from 'react';
import axios from 'axios'
import Table from './Components/table'
import roundToDecimalPlace from './helpers/rounded-to-decimal'
import roundToNearestInt from './helpers/rounded-to-nearest-integer'
import findAverageFromArray from './helpers/find-average-from-array'
import './App.css';


function App() {

  useEffect(() => fetchTrades(), [])

  const [ trades, setTrades ] = useState([])

  const [ productNameFilter, setProductNameFilter ] = useState('')
  const [ brokerFilter, setBrokerFilter ] = useState('')
  const [ sideFilter, setSideFilter ] = useState('both')
  const [ priceFilter, setPriceFilter ] = useState(null)

  function fetchTrades() {
    axios({ method: 'GET', url: 'http://localhost:3000/trades' })
      .then(res => {
        if (res.status === 200) setTrades(res.data)
        else alert('Error fetching trades, refresh to try again')
      })
  }

  function getTradesTableHeaders () {
    return [
      { label: 'Broker', propName: 'broker_name' } ,
      { label: 'Book Name', propName: 'book_name' },
      { label: 'Cancelled', propName: 'cancelled' },
      { label: 'End Date', propName: 'end_date' },
      { label: 'Matched', propName: 'matched' },
      { label: 'Product Name', propName: 'product_name' },
      { label: 'Side', propName: 'side' },
      { label: 'Start Date', propName: 'start_date' },
      { label: 'Time Created', propName: 'time_created' },
      { label: 'Date', propName: 'trade_date' },
      {
        label: 'Trade Volumn',
        propName: 'trade_display_volume',
        formatValue: (val) => roundToNearestInt(parseInt(val)) // (rounded to the nearest integer)
      },
      {
        label: 'Price',
        propName: 'trade_price',
        formatValue: (val) => roundToDecimalPlace(parseInt(val), 2) // (rounded to 2 decimal places)
      }
    ]
  }

  function handleProductFilterInput (e) {
    setProductNameFilter(e.target.value)
  }

  function handleBrokerFilterInput (e) {
    setBrokerFilter(e.target.value)
  }

  function handleChangePrice (e) {
    setPriceFilter(e.target.value)
  }

  function handleChangeSideFilter (e) {
    setSideFilter(e.target.value)
  }

  function getFilteredTrades () {
    return trades
      .filter(trade => productNameFilter.length ? trade.product_name.toUpperCase().includes(productNameFilter.toUpperCase()) : true )
      .filter(trade => brokerFilter.length ? trade.broker_name.toUpperCase().includes(brokerFilter.toUpperCase()) : true )
      .filter(trade => (sideFilter !== 'both') ? trade.side ===  sideFilter : true )
      .filter(trade =>  priceFilter ? parseInt(trade.trade_price) == priceFilter : true)
  }

  function getTotalPriceOfAllTrades () {
    const totalPrice = getFilteredTrades().reduce((prev, curr) => prev + parseInt(curr.trade_price), 0)
    return roundToDecimalPlace(totalPrice, 3)
  }

  function getAvgPriceOfAllTrades () {
    const filteredTradePrices = getFilteredTrades().map(trade => parseInt(trade.trade_price))
    const avgPrice = findAverageFromArray(filteredTradePrices)
    return roundToDecimalPlace(avgPrice, 3)
  }

  return (
    <div className="App">
      <div className='filter-actions'>
        <div className='page-title'>
            Conor McGrath
        </div>
        <div>
          <label> Filter by broker: </label>
          <input name='broker_filter' type='text' placeholder='broker' value={ brokerFilter } onChange={ handleBrokerFilterInput } />
        </div>
        <div>
          <label> Filter by product: </label>
          <input name='product_name_filter' type='text' placeholder='product' value={ productNameFilter } onChange={ handleProductFilterInput } />
        </div>
        <form>
          <label>Filter by Side: </label>
          <label>
            <input id='buy-radio' name='side_radio' type='radio' value='buy' checked={ sideFilter === 'buy' } onChange={ handleChangeSideFilter } />
            Buy
          </label>
          <label>
            <input id='sell-radio' name='side_radio' type='radio' value='sell' checked={ sideFilter === 'sell' } onChange={ handleChangeSideFilter } />
            Sell
          </label>
          <label>
            <input id='both-radio' name='side_radio' type='radio' value='both' checked={ sideFilter === 'both' } onChange={ handleChangeSideFilter } />
            Both
          </label>
        </form>
        <div>
          <label>Filter by Price: </label>
          <input name='price_filter' type='number' placeholder='price' value={ priceFilter } onChange={ handleChangePrice } />
        </div>
      </div>

      <div className='trade-totals'>
        <div>
          <span>Avg Price:</span><span className='digit-values'>{ getAvgPriceOfAllTrades() }</span>
        </div>
        <div>
          <span>Total Price:</span><span className='digit-values'>{ getTotalPriceOfAllTrades() }</span>
        </div>
      </div>

      <Table
        headers={ getTradesTableHeaders() }
        data={ getFilteredTrades() } />
    </div>
  );
}

export default App;
