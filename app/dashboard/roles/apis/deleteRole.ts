import { Api } from '@/app/infrastructure/api';

async function deleteRole(role: string): Promise<void> {
  var api = new Api();
  var response = await api.DELETE(`Roles/${role}`);
  return response.data;
}

export default deleteRole;