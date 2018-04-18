const mysql = require("mysql")
//install the inquirer pkg
//install the mysql pkg

// npm init -y 

const connection = mysql.createConnection({

host: "localhost",
user:"root",
password: "",
database: "bamazon_db"


});

connection.connect((error) => {
    if (error) throw error
    displayInventory()


})

function displayInventory(){
    connection.query("SELECT * FROM products",function(err,res){
        console.log(res)
        for (var i = 0; i < res.length; i++){
            console.log("item_id:"+res[i].item_id +"product_name" + res[i].product_name + "price"+ res[i].price)
        }
    }) 

}