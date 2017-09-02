var immeuble = i ={
    loyer1chambre : 350,
    prixAuM2 : 1000,
    prixTravauxAuM2 : 1000,
    surfaceChambre : 15,
    txNotaire : 0.08,
    expertComptable : 300,
    courtier : 300,
    taxFonciere : 300,
    txEffectifGlobal : 0.018,
    meuble1Chambre : 300,
    impotRevenuFoncier : 0, // normalement possible à 0 en meublé
    dureeEmprunt : 14,
    bankBorrowing : function(montantEmprunte, nbAnnees, txEffectifGlobal, mensualite){
        var n = nbAnnees * 12;
        if(!mensualite){
            var mensualite = (montantEmprunte * txEffectifGlobal / 12) / (1 -  Math.pow((1 + txEffectifGlobal / 12), -n));
            return Math.round(mensualite);
        }
        if(!montantEmprunte){
            var montantEmprunte = (((1 -  Math.pow((1 + txEffectifGlobal / 12), -n)) * mensualite) * 12) / txEffectifGlobal;
            return Math.round(montantEmprunte);
        }
        /* if(!txEffectifGlobal){
            return 'Comment calculer le taux effectif global ?';
        }
        if(!nbAnnees){
            return 'Comment calculer le nombre d\'années ?';
        } */
    },
    showMeCashFlow : function(nbMaxDeChambre) {
        for(var j = 0; j < nbMaxDeChambre; j++){
            i.nbChambres = j + 1;
            // REVENUS
            i.loyerMensuel = i.loyer1chambre * i.nbChambres;
            // COUT
            i.surfaceCuisine = 10 + 2 * i.nbChambres;
            i.surface = i.surfaceCuisine + i.nbChambres * i.surfaceChambre;
            i.prix = i.surface * i.prixAuM2;
            i.travaux = i.surface * i.prixTravauxAuM2;
            i.notaire = i.txNotaire * i.prix;
            i.cout = i.prix + i.travaux + i.notaire + i.expertComptable + i.courtier + i.meuble1Chambre * i.nbChambres;
            // RENTA BRUTE
            i.rentaBrute = ((i.loyerMensuel * 12) / i.cout).toFixed(2); // il faut peut etre enlever les charges au loyer dans la renta brute ou alors c'est pour la renta nette je ne sais plus
            // CHARGES
            i.mensualiteBanque = i.bankBorrowing(i.cout, i.dureeEmprunt, i.txEffectifGlobal, '')
            i.autresChargesMensuelles = Math.round((i.taxFonciere + i.impotRevenuFoncier) / 12); // attention peut etre ajouter cout * 0.01 d'entretien locaux
            // cashFlowMensuel
            i.cashFlowMensuel = (i.loyerMensuel - i.mensualiteBanque - i.autresChargesMensuelles);
            console.log(
                'Nombre de chambre : ' + i.nbChambres + 
                ' surface : ' + i.surface +
                ' cout ou emprunt : ' + i.cout +
                // ' loyerMensuel : ' + i.loyerMensuel +
                // ' mensualiteBanque : ' + i.mensualiteBanque +
                // ' autresChargesMensuelles : ' + i.autresChargesMensuelles +
                // ' rentaBrute : ' + i.rentaBrute +
                ' cash-flow mensuel : ' + i.cashFlowMensuel
            );
            console.log('Plus de détails dans l\'objet ci-dessous : ');
            console.log(i);
            console.log('\r\n');
        }
    }
}

immeuble.showMeCashFlow(20);