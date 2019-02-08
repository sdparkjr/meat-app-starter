export class User {
    constructor(
        public email: string,
        public name: string,
        public password: string,
    ) { }

    matches(dados: User): boolean {
        return dados !== undefined && dados.email === this.email && dados.password === this.password;
    }
}



export const users: { [Key: string]: User } = {
    "sdparkjr@gmail.com": new User("sdparkjr@gmail.com", "Sdparkr", "1234"),
    "buchecha@gmail.com": new User("buchecha@gmail.com", "Buchecha", "1234")
}