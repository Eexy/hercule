import axios from 'axios';

const getMessages = async (
  channelId: string,
  token: string
): Promise<Message[] | null> => {
  try {
    const { data }: MessagesResponse = await axios.get(
      `/api/channel/${channelId}/messages`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (data.ok === false) {
      throw new Error();
    }

    const messages: Message[] = [...data.messages];
    return messages;
  } catch (e) {
    return null;
  }
};

export default getMessages;
