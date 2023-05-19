import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Teste links da navegacao da page', () => {
  it('Verifica se possui link com home', () => {
    renderWithRouter(<App />);
    const homeLink = screen.getByRole('link', { name: /home/i });
    expect(homeLink).toBeInTheDocument();
  });

  it('Verifica se possui link com About', () => {
    renderWithRouter(<App />);
    const aboutLink = screen.getByRole('link', { name: /about/i });
    expect(aboutLink).toBeInTheDocument();
  });

  it('Verifica se possui link com Pokemons Favoritos', () => {
    renderWithRouter(<App />);
    const favoritePokemonLink = screen.getByRole('link', { name: /Favorite Pokémons/i });
    expect(favoritePokemonLink).toBeInTheDocument();
  });

  it('Teste se ao clicar em Home volta pra pagina inicial', () => {
    const { history } = renderWithRouter(<App />);

    const homeLink = screen.getByRole('link', { name: /home/i });
    userEvent.click(homeLink);
    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });

  it('Teste se ao clicar em About vai pra pagina About', () => {
    const { history } = renderWithRouter(<App />);

    const linkAbout = screen.getByRole('link', { name: /About/i });
    userEvent.click(linkAbout);
    const { pathname } = history.location;
    expect(pathname).toBe('/about');
  });

  it('Teste se ao clicar em Favorite Pokemons vai pra pagina Favorite', () => {
    const { history } = renderWithRouter(<App />);

    const linkFavorite = screen.getByRole('link', { name: /Favorite Pokémons/i });
    userEvent.click(linkFavorite);
    const { pathname } = history.location;
    expect(pathname).toBe('/favorites');
  });

  it('Teste se ao entrar em pagina desconhecida vai pra Not Found', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/notfound');
    const notFound = screen.getByRole('heading',
      { name: /Page requested not found/i, level: 2 });
    expect(notFound).toBeInTheDocument();
  });
});
