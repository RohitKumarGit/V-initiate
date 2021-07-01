const mysql = require('mysql');
const connection = mysql.createPool ({
  host: 'localhost',
  'port':3306,
  user: 'root',
  password: 'YES',
  database: 'internship'
});
connection.connect((err) => {
  if (err) {
    console.log(err)
    return 
  };
  console.log('Connected!');
});
const axios = require('axios');
var fun = async function(){
    const {data} = await axios.get("http://api.openweathermap.org/data/2.5/weather?q=London,uk&appid=ae89363b2bb77f4fccc6a6be2b940d68");
    console.log(data)
}
fun();

 
connection.end();