//This is where the API calls to Cryptocompare are made

const APIetcModel = function(){

    let TimePeriod = null; //Which format? Either a fixed amount of days (or one variable for format 
    //and one for amount) and a function to calculate the elapsed time until now, or two datetimes. 
    //Like "Last 7 days" or "From xx-xx-xx to xx-xx-xx". Or all of them?
    //Addendum: The API requires Unix timestamps

    let currentCurr = 'BTC'; //used when showing data about a selected currency inthe  histogram view
    let Wallet = [];
    let Transactions = [];

    //Type and amount of currency bought. This is what gets stored in the wallet.
    this.Currency = {
        type: "",
        amount: 0
    };

    //Converts a date to a unix timestamp. Example: year=2017, month=08, day=16 will be 1502841600. Must be in that format.
    this.getUnixTime = function(year, month, day){
        let unix = Math.floor((new Date(year+'.'+month+'.'+day).getTime())/1000);
        return unix;
    }

    //Used in the histogram view
    this.setCurrentCurr = function(type){
        currentCurr = type;
    }

    this.getCurrentCurr = function(){
        return currentCurr;
    }

    //A transaction. Gets stored in Transctions[]
    let Transaction = {
        date: null, //Unix timestamp
        type: "",
        amount: 0
    };

    this.getCurrency = function(ty, am){
        let curr = Object.create(Currency);
        curr.type = ty;
        curr.amount = am;

        return curr;
    } 

    this.getTransaction = function(da,ty,am){
        let tra = Object.create(Transaction);
        tra.date = da. //needs to be a unix timestamp.
        tra.type = ty;
        tra.amount = am;

        return tra;
    }

    //Adds or subtracts bought currency from the wallet.
    this.addToWallet = function(curr){
        //curr is a Currency object from a recent transaction. curr.amount can be negative (indicating selling, positive indicating buying) 

        for(var i=0; i<Wallet.length;i++)
        {
            if(Wallet[i].type == curr.type)
            {
                Wallet[i].amount += curr.amount;
            }
            else{
                this.Wallet.push(curr);
            }
        }
    }

    this.addTransaction = function(tra){
        Transactions.push(tra);
    }


    this.getWallet = function() {
        return Wallet;
    }

    this.setTimePeriod = function(time){
        //Histoday has the parameter aggregate which could be useful here maybe.

    }
    this.getTimePeriod = function(){
        return TimePeriod;
    }

    //Gets the total value of the user's entire wallet. In euro atm, can be changed if necessary
    this.getCurrentWalletValue = function(){
        this.totalwallet = Wallet;
        var currenttotal = 0;
        for(var c = 0; c<totalwallet.length; c++){
            var currcost = this.getCurrentPrice(totalwallet[c].type, "EUR");
            var usertot = currcost*totalwallet[c].amount;
            currentotal += usertot; 
        }
        return currenttotal;
    }

    //Gets the current price for a particular type or types of currency
    this.getCurrentPrice = function(curr, tocurr){
        //Current price of the chosen cpin. Calls price.
        let url = 'https://min-api.cryptocompare.com/data/price?fsym='+curr+'&tsyms='+tocurr;
        
        return (fetch(url)
        .then(processResponse)
        .catch(handleError))      
    }

    this.getAllCurrInfo = function(){
        //Information about all available currencies. Calls coinlist. 
        //The info for any coin can be found under Data[], where each element is one currency.
        const url = 'https://www.cryptocompare.com/api/data/coinlist/';
        
        return (fetch(url)
        .then(processResponse)
        .catch(handleError))  
    }

    this.getThisCurrInfo = function(curr){
        //curr is a string, symbol of a specific currency.

        let thecoins = this.getAllCurrInfo().Data;
        var info = thecoins.find(function(i){
            return i[0] == curr;
        });
        return info;
    }

    this.getComparison = function(what){
        //Compares the user's wallet's value when they bought it and today; in other words, calculates the profit/loss.
        //Can work for the entire wallet (what==all) or for one currency (what==x).
        let tran = this.Transactions;
        let profit = 0;

        if(what==all){
            for(var i=0;i<tran.length;i++){
                profit += (this.getHistorical(tran[i].type, tran[i].date) * tran[i].amount) - (this.getCurrentPrice(tran[i].type, 'EUR') * tran[i].amount); 
            }
        }
        else{
            for(var i=0;i<tran.length;i++){
                if(tran[i].type == what){
                profit += (this.getHistorical(tran[i].type, tran[i].date) * tran[i].amount) - (this.getCurrentPrice(tran[i].type, 'EUR') * tran[i].amount);
                }
            }
        }
    }    

    this.getHistorical = function(curr, date){
        //The price at a particular point in time. Calls pricehistorical for current info, histoday for earlier.
        let url = 'https://min-api.cryptocompare.com/data/pricehistorical?fsym='+curr+'&tsyms=EUR&ts='+date;
        
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
    
    export const modelInstance = new APIetcModel();
}