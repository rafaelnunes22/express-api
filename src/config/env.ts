import "dotenv/config";

const jwtSecret = process.env.SECRET_KEY;

if (!jwtSecret) {
  throw new Error("SECRET_KEY não configurada.");
}

export const env = {
  JWT_SECRET: jwtSecret,
  PORT: Number(process.env.PORT || 3000),
};
