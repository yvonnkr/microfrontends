import { createApp } from 'vue';
import Dashboard from './components/Dashboard.vue';

const mount = (el) => {
  const app = createApp(Dashboard);

  app.mount(el);
};

// if running in isolation/dev
if (process.env.NODE_ENV === 'development') {
  const devRoot = document.getElementById('_dashboard-dev-root');

  if (devRoot) {
    mount(devRoot);
  }
}

// for external use eg. with Container(microfrontend)
export { mount };
