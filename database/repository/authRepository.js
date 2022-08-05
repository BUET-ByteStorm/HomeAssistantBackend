const { Repository } = require("./Repository");

class UserAuthRepository extends Repository {
    constructor () {
        super();
    }

    createUser = async (name, password) => {
        const query = `INSERT INTO "user" (name, password) VALUES ($1, $2) RETURNING *`;
        const param = [name, password];
        const result = await this.query(query, param);
        return result;
    }
    fetchUser = async (uname) => {
        const query = `SELECT * FROM "user" WHERE uname = $1`;
        const param = [uname];
        const result = await this.query(query, param);
        return result;
    }
    deleteUser = async (uname) => {
        const query = `DELETE FROM "user" WHERE username = $1 RETURNING *`;
        const param = [uname];
        const result = await this.query(query, param);
        return result;
    }
    fetchAllUser = async () => {
        const query = `SELECT * FROM "user"`;
        const result = await this.query(query);
        return result;
    }
}
module.exports = UserAuthRepository;