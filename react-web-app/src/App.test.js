import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Trustly Pay Card', () => {
  render(<App />);
  const linkElement = screen.getByText(/Pay with Trustly/i);
  expect(linkElement).toBeInTheDocument();
});
