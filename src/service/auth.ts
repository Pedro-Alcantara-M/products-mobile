import {api} from '../config/api';

interface ILoginResp {
  data: any | null;
  status: number | null;
}

interface ILoginProps {
  email?: string;
  password?: string;
}

export const execLogin = async (props: ILoginProps): Promise<ILoginResp> => {
  const resp: ILoginResp = {
    data: null,
    status: null,
  };

  try {
    const preResp = await api.post('/auth/login', props);
    resp.data = preResp.data;
    resp.status = preResp.status;
  } catch (err: any) {
    console.error('Error occurred during login request:', err);

    if (err.response) {
      console.log('Error response data:', err.response.data);
      resp.data = err.response.data;
      resp.status = err.response.status;
    } else {
      resp.data = {message: err.message};
      resp.status = 500;
    }
  }

  return resp;
};

export const signup = async (props?: ILoginProps): Promise<ILoginResp> => {
  const resp: ILoginResp = {
    data: null,
    status: null,
  };

  try {
    const preResp = await api.post('/auth/signup', props);
    resp.data = preResp.data;
    resp.status = preResp.status;
  } catch (err: any) {
    console.error('Error occurred during signup request:', err);

    if (err.response) {
      console.log('Error response data:', err.response.data);
      resp.data = err.response.data;
      resp.status = err.response.status;
    } else {
      resp.data = {message: err.message};
      resp.status = 500;
    }
  }

  return resp;
};
