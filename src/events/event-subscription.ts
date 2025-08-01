import {Subscription} from "./subscription";

export class EventSubscription<T extends Event = Event>
  extends Subscription
  implements EventListenerObject {

  private readonly listener: (event: T) => void;

  public constructor(
    element: EventTarget,
    eventName: string[] | string,
    listener: (event: T) => void,
    options?: AddEventListenerOptions | boolean,
  ) {
    const events = eventName instanceof Array ? eventName : [eventName];
    super(
      () => {
        events.forEach(
          (event) => {
            element.removeEventListener(event, this);
          },
        );
      },
    );
    this.listener = listener;
    events.forEach(
      (event) => {
        element.addEventListener(
          event, this, options as any,
        );
      },
    );
  }

  public handleEvent(event: T): void {
    this.listener(event as T);
  }

}
