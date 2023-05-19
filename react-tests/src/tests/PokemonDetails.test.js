import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Aplicativo PokemonDetails', () => {
  it('Verifica se as informações detalhadas do pokémon são mostradas na tela', () => {
    renderWithRouter(<App />);
    const moreDetails = screen.getByRole('link', { name: 'More details' });
    userEvent.click(moreDetails);
    const nameDetails = screen.getByText('Pikachu Details');
    const summary = screen.getByRole('heading', { level: 2, name: 'Summary' });
    const resumePoke = screen.getByText(/This intelligent Pokémon roasts/);
    expect(nameDetails).toBeInTheDocument();
    expect(moreDetails).not.toBeInTheDocument();
    expect(summary).toBeInTheDocument();
    expect(resumePoke).toBeInTheDocument();
  });

  it('Verifica se existe na página uma seção com os mapas do pokémon', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/pokemons/25');
    const loc = screen.getByRole('heading', {
      level: 2, name: 'Game Locations of Pikachu' });
    const locPikachu1 = screen.getByText(/kanto viridian forest/i);
    const locPikachu2 = screen.getByText(/kanto power plant/i);
    const imgLoc = screen.getAllByAltText('Pikachu location');
    expect(loc).toBeInTheDocument();
    expect(locPikachu1).toBeInTheDocument();
    expect(locPikachu2).toBeInTheDocument();
    expect(imgLoc).toHaveLength(2);
    expect(imgLoc[0]).toHaveAttribute('src', 'https://pwo-wiki.info/images/4/47/Viridian_Forest.gif');
    expect(imgLoc[1]).toHaveAttribute('src', 'https://pwo-wiki.info/images/5/5b/Pp.gif');
  });
  it('Verifique se o usuário pode favoritar um pokémon na página de detalhes', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/pokemons/4');
    const check = screen.getByRole('checkbox', {
      checked: false, name: 'Pokémon favoritado?' });
    userEvent.click(check);
    history.push('/favorites');
    const charmander = screen.getByTestId('pokemon-name');
    expect(charmander).toHaveTextContent('Charmander');
    history.push('/pokemons/4');
    const checkTrue = screen.getByRole('checkbox',
      { checked: true, name: 'Pokémon favoritado?' });
    userEvent.click(checkTrue);
    history.push('/favorites');
    expect(charmander).not.toBeInTheDocument();
  });
});
