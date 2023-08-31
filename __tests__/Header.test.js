import React from 'react';
import { render, screen } from '@testing-library/react';
import Header from '../components/Header/Header';

test('it renders without crashing', () => {
    render(<Header />);
});

test('it displays the username when a user is provided', () => {
    const userMock = { displayName: 'JohnDoe' };
    render(<Header user={userMock} />);
    expect(screen.getByText('JohnDoe')).toBeInTheDocument();
});