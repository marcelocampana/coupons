export class Auth {
  static properties = {
    user: String,
  };

  user = null;

  signIn = async (body) => {
    const response = await fetch("/api/v1/auth/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    const result = await response.json();
    console.log(result);
    return result;
  };

  signUp = async (body) => {
    const response = await fetch("/api/v1/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    const result = await response.json();
    console.log(result);
    return result;
  };

  passwordRecovery = async (body) => {
    const response = await fetch("/api/v1/auth/password-recovery", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    const result = await response.json();
    console.log(result);
    return result;
  };

  passwordReset = async (body) => {
    const response = await fetch("/api/v1/auth/password-reset", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    const result = await response.json();
    console.log(result);
    return result;
  };
}
