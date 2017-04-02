var form = require('./form');

form("form-settings", "Настройки")
    // .addMinimizeButton()
    .addCloseButton()
    .appendTo(document.body);
