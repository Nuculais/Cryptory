const cron = require('node-schedule');
const fetch = require('node-fetch');
const Coin = require('../model/Coin')

const CUR_API = 'https://min-api.cryptocompare.com/data/pricemulti?fsyms=BTC,ETH,ALT&tsyms=SEK,EUR,USD'

module.exports = () => {
  cron.scheduleJob('*/30 * * * * *', () => {
    fetch(CUR_API)
      .then(response => {
          if (response.ok) {
            response.json().then(data => {
              // console.log('data: ', data);
              // const search = ['BTC', 'ETH', 'ALT'];
              // search.forEach(term => {
              //     const updates = {
              //       'price.sek': data[term]['SEK'],
              //       'price.eur': data[term]['EUR'],
              //       'price.usd': data[term]['USD'],
              //     };
              const updates = { coins: data, date: Date() }
              const query = {name: 'coins'}
              Coin.findOneAndUpdate(query, updates, function (err, coin) {
                  if (err) {
                    console.log(err);  // handle errors!
                  }
                  if (!err && coin !== null) {
                    // done(null, coin);
                    return;
                  } else {
                    coin = new Coin(updates);
                    console.error('Coin to be inserted: ', coin);
                    coin.save(function (err) {
                      if (err) {
                        console.log(err);  // handle errors!
                      } else {
                        console.log("saving coin...");
                        return;
                        // done(null, coin);
                      }
                    });
                  }
                }
              )
              // }
              // )
              // }
              // )
            })
          }  else {
            response.json().then(error => {
              alert("Failed to fetch issues:" + error.message)
            });
          }
        }
      ).catch(err => {
      alert("Error in fetching currency data from server:", err);
    });
  })
}
