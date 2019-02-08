"use strict";
exports.__esModule = true;
var User = /** @class */ (function () {
    function User(email, name, password) {
        this.email = email;
        this.name = name;
        this.password = password;
    }
    User.prototype.matches = function (dados) {
        return dados !== undefined && dados.email === this.email && dados.password === this.password;
    };
    return User;
}());
exports.User = User;
exports.users = {
    "sdparkjr@gmail.com": new User("sdparkjr@gmail.com", "Sdparkr", "1234"),
    "buchecha@gmail.com": new User("buchecha@gmail.com", "Buchecha", "1234")
};
