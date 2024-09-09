import { ArgTypes } from '@storybook/web-components';

type ArgType = { [key: string]: any };

export class ArgumentControls {

  /**
   * Generates argTypes to hide a property from the
   * control tab and disable the control in the docs table.
   */
  public static disable(...names: string[]): ArgTypes {
    return names.reduce(
      (carry, name) => {
        carry[name] = {
          control: {
            disable: true,
          },
        };
        return carry;
      },
      {} as ArgTypes,
    );
  }

  /**
   * Generates argTypes to hide a property from the
   * control tab and the docs table.
   */
  public static hide(...names: string[]): ArgTypes {
    return names.reduce(
      (carry, name) => {
        carry[name] = {
          control: {
            disable: true,
          },
          table: {
            disable: true,
          },
        };
        return carry;
      },
      {} as ArgTypes,
    );
  }

  /**
   * Generates an ArgType from an object constant. The keys
   * are used as labels.
   */
  public static selection(
    map: { [label: string]: any },
    options: {
      controlType?: 'radio' | 'select',
      optional?: boolean,
    } = {
      controlType: undefined,
      optional: false,

    },
  ): ArgType {
    const values = Object.values(map);
    const labels = Object.fromEntries(
      Object.entries(map).map(
        (a) => a.reverse(),
      ),
    );
    if (options?.optional) {
      values.unshift(undefined);
    }
    return ({
      options: values,
      control: {
        type: options?.controlType || ((values.length > 5) ? 'select' : 'radio'),
        labels,
      },
    });
  }

  public static range(
    min: number = 0,
    max: number = 100,
    step: number = 1,
  ): ArgType {
    return ({
      control: {
        type: 'range',
        min,
        max,
        step
      }
    });
  }
}
