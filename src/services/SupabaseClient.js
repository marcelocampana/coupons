class SupabaseClient {
  constructor(dbConnection) {
    this.supabase = dbConnection;
  }

  async getAllRecords() {
    const { data, error } = await this.supabase
      .from(this.tableName)
      .select("*");
    if (error) {
      throw new Error(error.message);
    }
    return data;
  }

  async getRecordById(id) {
    const { data, error } = await this.supabase
      .from(this.tableName)
      .select("*")
      .eq(this.columnId, id);

    if (error) {
      throw new Error(error.message);
    }
    return data;
  }

  async getRecordByColumnValue(columnName, columnValue) {
    const { data, error } = await this.supabase
      .from(this.tableName)
      .select("*")
      .eq(columnName, columnValue);

    if (error) {
      throw new Error(error.message);
    }
    return data;
  }

  async insertRecord(record) {
    const { data, error } = await this.supabase
      .from(this.tableName)
      .insert(record)
      .select();

    if (error) {
      throw new Error(error.message);
    }
    return data;
  }

  async updateRecord(record) {
    const { data, error } = await this.supabase
      .from(this.tableName)
      .update(record);

    if (error) {
      throw new Error(error.message);
    }
    return data;
  }

  async deleteRecord(record) {
    const { data, error } = await this.supabase
      .from(this.tableName)
      .delete(record);

    if (error) {
      throw new Error(error.message);
    }
    return data;
  }
}

export default SupabaseClient;
