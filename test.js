class User {
    name;
    email;
    password;
    id;
    avatar;
    constructor(name, email, password, id, avatar) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.id = id;
        this.avatar = avatar;
    }
}
let a = new User('1', '1', '1', '1', '1');
console.log(a);
