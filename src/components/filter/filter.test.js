import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Filter from './Filter';

describe('Selection Option', () => {
  test('should be albe to select choice', () => {
    render(
      <Filter onSelectGenderCats={() => {}} onSelectFavoured={() => {}} />
    );
    const selectField = screen.getByLabelText('favourite');
    expect(selectField.value).toBe('Any');

    userEvent.selectOptions(selectField, 'favoured');
    expect(selectField.value).toBe('favoured');

    userEvent.selectOptions(selectField, 'not favoured');
    expect(selectField.value).toBe('not favoured');
  });

  test('should be able to select gender', () => {
    render(
      <Filter onSelectGenderCats={() => {}} onSelectFavoured={() => {}} />
    );

    const filterOptions = screen.getByLabelText(/selectGender/i);

    expect(filterOptions.value).toBe('Any');

    userEvent.selectOptions(filterOptions, 'male');
    expect(filterOptions.value).toBe('male');

    userEvent.selectOptions(filterOptions, 'female');
    expect(filterOptions.value).toBe('female');
  });
});
