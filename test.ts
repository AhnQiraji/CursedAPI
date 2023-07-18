class User {
  constructor(public name: string, public email: string, public password: string, public id: string, public avatar: string) {
    
  }
  // this.http.post('http://localhost:3000/postuser', body); 
}

let a = new User('1', '1', '1', '1', '1');
console.log(a);