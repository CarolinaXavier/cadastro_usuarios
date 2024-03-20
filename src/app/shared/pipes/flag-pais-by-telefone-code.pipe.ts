import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'flagPaisByTelefoneCode',
})
export class FlagPaisByTelefoneCodePipe implements PipeTransform {
    transform(value: string): string {
        switch (value) {
            case '+55':
                return 'assets/img/flags/brazil.webp';
            case '+1':
                return 'assets/img/flags/united_states.webp';
            case '+34':
                return 'assets/img/flags/spain.webp';
            case '+33':
                return 'assets/img/flags/france.webp';
            case '+49':
                return 'assets/img/flags/germany.webp';
            case '+39':
                return 'assets/img/flags/italy.webp';
            case '+81':
                return 'assets/img/flags/japan.webp';
            case '+86':
                return 'assets/img/flags/china.webp';
            default:
                return '';
        }
    }
}
