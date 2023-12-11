import { Api } from "@/app/infrastructure/api";

async function changePassword(
  userId: string,
  param: ChangePassword
): Promise<void> {
  var api = new Api();

  var response = await api.PUT(`Users/${userId}/ChangePassword`, param);
  return response.data;
}

export default changePassword;
