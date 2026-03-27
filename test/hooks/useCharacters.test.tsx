import { renderHook, act, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { useCharacters } from '../../src/hooks/useCharacters';
import * as CharacterApi from '../../src/API/CharacterApi';

vi.mock('../../src/API/CharacterApi', () => ({
  getCharacters: vi.fn(),
  getCharacterInfo: vi.fn(),
}));

describe('useCharacters Hook', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const mockSuccessResponse = {
    status: 200,
    responseJson: {
      info: { count: 20, pages: 1, next: '', prev: '' },
      results: [{ id: 1, name: 'Rick Sanchez' }],
    },
  };

  it('debe cargar los personajes exitosamente al inicio', async () => {
    vi.mocked(CharacterApi.getCharacters as any).mockResolvedValue(
      mockSuccessResponse,
    );

    const { result } = renderHook(() => useCharacters());
    expect(result.current.loading).toBe(true);
    await waitFor(() => expect(result.current.loading).toBe(false));
    expect(result.current.characters).toHaveLength(1);
    expect(result.current.info.count).toBe(20);
    expect(result.current.characters[0].name).toBe('Rick Sanchez');
  });

  it('debe manejar errores de la API (status != 200)', async () => {
    vi.mocked(CharacterApi.getCharacters as any).mockResolvedValue({
      status: 404,
      responseJson: { error: 'There is nothing here' },
    });
    const { result } = renderHook(() => useCharacters());
    await waitFor(() => expect(result.current.loading).toBe(false));
    expect(result.current.message).toBe('There is nothing here');
    expect(result.current.characters).toEqual([]);
  });

  it('debe actualizar la página y sincronizarla con los filtros', async () => {
    vi.mocked(CharacterApi.getCharacters as any).mockResolvedValue(
      mockSuccessResponse,
    );
    const { result } = renderHook(() => useCharacters());
    act(() => {
      result.current.updatePage({} as any, 2);
    });
    expect(result.current.page).toBe(2);
    await waitFor(() => {
      expect(result.current.filters.page).toBe('2');
    });
  });

  it('debe actualizar filtros individuales', async () => {
    vi.mocked(CharacterApi.getCharacters as any).mockResolvedValue(
      mockSuccessResponse,
    );
    const { result } = renderHook(() => useCharacters());
    act(() => {
      result.current.updateFilter('status', 'alive');
    });
    expect(result.current.filters.status).toBe('alive');
  });
});
