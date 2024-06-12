import {create} from 'zustand';

type StateProps = {
  token: string | null;
  setToken: (token: string | null) => void;
};

const useAuth = create<StateProps>(set => ({
  token: '' || null,
  setToken: (token: string | null) => {
    set({token});
  },
}));

export default useAuth;
