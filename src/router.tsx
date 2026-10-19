import React, { createContext, useContext, useState, useEffect } from 'react';

interface RouterContextType {
  path: string;
  navigate: (to: string) => void;
}

const RouterContext = createContext<RouterContextType>({
  path: '/',
  navigate: () => {},
});

export function BrowserRouter({ children }: { children: React.ReactNode }) {
  const [path, setPath] = useState<string>(window.location.pathname || '/');

  useEffect(() => {
    const onPopState = () => setPath(window.location.pathname || '/');
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  const navigate = (to: string) => {
    window.history.pushState({}, '', to);
    setPath(to);
  };

  return (
    <RouterContext.Provider value={{ path, navigate }}>
      {children}
    </RouterContext.Provider>
  );
}

export function Routes({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

export function Route({
  path,
  element,
}: {
  path: string;
  element: React.ReactNode;
}) {
  const context = useContext(RouterContext);
  const currentPath = context ? context.path : window.location.pathname;
  return currentPath === path ? <>{element}</> : null;
}

export function useNavigate() {
  const context = useContext(RouterContext);
  return (to: string) => {
    if (context && context.navigate) {
      context.navigate(to);
    } else {
      window.history.pushState({}, '', to);
      window.location.href = to;
    }
  };
}

export function Link({
  to,
  className,
  children,
}: {
  to: string;
  className?: string;
  children: React.ReactNode;
}) {
  const navigate = useNavigate();
  return (
    <a
      href={to}
      className={className}
      onClick={(e) => {
        e.preventDefault();
        navigate(to);
      }}
    >
      {children}
    </a>
  );
}

export function NavLink({
  to,
  className,
  children,
}: {
  to: string;
  end?: boolean;
  className?: string | ((props: { isActive: boolean }) => string);
  children: React.ReactNode;
}) {
  const context = useContext(RouterContext);
  const path = context ? context.path : window.location.pathname;
  const isActive = path === to;
  const resolvedClass =
    typeof className === 'function' ? className({ isActive }) : className;
  const navigate = useNavigate();

  return (
    <a
      href={to}
      className={resolvedClass}
      onClick={(e) => {
        e.preventDefault();
        navigate(to);
      }}
    >
      {children}
    </a>
  );
}