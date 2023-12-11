import { Api } from "@/app/infrastructure/api";

async function denyRole(userId: string, role: string): Promise<void> {
  var api = new Api();

  const data: DenyRole = {
    role: role,
  };
  var response = await api.PUT(`Users/${userId}/DenyRole`, data);
  return response.data;
}

export default denyRole;
