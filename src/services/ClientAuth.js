class ClientAuth {
  async signInWithPassword(email, password, clientConnection) {
    const { data, error } = await clientConnection.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      throw new Error(error.message);
    }
    return data;
  }

  async getSession(clientConnection) {
    const { data: session, error } = await clientConnection.auth.getSession();
    if (error) {
      throw new Error(error.message);
    }
    return session;
  }

  async signUp(
    firstname,
    lastname,
    email,
    password,
    phone,
    role,
    terms,
    clientConnection
  ) {
    const { data, error } = await clientConnection.auth.signUp({
      email,
      password,
      options: {
        data: {
          firstname,
          lastname,
          email,
          role: role === "business-admin" ? role : "end-user",
          phone,
          terms,
        },
      },
    });
    if (error) {
      throw new Error(error.message);
    }
    return data;
  }
}

export default ClientAuth;
