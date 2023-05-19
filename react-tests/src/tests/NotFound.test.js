import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('', () => {
  it('Verifica se a página contém um h2 com o texto Page requested not found', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/url-inexistente');
    const titleNotFoundEl = screen.getByRole('heading', {
      level: 2, name: 'Page requested not found Crying emoji' });
    expect(titleNotFoundEl).toBeInTheDocument();
  });

  it('Verifica se a página contém a seguinte imagem: "https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif"', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/url-inexistente');
    const notFoundEl = screen.getByRole('img', {
      name: /pikachu crying because the page requested was not found/i });
    expect(notFoundEl.src).toContain('ttps://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
