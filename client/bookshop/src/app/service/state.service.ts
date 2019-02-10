import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StateService {


  userId = 1;
  name = '';
  mail = '';
  password = '';


  constructor() { }
}
