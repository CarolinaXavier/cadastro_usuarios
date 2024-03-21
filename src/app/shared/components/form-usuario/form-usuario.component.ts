import { Component, Input, OnInit } from '@angular/core';
import {
    FormBuilder,
    FormControl,
    FormGroup,
    Validators,
} from '@angular/forms';
import { CustomValidators } from 'src/app/form-validators/custom.validator';
import { IUsuario } from 'src/app/interfaces/usuario.interface';
import { FormService } from 'src/app/services/form.service';
import { UtilPaisIdioma } from 'src/app/utils/pais-idioma.util';
import { UtilPaisCodeTelefone } from 'src/app/utils/pais-code-telefone';
import { DataService } from 'src/app/services/data.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-form-usuario',
    templateUrl: './form-usuario.component.html',
    styleUrls: ['./form-usuario.component.scss'],
})
export class FormUsuarioComponent implements OnInit {
    @Input({ required: true }) data!: IUsuario;

    form!: FormGroup;
    utilPaisIdioma = UtilPaisIdioma;
    utilPaisCodeTelefone = UtilPaisCodeTelefone;
    perfis = [
        { id: 'analista', label: 'Analista' },
        { id: 'supervisor', label: 'Supervisor' },
    ];

    constructor(
        private fb: FormBuilder,
        protected formService: FormService,
        private dataService: DataService,
        private modalService: NgbModal
    ) {
        this.form = this.fb.group({
            nome: new FormControl(null, [
                Validators.required,
                CustomValidators.notEmpty,
            ]),
            sobreNome: new FormControl(null, [
                Validators.required,
                CustomValidators.notEmpty,
            ]),
            telefone: this.fb.group({
                codigoDoPais: new FormControl(this.utilPaisCodeTelefone[0].code, []),
                numero: new FormControl(null, []),
            }),
            email: new FormControl(null, [
                Validators.required,
                CustomValidators.notEmpty,
                Validators.email,
            ]),
            perfis: new FormControl(null, [Validators.required]),
            idioma: new FormControl(this.utilPaisIdioma[0].id, [
                Validators.required,
                CustomValidators.notEmpty,
            ]),
            contatoPreferencial: new FormControl('todos', []),
        });
    }

    ngOnInit(): void {
        if (this.data) {
            this.form.patchValue(this.data, { emitEvent: false, onlySelf: true })
        }
    }

    get formTelefone(): FormGroup {
        return this.form.controls['telefone'] as FormGroup;
    }

    dropdownChange(event: any) {
        this.formTelefone.patchValue({ codigoDoPais: event.target.id });
    }

    onSubmit() {
        if (this.formService.valid(this.form)) {
            const now = new Date();
            const usuario: IUsuario = Object.assign(
                {
                    status: 'ativo',
                    criadoEm: now.toISOString(),
                    ultimoAcesso: now.toISOString(),
                },
                this.form.value
            );

            this.dataService.add(usuario).subscribe({
                next: (response: any) => {
                    this.modalService.dismissAll(response);
                },
                error: (erro: HttpErrorResponse) => {
                    console.log(erro);
                },
                complete: () => { },
            });
        } else {
            console.error(`from: ${this.form.status}`);
        }
    }

    close() {
        this.modalService.dismissAll(null);
    }
}
