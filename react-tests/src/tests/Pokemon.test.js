import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import App from '../App';
import pokemons from '../data';
import renderWithRouter from '../renderWithRouter';

describe('App tests', () => {
  test('Teste se é renderizado um card com as informações de determinado pokémon', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    const pokemonName = screen.getByTestId('pokemon-name');
    const pokemonType = screen.getByTestId('pokemon-type');
    const pokemonPeso = screen.getByTestId('pokemon-weight');
    const { averageWeight: { value, measurementUnit } } = pokemons[0];
    expect(pokemonName).toHaveTextContent(pokemons[0].name);
    expect(pokemonType).toHaveTextContent(pokemons[0].type);
    expect(pokemonPeso).toHaveTextContent(`Average weight: ${value} ${measurementUnit}`);
    const image = screen.getByAltText(`${pokemons[0].name} sprite`);
    expect(image).toHaveAttribute('src', pokemons[0].image);
  });
  test('Teste se o card do pokémon indicado contém um link de navegação', () => {
    const { history } = renderWithRouter(<App />);
    const detailsLink = screen.getByRole('link', { name: /more details/i });
    expect(detailsLink).toBeInTheDocument();
    userEvent.click(detailsLink);
    const url = history.location.pathname;
    expect(url).toEqual(`/pokemons/${pokemons[0].id}`);
    const title = screen.getByRole('heading', { name: `${pokemons[0].name} Details` });
    expect(title).toBeInTheDocument();
    const toFavorite = screen.getByLabelText(/Pokémon favoritado?/i);
    userEvent.click(toFavorite);
    const imgFavorite = screen.getByAltText(`${pokemons[0].name} is marked as favorite`);
    expect(imgFavorite).toHaveAttribute('src', '/star-icon.svg');
  });
});
