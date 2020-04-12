import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { CounterComponent } from './counter/counter.component';
import { PersonsComponent } from './persons/persons.component';
import { FilterComponent } from './filter/filter.component';

@NgModule({
  declarations: [AppComponent, CounterComponent, PersonsComponent, FilterComponent],
  imports: [BrowserModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
