import axios from 'axios';

export const logout = () => {
  localStorage.setItem('access-token', '');
  localStorage.setItem('branch', '');
  localStorage.setItem('account', '');
};

export const isAuthenticated = async () => {
  try {
    const accessToken = localStorage.getItem('access-token');

    const url = `${process.env.REACT_APP_ACCOUNT_MANAGER_API}/auth/verify`;

    const response = await axios.post(url, {}, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (response.status === 200) return true;

    await logout();
    return false;
  } catch (error) {
    await logout();
    return false;
  }
};

export const login = async (branch, account, password) => {
  try {
    const url = `${process.env.REACT_APP_ACCOUNT_MANAGER_API}/auth/login`;

    const body = {
      branch,
      account,
      password,
    };

    const response = await axios.post(url, body);

    const accessToken = response.data['access-token'];
    if (accessToken) {
      localStorage.setItem('access-token', accessToken);
      localStorage.setItem('branch', branch);
      localStorage.setItem('account', account);
      return true;
    }
    return false;
  } catch (error) {
    return false;
  }
};
