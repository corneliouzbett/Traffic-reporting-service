import { NgModule } from '@angular/core';

import { UTrafficSharedLibsModule, JhiAlertComponent, JhiAlertErrorComponent } from './';

@NgModule({
    imports: [UTrafficSharedLibsModule],
    declarations: [JhiAlertComponent, JhiAlertErrorComponent],
    exports: [UTrafficSharedLibsModule, JhiAlertComponent, JhiAlertErrorComponent]
})
export class UTrafficSharedCommonModule {}
