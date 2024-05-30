import { client } from "../utils/services/fetchClient";

export const authorise = (tgUsername, tgId, invitation_code) => {
  return client.post('/authorize', {telegram_id:tgId, username:tgUsername, invitation_code : invitation_code});
};
