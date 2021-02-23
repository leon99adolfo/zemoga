import { Service } from 'typedi';
import { isBuffer } from 'util';
import { IUser } from '../interfaces/IUser';

@Service()
export default class UserService {
  
  // variables
  private users: IUser[] = [];

  constructor(){
    let defaultUser: any = {};
    defaultUser.user = "aleoncm";
    defaultUser.pwd = "12345";
    this.users.push(defaultUser);
  }

  public getUsers(): IUser[] {
    return this.users;
  }

  public getUserByUsername(user: any) {
    let objUser = this.users.find(u => u.user == user);
    return objUser;
  }

  public getUserBylogin(pUser: string, pPwd: string): IUser {
    let objUser = this.users.find(u => u.user == pUser);
    if(objUser) {
      if(objUser.pwd == pPwd) return objUser;
      else throw new Error(`The pwd is wrong`);
    }
    else {
      throw new Error(`The "${pUser}" user doesn't exist`);
    }
  }

  public addUser(pUser: IUser): IUser {
    let result: IUser = null;
    if(pUser){
      if(pUser.user && pUser.user.length > 4) {
        let objUser = this.users.find(u => u.user == pUser.user);
        if(objUser) throw new Error(`The "${pUser}" user is already in the system`);
        else if(!(pUser.pwd && pUser.pwd.length > 4)) throw new Error(`The pwd must have at least 5 characters.`);
        else this.users.push(pUser);
        result = pUser;
      }
      else {
        throw new Error(`The user must have at least 5 characters.`);
      }
    }
    return result;
  }

  public updUser(pUser: IUser): IUser {
    let result: IUser = null;
    if(pUser){
      if(pUser.user && pUser.user.length > 4) {
        let objUser = this.users.find(u => u.user == pUser.user);
        if(objUser){
          if(!(pUser.pwd && pUser.pwd.length > 4)) throw new Error(`The pwd must have at least 5 characters.`);

          objUser.user = pUser.user;
          objUser.pwd = pUser.pwd;
          objUser.age = pUser.age;
          objUser.marriageStatus = pUser.marriageStatus;

          result = objUser;
        }
      }
      else {
        throw new Error(`The user must have at least 5 characters.`);
      }
    }
    return result;
  }

  delUser(userId: any) {
    let objUser = this.users.find(u => u.user == userId);
    if(objUser) this.users = this.users.filter(u => u.user != userId);
    else throw new Error(`The ${userId} user doesn't exist.`);
  }
  
}