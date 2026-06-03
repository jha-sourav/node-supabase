const BaseRepository = require('../../shared/repositories/BaseRepository');
const supabase = require('../../config/supabase');

class UserRepository extends BaseRepository {
    constructor() {
        super('users');
    }

    async findByEmail(email, fields = '*') {
        return await this.query()
            .select(fields)
            .eq('email', email)
            .single();
    }
}

module.exports = new UserRepository();