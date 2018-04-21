require("console.table");


const mysql = require("mysql");
const inquire = require("inquirer");
//install the mysql pkg

// npm init -y 

const connection = mysql.createConnection({

    host: "localhost",
    user: "root",
    password: "",
    database: "bamazon_db"


});

const questions = {
    order: [{
        type: "prompt",
        name: "id",
        message: "Please tell us what product id you would like to purchase.",
        validate: (choice) => {
            if (Number.isInteger(parseInt(choice))) return true;
            return "Please enter a valid item id"
        }
    }, {
        type: "prompt",
        name: "qty",
        message: "Please tell us how many you would like.",
        validate: (choice) => {
            if (Number.isInteger(parseInt(choice))) return true;
            return "Please enter a valid item id"
        }
    }]

}

const getCatalog = () => {
    const statement = "Select * from products where stock_quantity > 0"
    return new Promise((resolve, reject) => {
        connection.query(statement, (err, res) => {
            if (err) reject(err);
            resolve(res);
        })

    })

}
const checkOrder = (order) => {
    const statement = `select * from products where item_id = ${order.id} and stock_quantity>=${order.qty}`
    return new Promise((resolve, reject) => {
        connection.query(statement, (err, res) => {
            if (err) reject(err);
            resolve({ result: res, order: order });
        })
    })
   
}
const updateDB = (order,stock) =>{
    const statement=`update products set stock_quantity = ${stock -order.qty} where item_id = ${order.id}`;
    return new Promise((resolve,reject)=>{
      connection.query(statement, (err,res)=>{
          if (err) reject(err)
          resolve(res)
      })    
    })
}
const processOrder = (data) => {
    if (data.result.length > 0) {
        return updateDB(data.order, data.result[0].stock_quantity)
        .then(price =>`Your total due is ${(data.result[0].price * data.order.qty).toFixed(2)}`)

    }
    return "Insufficient quanitity!"
}


connection.connect();

getCatalog()
    .then(data => console.table(data))
    .then(() => inquire.prompt(questions.order))
    .then(choices => checkOrder(choices))
    .then(data => processOrder(data))
    .then(price => console.log(price))
    .then(() => connection.end())
    .catch(err => console.log(err))


