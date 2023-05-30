import SupabaseClient from "./SupabaseClient";

class BusinessAdmissionRequest extends SupabaseClient {
  constructor(dbConnection) {
    super(dbConnection);
    this.tableName = "business_admission_requests";
    this.columnId = "business_admission_request_id";
  }
}

export default BusinessAdmissionRequest;
