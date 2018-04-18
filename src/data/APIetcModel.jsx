//This is where the API calls to Cryptocompare are made

const APIetcModel = function(){

    let TimePeriod = null; //Which format? Either a fixed amount of days (or one variable for format 
    //and one for amount) and a function to calculate the elapsed time until now, or two datetimes. 
    //Like "Last 7 days" or "From xx-xx-xx to xx-xx-xx". Or all of them?

    let Wallet = [];
    let Transactions = [];

    //Type and amount of currency bought. This is what gets stored in the wallet.
    this.Currency = {
        type: "",
        amount: 0
    };

    //A transaction. Gets store in Transctions[]
    let Transaction = {
        date: null, //datetime?
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
        tra.date = da;
        tra.type = ty;
        tra.amount = am;

        return tra;
    }

    //Adds or subtracts bought currency from the wallet
    this.addToWallet = function(curr){
        //curr is a Currency object from a recent transaction. curr.amount can be negative (indicating selling, positive indicated buying)
        //Would it maybe be preferable to add another property instead, like the 

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

    }
    this.getTimePeriod = function(){
        return TimePeriod;
    }

    //Gets the current price for a particular type or types of currency
    this.getCurrentPrice = function(type){
        //Nuvarande pris för vald valuta. Anropar price.
        const url = 'https://min-api.cryptocompare.com/data/price?';
        //fsym=ETH&tsyms=BTC,USD,EUR';
        
    }

    this.getCurrInfo = function(){
        //Information om vald valuta. Anropar coinlist.
        const url = '';
    }

    this.getComparison = function(what){
        //Jämför värdet på användarens ägda valutor när hen köpte dem och idag. M.a.o visar vinsten/förlusten.
        //Kan göra för hela (what==all) och en för specific valuta (what==x).
    }    

    this.getHistorical = function(){
        //Priset vid en särskild tidpunkt. Anropar pricehistorical för just nu, histoday för tidigare.
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