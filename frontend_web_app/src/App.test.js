import { render, screen } from '@testing-library/react';
import App from './App';

test('renders app header title', () => {
  render(<App />);
  const title = screen.getByText(/Daily Word Guess/i);
  expect(title).toBeInTheDocument();
});
