import React from "react";
import "./App.css";
import MovieSearch from "./MovieSearch";

function App() {
  return (
    <MovieSearch />
    // <BrowserRouter>
    //   <Routes>
    //     <Route path="/" component={MovieSearch} />
    //     <Route path="/movie/:id" element={MovieDetails} />
    //     <Route path="/NotFound" element={NotFound} />
    //   </Routes>
    // </BrowserRouter>
  );
}

export default App;
