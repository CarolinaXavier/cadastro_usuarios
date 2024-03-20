import { Injectable } from '@angular/core';
import { IModalChild } from '../interfaces/modal-child.interface';
import { Observable, Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ModalService {

    private child: Subject<IModalChild | false> = new Subject();

    changes(): Observable<IModalChild | false> {
        return this.child.asObservable();
    }

    open(child: IModalChild | false) {
        this.child.next(child);
    }
}
