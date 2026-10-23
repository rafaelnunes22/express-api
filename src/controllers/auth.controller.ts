import type { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { users_db } from "../db/mockDB.ts";
import { env } from "../config/env.ts";

export async function register(req: Request, res: Response) {
  const { email, password } = req.body;

  const userAlreadyExists = users_db.find((user: any) => user?.email === email);

  if (userAlreadyExists)
    return res.status(409).send("User already registered!");

  const normalizedEmail = email.trim().toLowerCase();

  const passwordHash = await bcrypt.hash(password, 12);

  const user = {
    id: String(users_db.length + 1),
    email: normalizedEmail,
    passwordHash,
  };

  users_db.push(user);

  return res.status(201).json({
    message: "Usuário cadastrado",
  });
}

export async function login(req: Request, res: Response) {
  const { email, password } = req.body;

  const user = users_db.find(
    (user: any) => user.email === email.trim().toLowerCase(),
  );

  if (!user) {
    return res.status(401).send("Usuário não existe.");
  }

  const validPassword = await bcrypt.compare(password, user.passwordHash);

  if (!validPassword) {
    return res.status(401).send("Credenciais inválidas.");
  }

  const token = jwt.sign({ user: JSON.stringify(user) }, env.JWT_SECRET, {
    expiresIn: "2m",
  });

  return res.status(200).json({ token });
}
