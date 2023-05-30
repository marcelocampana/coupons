import SupabaseClient from "./SupabaseClient";

class Profiles extends SupabaseClient {
  constructor(dbConnection) {
    super(dbConnection);
    this.tableName = "profiles";
    this.columnId = "profile_id";
  }
}

export default Profiles;
