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

 
// настройка CORS
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, PATCH, PUT, POST, DELETE, OPTIONS");
  next();  // передаем обработку запроса методу app.post("/postuser"...
});

app.get("/userDB", function(req, res){
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
      res.send('Wrong password');
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

// app.get("/userDB", jsonParser, function (request, response) {
//   // если не переданы данные, возвращаем ошибку
//   // if(!request.body) return response.sendStatus(400);
    
//   // получаем данные
//   // let username = request.body.name;
//   // let userage = request.body.age;
//   // имитируем некоторую обработку данных, например, изменим значение userage
//   // userage = userage + 10;
    
//   // отправка данных обратно клиенту
//   let readUsers = fs.readFileSync("Users.txt", "utf8");
//   console.log(typeof(readUsers))
//   response.json(JSON.parse(readUsers));
// });
  
// обработчик по маршруту localhost:3000/postuser
app.post("/postuser", jsonParser, function (request, response) {
 
  // если не переданы данные, возвращаем ошибку
  if(!request.body) return response.sendStatus(400);
    
  // получаем данные
  let username = request.body.name;
  let userage = request.body.age;
  // имитируем некоторую обработку данных, например, изменим значение userage
  userage = userage + 10;
    
  // отправка данных обратно клиенту
  response.json({"name": username, "age": userage});
});
  
app.listen(3000);
console.log('server is running')