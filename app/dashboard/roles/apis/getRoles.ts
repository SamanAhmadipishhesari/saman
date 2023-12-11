import { Api } from '@/app/infrastructure/api';
import React from 'react'

async function getRoles(): Promise<Role[]> {
  var api = new Api();
  var data = await api.GET<Role[]>(`roles`);
  return data;
}

export default getRoles;