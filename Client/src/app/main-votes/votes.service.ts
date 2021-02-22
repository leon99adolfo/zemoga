import { Injectable } from '@angular/core';
import { ApiService } from 'app/core/services/api.services';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VotesService {
  
  // variables
  private readonly URL = 'api/vote';

  // Constructor  
  constructor(
    private _apiService: ApiService,
  ) { }

  // Methods
  newVote(objBody): Observable<any> {
    return this._apiService.apiPost(`${this.URL}/newVote`, objBody);
  }

}
