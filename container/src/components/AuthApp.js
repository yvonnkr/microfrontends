import React, { useEffect, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { mount } from 'auth/AuthApp';

const AuthApp = ({ onSignIn }) => {
  const ref = useRef(null);
  const history = useHistory();

  useEffect(() => {
    const mountConfig = {
      initialPath: history.location.pathname,

      onNavigate: (location) => {
        const { pathname: currentPathname } = history.location;
        const { pathname: nextPathname } = location;

        if (currentPathname !== nextPathname) {
          history.push(`${nextPathname}`);
        }
      },

      onSignIn,
    };

    const { onParentNavigate } = mount(ref.current, mountConfig);

    history.listen(onParentNavigate);
  }, []);

  return <div ref={ref}></div>;
};

export default AuthApp;
