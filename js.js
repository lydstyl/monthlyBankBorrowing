function bankBorrowing(montantEmprunte, nbAnnees, txEffectifGlobal, mensualite){
    var n = nbAnnees * 12;
    if(!mensualite){
        var mensualite = (montantEmprunte * txEffectifGlobal / 12) / (1 -  Math.pow((1 + txEffectifGlobal / 12), -n));
        return Math.round(mensualite);
    }
    if(!montantEmprunte){
        var montantEmprunte = (((1 -  Math.pow((1 + txEffectifGlobal / 12), -n)) * mensualite) * 12) / txEffectifGlobal;
        return Math.round(montantEmprunte);
    }
    if(!txEffectifGlobal){
        return 'Comment calculer le taux effectif global ?';
    }
    if(!nbAnnees){
        return 'Comment calculer le nombre d\'années ?';
    }
}
/* console.log(bankBorrowing('', 20, 0.045, 1265));
console.log(bankBorrowing(200000, 20, 0.045, ''));
console.log(bankBorrowing(200000, 20, '', 1265));
console.log(bankBorrowing(200000, '', 0.045, 1265)); */



var loyer1chambre = 300;
var prixAuM2 = 700;
var prixTravauxAuM2 = 600;
var surfaceChambre = 15;
var txNotaire = 0.08;
var expertComptable = 300;
var courtier = 300;
var taxFonciere = 300;
var txEffectifGlobal = 0.018;
var meuble1Chambre = 200;
var impotRevenuFoncier = 0;
var dureeEmprunt = 14;

var nbChambres, surfaceCuisine, surface,
prix, notaire, cout, loyerMensuel, mensualiteBanque, 
autresChargesMensuelles, cashFlowMensuel, travaux,
rentaBrute; 
for(var i = 0; i < 10; i++){
    nbChambres = i + 1;
    // REVENUS
    loyerMensuel = loyer1chambre * nbChambres;
    // COUT
    surfaceCuisine = 20 + 5 * nbChambres;
    surface = surfaceCuisine + nbChambres * surfaceChambre;
    prix = surface * prixAuM2;
    travaux = surface * prixTravauxAuM2;
    notaire = txNotaire * prix;
    cout = prix + travaux + notaire + expertComptable + courtier + meuble1Chambre * nbChambres;
    // RENTA BRUTE
    rentaBrute = ((loyerMensuel * 12) / cout).toFixed(2);
    // CHARGES
    mensualiteBanque = bankBorrowing(cout, dureeEmprunt, txEffectifGlobal, '')
    //autresChargesMensuelles = Math.round((taxFonciere + impotRevenuFoncier) / 12 + 
    //cout * 0.01) // entretien locaux
    autresChargesMensuelles = Math.round((taxFonciere + impotRevenuFoncier) / 12);
    // cashFlowMensuel
    cashFlowMensuel = (loyerMensuel - mensualiteBanque - autresChargesMensuelles);

    console.log(
        'Nombre de chambre : ' + nbChambres + 
        ' surface : ' + surface +
        ' cout ou emprunt : ' + cout +
        ' loyerMensuel : ' + loyerMensuel +
        ' mensualiteBanque : ' + mensualiteBanque +
        ' autresChargesMensuelles : ' + autresChargesMensuelles +
        ' rentaBrute : ' + rentaBrute +
        ' cash-flow mensuel : ' + cashFlowMensuel
    );
}