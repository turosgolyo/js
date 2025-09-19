function szamitas() {
    let magassag = parseInt(document.getElementById('magassag').value) / 100;
    let testsuly = parseInt(document.getElementById('testsuly').value);
    if (magassag == 0 || testsuly == 0) {
        alert('Egyik adat sem lehet nulla!');
    }
    
    let bmi = testsuly / Math.pow(magassag, 2);
    let allapot;

    if (bmi < 16) {
        allapot = 'Súlyos soványság';
    } else if (bmi < 17) {
        allapot = 'Mérsékelt soványság';
    } else if (bmi < 18.5) {
        allapot = 'Enyhe soványság';
    } else if (bmi < 25) {
        allapot = 'Normál testsúly';
    } else if (bmi < 30) {
        allapot = 'Túlsúlyos';
    } else if (bmi < 35) {
        allapot = 'Elhízott (I. fokú)';
    } else if (bmi < 40) {
        allapot = 'Elhízott (II. fokú)';
    } else {
        allapot = 'Elhízott (III. fokú)';
    }

    document.getElementById('eredmeny').innerHTML = 'Az állapotod: ' + allapot;
    document.getElementById('bmi').innerHTML = '(BMI: ' + bmi.toFixed(2) + ')';
}
