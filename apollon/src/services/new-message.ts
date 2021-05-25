import axios from 'axios';

const newMessage = async (
  message: string,
  channelId: string,
  token: string
): Promise<Message | null> => {
  try {
    const { data }: MessageResponse = await axios.post(
      `/api/channel/${channelId}/message`,
      {
        message,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (data.err) {
      throw new Error();
    }

    return data.message;
  } catch (e) {
    return null;
  }
};

export default newMessage;
