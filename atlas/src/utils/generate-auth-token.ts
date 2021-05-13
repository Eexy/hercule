import jwt from 'jsonwebtoken';

const generateAuthToken = (id: string): string => {
  const payload = {
    id,
    date: Date.now(),
  };

  const token: string = jwt.sign(payload, process.env.JWT_KEY!, {
    algorithm: 'HS256',
  });

  return token;
};

export default generateAuthToken;
