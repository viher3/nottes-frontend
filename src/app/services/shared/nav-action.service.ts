import { Injectable, EventEmitter } from '@angular/core';

@Injectable()
export class NavActionService
{
  private action : string = "init";
  public  navActionEmitter$ : EventEmitter<any>;

  constructor() 
  {
    this.navActionEmitter$ = new EventEmitter();
  }

  /**
   * Set action value
   *
   * @param   String  action  Action value
   * @return  [type]   void
   */
  setAction(action : string) : void
  {
    this.action = action;
    this.navActionEmitter$.emit(action);
  }

  /**
   * Get action value
   *
   * @return  String    this.action   Action value
   */
  getAction() : string
  {
    return this.action;
  }
}
