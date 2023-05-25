export class Auth {
  static get properties() {
    return {
      user: { type: String },
    };
  }

  constructor() {
    this.user = null;
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
            email: signUpData.email,
            role: signUpData.role,
            phone: signUpData.phone,
          },
        },
      });

      if (data) {
        this.user = data.user;
        return data;
      } else {
        throw new Error("error", error);
      }
    } catch (error) {
      console.log(error);
    }
  };
}
