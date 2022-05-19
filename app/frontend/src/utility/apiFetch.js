/* eslint-disable no-undef */
export default class ApiFetch {
  constructor() {
    this.loginFetch = this.loginFetch.bind(this);
  }

  loginFetch = async (payload) => {
    const { user, password } = payload;
    const fetchOption = {
      method: 'POST',
      body: JSON.stringify({
        user,
        password,
      }),
      headers: {
        'Content-type': 'application/json',
      },
    };

    const responseLogin = await fetch(
      `http://localhost:${process.env.REACT_APP_BACKEND_PORT || '3001'}/login`,
      fetchOption,
    );
    const parseResponse = await responseLogin.json();

    return parseResponse;
  };

  tasksFetch = async () => {
    const token = localStorage.getItem('userToken');
    const fetchOption = {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
        Authorization: token,
      },
    };

    const responseGetTasks = await fetch(
      `https://localhost:${process.env.REACT_APP_BACKEND_PORT || '3001'}/tasks`,
      fetchOption,
    );
    const parseResponse = await responseGetTasks.json();
    console.log(parseResponse);

    return parseResponse;
  };
}
