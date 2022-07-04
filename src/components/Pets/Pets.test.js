import { render, screen, within } from '@testing-library/react';
import Pets from './Pets';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import cats from '../../mocks/cats.json';
import userEvent from '@testing-library/user-event';

const server = setupServer(
  rest.get('http://localhost:4050/cats', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(cats));
  })
);

beforeAll(() => {
  server.listen();
});

afterEach(() => {
  server.resetHandlers();
});

afterAll(() => {
  server.close();
});

describe('Pets component', () => {
  test('should have rendered all its parent...', async () => {
    render(<Pets />);
    expect(screen.getByLabelText(/favourite/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/selectGender/i)).toBeInTheDocument();
    expect((await screen.findAllByRole('article')).length).toBe(5);
  });

  test('should filter for male cats', async () => {
    render(<Pets />);
    const cards = await screen.findAllByRole('article');
    const field = screen.getByLabelText(/selectGender/i);
    userEvent.selectOptions(field, 'male');
    setTimeout(async () => {
      const maleCards = await screen.findAllByRole('article');
      expect([cards[1], cards[3]]).toStrictEqual(maleCards);
    }, 1000);

    //expect([cards[1], cards[3]]).toStrictEqual(maleCards);
  });

  test('should filter for female cats', async () => {
    render(<Pets />);
    const cards = await screen.findAllByRole('article');
    const field = screen.getByLabelText(/selectGender/i);
    userEvent.selectOptions(field, 'female');
    const femaleCards = await screen.findAllByRole('article');
    expect([cards[0], cards[2], cards[4]]).toStrictEqual(femaleCards);
    //expect([cards[1], cards[3]]).toStrictEqual(maleCards);
  });

  test('should filter for male and female cats', async () => {
    render(<Pets />);
    const cards = await screen.findAllByRole('article');
    const field = screen.getByLabelText(/selectGender/i);
    userEvent.selectOptions(field, 'Any');
    const Cards = await screen.findAllByRole('article');
    expect(cards).toStrictEqual(Cards);
  });

  test('should filter the favoured one..', async () => {
    render(<Pets />);
    const cards = await screen.findAllByRole('article');
    const buttonFirst = within(cards[0]).getByRole('button');
    const buttonSecond = within(cards[4]).getByRole('button');

    userEvent.click(buttonFirst);
    userEvent.click(buttonSecond);

    userEvent.selectOptions(screen.getByLabelText(/favourite/i), 'favoured');

    expect([cards[0], cards[4]]).toStrictEqual(screen.getAllByRole('article'));
  });

  test('should filter the not favoured one..', async () => {
    render(<Pets />);
    const cards = await screen.findAllByRole('article');
    const buttonFirst = within(cards[0]).getByRole('button');
    const buttonSecond = within(cards[4]).getByRole('button');

    userEvent.click(buttonFirst);
    userEvent.click(buttonSecond);

    userEvent.selectOptions(
      screen.getByLabelText(/favourite/i),
      'not favoured'
    );

    expect([cards[0], cards[4]]).not.toStrictEqual(
      screen.getAllByRole('article')
    );
  });

  test('should filter the favoured one and male one', async () => {
    render(<Pets />);
    const cards = await screen.findAllByRole('article');
    const buttonFirst = within(cards[1]).getByRole('button');
    const buttonSecond = within(cards[3]).getByRole('button');

    userEvent.click(buttonFirst);
    userEvent.click(buttonSecond);

    userEvent.selectOptions(screen.getByLabelText(/favourite/i), 'favoured');

    userEvent.selectOptions(screen.getByLabelText(/selectGender/i), 'male');

    expect([cards[1], cards[3]]).toStrictEqual(screen.getAllByRole('article'));
  });
});
