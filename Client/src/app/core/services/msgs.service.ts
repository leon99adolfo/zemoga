import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { SnackBarService } from './snack-bar.service';
import { SnackBarMessageModel } from '../models/snack-bar-message.model';
import { SnackBarMessageComponent } from '../components/snack-bar-message/snack-bar-message.component';
import { ErrorResponse } from '../models/error-response.model';
import { ComponentType } from '@angular/cdk/portal';


@Injectable({
    providedIn: 'root'
})
export class MsgsService {

    private snackBarList: any[] = [];
    private isProcSnackBarList: boolean = false;

    constructor(
        private _snackBarService: SnackBarService,
        public _snackBar: MatSnackBar,
    ) { }

    callSnackBar(comp: ComponentType<any>, config?: MatSnackBarConfig<any>, objSnackBarMessageModel?: SnackBarMessageModel){
        if(objSnackBarMessageModel){
            let objSb = this.snackBarList.find(sbl =>   sbl.objSnackBarMessageModel && 
                                                        sbl.objSnackBarMessageModel.icon == objSnackBarMessageModel.icon && 
                                                        sbl.objSnackBarMessageModel.text == objSnackBarMessageModel.text);
            if(!objSb) this.snackBarList.push({comp : comp, config: config, objSnackBarMessageModel: objSnackBarMessageModel});
        }
        else {
            this.snackBarList.push({comp : comp, config: config, objSnackBarMessageModel: objSnackBarMessageModel});
        }
        this.recursiveSnackBar();
    }

    private recursiveSnackBar() {
        if (!this.isProcSnackBarList) {
            if (this.snackBarList && this.snackBarList.length > 0) {
                let objSnackMsg = this.snackBarList.shift();
                this.isProcSnackBarList = true;
                let msgTime = objSnackMsg.config && objSnackMsg.config.duration ? objSnackMsg.config.duration : 5000;
                if(objSnackMsg.objSnackBarMessageModel) this._snackBarService.set = objSnackMsg.objSnackBarMessageModel;
                this._snackBar.openFromComponent(objSnackMsg.comp, objSnackMsg.config);
                setTimeout(() => {
                    this.isProcSnackBarList = false;
                    this.recursiveSnackBar();
                }, msgTime);
            }
        }
    }

    showError(msg: string) {
        const objMessageError: SnackBarMessageModel = { text: msg, icon: 'error' };
        this.callSnackBar(SnackBarMessageComponent, {
            duration: 4000,
            panelClass: ['warn-bg']
        }, objMessageError);
    }

    showErrorResp(error: any) {
        let msgError: string = "";
        if ((typeof error) == "string") {
            msgError = (<ErrorResponse>JSON.parse(error)).error;
        } else if(error.errors) {
            if((typeof error.errors) == "string") msgError = error.errors;
            else msgError = error.errors.message;
        } else {
            msgError = "The service found an error";
        }
        this.showError(msgError);
    }

    showInfo(msg: string) {
        const objMessageSuccess: SnackBarMessageModel = { text: msg, icon: 'info' };
        this.callSnackBar(SnackBarMessageComponent, {
            duration: 4000,
            panelClass: ['amber-bg']
        }, objMessageSuccess);
    }

    showSuccess(msg: string) {
        const objMessageSuccess: SnackBarMessageModel = { text: msg, icon: 'check_circle' };
        this.callSnackBar(SnackBarMessageComponent, {
            duration: 4000,
            panelClass: ['blue-bg']
        }, objMessageSuccess);
    }

    openSnackBar(message: string, status: any) {
        switch (status.description) {
            case 'Error':
                this.showError(message);
                break;

            case 'Success':
                this.showSuccess(message);
                break;
        }
    }

}
