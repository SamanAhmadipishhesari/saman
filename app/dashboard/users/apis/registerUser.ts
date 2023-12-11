import { Api } from "@/app/infrastructure/api";

async function registerUser(
  userName: string,
  password: string,
  description: string,
  firstName: string,
  lastName: string,
  roles: string[]
): Promise<void> {
  var api = new Api();
  const data: NewUser = {
    userName: userName,
    password: password,
    description: description,
    firstName: firstName,
    lastName: lastName,
    roles: roles,
  };
  var response = await api.POST("Users", data);
  return response.data;
}

export default registerUser;
