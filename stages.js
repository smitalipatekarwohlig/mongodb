//$addFields
//Adds new fields to the document 
// {
//     id: 1,
//     student: "ABC",
//     homework: [10,15,20],
//     quiz: [8,9],
//     extraCredit:0
// },
// {
//     id: 2,
//     student: "XYZ",
//     homework: [23,10,8],
//     quiz: [10,7],
//     extraCredit:8
// }

const { Db } = require("mongodb");

// use pipeline
// db.stages.aggregate([
//     {$addFields:{
//          totalHomework: {$sum: "$homework"},
//          totalQuiz: {$sum: "$quiz"}
//       }
//     },
//     {$addFields:{totalScore:
//        {$add: ["$homework","$quiz","$extraCredit"] }   
//     }
// ])

//$concatArrays
//Concatenates the arrays to concatenated array
// { "_id" : 1, instock: [ "chocolate" ], ordered: [ "butter", "apples" ] },
// { "_id" : 2, instock: [ "apples", "pudding", "pie" ] },
// { "_id" : 3, instock: [ "pears", "pecans"], ordered: [ "cherries" ] },
// { "_id" : 4, instock: [ "ice cream" ], ordered: [ ] }

// db.stages.aggregate([
//     {
//         $project: {items:{$concatArrays:["$instock","$ordered"]}}
//     }
// ])

// The $merge operator must be the last stage in the pipeline
//Merge the document

//$lookup
//the $lookup stage adds a new array field to each input document. The new array field contains the matching documents from the "joined" collection. The $lookup stage passes these reshaped documents to the next stage

// db.orders.insertMany( [
//     { "_id" : 1, "item" : "almonds", "price" : 12, "quantity" : 2 },
//     { "_id" : 2, "item" : "pecans", "price" : 20, "quantity" : 1 }
//  ] )

// db.items.insertMany( [
//     { "_id" : 1, "item" : "almonds", description: "almond clusters", "instock" : 120 },
//     { "_id" : 2, "item" : "bread", description: "raisin and nut bread", "instock" : 80 },
//     { "_id" : 3, "item" : "pecans", description: "candied pecans", "instock" : 60 }
//   ] )

// db.orders.aggregate([
//     {
//         $lookup:
//         {
//             from: "items",
//             localField: "item",
//             foreignField: "item",
//             as: "fromItems"
//         }
//     }
// ])


//$unionWith
//combines pipeline results from two collections into a single result set
// db.sales2022q1.insertMany([
//     { store: "A", item: "Chocolates", quantity: 150 },
//     { store: "B", item: "Chocolates", quantity: 50 },
//     { store: "A", item: "Cookies", quantity: 100 },
//     { store: "B", item: "Cookies", quantity: 120 }
// ])

// db.sales2022q2.insertMany([
//     { store: "A", item: "Cheese", quantity: 30 },
//     { store: "B", item: "Cheese", quantity: 50 },
//     { store: "A", item: "Chocolates", quantity: 125 },
//     { store: "B", item: "Chocolates", quantity: 150 }
// ])

// db.sales2022q3.insertMany([
//     { store: "A", item: "Cheese", quantity: 30 },
//     { store: "B", item: "Cheese", quantity: 50 },
//     { store: "A", item: "Chocolates", quantity: 125 },
//     { store: "B", item: "Chocolates", quantity: 150 }
// ])

// db.sales2022q4.insertMany([
//     { store: "A", item: "Cheese", quantity: 100, },
//     { store: "B", item: "Cheese", quantity: 100},
//     { store: "A", item: "Chocolates", quantity: 200 },
//     { store: "B", item: "Chocolates", quantity: 300 }
// ])

// db.sales2022q1.aggregate( [
//     { $set: { _id: "2022Q1" } },
//     { $unionWith: { coll: "sales2019q2", pipeline: [ { $set: { _id: "2022Q2" } } ] } },
//     { $unionWith: { coll: "sales2019q3", pipeline: [ { $set: { _id: "2022Q3" } } ] } },
//     { $unionWith: { coll: "sales2019q4", pipeline: [ { $set: { _id: "2022Q4" } } ] } },
//     { $sort: { _id: 1, store: 1, item: 1 } }
//  ] )

//$sort
// Sorts all input documents and returns them to the pipeline in sorted order
//sort ascending ==> 1
//sort descending ==> -1
// db.users.insertMany([
//     {_id: 1, name: "ABC", age: 25},
//     {_id: 2, name: "XYZ", age: 30},
//     {_id: 3, name: "LMN", age: 21},
//     {_id: 4, name: "PQR", age: 40},
//     {_id: 5, name: "DEF", age: 37}
// ])

// db.users.aggregate([
//     {
//         $sort: {name: -1}
//     }
// ])


//$unset
//To remove a single field, $unset takes a string that specifies the field to remove
//To remove a multiple field, $unset takes an array of fields to remove
// db.stages.insertMany([
//    {"_id": 1, "name": "ABC","age": 27, "phoneNo": 1234},
//    {"_id": 2, "name": "PQR","age": 29, "phoneNo": 7846},
//    {"_id": 3, "name": "LMN","age": 43, "phoneNo": 2357}
//    ])

// db.stages.aggregate([
//     {
//         $unset: ["phoneNo"]
//     }
// ])


//$unwind
//Each output document is the input document with the value of the array field replaced by the element

// db.stages.insertMany([
//     {"_id": 1,item: "shirt" , "sizes": ["S","M","L"]},
//     {"_id": 2,item: "shorts" , "sizes": []},
//     {"_id": 3,item: "hat" },
//     {"_id": 4,item: "scarf" , "sizes": "M"},
//     {"_id": 5,item: "jeans" , "sizes": null}
// ])

// db.stages.aggregate([
//     {
//         $unwind: {path: "sizes"}
//     }
// ])