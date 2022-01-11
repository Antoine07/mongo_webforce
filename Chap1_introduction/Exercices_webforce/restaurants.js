db.restaurants.find({ $and: [{ name: /^R/ }, { name: /s$/ }] }, { name: 1, _id: 0 })

// .* <=> . n'importe quel caractère et * de 0 à autant qu'on veut
db.restaurants.find({ name: /^R.*s$/ }, { name: 1, _id: 0 })

//
db.restaurants.find({
    name: /s$/i
}, { _id: 0, name: 1, borough: 1 })


// Deux s colés
db.restaurants.find({
    name: /ss/
}, { _id: 0, name: 1, borough: 1 })

// Au moins un s dans le nom avec le flag i <=> insensible à la casse
db.restaurants.find({
    name: /s{1}/i
}, { _id: 0, name: 1, borough: 1 })

// Comptez le nombre de restaurants

// forEach permet de lire l'intégralité du document
let count = 0;

db.restaurants.find(
    { borough: "Brooklyn" },
    { _id: 0, name: 1 }
).forEach(
    doc => {
        print(doc.name);
        count++; // on écrémente le compteur à chaque fois que l'on lit un doc
    }
);

print(`Nombre de restaurants dans Brooklyn: ${count}`);

// liste d'exercice combien 

// 01
db.restaurants.find({
    $and: [
        { cuisine: "Italian" },
        { "grades.score": { $in: [10] } }
    ]
}, { _id: 0, "grades.score": 1, name: 1, "address.coord": 1 }).sort({ name: 1 }).count();


// 02 03
db.restaurants.find(
    { "grades.grade": "A", "grades.score": { $gte: 20 } },
    { _id: 0, name: 1 }).sort(
    { name: -1 }
).sort({ name : -1}).pretty();

db.restaurants.find({ "grades.grade": "A", "grades.score": { $gte: 20 } }).count(); // 6312

// 04
db.restaurants.distinct("borough");

// 05
db.restaurants.distinct("cuisine", { borough : "Bronx"});

// 06
db.restaurants.find({
    $and: [
        { borough: "Bronx" },
        { grades : { $size: 4 } }
    ]
}, { _id: 0, grades: 1, name: 1}).sort({ name: 1 }).pretty();

db.restaurants.find({
    $and: [
        { borough: "Bronx" },
        { grades : { $size: 4 } }
    ]
}).count();