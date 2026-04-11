import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import AppBarMenu from '../../src/components/Menu';

vi.mock('@mui/material/AppBar', () => ({
  default: ({ children, ...props }: any) => (
    <div data-testid="app-bar" {...props}>
      {children}
    </div>
  ),
}));

vi.mock('@mui/material/Toolbar', () => ({
  default: ({ children, ...props }: any) => (
    <div data-testid="toolbar" {...props}>
      {children}
    </div>
  ),
}));

vi.mock('@mui/material/Container', () => ({
  default: ({ children, ...props }: any) => (
    <div data-testid="container" {...props}>
      {children}
    </div>
  ),
}));

vi.mock('@mui/material/IconButton', () => ({
  default: ({ children, onClick, ...props }: any) => (
    <button data-testid="icon-button" onClick={onClick} {...props}>
      {children}
    </button>
  ),
}));

vi.mock('@mui/material/Typography', () => ({
  default: ({ children, ...props }: any) => <span {...props}>{children}</span>,
}));

vi.mock('@mui/material/Avatar', () => ({
  default: (props: any) => (
    <img data-testid="avatar" alt={props.alt} src={props.src} />
  ),
}));

vi.mock('@mui/material/Tooltip', () => ({
  default: ({ children }: any) => children,
}));

vi.mock('@mui/material/Menu', () => ({
  default: ({ children, open, onClose }: any) =>
    open ? (
      <div data-testid="user-menu" role="menu" onClick={onClose}>
        {children}
      </div>
    ) : null,
}));

vi.mock('@mui/material/MenuItem', () => ({
  default: ({ children, onClick, ...props }: any) => (
    <div data-testid="menu-item" role="menuitem" onClick={onClick} {...props}>
      {children}
    </div>
  ),
}));

vi.mock('../../src/components/MenuLogo', () => ({
  default: () => <div data-testid="menu-logo" />,
}));

describe('AppBarMenu Component', () => {
  it('debe renderizar la barra de navegación con logo y avatar', () => {
    render(<AppBarMenu />);

    expect(screen.getByTestId('app-bar')).toBeInTheDocument();
    expect(screen.getByTestId('menu-logo')).toBeInTheDocument();
    expect(screen.getByTestId('avatar')).toBeInTheDocument();
    expect(screen.getByTestId('avatar')).toHaveAttribute('alt', 'Remy Sharp');
  });

  it('debe abrir el menú de usuario al hacer clic en el avatar', () => {
    render(<AppBarMenu />);

    expect(screen.queryByTestId('user-menu')).not.toBeInTheDocument();

    fireEvent.click(screen.getByTestId('icon-button'));

    expect(screen.getByTestId('user-menu')).toBeInTheDocument();
  });

  it('debe mostrar las opciones "Perfil" y "Acerca de" en el menú de usuario', () => {
    render(<AppBarMenu />);

    fireEvent.click(screen.getByTestId('icon-button'));

    expect(screen.getByText('Perfil')).toBeInTheDocument();
    expect(screen.getByText('Acerca de')).toBeInTheDocument();
  });

  it('debe cerrar el menú de usuario al hacer clic en una opción', () => {
    render(<AppBarMenu />);

    fireEvent.click(screen.getByTestId('icon-button'));
    expect(screen.getByTestId('user-menu')).toBeInTheDocument();

    fireEvent.click(screen.getAllByTestId('menu-item')[0]);

    expect(screen.queryByTestId('user-menu')).not.toBeInTheDocument();
  });

  it('debe renderizar un MenuItem por cada opción de configuración', () => {
    render(<AppBarMenu />);

    fireEvent.click(screen.getByTestId('icon-button'));

    const menuItems = screen.getAllByTestId('menu-item');
    expect(menuItems).toHaveLength(2);
  });
});
