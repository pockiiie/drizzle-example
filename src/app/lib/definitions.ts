export type User = {
  id: number,
  name: string,
  age: number,
  email: string,
  password: string,
};

export type UserForm = {
  id: number,
  name: string,
  age: number,
  email: string,
  password: string,
  confirmPassword: string,
}

export type SideNavMenu = {
  name: string,
  link: string,
  icon?: string,
}