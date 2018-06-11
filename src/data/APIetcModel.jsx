//This is where the API calls to Cryptocompare are made

import axios from 'axios'
import {actionCreators} from "../cryptoryRedux";

const APIetcModel = function () {

  //Addendum: The API requires Unix timestamps
  let observers = [];
  let currentCurr = 'BTC'; //used when showing data about a selected currency in the  histogram view
  let Wallet = [];
  let Transactions = [];
  let HistogramData;

  //Type and amount of currency bought. This is what gets stored in the wallet.
  let Currency = {
    type: "",
    amount: 0
  };
  //A transaction. Gets stored in Transactions[]
  let Transaction = {
    date: null, //Unix timestamp. Use Date.now();
    type: "",
    amount: 0,
    originalValue: 0 //What that amount cost when buying. In euro.
  };

  //Converts a date to a unix timestamp. Example: year=2017, month=08, day=16 will be 1502841600. Must be in that format.
  this.getUnixTime = function (year, month, day) {
    let unix = Math.floor((new Date(year + '.' + month + '.' + day).getTime()) / 1000);
    return unix;
    //Also, Date.now() returns current unix time, if needed.
  }

  //Used in the histogram view
  this.setCurrentCurr = function (type) {
    currentCurr = type;
    notifyObservers();
  }

  this.getCurrentCurr = function () {
    return currentCurr;
  }

  this.setHistoData = function (histo) {
    HistogramData = histo;
  }
  this.getHistoData = function () {
    return HistogramData;
  }


  this.getCurrency = function (ty, am) {
    let curr = Object.create(Currency);
    curr.type = ty;
    curr.amount = am;

    return curr;
  }

  this.makeNewTransaction = function (id, am) {
    let tra = Object.create(Transaction);
    let curr = this.getCurrentCurr();

    tra.date = Date.now(); //needs to be a unix timestamp.
    tra.type = this.getCurrentCurr();
    tra.amount = am;
    let ori = (curr*am);
    tra.originalValue = (this.getCurrentPrice(ori));

    
    this.addToWallet(curr, am);
    Transactions.push(tra);
    this.pushData(id, Transactions, 'transactions')
    alert("Transaction registered!");
    console.log(Transactions[0]);
  }

  //Adds or subtracts bought currency from the wallet.
  this.addToWallet = function (id, amount) {

    console.log(id+" "+amount);
    let coin = this.getCurrentCurr();
    this.getData(id, 'wallet')
    let wallet = Wallet;

    if(wallet.length > 0){
    for (let i = 0; i < wallet.length; i++) {
      if (wallet[i].type === coin) {
        wallet[i].amount += amount;
        this.pushData(id, wallet, 'wallet')
      }
      /*else {
        let newcurr = getCurrency(coin, amount);
        wallet.push(newcurr);
      }*/
    }}
  
  else {
    let newcurr = this.getCurrency(coin, amount);
    wallet.push(newcurr);
    this.pushData(id, Wallet, 'wallet')
  }
  
      //this.pushData(id, wallet, 'wallet')
      notifyObservers();

  }

  this.pushData = (id, val, type) => {
    let obj = type === 'wallet' ? Wallet : Transactions
    const url = `/api/${type}/"${id}"`
    let updates = {
      [type]: val
    }
    fetch(url, {
      method: 'PUT',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(updates),
    }).then(response => {
      if (response.ok) {
        this.getData(id, type)
      } else {
        response.json().then(error => {
          handleError(error)
        });
      }
    }).catch(err => {
      handleError(err)
    });
  }

  this.getData = function (id, type) {
    let obj = type === 'wallet' ? Wallet : Transactions
    const url = `/api/user/"${id}"`
    fetch(url).then(response => {
      if (response.ok) {
        response.json().then(data => {
          fetch(url).then(response => {
            if (response.ok) {
              response.json().then(data => {
                console.log('getData data', data)
                obj = data.type
              })
            }
          })
        });
      } else {
        response.json().then(error => {
          handleError(error)
        });
      }
    }).catch(err => {
      handleError(err)
    });
    return obj
  }

//Gets the total value of the user's entire wallet.
  this.getCurrentWalletValue = function (id) {
    this.getData(id, 'wallet')
    const totalwallet = Wallet;
    console.log("This should print the first element of the wallet: " + totalwallet[0]); //prints undefined
    let currenttotal = 0;

    if (totalwallet.length > 0) {
      for (let c = 0; c < totalwallet.length; c++) {
        let currCost = this.getCurrentPrice(totalwallet[c].type);
        let usertot = currCost * totalwallet[c].amount;
        currenttotal += usertot;
        console.log(currenttotal);       
      }
    return currenttotal}
      else{
        return 0;
        console.log("If this prints, wallet is empty");
      }
      
  //  }
   // else {
   //   console.log("If this prints, it thinks the wallet is empty.")
   //   return currenttotal;   
  //  }
  }

//Prepares data for display in the histogram view
  this.histogramData = function (slidervalue) {
    //slidervalue = chosen time period
    //Data format: data={[  {x: thing, y: otherthing},
    //{x: thing2, y: otherthing2} ]}
    //x = time, y = value of currency.
    //So if slidervalue is set to week, there will be 7 x, one for each day. If it's day, there will be 24 x, one for each hour.
    //Highest y-point in the histogram needs to be higher than the max value that will be returned from the API. Different currencies
    //have completely different values, so the max and min Y-points in the chart (VictoryChart in Histogram.jsx) need to be change according
    //to what currency it is. How to do this?

    console.log("histogramData() anropas.");
    let curr = this.getCurrentCurr();
    let now = Date.now();
    let historesult = [];
    this.getHistorical(curr, slidervalue).then((response) => {
      let Data = response.Data;
      var elem;

      if (slidervalue === 2) { //week
        for (let i = 0; i < Data.length; i++) {
          //x = 'Day '+i, y=Data[i].close
          elem = {x: 'Day ' + i, y: Data[i].close};
          historesult.push(elem);
        }
      }
      else if (slidervalue === 3) { //month
        for (let i = 0; i < Data.length; i++) {
          //x = 'Day '+i, y=Data[i].close
          elem = {x: 'Day ' + i, y: Data[i].close};
          historesult.push(elem);
        }
      }
      else if (slidervalue === 1) { //day
        for (let i = 0; i < Data.length; i++) {
          //x = 'Day '+i, y=Data[i].close
          elem = {x: 'Hour ' + i, y: Data[i].close};
          historesult.push(elem);
        }
      }
      console.log(historesult);
      //return historesult;
      return new Promise((resolve, reject) => {
        if (historesult.length > 0) {
          resolve(historesult)
        } else {
          reject("Error")
        }
      })
    });
  }


//Gets the current price for a particular type or types of currency
  this.getCurrentPrice = function (curr) {
    //Current price of the chosen coin. Calls price. In euro.
    console.log("This should print a currency symbol: " + curr); //It prints NaN. Skitjävlahelvete.
    let url = 'https://min-api.cryptocompare.com/data/price?fsym=' + curr + '&tsyms=EUR';

    return (fetch(url)
      .then(processResponse)
      .catch(handleError))
  }

  this.getAllCurrInfo = function () {
    //Information about all available currencies. Calls coinlist.
    //The info for any coin can be found under Data[], where each element is one currency.
    const url = 'https://www.cryptocompare.com/api/data/coinlist/';

    return (fetch(url)
      .then(processResponse)
      .catch(handleError))
  }

  this.getThisCurrInfo = function (curr) {
    //curr is a string, symbol of a specific currency.

    let thecoins = this.getAllCurrInfo().Data;
    let info = thecoins.find(function (i) {
      return i[0] === curr;
    });
    return info;
  }

  this.getComparison = function (id, what) {
    //Compares the user's wallet's value when they bought it and today; in other words, calculates the profit/loss.
    //Can work for the entire wallet (what==all) or for one currency (what==x).
    //TODO: rewrite this so it uses tran.originalValue instead of making a call to getHistorical()
    this.getData(id, 'transactions')

    let tran = Transactions;
    let profit = 0;
    if (tran.length > 0) {
      if (what === all) {
        for (let i = 0; i < tran.length; i++) {
          profit += (tran[i].originalValue * tran[i].amount) - (this.getCurrentPrice(tran[i].type, 'SEK') * tran[i].amount);
        }
      }
      else {
        for (let i = 0; i < tran.length; i++) {
          if (tran[i].type === what) {
            profit += (tran[i].originalValue * tran[i].amount) - (this.getCurrentPrice(tran[i].type, 'SEK') * tran[i].amount);
          }
        }
      }
      return profit;
    }
    else {
      return 0;
    }
  }

  this.getHistorical = function (curr, timeperiod) {
    //The price at a particular point in time. Calls histoday/histohour.
    //Limit is the number of data points to return (so 24 for histohour, 7 for a week and 30 for a month).

    console.log("getHistorical anropas tydligen.");
    console.log(curr);
    console.log(timeperiod);

    let url = 'https://min-api.cryptocompare.com/data/'

    let datenow = Date.now(); //returns a unix time stamp
    console.log(datenow);
    let datepast;
    let limit;

    //atm it never evaluates to any of these
    //return data for one week
    if (timeperiod == 2) {
      limit = 7;
      datepast = new Date();
      datepast.setDay(datepast.getDay() - 7);
      datepast.setHours(0, 0, 0);
      datepast.setMilliseconds(0);
      datepast = datepast / 1000;

      url += 'histoday?fsym=' + curr + '&tsym=SEK&limit=' + limit + '&aggregate=1&toTs=' + datenow; //Vafan är det datepast eller datenow?!
      console.log(url);
    }
    //return data for one month
    else if (timeperiod == 3) {
      limit = 30;
      url += 'histoday?fsym=' + curr + '&tsym=SEK&limit=' + limit + '&aggregate=1&toTs=' + datenow;
      console.log(url);
    }
    //return data for one day
    else if (timeperiod == 1) {
      limit = 24;
      console.log(limit);
      url += 'histohour?fsym=' + curr + '&tsym=SEK&limit=' + limit + '&aggregate=1&toTs=' + datenow;
      console.log(url);
    }


    return (fetch(url)
      .then(processResponse)
      .catch(handleError))
  }


// API Helper methods (copied from lab startup code)
  const processResponse = function (response) {
    if (response.ok) {
      return response.json()
    }
    throw response;
  }

  const handleError = function (error) {
    if (error.json) {
      error.json().then(error => {
        console.error('API Error:', error.message || error)
      })
    } else {
      console.error('API Error:', error.message || error)
    }
  }


//Observer pattern
  this.addObserver = function (observer) {
    observers.push(observer);
  };

  this.removeObserver = function (observer) {
    observers = observers.filter(o => o !== observer);
  };

  const notifyObservers = function () {
    observers.forEach(o => o.update());
  };
}

export const modelInstance = new APIetcModel();