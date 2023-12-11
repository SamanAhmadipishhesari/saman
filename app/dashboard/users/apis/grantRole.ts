import { Api } from "@/app/infrastructure/api";

async function grantRole(userId: string, role: string): Promise<void> {
  var api = new Api();

  const data: DenyRole = {
    role: role,
  };
  var response = await api.PUT(`Users/${userId}/GrantRole`, data);
  return response.data;
}

export default grantRole;
