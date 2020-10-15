import { getRepository } from 'typeorm';
import User from '../models/User';

interface Request {
  name: string;
  CPF: string;
  email: string;
  password: string;
}

class CreateUserService {
  public async execute ({name, CPF, email, password}: Request): Promise<User> {
    const userRepository = getRepository(User);

    const checkUser = await userRepository.findOne({ where: {
      CPF
    }})

    if(checkUser){
      throw Error('User already exists');
    }

    const generatedAccountNumber = Math.floor( Math.random() * (99999 - 10000)) + 10000;
    const accountDigit = Math.floor(Math.random() * 10);

    const user = userRepository.create({
      account_number: generatedAccountNumber.toString() + '-' + accountDigit.toString() ,
      name,
      CPF,
      email,
      password
    });

    await userRepository.save(user);

    return user;
  }
}

export default CreateUserService