import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingComponent } from 'src/app/components/loading/loading.component';
import { TranslateModule, TranslatePipe } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule
  ],
  declarations: [LoadingComponent],
  exports: [LoadingComponent, TranslateModule, TranslatePipe],
  providers: [TranslatePipe]
})
export class SharedModule { }
