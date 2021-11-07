import {Component, useState, useEffect} from 'react';
import {Container} from 'react-bootstrap';
import './App.css';

function App(props) {  
	const [num, setNum] = useState(props.currency);
	// YOUR API KEY
	const _apikey = "d398aee9da158b066e12e349a5f37977";

	const getResource = async (url) => {
		let res = await fetch(url);
	
		if (!res.ok) {
			throw new Error(`Could not fetch ${url}, status: ${res.status}`);
		}
	
		return await res.json();
	};

	const getConvertedValue = async (currency) => {
		const res = await getResource(`http://api.currencylayer.com/live?access_key=${_apikey}`);
		return res.quotes[currency];
	}

	const updateValue = (currency) => {
		getConvertedValue(currency)
		.then(setConvertedCurrency)
		.catch(console.log);
	}

	function setConvertedCurrency(convertedValue) {
		setNum(num => num = Math.round(convertedValue));
	}

	function resetCurrency() {
		setNum(num => num = 0);
	}
	
	return (
	  <div className="app">
		<div className="counter">{num}</div>
		<div className="controls">
		  <button onClick={() => updateValue("USDUZS")}>UZS</button>
		  <button onClick={() => updateValue("USDRUB")}>RUB</button>
		  <button onClick={() => updateValue("USDEUR")}>EURO</button>
		  <button onClick={() => resetCurrency()}>RESET</button>
		</div>
	  </div>
	);
  }
  

export default App;
