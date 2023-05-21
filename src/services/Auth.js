export class Auth {
  static get properties() {
    return {
      user: { type: String },
      success: { type: Boolean },
    };
  }

  constructor() {
    this.user = null;
    this.success = false;
  }

  signUp = async (signUpData, supabase) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email: signUpData.email,
        password: signUpData.password,
        options: {
          data: {
            firstname: signUpData.firstname,
            lastname: signUpData.lastname,
            role: signUpData.role,
          },
        },
      });

      if (data) {
        this.success = true;
        this.user = data.user;
        console.log(this.user);
        return data;
      } else {
        console.log("error", error);
      }
    } catch (error) {
      console.log(error);
    }
  };
}
