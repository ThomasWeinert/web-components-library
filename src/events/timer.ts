export class Timer {

  private _stop?: () => void;

  public constructor(
    private _update: () => number,
  ) {
  }

  public disable() {
    if (this._stop) {
      this._stop();
      this._stop = undefined;
    }
  }

  public enable() {
    this._stop = this._enable();
  }

  private _enable() {
    this.disable();
    let active = true;
    const update: () => Promise<void> = async () => {
      while (active) {
        const wait = this._update();
        if (wait && wait > 0) {
           
          await new Promise((resolve) => setTimeout(resolve, wait));
        } else {
          active = false;
        }
      }
    };
    const stop = () => {
      active = false;
    };
    update().catch();
    return stop;
  }

  public get enabled(): boolean {
    return !!this._stop;
  }

  public set enabled(value: boolean) {
    const isEnabled = !!this._stop;
    if (isEnabled && !value) {
      this.disable();
    } else if (value && !isEnabled) {
      this.enable();
    }
  }

}
