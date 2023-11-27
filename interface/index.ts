export type InitialStateType = {
  isLogin: null | boolean;
  registered: UserType[];
};

export type UserType = {
  password: string;
  email: string;
};

export type RegisterPageProps = {
  navigate: any;
};
