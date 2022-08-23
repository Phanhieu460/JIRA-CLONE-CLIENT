

const loginAction = (username, password) => {
  return {
    type: "LOGIN",
    userLogin: {
      username: username,
      password: password,
    },
  };
};

export default loginAction;
