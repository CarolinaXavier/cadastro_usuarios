import { Component, Input } from '@angular/core';
import {
    FormBuilder,
    FormControl,
    FormGroup,
    Validators,
} from '@angular/forms';
import { CustomValidators } from 'src/app/form-validators/custom.validator';
import { IUsuario } from 'src/app/interfaces/usuario.interface';
import { FormService } from 'src/app/services/form.service';
import { ModalService } from 'src/app/services/modal.service';
import { UtilPaisIdioma } from 'src/app/utils/pais-idioma.util';
import { UtilPaisCodeTelefone } from 'src/app/utils/pais-code-telefone';

@Component({
    selector: 'app-form-usuario',
    templateUrl: './form-usuario.component.html',
    styleUrls: ['./form-usuario.component.scss'],
})
export class FormUsuarioComponent {
    @Input({ required: true }) data!: any;

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
        private modalService: ModalService
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
            paisCodeTelefone: new FormControl(this.utilPaisCodeTelefone[0].code, []),
            telefone: new FormControl(null, []),
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

    dropdownChange(event: any) {
        this.form.patchValue({ paisCodeTelefone: event.target.id });
    }

    onSubmit() {
        if (this.formService.valid(this.form)) {
        } else {
            console.error(`from: ${this.form.status}`);
        }
    }

    closeModal() {
        this.modalService.open(false);
    }
}
