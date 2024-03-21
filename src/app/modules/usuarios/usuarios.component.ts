import { Component, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import {
    ModalDismissReasons,
    NgbModal,
    NgbModalOptions,
    NgbModalRef,
} from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { IData } from 'src/app/interfaces/data.interface';
import { FormUsuarioComponent } from 'src/app/shared/components/form-usuario/form-usuario.component';
import { loadData } from 'src/app/store/data.actions';
import { getData } from 'src/app/store/data.selector';

@Component({
    selector: 'app-usuarios',
    templateUrl: './usuarios.component.html',
    styleUrls: ['./usuarios.component.scss'],
})
export class UsuariosComponent {
    data$!: Observable<IData>;
    form!: FormGroup;

    constructor(
        private fb: FormBuilder,
        private modalService: NgbModal,
        private store: Store<{ data: any }>
    ) {
        this.data$ = this.store.select(getData);

        this.form = this.fb.group({
            nomeEmail: [null],
            filtro: [null],
        });

        this.form.valueChanges.subscribe((values) => {
            console.log(values);
        });

        // todo
        this.store.dispatch(loadData({ filtro: { nomeEmail: '', filtro: '' } }));

        setTimeout(() => {
            this.usuarioAdd();
        }, 100);
    }

    protected usuarioAdd() {
        const options: NgbModalOptions = {
            ariaLabelledBy: 'modal-basic-title',
            size: 'lg',
            centered: true,
            backdrop: 'static',
        };
        const modalRef: NgbModalRef = this.modalService.open(
            FormUsuarioComponent,
            options
        );
        modalRef.componentInstance.isEdit = false;
        modalRef.result.then(
            (result) => {
                console.log('result: ', result);
            },
            (reason) => {
                console.log('reason: ', this.getDismissReason(reason));
            }
        );
    }

    private getDismissReason(reason: any): string {
        switch (reason) {
            case ModalDismissReasons.ESC:
                return 'by pressing ESC';
            case ModalDismissReasons.BACKDROP_CLICK:
                return 'by clicking on a backdrop';
            default:
                return reason;
        }
    }
}
