import { Component, Input } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { IUsuario } from 'src/app/interfaces/usuario.interface';

@Component({
    selector: 'app-confirma-acao',
    templateUrl: './confirma-acao.component.html',
    styleUrls: ['./confirma-acao.component.scss']
})
export class ConfirmaAcaoComponent {
    @Input({ required: true }) data!: IUsuario;
    constructor(private modalService: NgbModal) { }

    confirmar(usuario: IUsuario) {
        this.modalService.dismissAll(usuario);
    }

    close() {
        this.modalService.dismissAll(null);
    }
}
