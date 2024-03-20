import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-form-usuario',
    templateUrl: './form-usuario.component.html',
    styleUrls: ['./form-usuario.component.scss'],
})
export class FormUsuarioComponent {
    @Input({ required: true }) data!: any;
}
