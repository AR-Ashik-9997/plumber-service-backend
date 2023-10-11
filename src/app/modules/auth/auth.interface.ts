export type IRefreshTokenResponse = {
  accessToken: string;
};

export type ILoginUser = {
  email: string;
  password: string;
};

export type IUserLoginResponse = {
  token: string;
  refreshToken?: string;
};
