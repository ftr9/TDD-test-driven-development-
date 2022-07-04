import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import cats from '../../mocks/cats.json';
import Cards from './Cards';

describe('Cards', () => {
  test('should render 5 card components', () => {
    render(<Cards cats={cats} />);

    const cardsComponentList = screen.getAllByRole('article');
    expect(cardsComponentList.length).toBe(5);
  });
});
