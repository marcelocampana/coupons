import supabase from "./supabase";

export class ApiManager {
  static get properties() {
    return { data: [] };
  }

  static async getData(table, filteredColumn, filteredValue) {
    try {
      let { data, error } = await supabase
        .from(table)
        .select("*")
        .eq(filteredColumn, filteredValue);
      if (data) {
        this.data = data;
      } else {
        console.log(error);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async getAllData(table) {
    try {
      let { data, error } = await supabase.from(table).select("*");

      if (data) {
        this.data = data;
      } else {
        console.log(error);
      }
    } catch (error) {
      console.log(error);
    }
  }

  static async addData(table, dataToAdd) {
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
        console.log(error);
      }
    } catch (error) {
      console.log(error);
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
        console.log(error);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async deleteData(table, filteredColumn, filteredValue) {
    try {
      const { error } = await supabase
        .from(table)
        .delete()
        .eq(filteredColumn, filteredValue);
    } catch (error) {
      console.log(error);
    }
  }
}
