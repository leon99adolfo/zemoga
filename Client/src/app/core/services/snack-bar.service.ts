import { SnackBarMessageModel } from '../models/snack-bar-message.model';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SnackBarService {

  private _message: SnackBarMessageModel;
  
  public get get(): SnackBarMessageModel {
    return this._message;
  }
  public set set(value: SnackBarMessageModel) {
    this._message = value;
  }

}
