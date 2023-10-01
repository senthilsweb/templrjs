import { defineStore } from 'pinia';

export const useThemeStore = defineStore('theme', {
  state: () => ({
    theme: {},
    upserted: false,
    primary: 'teal',
    secondary: 'gray',
    colors: [
      {
        paletteName: 'gray',
        swatches: [
          {
            name: '50',
            color: '#f9fafb',
          },
          {
            name: '100',
            color: '#f7fafc',
          },
          {
            name: '200',
            color: '#edf2f7',
          },
          {
            name: '300',
            color: '#e2e8f0',
          },
          {
            name: '400',
            color: '#cbd5e0',
          },
          {
            name: '500',
            color: '#a0aec0',
          },
          {
            name: '600',
            color: '#718096',
          },
          {
            name: '700',
            color: '#4a5568',
          },
          {
            name: '800',
            color: '#2d3748',
          },
          {
            name: '900',
            color: '#1a202c',
          },
        ],
      },
      {
        paletteName: 'red',
        swatches: [
          {
            name: '50',
            color: '#fef2f2',
          },
          {
            name: '100',
            color: '#fff5f5',
          },
          {
            name: '200',
            color: '#fed7d7',
          },
          {
            name: '300',
            color: '#feb2b2',
          },
          {
            name: '400',
            color: '#fc8181',
          },
          {
            name: '500',
            color: '#f56565',
          },
          {
            name: '600',
            color: '#e53e3e',
          },
          {
            name: '700',
            color: '#c53030',
          },
          {
            name: '800',
            color: '#9b2c2c',
          },
          {
            name: '900',
            color: '#742a2a',
          },
        ],
      },
      {
        paletteName: 'orange',
        swatches: [
          {
            name: '50',
            color: '#fff7ed',
          },
          {
            name: '100',
            color: '#fffaf0',
          },
          {
            name: '200',
            color: '#feebc8',
          },
          {
            name: '300',
            color: '#fbd38d',
          },
          {
            name: '400',
            color: '#f6ad55',
          },
          {
            name: '500',
            color: '#ed8936',
          },
          {
            name: '600',
            color: '#dd6b20',
          },
          {
            name: '700',
            color: '#c05621',
          },
          {
            name: '800',
            color: '#9c4221',
          },
          {
            name: '900',
            color: '#7b341e',
          },
        ],
      },
      {
        paletteName: 'yellow',
        swatches: [
          {
            name: '50',
            color: '#fefce8',
          },
          {
            name: '100',
            color: '#fffff0',
          },
          {
            name: '200',
            color: '#fefcbf',
          },
          {
            name: '300',
            color: '#faf089',
          },
          {
            name: '400',
            color: '#f6e05e',
          },
          {
            name: '500',
            color: '#ecc94b',
          },
          {
            name: '600',
            color: '#d69e2e',
          },
          {
            name: '700',
            color: '#b7791f',
          },
          {
            name: '800',
            color: '#975a16',
          },
          {
            name: '900',
            color: '#744210',
          },
        ],
      },
      {
        paletteName: 'green',
        swatches: [
          {
            name: '50',
            color: '#f0fdf4',
          },
          {
            name: '200',
            color: '#c6f6d5',
          },
          {
            name: '300',
            color: '#9ae6b4',
          },
          {
            name: '400',
            color: '#68d391',
          },
          {
            name: '500',
            color: '#48bb78',
          },
          {
            name: '600',
            color: '#38a169',
          },
          {
            name: '700',
            color: '#2f855a',
          },
          {
            name: '800',
            color: '#276749',
          },
          {
            name: '900',
            color: '#22543d',
          },
        ],
      },
      {
        paletteName: 'teal',
        swatches: [
          {
            name: '50',
            color: '#f0fdfa',
          },
          {
            name: '100',
            color: '#e6fffa',
          },
          {
            name: '200',
            color: '#b2f5ea',
          },
          {
            name: '300',
            color: '#81e6d9',
          },
          {
            name: '400',
            color: '#4fd1c5',
          },
          {
            name: '500',
            color: '#38b2ac',
          },
          {
            name: '600',
            color: '#319795',
          },
          {
            name: '700',
            color: '#2c7a7b',
          },
          {
            name: '800',
            color: '#285e61',
          },
          {
            name: '900',
            color: '#234e52',
          },
        ],
      },
      {
        paletteName: 'blue',
        swatches: [
          {
            name: '50',
            color: '#eff6ff',
          },
          {
            name: '100',
            color: '#ebf8ff',
          },
          {
            name: '200',
            color: '#bee3f8',
          },
          {
            name: '300',
            color: '#90cdf4',
          },
          {
            name: '400',
            color: '#63b3ed',
          },
          {
            name: '500',
            color: '#4299e1',
          },
          {
            name: '600',
            color: '#3182ce',
          },
          {
            name: '700',
            color: '#2b6cb0',
          },
          {
            name: '800',
            color: '#2c5282',
          },
          {
            name: '900',
            color: '#2a4365',
          },
        ],
      },
      {
        paletteName: 'indigo',
        swatches: [
          {
            name: '50',
            color: '#eef2ff',
          },
          {
            name: '100',
            color: '#ebf4ff',
          },
          {
            name: '200',
            color: '#c3dafe',
          },
          {
            name: '300',
            color: '#a3bffa',
          },
          {
            name: '400',
            color: '#7f9cf5',
          },
          {
            name: '500',
            color: '#667eea',
          },
          {
            name: '600',
            color: '#5a67d8',
          },
          {
            name: '700',
            color: '#4c51bf',
          },
          {
            name: '800',
            color: '#434190',
          },
          {
            name: '900',
            color: '#3c366b',
          },
        ],
      },
      {
        paletteName: 'purple',
        swatches: [
          {
            name: '50',
            color: '#faf5ff',
          },
          {
            name: '100',
            color: '#faf5ff',
          },
          {
            name: '200',
            color: '#e9d8fd',
          },
          {
            name: '300',
            color: '#d6bcfa',
          },
          {
            name: '400',
            color: '#b794f4',
          },
          {
            name: '500',
            color: '#9f7aea',
          },
          {
            name: '600',
            color: '#805ad5',
          },
          {
            name: '700',
            color: '#6b46c1',
          },
          {
            name: '800',
            color: '#553c9a',
          },
          {
            name: '900',
            color: '#44337a',
          },
        ],
      },
      {
        paletteName: 'pink',
        swatches: [
          {
            name: '50',
            color: '#fdf2f8',
          },
          {
            name: '100',
            color: '#fff5f7',
          },
          {
            name: '200',
            color: '#fed7e2',
          },
          {
            name: '300',
            color: '#fbb6ce',
          },
          {
            name: '400',
            color: '#f687b3',
          },
          {
            name: '500',
            color: '#ed64a6',
          },
          {
            name: '600',
            color: '#d53f8c',
          },
          {
            name: '700',
            color: '#b83280',
          },
          {
            name: '800',
            color: '#97266d',
          },
          {
            name: '900',
            color: '#702459',
          },
        ],
      },
    ],
  }),
  getters: {
    loaded: (stat) => {
      return state.upserted;
    },
    getPrimaryColor: (state) => {
      return state.primary;
    },
    logo_url: (state) => {
      return ['bg-primary-50', 'bg-primary-100', 'bg-primary-200', 'bg-primary-500', 'bg-primary-600'];
    },
    bg_primary_50: (state) => (color) => {
      /*let result = state.data.filter((object) => {
        return object.code == color;
      });
      return result.length > 0 ? result[0] : undefined;*/
      return 'bg-[#fefce8]';
    },
    bg_primary_100: (state) => (color) => {
      return '';
    },
    bg_primary_200: (state) => (color) => {
      return '';
    },
    bg_primary_500: (state) => (color) => {
      return 'bg-[#14b8a6]';
    },
    bg_primary_600: (state) => (color) => {
      return 'bg-[#ca8a04]';
      //useFind(state.colors, { paletteName: 'purple' })
      //_.find(users, obj_to_locate);
    },

    /* This is a getter function called `palette` that takes two arguments: `palette` and `number`. It
    returns the color of a specific swatch in a specific palette. */
    palette: (state) => (number) => {
      return useFind(useFind(state.colors, { paletteName: state.primary }).swatches, { name: number || '500' }).color;
    },
    all_colors: (state) => (palette) => {
      return useMap(useFind(state.colors, { paletteName: palette }).swatches, function (item) {
        return item.color;
      });
    },
    swatches: (state) => {
      return useMap(state.colors, 'paletteName');
    },
  },
  actions: {
    setPrimary(item) {
      this.primary = item;
    },
  },
});
