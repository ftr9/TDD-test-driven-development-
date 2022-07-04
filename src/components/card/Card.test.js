import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Card from './Card';

const cardProps = {
  name: 'Sydney',
  phone: '111-111-1111',
  email: 'ferlan@gmail.com',
  image: {
    uri: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8Y2F0fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=400&q=60',
    alt: 'beautiful cat',
  },
  favoured: false,
};

describe('Card', () => {
  test('must have a cat name', () => {
    render(<Card {...cardProps} original={[]} setOriginal={arg => {}} />);
    expect(screen.getByText(/Sydney/i)).toBeInTheDocument();
  });

  test('must have a cat phone', () => {
    render(<Card {...cardProps} original={[]} setOriginal={arg => {}} />);
    expect(screen.getByText(/111-111-1111/i)).toBeInTheDocument();
  });

  test('must have a cat email', () => {
    render(<Card {...cardProps} original={[]} setOriginal={arg => {}} />);
    expect(screen.getByText(/ferlan@gmail.com/i)).toBeInTheDocument();
  });

  test('must have an image', () => {
    render(<Card {...cardProps} original={[]} setOriginal={arg => {}} />);
    expect(screen.getByAltText(/beautiful cat/i).src).toBe(cardProps.image.uri);
  });

  test('must have outlined heart icon when favoured Props = false', () => {
    render(<Card {...cardProps} original={[]} setOriginal={arg => {}} />);
    expect(screen.getByRole('button').innerHTML).toBe(
      '<ion-icon name="heart-outline"></ion-icon>'
    );
  });

  test('must have outlined heart icon when favoured Props = true', () => {
    let props = { ...cardProps, favoured: true };
    render(<Card {...props} original={[]} setOriginal={arg => {}} />);
    expect(screen.getByRole('button').innerHTML).toBe(
      '<ion-icon name="heart"></ion-icon>'
    );
  });

  test('must render heart icon after clicking heart-outline button', () => {
    render(<Card {...cardProps} original={[]} setOriginal={arg => {}} />);
    userEvent.click(screen.getByRole('button'));
    expect(screen.getByRole('button').innerHTML).toBe(
      '<ion-icon name="heart"></ion-icon>'
    );
  });
  test('must render heart-outline icon after clicking heart button', () => {
    render(
      <Card
        {...cardProps}
        original={[]}
        setOriginal={arg => {}}
        favoured={true}
      />
    );
    userEvent.click(screen.getByRole('button'));
    expect(screen.getByRole('button').innerHTML).toBe(
      '<ion-icon name="heart-outline"></ion-icon>'
    );
  });
});
