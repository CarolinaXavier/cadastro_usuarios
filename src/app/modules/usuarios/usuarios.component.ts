import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ModalService } from 'src/app/services/modal.service';
import { FormUsuarioComponent } from 'src/app/shared/components/form-usuario/form-usuario.component';

@Component({
    selector: 'app-usuarios',
    templateUrl: './usuarios.component.html',
    styleUrls: ['./usuarios.component.scss'],
})
export class UsuariosComponent {
    form!: FormGroup;

    constructor(private fb: FormBuilder, private modalService: ModalService) {
        this.form = this.fb.group({
            nomeEmail: [null],
            filtro: [null],
        });

        this.form.valueChanges.subscribe((values) => {
            console.log(values);
        });
    }

    protected usuarioAdd() {
        
    }
}
