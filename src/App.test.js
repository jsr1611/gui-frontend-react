import { render, screen } from '@testing-library/react';
import App from './App';

test('GUI page', () => {
  render(<App />);
  const linkElement = screen.getByText(/Reset/i);
  expect(linkElement).toBeInTheDocument();
});
