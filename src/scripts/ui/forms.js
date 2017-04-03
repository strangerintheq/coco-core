var form = require('./form');

form("form-settings", "Настройки")
     .addMinimizeButton()
    //.addCloseButton()
    .appendTo(document.body);

form("form-settings1", "Настройки1")
    .addMinimizeButton()
    //.addCloseButton()
    .appendTo(document.body)
    .show();
