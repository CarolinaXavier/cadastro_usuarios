import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { IData } from 'src/app/interfaces/data.interface';
import { ModalService } from 'src/app/services/modal.service';
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
        private modalService: ModalService,
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
        this.store.dispatch(
            loadData({ filtro: { nomeEmail: '', filtro: '' } })
        );
    }

    protected usuarioAdd() {
        this.modalService.open({
            component: FormUsuarioComponent,
            inputs: {
                data: {
                    titulo: 'Adicionar usuário',
                    subTitulo:
                        'Aqui você adiciona e configura os usuários que fazem parte da sua equipe',
                },
            },
        });
    }
}
