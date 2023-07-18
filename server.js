const express = require("express");
const fs = require("fs");
   
const app = express();
// создаем парсер для данных в формате json
const jsonParser = express.json();



// fs.appendFile("Users.txt", "Привет МИД!", function(error){
//   if(error) throw error; // если возникла ошибка
//   console.log("Запись файла завершена. Содержимое файла:");
//   let data = fs.readFileSync("Users.txt", "utf8");
//   console.log(data);  // выводим считанные данные
// });

class User {
  constructor(name, email, password, id, avatar) {
    this.name = name;
    this.email = email;
    this.password = password;
    this.id = id;
    this.avatar = avatar;
  }
}

 
// настройка CORS
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, PATCH, PUT, POST, DELETE, OPTIONS");
  next();  // передаем обработку запроса методу app.post("/postuser"...
});

app.get("/getUser", function(req, res){
  const email = req.query.email;
  const password = req.query.password;
  const content = fs.readFileSync("Users.txt", "utf8");
  const users = JSON.parse(content);
  const user = users.find(user => {
    if (user.email === email) {
      return true;
    }
    return false;
  });
  if (user) {
    if (user.password === password) {
      res.send(user);
    } else {
      res.send({'error': "wrong password"});
    }
  } else {
    res.status(404).send();
  }
});

app.get("/userDB/lastUser", function(req, res){
       
  const content = fs.readFileSync("Users.txt", "utf8");
  const users = JSON.parse(content);
  let user = users.at(-1);
  // отправляем пользователя
  if(user){
    res.send(user);
  }
  else{
    res.status(404).send();
  }
});


  

app.post("/postUser", jsonParser, function (req, res) {
  // если не переданы данные, возвращаем ошибку
  if(!req.body) return res.sendStatus(400);
  let email = req.body.email;
  let password = req.body.password;
  let name = req.body.name;
  const content = fs.readFileSync("Users.txt", "utf8");
  const users = JSON.parse(content);
  let user = users.find(user => user.email === email);
  if (user) {
    res.send({'error': "Email is already registered"});
  } else {
    let id = +users.at(-1).id + 1 + '';
    user = new User(email, name, password, id, 1);
    console.log(user)
  }
    
  // отправка данных обратно клиенту
  // response.json({"name": username, "age": userage});
});
  
app.listen(3000);
console.log('server is running')