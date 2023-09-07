window.explode = function (str, symbol){
    let name = str;
    let index = name.lastIndexOf(symbol);
    return name.slice(index + symbol.length);
}
