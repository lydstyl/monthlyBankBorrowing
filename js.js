function bankBorrowing(c, a, t, m){
    // var c, montantEmprunte, m, mensualite, a, nbAnnee, n, 
    // nbMensualite, t, txEffectifGlobal;
    var n = a * 12;
    if(!m){
        // Math.pow(base, exposant)
        m = mensualite = (c * t / 12) / (1 -  Math.pow((1 + t / 12), -n));
        return Math.round(m);
    }
    if(!c){
        c = (((1 -  Math.pow((1 + t / 12), -n)) * m) * 12) / t;
        return Math.round(c);
    }
    if(!t){
        return 'Comment calculer le taux effectif global ?';
    }
    if(!a){
        return 'Comment calculer le nombre d\'années ?';
    }
}
// console.log(bankBorrowing('', 20, 0.045, 1265));
// console.log(bankBorrowing(200000, 20, 0.045, ''));
// console.log(bankBorrowing(200000, 20, '', 1265));
// console.log(bankBorrowing(200000, '', 0.045, 1265));
loyer = 300 * 2;


console.log(bankBorrowing('', 14, 0.018, loyer));