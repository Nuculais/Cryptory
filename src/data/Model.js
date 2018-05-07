const DinnerModel = function () {

  let numberOfGuests = localStorage.getItem('numberOfGuests') ?
    localStorage.getItem('numberOfGuests') : 4;

  let observers = [];

// Observer pattern

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