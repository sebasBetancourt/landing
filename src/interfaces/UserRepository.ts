import { User } from "./User";

export interface UserRepository {
  getUserById(id: string): Promise<User | null>;
  saveUser(user: User): Promise<void>;
}
