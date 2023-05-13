import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://gakcjsckvluxinnhfxye.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imdha2Nqc2Nrdmx1eGlubmhmeHllIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODAzODkzNjMsImV4cCI6MTk5NTk2NTM2M30.AT51-h7EB7Q5HrI1CjnNpPrzDRU0jnJ9jsTEsyXDqio"; //process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
