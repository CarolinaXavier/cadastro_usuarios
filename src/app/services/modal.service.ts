import { Injectable } from '@angular/core';
import { IModalChild } from '../interfaces/modal-child.interface';
import { Observable, Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ModalService {

    private child: Subject<IModalChild | null> = new Subject();

    changes(): Observable<IModalChild | null> {
        return this.child.asObservable();
    }

    open(child: IModalChild | null) {
        this.child.next(child);
    }
}
