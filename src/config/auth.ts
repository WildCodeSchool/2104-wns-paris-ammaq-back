import jwt from 'jsonwebtoken';

const jwtKey = process.env.JWT_KEY as string;
const handleContext = ({ req }) => {
  const token = req.headers.authorization;
  if (token) {
    let payload;
    try {
      payload = jwt.verify(token, jwtKey);
      return { authenticatedUserEmail: payload.user };
    } catch (err) {}
  }
};

export default handleContext;
