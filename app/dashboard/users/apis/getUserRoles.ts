import { Api } from "@/app/infrastructure/api";

async function getUserRoles(id: string): Promise<string[]> {
  var api = new Api();
  var data = await api.GET<string[]>(`users/${id}/Roles`);
  return data;
}

export default getUserRoles;
