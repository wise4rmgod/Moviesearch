import React from "react";
import { render, fireEvent } from "@testing-library/react";
import MovieSearch from "./MovieSearch";

// Mock the fetch function to return a resolved Promise with dummy data
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ results: [] }),
    ok: true,
  })
);

test("handleSearch fetches movies correctly", async () => {
  const { getByRole, findByText } = render(<MovieSearch />);

  const searchInput = getByRole("textbox");
  fireEvent.change(searchInput, { target: { value: "John Wick" } });

  const searchButton = getByRole("button", { name: /search/i });
  fireEvent.click(searchButton);

  // Wait for the loading message to disappear
  await findByText("No movies found", { exact: false });

  expect(fetch).toHaveBeenCalledWith(
    expect.stringContaining(
      "https://api.themoviedb.org/3/search/movie?query=John%20Wick&api_key="
    )
  );
});

test("openModal and closeModal functions work correctly", () => {
  const { getByText, queryByText } = render(<MovieSearch />);

  const movieData = {
    id: 1,
    title: "Test Movie",
    release_date: "2023-01-01",
    poster_path: "/test-poster.jpg",
    overview: "Test movie overview.",
  };

  // Open modal
  fireEvent.click(getByText(movieData.title));
  expect(getByText(movieData.overview)).toBeInTheDocument();

  // Close modal
  fireEvent.click(getByText("Close"));
  expect(queryByText(movieData.overview)).not.toBeInTheDocument();
});
