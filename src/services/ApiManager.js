import supabase from "./supabase";

export class ApiManager {
  constructor() {
    this.data = [];
  }

  async getData(table, filteredColumn, filteredValue) {
    try {
      let { data, error } = await supabase
        .from(table)
        .select("*")
        .eq(filteredColumn, filteredValue);
      if (data) {
        return data;
      } else {
        throw new Error(`Error retrieving data: ${error}`);
      }
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async getAllData(table) {
    try {
      let { data, error } = await supabase.from(table).select("*");
      if (data) {
        return data;
      } else {
        throw new Error(`Error retrieving data: ${error}`);
      }
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async addData(table, dataToAdd) {
    try {
      const { data, error } = await supabase
        .from(table)
        .insert({
          created_at: new Date(),
          updated_at: new Date(),
          ...dataToAdd,
        })
        .select();

      if (data) {
        this.data = data;
      } else {
        throw new Error(`Error adding data: ${error}`);
      }
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async updateData(table, filteredColumn, filteredValue, dataToUpdate) {
    try {
      const { data, error } = await supabase
        .from(table)
        .update(dataToUpdate)
        .eq(filteredColumn, filteredValue)
        .select();

      if (data) {
        this.data = data;
      } else {
        throw new Error(`Error updating data: ${error}`);
      }
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async deleteData(table, filteredColumn, filteredValue) {
    try {
      const { error } = await supabase
        .from(table)
        .delete()
        .eq(filteredColumn, filteredValue);
      if (error) {
        throw new Error(`Error deleting data: ${error}`);
      }
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}
