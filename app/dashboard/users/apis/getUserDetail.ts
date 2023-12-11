import { Api } from "@/app/infrastructure/api";

async function getUserDetail(id: string): Promise<UserDetail> {
  var api = new Api();
  var data = await api.GET<UserDetail>(`users/${id}/Info`);
  return data;
}

export default getUserDetail;
