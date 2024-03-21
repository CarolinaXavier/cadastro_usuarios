import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import {
    FormBuilder,
    FormGroup,
    Validators,
} from '@angular/forms';
import {
    ModalDismissReasons,
    NgbModal,
    NgbModalOptions,
    NgbModalRef,
} from '@ng-bootstrap/ng-bootstrap';
import {
    Observable,
    Subject,
    debounceTime,
    distinctUntilChanged,
    merge,
    switchMap,
    tap,
} from 'rxjs';
import { CustomValidators } from 'src/app/form-validators/custom.validator';
import { IPaginacao } from 'src/app/interfaces/paginacao.interface';
import { IUsuario } from 'src/app/interfaces/usuario.interface';
import { DataService } from 'src/app/services/data.service';
import { ConfirmaAcaoComponent } from 'src/app/shared/components/confirma-acao/confirma-acao.component';
import { FormUsuarioComponent } from 'src/app/shared/components/form-usuario/form-usuario.component';
import { filtrarArrayMultiKeyFunction } from 'src/app/utils/filtrar-array-multi-key-.function';

import { obterPaginado } from 'src/app/utils/obter-paginado.function';
import { removeAcentuacao } from 'src/app/utils/remove-acentuacao.function';

@Component({
    selector: 'app-usuarios',
    templateUrl: './usuarios.component.html',
    styleUrls: ['./usuarios.component.scss'],
})
export class UsuariosComponent {
    data$!: Observable<IUsuario[]>;
    dataInit$!: Observable<IUsuario[]>;
    dataUpdate$!: Observable<IUsuario[]>;

    subjectUpdate: Subject<any> = new Subject<any>();

    form!: FormGroup;

    paginacao!: IPaginacao;
    private data!: any;

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

        this.data$ = merge(this.dataInit$, this.dataUpdate$).pipe(
            tap((data) => {
                this.data = data;
                this.carregarPaginacao(1, 10);
            })
        );

        this.form = this.fb.group({
            nome: ['', [Validators.required, CustomValidators.notEmpty]],
            status: ['', [Validators.required]],
        });

        this.form.valueChanges
            .pipe(debounceTime(500), distinctUntilChanged())
            .subscribe((values: any) => {
                this.carregarPaginacao(1, 10);
            });
    }

    carregarPaginacao(pagina: number, limite: number): void {
        this.paginacao = obterPaginado(
            filtrarArrayMultiKeyFunction(this.data, this.extraiFiltros()),
            pagina,
            limite
        );
    }

    private extraiFiltros(): object {
        let filtros = {};
        if (this.form.controls['nome'].valid) {
            Object.assign(filtros, {
                nome: (key: any) =>
                    removeAcentuacao(key.toUpperCase())?.includes(
                        removeAcentuacao(this.form.value.nome?.toUpperCase())
                    ),
                email: (key: any) =>
                    key.toUpperCase()?.includes(this.form.value.nome?.toUpperCase()),
            });
        }
        if (this.form.controls['status'].valid) {
            Object.assign(filtros, {
                status: (key: any) =>
                    key.toUpperCase()?.includes(this.form.value.status?.toUpperCase()),
            });
        }
        return filtros;
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
                    this.subjectUpdate.next({});
                }
            }
        );
    }

    onExcluir(usuario: IUsuario) {
        const modalRef: NgbModalRef = this.modalService.open(
            ConfirmaAcaoComponent,
            {
                ...this.modalOptions,
                size: 'md',
            }
        );
        modalRef.componentInstance.data = usuario;
        modalRef.result.then(
            (result) => {
                console.log('result: ', result);
            },
            (reason) => {
                if (reason) {
                    this.dataService.remove(usuario._id).subscribe({
                        next: (response: any) => {
                            this.subjectUpdate.next({});
                        },
                        error: (erro: HttpErrorResponse) => {
                            console.log(erro);
                        },
                        complete: () => { },
                    });
                }
            }
        );
    }
}
