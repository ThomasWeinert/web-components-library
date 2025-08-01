export interface SubscriptionLike {
    unsubscribe: () => void;
}

export abstract class Subscription implements SubscriptionLike {

    protected constructor(public readonly unsubscribe: () => void) {
    }
}
