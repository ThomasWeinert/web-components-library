import { addons } from '@storybook/manager-api';
import { create } from '@storybook/theming';

const theme = create({
  base: 'dark',
  brandTitle: 'Web Components Test',
  brandUrl: '',
});

addons.setConfig({
  theme: theme,
});
