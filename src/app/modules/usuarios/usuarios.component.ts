import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import {
    ModalDismissReasons,
    NgbModal,
    NgbModalOptions,
    NgbModalRef,
} from '@ng-bootstrap/ng-bootstrap';
import { Observable, Subject, merge, switchMap, tap } from 'rxjs';
import { IData } from 'src/app/interfaces/data.interface';
import { IUsuario } from 'src/app/interfaces/usuario.interface';
import { DataService } from 'src/app/services/data.service';
import { FormUsuarioComponent } from 'src/app/shared/components/form-usuario/form-usuario.component';

@Component({
    selector: 'app-usuarios',
    templateUrl: './usuarios.component.html',
    styleUrls: ['./usuarios.component.scss'],
})
export class UsuariosComponent {
    data$!: Observable<IData>;
    dataInit$!: Observable<IData>;
    dataUpdate$!: Observable<IData>;

    subjectUpdate: Subject<any> = new Subject<any>();

    form!: FormGroup;

    modalOptions: NgbModalOptions = {
        ariaLabelledBy: 'modal-basic-title',
        size: 'lg',
        centered: true,
        backdrop: 'static',
    };

    constructor(
        private fb: FormBuilder,
        private modalService: NgbModal,
        private dataService: DataService
    ) {
        this.dataInit$ = this.dataService.list({}).pipe();
        this.dataUpdate$ = this.subjectUpdate.asObservable().pipe(
            switchMap(() => {
                return this.dataService.list({}).pipe();
            })
        );
        this.data$ = merge(this.dataInit$, this.dataUpdate$).pipe(tap(console.log));

        this.form = this.fb.group({
            nomeEmail: [null],
            filtro: [null],
        });

        this.form.valueChanges.subscribe((values) => {
            console.log(values);
        });
    }

    onAdd() {
        const modalRef: NgbModalRef = this.modalService.open(
            FormUsuarioComponent,
            this.modalOptions
        );
        modalRef.result.then(
            (result) => {
                console.log('result: ', result);
            },
            (reason) => {
                if (reason) {
                    console.log('reason: ', this.getDismissReason(reason));
                    this.subjectUpdate.next({});
                }
            }
        );
    }

    onEditar(usuario: IUsuario) {
        const modalRef: NgbModalRef = this.modalService.open(
            FormUsuarioComponent,
            this.modalOptions
        );
        modalRef.componentInstance.data = usuario;
        modalRef.result.then(
            (result) => {
                console.log('result: ', result);
            },
            (reason) => {
                if (reason) {
                    console.log('reason: ', this.getDismissReason(reason));
                    this.subjectUpdate.next({});
                }
            }
        );
    }

    onExcluir() {

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
