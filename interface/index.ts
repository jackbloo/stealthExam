export type InitialStateType = {
  isLogin: null | boolean;
  registered: UserType[];
  tempUser: UserType;
};

export type UserType = {
  password: string;
  email: string;
};

export type RegisterPageProps = {
  navigate: any;
};

export type CountdownProps = {
  countdown: number;
  setCountdown: (countdown: number) => void;
};
