import React from 'react';
import ReactDOM from 'react-dom';
import { createMemoryHistory, createBrowserHistory } from 'history';
import App from './App';

const mount = (el, { initialPath, onSignIn, onNavigate, defaultHistory }) => {
  const history =
    defaultHistory ||
    createMemoryHistory({
      initialEntries: [initialPath],
    });

  if (onNavigate) {
    history.listen(onNavigate);
  }

  ReactDOM.render(<App onSignIn={onSignIn} history={history} />, el);

  return {
    onParentNavigate(location) {
      const { pathname: currentPathname } = history.location;
      const { pathname: nextPathname } = location;

      if (currentPathname !== nextPathname) {
        history.push(`${nextPathname}`);
      }
    },
  };
};

// if running in isolation/dev
if (process.env.NODE_ENV === 'development') {
  const devRoot = document.getElementById('_auth-dev-root');

  if (devRoot) {
    mount(devRoot, { defaultHistory: createBrowserHistory() });
  }
}

// for external use eg. with Container(microfrontend)
export { mount };
