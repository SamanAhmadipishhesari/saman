import { Api } from "@/app/infrastructure/api";
import { ExitStatus } from "typescript";

async function changeStatus(userId: string, status: boolean): Promise<void> {
  var api = new Api();

  const data = {
    status: status,
  };
  var response = await api.PUT(`Users/${userId}/Status`, data);
  return response.data;
}

export default changeStatus;
