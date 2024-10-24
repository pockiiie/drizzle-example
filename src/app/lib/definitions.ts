export type User = {
  id: number,
  name: string,
  age: number,
  email: string,
  password: string,
  confirmPassword: string,
};

export type UserCreate = Omit<User, 'id'>;

export type UserUpdate = Omit<User, 'password' | 'confirmPassword'>

export type UserGet = Omit<User, 'password' | 'confirmPassword'>

export type SideNavMenu = {
  name: string,
  link: string,
  icon?: string,
}