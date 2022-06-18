import { OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';

export abstract class AbstractBaseComponent implements OnDestroy {

  isLoading: boolean = false;
  protected unsubscribe: Subject<void> = new Subject();

  constructor() {
  }

  ngOnInit() {
    
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
  }

}
