import {SubscriptionLike} from "./subscription";

export class Subscriptions<Type extends SubscriptionLike = SubscriptionLike> {

  private _subscriptions: Type[] = [];

  public add(...subscriptions: Type[]): void {
    if (subscriptions.length > 0) {
      this._subscriptions.push(...subscriptions);
    }
  }

  public unsubscribe() {
    this._subscriptions.forEach(
      (subscription) => subscription.unsubscribe(),
    );
    this._subscriptions = [];
  }

}
