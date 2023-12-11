import { Api } from '@/app/infrastructure/api';

async function addRole(role: string): Promise<void> {
  var api = new Api();

  const data: AddRole = {
    name: role,
  };
  var response = await api.POST(`Roles`, data);
  return response.data;
}

export default addRole;