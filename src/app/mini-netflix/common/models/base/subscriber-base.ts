import { OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

export abstract class SubscriberBase implements OnDestroy{

    subscriptions: Subscription[] = [];

    ngOnDestroy() {
        this.subscriptions.forEach(subscription => {
            if (subscription && !subscription.closed) {
                subscription.unsubscribe();
            }
        })
        this.subscriptions = [];
    }
}
