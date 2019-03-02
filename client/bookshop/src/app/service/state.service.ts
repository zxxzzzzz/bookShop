import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StateService {


  userId = 1;
  name = '';
  mail = '';
  password = '';
  role = 1; // 1=normal 0=admin


  constructor() { }
}
