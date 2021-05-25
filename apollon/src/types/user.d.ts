interface User {
  name: string;
  id: number;
  avatar: string;
}

interface UserResponse {
  data: {
    ok: boolean;
    err?: string;
    user: User;
  };
}
