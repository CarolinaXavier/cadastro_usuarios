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

@Component({
    selector: 'app-form-usuario',
    templateUrl: './form-usuario.component.html',
    styleUrls: ['./form-usuario.component.scss'],
})
export class FormUsuarioComponent {
    @Input({ required: true }) data!: any;

    form!: FormGroup;

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
            telefone: new FormControl(null, [
                Validators.required,
                CustomValidators.notEmpty,
            ]),
            email: new FormControl(null, [
                Validators.required,
                CustomValidators.notEmpty,
                Validators.email,
            ]),
            perfis: new FormControl(null, [
                Validators.required,
                CustomValidators.notEmpty,
            ]),
            idioma: new FormControl(null, [
                Validators.required,
                CustomValidators.notEmpty,
            ]),
            contatoPreferencial: new FormControl('todos', [
                Validators.required,
                CustomValidators.notEmpty,
            ]),
        });
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
