import { Api } from "@/app/infrastructure/api";

async function getUsers(param: UserFilter): Promise<User[]> {
  var api = new Api();
  var url = new URLSearchParams();
  url.append("term", param.term);
  if (param.isActive != null) url.append("isActive", param.isActive.toString());

  var data = await api.GET<User[]>("Users?" + url.toString());
  // setModel(User , data)
  return data;
}

export default getUsers;
