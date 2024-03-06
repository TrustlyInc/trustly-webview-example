import { render, waitFor } from '@testing-library/react';
import App from './App';

jest.mock('./utils/sdk', () => ({
  exposeEnvVariables: jest.fn(),
  loadScript: jest.fn((callback) => callback()),
}));

jest.mock('./utils/signature', () => ({
  getRequestSignature: jest.fn(() => 'mocked-signature'),
}));

describe('App Component', () => {
  test('loads sdk and exposes environment variables on mount', async () => {
    render(<App />);

    await waitFor(() => {
      expect(require('./utils/sdk').exposeEnvVariables).toHaveBeenCalled();
    });

    await waitFor(() => {
      expect(require('./utils/sdk').loadScript).toHaveBeenCalled();
    });
  });
});
