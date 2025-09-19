function szamitas() {
    let celsius = parseFloat(document.getElementById('celsius').value);

    let farrenheit = celsius * 1.8 + 32;
    let kelvin = celsius + 273.15;

    let f = document.getElementById('farrenheit');
    f.innerHTML = celsius + '&deg;C = ' + farrenheit.toFixed(2) + '&deg;F';

    let k = document.getElementById('kelvin');
    k.innerHTML = celsius + '&deg;C = ' + kelvin + 'K';
}
