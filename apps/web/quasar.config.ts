import { configure } from 'quasar/wrappers';

export default configure(() => {
  return {
    boot: [],

    css: [],

    extras: ['roboto-font', 'material-icons'],

    build: {
      target: {
        browser: ['es2022'],
        node: 'node20',
      },
      typescript: {
        strict: true,
        vueShim: true,
      },
    },

    devServer: {
      open: false,
    },

    framework: {
      config: {},
      plugins: [],
    },

    animations: [],

    ssr: { pwa: false },
    pwa: {},
    cordova: {},
    capacitor: { hideSplashscreen: true },
    electron: { builder: { appId: 'stylist-web' } },
    bex: { extraScripts: [] },
  };
});
