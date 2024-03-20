import { Component, ElementRef, ViewChild } from '@angular/core';
import { IModalChild } from 'src/app/interfaces/modal-child.interface';
import { ModalService } from 'src/app/services/modal.service';

@Component({
    selector: 'app-modal',
    templateUrl: './modal.component.html',
    styleUrls: ['./modal.component.scss']
})
export class ModalComponent {

    @ViewChild('modal', { static: true }) modal!: ElementRef;

    child!: IModalChild;

    constructor(private modalService: ModalService) {
        this.modalService.changes().subscribe((child) => {
            if (child) {
                this.child = child;
            }
            this.modal.nativeElement.click();
        });
    }
}
