let table = base.getTable("variablesTipologias");
let list = ["REHABILITACION INTEGRAL", "CUBIERTAS", "FACHADAS ORNAMENTADAS", "FACHADAS CONTEMPORANEAS", "ENVOLVENTES", "REHABILITACION ESTRUCTURAL", "RESTAURACION DE PATRIMONIO", "ZONAS COMUNES Y OTROS"];

// Function to get all combinations of a list
function getCombinations(list) {
    let result = [];
    let f = function(prefix, list) {
        for (let i = 0; i < list.length; i++) {
            result.push((prefix ? prefix + ", " : "") + list[i]);
            f((prefix ? prefix + ", " : "") + list[i], list.slice(i + 1));
        }
    }
    f("", list);
    return result;
}

let combinations = getCombinations(list);

// Filter out combinations that include both "FACHADAS ORNAMENTADAS" and "FACHADAS CONTEMPORANEAS"
combinations = combinations.filter(combination => !(combination.includes("FACHADAS ORNAMENTADAS") && combination.includes("FACHADAS CONTEMPORANEAS")));

// Create records for each combination
for (let combination of combinations) {
    await table.createRecordAsync({
        "name": combination
    });
}