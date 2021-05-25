interface Message {
  id: string;
  content: string;
  channelId: string;
  user: User;
}

interface MessageResponse {
  data: {
    ok: boolean;
    message: Message;
    err?: string;
  };
}

interface MessagesResponse {
  data: {
    ok: boolean;
    messages: Message[];
    err?: string;
  };
}
