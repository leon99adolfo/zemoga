import { SnackBarMessageModel } from '../../models/snack-bar-message.model';
import { SnackBarService } from '../../services/snack-bar.service';
import { Component, OnInit } from '@angular/core';

@Component({
    // tslint:disable-next-line:component-selector
    selector: 'snack-bar-message',
    templateUrl: './snack-bar-message.component.html',
    styleUrls: ['./snack-bar-message.component.scss'],
})
export class SnackBarMessageComponent implements OnInit {
    message: SnackBarMessageModel;

    constructor(private snackBarService: SnackBarService) {
        this.message = snackBarService.get;
    }

    ngOnInit() {
    }

}
