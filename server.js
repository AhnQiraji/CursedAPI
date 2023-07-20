const express = require("express");
const fs = require("fs");
   
const app = express();
// создаем парсер для данных в формате json
const jsonParser = express.json();



// fs.appendFile("Users.json", "Привет МИД!", function(error){
//   if(error) throw error; // если возникла ошибка
//   console.log("Запись файла завершена. Содержимое файла:");
//   let data = fs.readFileSync("Users.json", "utf8");
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

class Task {
  constructor(id, name, importance, description = '', status = 'To do') {
    this.id = id;
    this.name = name;
    this.importance = importance;
    this.description = description;
    this.status = status;
  }
}



 
// настройка CORS
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, PATCH, PUT, POST, DELETE, OPTIONS");
  next();  // передаем обработку запроса методу app.post("/postuser"...
});


// GET


app.get("/login", function(req, res){
  const email = req.query.email;
  const password = req.query.password;
  const content = fs.readFileSync("Users.json", "utf8");
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


app.get("/getTask", function(req, res){
  console.log('get task working')
  const content = fs.readFileSync("Tasks.json", "utf8");
  const tasks = JSON.parse(content);
  if (tasks) {
    res.send(JSON.stringify(tasks));
  } else {
    res.send({'error': "No tasks"});
  }
});

// POST
  

app.post("/registration", jsonParser, function (req, res) {
  // если не переданы данные, возвращаем ошибку
  if(!req.body) return res.sendStatus(400);
  let email = req.body.email;
  let password = req.body.password;
  let name = req.body.name;
  const content = fs.readFileSync("Users.json", "utf8");
  const users = JSON.parse(content);
  let user = users.find(user => user.email === email);
  if (user) {
    res.send({'error': "Email is already registered"});
  } else {
    let id = +users.at(-1).id + 1 + '';
    user = new User(name, email, password, id, 1);
    users.push(user);
    fs.writeFileSync("Users.json", JSON.stringify(users));
    res.send({"result": "complete"})
  }
});

app.post("/changeProfile", jsonParser, function (req, res) {
  // если не переданы данные, возвращаем ошибку
  if(!req.body) return res.sendStatus(400);
  let email = req.body.email;
  let password = req.body.password;
  let newName = req.body.newName;
  let newPassword = req.body.newPassword;
  const content = fs.readFileSync("Users.json", "utf8");
  const users = JSON.parse(content);
  let user = users.find(user => user.email === email);
  if (!user) {
    res.send({'error': "User doesn't exist"});
  } else if (user.password !== password) {
    res.send({'error': "Wrong password"});
  } else {
    user.name = newName;
    user.password = newPassword;
    fs.writeFileSync("Users.json", JSON.stringify(users));
    res.send({"result": "complete"})
  }
});

app.post("/newTask", jsonParser, function (req, res) {
  // если не переданы данные, возвращаем ошибку
  if(!req.body) return res.sendStatus(400);
  let name = req.body.name;
  let importance = req.body.importance;
  let description = req.body.description;
  let status = req.body.status;
  const content = fs.readFileSync("Tasks.json", "utf8");
  const tasks = JSON.parse(content);
  let id = +tasks.at(-1).id + 1 + '';
  let task = new Task(id, name, importance, description, status);
  tasks.push(task);
  fs.writeFileSync("Tasks.json", JSON.stringify(tasks));
  if (!task) {
    res.send({'error': "Task wasn't created"});
  } else if (task) {
    res.send(JSON.stringify(tasks));
  }
});


  
app.listen(3000);
console.log('server is running')