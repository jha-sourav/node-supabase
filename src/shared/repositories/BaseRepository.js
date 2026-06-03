const supabase = require('../../config/supabase');

class BaseRepository {
    constructor(table) {
        this.table = table;
    }

    query() {
        return supabase.from(this.table);
    }

    async create(data) {
        return await this.query()
            .insert(data)
            .select()
            .single();
    }

    async findById(id, fields = '*') {
        return await this.query()
            .select(fields)
            .eq('id', id)
            .single();
    }

    async findAll(fields = '*') {
        return await this.query()
            .select(fields);
    }

    async update(id, data) {
        return await this.query()
            .update(data)
            .eq('id', id)
            .select()
            .single();
    }

    async delete(id) {
        return await this.query()
            .delete()
            .eq('id', id);
    }
}

module.exports = BaseRepository;