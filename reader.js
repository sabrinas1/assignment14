const myForm = document.getElementById("myForm");
const csvFile = document.getElementById("csvFile");
var MongoClient = require('mongodb').MongoClient;
var uri = "mongodb://sabrinas1:Jimrose1@cluster0-shard-00-00.bznhx.mongodb.net:27017,cluster0-shard-00-01.bznhx.mongodb.net:27017,cluster0-shard-00-02.bznhx.mongodb.net:27017/myFirstDatabase?ssl=true&replicaSet=atlas-tirrnw-shard-0&authSource=admin&retryWrites=true&w=majority";

function csvToArray(str, delimiter = ",") {

    const headers = str.slice(0, str.indexOf("\n")).split(delimiter);

    const rows = str.slice(str.indexOf("\n") + 1).split("\n");

    const arr = rows.map(function (row) {
        const values = row.split(delimiter);
        const head = headers.reduce(function (object, header, index) {
            object[header] = values[index];
            return object;
        }, {});
        return head;
    });

    return arr;
}

myForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const input = csvFile.files[0];
    const reader = new FileReader();

    reader.onload = function (e) {
        const text = e.target.result;
        const data = csvToArray(text);
        MongoClient.connect(uri, function (err, client) {
            const collection = client.db("myFirstDatabase").collection("companies");
            collection.insertMany(data, function (err, result) {
                if (err) throw err;
                console.log("Number inserted: " + res.insertedCount);
                client.close();
            })
        });
    };

    reader.readAsText(input);
});