import { promises as fs } from "fs";
import path from "path";
import bcrypt from "bcryptjs";

interface User {
  id: number;
  username: string;
  password: string;
}

// Store users.txt in the project root
const fileName = path.join(process.cwd(), "users.txt");

const getUsersFromFile = async (): Promise<User[]> => {
  try {
    const data = await fs.readFile(fileName, "utf-8");
    return data ? JSON.parse(data) : [];
  } catch (err) {
    // If file doesn't exist, return empty list
    return [];
  }
};

const findByUsername = async (username: string): Promise<User | null> => {
  const users = await getUsersFromFile();
  return users.find((u) => u.username === username) || null;
};

const createUser = async (
  username: string,
  plainPassword: string,
): Promise<User> => {
  const users = await getUsersFromFile();
  const hashedPassword = await bcrypt.hash(plainPassword, 10);

  const newUser: User = {
    id: users.reduce((maxId, u) => (u.id > maxId ? u.id : maxId), 0) + 1,
    username,
    password: hashedPassword,
  };

  users.push(newUser);
  await fs.writeFile(fileName, JSON.stringify(users, null, 2));
  return newUser;
};

export default {
  findByUsername,
  createUser,
};
