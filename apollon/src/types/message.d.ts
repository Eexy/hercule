interface Message{
  id: string;
  content: string;
  channelId: string;
  senderId: string;
}

interface MessagesResponse{
  data : {
    ok: boolean;
    messages: Message[];
  }
}