import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable, Subject, merge, of } from 'rxjs';
import { map, scan } from 'rxjs/operators';

interface CounterVm {
  counter: number;
}

@Component({
  selector: 'app-counter',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CounterComponent implements OnInit {
  vm$: Observable<CounterVm>;
  counterSubj = new Subject<number>();

  ngOnInit(): void {
    this.vm$ = merge(of({ counter: 0 }), this.counter$).pipe(
      scan((prevVm: CounterVm, mutationFn: (vm: CounterVm) => CounterVm) =>
        mutationFn(prevVm)
      )
    );
  }

  private counter$ = this.counterSubj.pipe(
    map((delta) => (vm: CounterVm): CounterVm => ({
      ...vm,
      counter: vm.counter + delta
    }))
  );
}
