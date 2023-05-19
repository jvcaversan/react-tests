import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import App from '../App';

describe('App tests', () => {
  test('Teste se é exibida na tela a mensagem No favorite pokemon found', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    const aboutEl = screen.getByRole('link', { name: /Favorite pokémons/i });

    userEvent.click(aboutEl);

    const titleEl = screen.getByText(/No favorite pokemon found/i);
    expect(titleEl).toBeInTheDocument();
  });
  test('Teste se são exibidos todos os cards de pokémons favoritados.', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    const detailsEl = screen.getByRole('link', { name: /more details/i });

    userEvent.click(detailsEl);
    const favoriteEl = screen.getByLabelText(/Pokémon favoritado?/i);
    userEvent.click(favoriteEl);

    const aboutEl = screen.getByRole('link', { name: /Favorite pokémons/i });
    userEvent.click(aboutEl);

    const pikachuEl = screen.getByText(/pikachu/i);
    expect(pikachuEl).toBeInTheDocument();
  });
});
