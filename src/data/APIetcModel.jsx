//This is where the API calls to Cryptocompare are made

const APIetcModel = function () {

  let TimePeriod = null; //Which format? Either a fixed amount of days (or one variable for format
  //and one for amount) and a function to calculate the elapsed time until now, or two datetimes.
  //Like "Last 7 days" or "From xx-xx-xx to xx-xx-xx". Or all of them?
  //Addendum: The API requires Unix timestamps

  let currentCurr = 'BTC'; //used when showing data about a selected currency inthe  histogram view
  let Wallet = [];
  let Transactions = [];
  let HistogramData;

  //Type and amount of currency bought. This is what gets stored in the wallet.
  this.Currency = {
    type: "",
    amount: 0
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
    update();
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

  //A transaction. Gets stored in Transctions[]
  let Transaction = {
    date: null, //Unix timestamp. Use Date.now();
    type: "",
    amount: 0,
    originalValue: 0 //What that amount cost when buying. In Sek.
  };

  this.getCurrency = function (ty, am) {
    let curr = Object.create(Currency);
    curr.type = ty;
    curr.amount = am;

    return curr;
  }

  this.getTransaction = function (da, ty, am) {
    let tra = Object.create(Transaction);
    tra.date = da.//needs to be a unix timestamp.
      tra.type = ty;
    tra.amount = am;

    return tra;
  }

  //Adds or subtracts bought currency from the wallet.
  this.addToWallet = function (curr) {
    //curr is a Currency object from a recent transaction. curr.amount can be negative (indicating selling, positive indicating buying)

    for (let i = 0; i < Wallet.length; i++) {
      if (Wallet[i].type === curr.type) {
        Wallet[i].amount += curr.amount;
      }
      else {
        this.Wallet.push(curr);
      }
    }
  }

  this.addTransaction = function (tra) {
    Transactions.push(tra);
  }


  this.getWallet = function () {
    return Wallet;
  }

  this.setTimePeriod = function (time) {
    //Histoday has the parameter aggregate which could be useful here maybe.

  }
  this.getTimePeriod = function () {
    return TimePeriod;
  }


  //Gets the total value of the user's entire wallet. In euro atm, can be changed if necessary
  this.getCurrentWalletValue = function () {
    this.totalwallet = Wallet;
    let currenttotal = 0;
    for (let c = 0; c < totalwallet.length; c++) {
      let currCost = this.getCurrentPrice(totalwallet[c].type, "SEK");
      let usertot = currCost * totalwallet[c].amount;
      currenttotal += usertot;
    }
    return currenttotal;
  }


  //Prepares data for display in the histogram view
  this.histogramData = function (slidervalue) {
    //slidervalue = chosen time period
    //Data format: data={[  {x: thing, y: otherthing},
    //{x: thing2, y: otherthing2} ]}
    //x = time, y = value of currency.
    //So if slidervalue is set to week, there will be 7 x, one for each day. If it's day, there will be 24 x, one for each hour.
    //Highest y-point in the histogram needs to be higher than the max value that will be returned from the API. How to do this?!


    let curr = this.getCurrentCurr();
    let now = Date.now();
    let historesult = [];
    let Data = this.getHistorical(curr, slidervalue).Data;

    if (slidervalue === 2) { //week
      for (let i = 0; i < Data.length; i++) {
        //x = 'Day '+i, y=Data[i].close
        elem = {x: 'Day ' + i, y: Data[i].close}; //Can this be done? Or will it be the wrong format?
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
    return historesult;
  }


  //Gets the current price for a particular type or types of currency
  this.getCurrentPrice = function (curr, tocurr) {
    //Current price of the chosen cpin. Calls price.
    let url = 'https://min-api.cryptocompare.com/data/price?fsym=' + curr + '&tsyms=' + tocurr;

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

  this.getComparison = function (what) {
    //Compares the user's wallet's value when they bought it and today; in other words, calculates the profit/loss.
    //Can work for the entire wallet (what==all) or for one currency (what==x).
    //TODO: rewrite this so it uses tran.originalValue instead of making a call to getHistorical()

    let tran = this.Transactions;
    let profit = 0;

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
  }

  this.getHistorical = function (curr, timeperiod) {
    //The price at a particular point in time. Calls histoday/histohour.
    //Limit is the number of data points to return (so 24 for histohour, 7 for a week and 30 for a month).
    let url = 'https://min-api.cryptocompare.com/data/'

    let datenow = Date.now(); //returns a unix time stamp
    let datepast;
    let limit;

    //return data for one week
    if (timeperiod === 'week') {
      limit = 7;
      datepast = new Date();
      datepast.setDay(datepast.getDay() - 7);
      datepast.setHours(0, 0, 0);
      datepast.setMilliseconds(0);
      datepast = datepast / 1000;

      url += 'histoday?fsym=' + curr + '&tsyms=SEK&limit=' + limit + '&aggregate=1&toTs=' + datenow; //Vafan är det datepast eller datenow?!
    }
    //return data for one month
    else if (timeperiod === 'month') {
      limit = 30;
      url += 'histoday?fsym=' + curr + '&tsyms=SEK&limit=' + limit + '&aggregate=1&toTs=' + datenow;
    }
    //return data for one day
    else if (timepriod === 'day') {
      limit = 24;
      url += url += 'histohour?fsym=' + curr + '&tsyms=SEK&limit=' + limit + '&aggregate=1&toTs=' + datenow;
    }

    return (fetch(url)
      .then(processResponse)
      .catch(handleError))
  }


  // API Helper methods (copied from lab startup code). Not sure if really needed though.
  const processResponse = function (response) {
    if (response.ok) {
      return response.json()
    }
    throw response;
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
