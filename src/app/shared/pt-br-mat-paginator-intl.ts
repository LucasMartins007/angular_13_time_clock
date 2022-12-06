import { Injectable } from '@angular/core';
import { MatPaginatorIntl } from "@angular/material/paginator";

@Injectable()
export class PtBrMatPaginatorIntl extends MatPaginatorIntl {

    itemsPerPageLabel: string = 'Qtd. por página';
    nextPageLabel: string = 'Próximo';
    previousPageLabel: string = 'Anterior';

    getRangeLabel = function (page: any, pageSize: any, lenght: any): string {
        if (lenght === 0 || pageSize === 0) {
            return `0 de ${lenght}`;
        }
        lenght = Math.max(lenght, 0);
        const startIndex = page * pageSize;
        const endIndex = startIndex < lenght
            ? Math.min(startIndex + pageSize, lenght)
            : startIndex + pageSize;
        return startIndex + 1 + ' - ' + endIndex + ' / ' + lenght;
    };


}