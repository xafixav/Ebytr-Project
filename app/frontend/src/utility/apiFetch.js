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

    const response = await fetch(
      `https://localhost:${process.env.REACT_APP_BACKEND_PORT || '3001'}/login`,
      fetchOption,
    ).catch((error) => {
      if (error) {
        return 'Failed to fetch';
      }
    });

    return response !== 'Failed to fetch';
  };
}
