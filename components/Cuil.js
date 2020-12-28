const cuil = (sexo, dni) = () => {

    let xy = 0;
    if (sexo == 'M') {
        xy = 20;
    }else{
        xy = 27;
    }

    let fijosCalculables = [5,4,3,2,7,6,5,4,3,2]
    let variablesCalculables = [xy[0],xy[1],dni[0],dni[1],dni[2],dni[3],dni[4],dni[5],dni[6],dni[7]]

    let fijosYvariablesMult = [];
    for (let i = 0; i < fijosCalculables.length; i++) {
        fijosYvariablesMult.push(fijosCalculables[i] * variablesCalculables[i]);
    }

    return fijosYvariablesMult;
}

//cuil('M',42400448);

export default cuil;