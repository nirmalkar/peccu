import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';

import Card from './index';

jest.mock('next/link', () => {
  return function LinkMock({
    children,
    href,
  }: {
    children: React.ReactNode;
    href: string;
  }) {
    return (
      <a href={href} data-testid="link-mock">
        {children}
      </a>
    );
  };
});

describe('Card Component', () => {
  test('check for title, content, and button in card component', () => {
    render(
      <Card title="Test Title" content="Test Content" buttonText="Click Me" />
    );

    const title = screen.getByText(/Test Title/i);
    expect(title).toBeInTheDocument();
    const content = screen.getByText(/Test Content/i);
    expect(content).toBeInTheDocument();
    const button = screen.getByRole('button', { name: /Click Me/i });
    expect(button).toBeInTheDocument();
  });

  test('check handleClick function', () => {
    const handleClick = jest.fn();

    render(<Card buttonText="Click Me" onButtonClick={handleClick} />);

    const button = screen.getByRole('button', { name: /Click Me/i });
    fireEvent.click(button);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test('with custom styles', () => {
    const customStyles = {
      cardContainer: { backgroundColor: 'red' },
      title: { color: 'blue' },
      button: { border: '1px solid black' },
    };

    const { container } = render(
      <Card
        title="Styled Title"
        buttonText="Styled Button"
        customStyles={customStyles}
      />
    );
    expect(container.firstChild).toHaveStyle('background-color: red');

    const title = screen.getByText(/Styled Title/i);
    expect(title).toHaveStyle('color: blue');

    const button = screen.getByRole('button', { name: /Styled Button/i });
    expect(button).toHaveStyle('border: 1px solid black');
  });

  test('card without image', () => {
    render(<Card title="No Image Title" content="This card has no image." />);
    const title = screen.getByText(/No Image Title/i);
    expect(title).toBeInTheDocument();
    const image = screen.queryByRole('img');
    expect(image).toBeNull();
  });
});
