// CRUD operation Create, Read ,Update and Delete documnets

const { Db } = require("mongodb");

//Create Operations
// Create or insert operation add new documents to the collection. If doesn't exist then operation will create the collection

//To insert documents into a collection 
//  db.collection.insertone()
//  db.collection.insertMany()

//   db.users.insertOne(           <-- Collection
//     {
//         name : 'Smitali',       <-- field : value
//         age : 22,               <-- field : value    == Document
//         status : 'Pending'      <-- field : value
//     }
//   )

// const mongodb = require('mongodb')

//Read Operations 
//Read operation retrieves a documents from the collection.i.e.query a collection from documents
//To read document from the collection
//  db.collection.find()

//   db.collection.find(
//     {age: {$gt : 18}},
//     {name : 1,address:1}
//   ).limit(5)

//Q
//Find all the results of the given collection
// db.collection.find()

//Show the result in pretty format
// db.collection.find().pretty()

//Get only MongoDB data as ouput
//db.collection.find({name:"MongoDB"}).pretty()

//Get only MongoDB data as a output with only name field
//db.collection.find({name : "MongoDB"},{name:1}).pretty()

//Get the MongoDB data without _id field in it
//db.collection.find({name: "MongoDB"},{_id : 0,name : 1}).pretty()

//Set the filter to "active:true" and get only the first field with "active:true" value
//db.collection.find({active:true}).pretty().limit(1)

//Set the filter to "active:true" and get only the first field with "active:true" value but with different method
//db.collection.findOne({active:true})

//Set the filter to "active:true" and get only the first field with "active:true" value but this time, get the 2nd field with "active:true" by skipping the 1st field
//db.collection.find({active:true}).pretty().limit(1).skip(1)

//Update Operation
//Update operation modify existing documents to  the colletion.
//To update the document 
//  db.collection.updateOne()
//  db.collection.updateMany()
//  db.collection.replaceOne()

//    db.users.updateMany(
//     {age : {$lt : 18}},
//     {$set : {status :"reject"}}
//    )

//Delete Operation
//Delete operation removes the document from the collection
//To delete the documents
// db.collection.deleteOne()
// db.collection.deleteMany()

//    db.users.deleteMany(
//     {status : "reject"}
//    )

//save
// replaces the existing document with the document passed in save() method

//bulkWrite() operation
//bulkWrite() opertion used to perform bulk insert,update and delete operation
// It also supports bulk insert through the db.collection.insertMany()

//insertOne()
//Insert single document to the collection


//AGGREGATION
//Aggregation is similar to find command, where you can provide the criteria for your query in the form of JSON documents
//The key element in aggregation is called aggregation pipeline
//It helps to perform operations like min,max,sum ,etc.

//Command to use Aggregation
//db.collection.aggregate(pipeline,options)

//Pipeline
//A sequence of data agrregation operations or stages
//Pipeline is an array

//$match
//It is used to filter document by certain query
//Passes the remaining documents to the $group stage.
//  {$match: { <query> }}
// {$match: {city : "New York"}}
// {$match: {age : {$gt : 25}}}
// {$match: {$and: [{gender : "Female"},{age : {$gt : 25}}]}}

//$group
//It is used to group the document by certain criteria
//Uses $sum to calculate the total product quantity.The total is stored in the totalQuantity field returned by the aggregation pipeline.

//$sort
//It is used to sort the object

//$count
//It is used to counts the number of objects of documents

//$limit
//used to limits number of documents

//$skip
//Used to skip certain amounts of documents

//$out
//used to write the result of aggregation into the another collection

// use demo
// db.products.insertMany([{ _id: 0, name: "Pepperoni", size: "small", price: 19,quantity: 10, date: ISODate( "2021-03-13T08:14:30Z" ) },    
// { _id: 1, name: "Pepperoni", size: "medium", price: 20,quantity: 20, date : ISODate( "2021-03-13T09:13:24Z" ) },    
// { _id: 2, name: "Pepperoni", size: "large", price: 21,quantity: 30, date : ISODate( "2021-03-17T09:22:12Z" ) },    
// { _id: 3, name: "Cheese", size: "small", price: 12,quantity: 15, date : ISODate( "2021-03-13T11:21:39.736Z" ) },    
// { _id: 4, name: "Cheese", size: "medium", price: 13,quantity:50, date : ISODate( "2022-01-12T21:23:13.331Z" ) },    
// { _id: 5, name: "Cheese", size: "large", price: 14,quantity: 10, date : ISODate( "2022-01-12T05:08:13Z" ) },    
// { _id: 6, name: "Vegan", size: "small", price: 17,quantity: 10, date : ISODate( "2021-01-13T05:08:13Z" ) },    
// { _id: 7, name: "Vegan", size: "medium", price: 18,quantity: 10, date : ISODate( "2021-01-13T05:10:13Z" ) } ] )

// {
// 	"acknowledged" : true,
// 	"insertedIds" : [
// 		0,
// 		1,
// 		2,
// 		3,
// 		4,
// 		5,
// 		6,
// 		7
// 	]

//calculate the total order quantity 
// db.products.aggregate([

//     //stage 1 : filter documents by products size
//     {
//         $match : {size : "medium"}
//     },
//     //stage 2 : Group remaining documents by name and calculate total quantity
//     {
//         $group : {_id: "$name",totalQuantity: {$sum: "$quantity"}}
//     }
// ])

// db.products.aggregate([
//     {
//         $match: {
//             "date" : {$gte:new ISODate ("2020-01-30"),$lt: new ISODate("2020-01-30")}
//         }
//     },
//     {
//         $group:{
//             "_id": {$dateToString: {format :"%Y-%m-%d",date: "$date"}},
//             totalProductQuantity: {$sum: {$multiply: ["$price","$quantity"]}},
//             averageProductQuantity: {$avg: "$quantity"}
//         }
//     },
//     {
//         $sort:{
//             totalProductQuantity: -1
//         }
//     }
// ])