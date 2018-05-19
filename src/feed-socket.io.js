feed = (function () {

  const socket = io();

  return {
    onChange: function (callback) {
      socket.on('coin', callback);
    },
    watch: function (symbols) {
      socket.emit('join', symbols);
    },
    unwatch: function (symbol) {
      socket.emit('leave', symbol);
    }
  };

}());