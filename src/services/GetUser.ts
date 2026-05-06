import { User } from "@/interfaces/User";
import { UserRepository } from "@/interfaces/UserRepository";

export class GetUser {
  constructor(private userRepository: UserRepository) {}

  async execute(id: string): Promise<User | null> {
    return this.userRepository.getUserById(id);
  }
}
