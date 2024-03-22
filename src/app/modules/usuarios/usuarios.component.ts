import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import {
    FormBuilder,
    FormControl,
    FormGroup,
    Validators,
} from '@angular/forms';
import {
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
import { IPaginacaoConfig } from 'src/app/interfaces/paginacao-config.interface';
import { IPaginacao } from 'src/app/interfaces/paginacao.interface';
import { IUsuario } from 'src/app/interfaces/usuario.interface';
import { DataService } from 'src/app/services/data.service';
import { PaginacaoConfigService } from 'src/app/services/paginacao-config.service';
import { ConfirmaAcaoComponent } from 'src/app/shared/components/confirma-acao/confirma-acao.component';
import { FormUsuarioComponent } from 'src/app/shared/components/form-usuario/form-usuario.component';
import { Utils } from 'src/app/utils/utils';

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
    controleSortData: FormControl = new FormControl(true);
    controleLimite: FormControl = new FormControl(
        this.paginacaoConfigService.getConfig().limite
    );

    paginacao!: IPaginacao;
    paginacaoConfig: IPaginacaoConfig = this.paginacaoConfigService.getConfig();
    private data!: any;

    modalOptions: NgbModalOptions = {
        ariaLabelledBy: 'modal-basic-title',
        size: 'lg',
        centered: true,
        backdrop: 'static',
    };

    statusList = [
        { value: 'todos' },
        { value: 'ativo' },
        { value: 'pendente' },
        { value: 'bloqueado' },
    ];

    constructor(
        private fb: FormBuilder,
        private modalService: NgbModal,
        private dataService: DataService,
        private paginacaoConfigService: PaginacaoConfigService
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
                this.carregarPaginacao(this.paginacaoConfig);
                console.log(this.data);
            })
        );

        this.form = this.fb.group({
            nome: ['', [Validators.required, CustomValidators.notEmpty]],
            status: [['todos'], [Validators.required]],
        });

        this.form.valueChanges
            .pipe(debounceTime(500), distinctUntilChanged())
            .subscribe((values: any) => {
                this.carregarPaginacao(this.paginacaoConfig);
            });

        this.paginacaoConfigService.configChanges().subscribe((config) => {
            this.paginacaoConfig = config;
            if (this.data) {
                this.carregarPaginacao(this.paginacaoConfig);
            }
        });

        this.controleLimite.valueChanges.subscribe((value) => {
            this.paginacaoConfigService.setConfig({ limite: Number(value) });
        });
    }

    carregarPaginacao(paginacaoConfig: IPaginacaoConfig): void {
        this.paginacao = Utils.obterPaginado(
            Utils.filtrarArrayMultiKeyFunction(this.data, this.extraiFiltros()),
            paginacaoConfig.pagina,
            paginacaoConfig.limite
        );
    }

    sortDocumentos(event: any, key: keyof IUsuario) {
        if (event) {
            if (event.target.checked) {
                this.paginacao.documentos.sort((a: IUsuario, b: IUsuario) => {
                    if (a[key] < b[key]) return 1;
                    if (a[key] > b[key]) return -1;
                    return 0;
                });
            } else {
                this.paginacao.documentos.sort((a: IUsuario, b: IUsuario) => {
                    if (a[key] > b[key]) return 1;
                    if (a[key] < b[key]) return -1;
                    return 0;
                });
            }
        }
    }

    private extraiFiltros(): object {
        let filtros = {};
        if (this.form.controls['nome'].valid) {
            Object.assign(filtros, {
                nome: (key: any) =>
                    Utils.removeAcentuacao(key.toUpperCase())?.includes(
                        Utils.removeAcentuacao(this.form.value.nome?.toUpperCase())
                    ),
                /* email: (key: any) =>
                    key.toUpperCase()?.includes(this.form.value.nome?.toUpperCase()), */
            });
        }
        const statusValue: string[] = this.form.controls['status'].value;
        if (this.form.controls['status'].valid && !statusValue.includes('todos')) {
            Object.assign(filtros, {
                status: (key: any) =>
                    this.form.value.status
                        ?.map((status: string) => status.toUpperCase())
                        .includes(key.toUpperCase()),
            });
        }
        return filtros;
    }

    navegarParaPagina(event: any) {
        this.paginacaoConfigService.setConfig({ pagina: event });
    }

    onAdd() {
        const modalRef: NgbModalRef = this.modalService.open(
            FormUsuarioComponent,
            this.modalOptions
        );
        modalRef.result.then(
            (result) => {
                if (result) {
                    this.subjectUpdate.next({});
                }
            },
            (reason) => { }
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
                if (result) {
                    this.subjectUpdate.next({});
                }
            },
            (reason) => { }
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
        modalRef.componentInstance.acao = 'delete';
        modalRef.result.then(
            (result) => {
                if (result) {
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
            },
            (reason) => { }
        );
    }
}
