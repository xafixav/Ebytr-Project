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
      `http://localhost:${process.env.REACT_APP_BACKEND_PORT || '3001'}/tasks`,
      fetchOption,
    );
    const parseResponse = await responseGetTasks.json();

    return parseResponse;
  };

  taskPost = async (payload) => {
    const token = localStorage.getItem('userToken');
    const { task, status } = payload;
    if (!task) {
      return;
    }
    const fetchOption = {
      method: 'POST',
      body: JSON.stringify({
        task,
        status,
      }),
      headers: {
        'Content-type': 'application/json',
        Authorization: token,
      },
    };

    const responseLogin = await fetch(
      `http://localhost:${process.env.REACT_APP_BACKEND_PORT || '3001'}/tasks`,
      fetchOption,
    );
    const parseResponse = await responseLogin.json();

    return parseResponse;
  };

  taskPut = async (payload) => {
    const token = localStorage.getItem('userToken');
    const { task, status, id } = payload;
    const fetchOption = {
      method: 'PUT',
      body: JSON.stringify({
        task,
        status,
        id,
      }),
      headers: {
        'Content-type': 'application/json',
        Authorization: token,
      },
    };

    const responseLogin = await fetch(
      `http://localhost:${process.env.REACT_APP_BACKEND_PORT || '3001'}/tasks`,
      fetchOption,
    );
    const parseResponse = await responseLogin.json();

    return parseResponse;
  };
}
