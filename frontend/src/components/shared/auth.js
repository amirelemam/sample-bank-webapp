import { Auth } from 'aws-amplify';

export const isAuthenticated = async () => {
  try {
    const accessToken = await (await Auth.currentSession())
      .getIdToken()
      .getJwtToken();

    return !!accessToken;
  } catch (error) {
    return false;
  }
};

export const getAccessToken = async () => {
  try {
    const accessToken = await (await Auth.currentSession())
      .getIdToken()
      .getJwtToken();

    return accessToken;
  } catch (error) {
    return null;
  }
};
