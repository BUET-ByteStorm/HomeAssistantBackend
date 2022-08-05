const { Repository } = require("./Repository");

class NoteRepository extends Repository {
    constructor () {
        super();
    }

    addNote = async (userId,content) => {
        const query = `INSERT INTO note (userid,content) values ($1,$2) returning *` ;
        const param = [userId,content] ;
        const result = await this.query(query,param);
        return result ;
    }
    getNote = async (id) => {
        const query = `select * from note where id=$1` ;
        const param = [id];
        const result = await this.query(query,param);
        return result ;
    }
    getUserNotes = async (userId) => {
        const query = `select * from note where userid=$1` ;
        const param = [userId];
        const result = await this.query(query,param);
        return result ;
    }
    deleteNote = async (id) => {
        const query = `DELETE FROM note WHERE id = $1 RETURNING *`;
        const param = [id];
        const result = await this.query(query, param);
        return result;
    }
    fetchAllUser = async () => {
        const query = `SELECT * FROM note`;
        const result = await this.query(query);
        return result;
    }
}
module.exports = NoteRepository;