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
    console.log(columnName, columnValue);
    const { data, error } = await this.supabase
      .from(this.tableName)
      .select("*")
      .eq(columnName, columnValue);

    console.log("data", data, error);

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

  async updateRecord(columnId, id, recordsToUpdate) {
    const { data, error } = await this.supabase
      .from(this.tableName)
      .update(recordsToUpdate)
      .eq(columnId, id)
      .select();

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
