import { Component, Input } from '@angular/core';
import { ICellRendererParams } from "@ag-grid-community/core";
import { ICellRendererAngularComp } from "@ag-grid-community/angular";

@Component({
    selector: 'app-button-cell-renderer',
    standalone: true,
    template: `<button class='show-sale' (click)="onClick()" cButton color="success">Show Sale</button>`
})
export class ShowSaleRenderer implements ICellRendererAngularComp {
    params!: any;

    agInit(params: ICellRendererParams): void {
        this.params = params;
    }

    refresh(params: any): boolean {
        this.params = params;
        return true;
    }

    onClick() {
        this.params.context.componentParent.showSale(this.params.data);
    }
}
