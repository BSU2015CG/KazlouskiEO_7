APP = {
    converter: {},
    active: false
};

APP.createComponent = function (component) {
    this.converter[component.description] = {};
    this.converter[component.description].callbackToRGB = component.callbackToRGB;
    this.converter[component.description].callbackFromRGB = component.callbackFromRGB;
    return this;
};

APP.converter.hexToR = function (h) {
    return parseInt((this.cutHex(h)).substring(0,2),16);
};

APP.converter.hexToG = function (h) {
    return parseInt((this.cutHex(h)).substring(2,4),16);
};

APP.converter.hexToB = function (h) {
    return parseInt((this.cutHex(h)).substring(4,6),16);
};

APP.converter.cutHex = function (h) {
    return (h.charAt(0)=="#") ? h.substring(1,7):h;
};

APP.converter.rgbToHex = function (R,G,B) {
    return '#' + this.toHex(R) + this.toHex(G) + this.toHex(B);
};

APP.converter.toHex = function (n) {
    n = parseInt(n,10);
    if (isNaN(n)) { return "00"; }
    n = Math.max(0,Math.min(n,255));

    return "0123456789ABCDEF".charAt((n-n%16)/16) + "0123456789ABCDEF".charAt(n%16);
};