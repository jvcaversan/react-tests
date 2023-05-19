import React from 'react';
import { screen } from '@testing-library/react';
import About from '../pages/About';
import renderWithRouter from '../renderWithRouter';

describe('Página About Pokedex', () => {
  beforeEach(() => {
    renderWithRouter(<About />);
  });

  it('Verifica se a página contém um heading h2 com o texto About Pokédex', () => {
    const elAbout = screen.getByRole('heading', { level: 2, name: /About Pokédex/i });
    expect(elAbout).toBeInTheDocument();
  });

  it('Teste se a página contém dois parágrafos com texto sobre a Pokédex', () => {
    const pAbout = screen.getAllByText(/About/i);
    expect(pAbout.length);
  });

  it('Verifica se a página contém a seguinte imagem de uma Pokédex: "https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png"', () => {
    const imgDex = screen.getByAltText('Pokédex');
    expect(imgDex.src).toContain('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
