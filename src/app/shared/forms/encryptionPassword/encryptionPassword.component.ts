import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'encryption-password-form',
  templateUrl: './encryptionPassword.component.html',
  styleUrls: ['./encryptionPassword.component.scss']
})

export class EncryptionPasswordComponent
{
	constructor(){ }

	@Output() encryptionPasswordEvent = new EventEmitter<string>();

	public submitedForm : boolean = false;
	public encryptionPassword : string;

	decryptDoc(formObj)
	{
	    this.encryptionPassword = formObj.form.value.encryptionPassword;

	    if(formObj.valid)
	    {
	    	this.encryptionPasswordEvent.emit(this.encryptionPassword);
	    }
	}
}