import React, { useState } from "react";
import styled from "styled-components";

const SearchContainer = styled.div`
  margin: 20px 0;
`;

const SearchInput = styled.input`
  padding: 10px;
  font-size: 16px;
  margin-right: 10px;
  border-radius: 5px;
`;

const SearchButton = styled.button`
  padding: 10px;
  font-size: 16px;
  cursor: pointer;
  border-radius: 5px;
  margin: 5px 0px;
`;

const CitySearch = ({ setCity }) => {
  const [input, setInput] = useState("");

  const handleSearch = () => {
    setCity(input);
    setInput("");
  };

  return (
    <SearchContainer>
      <SearchInput
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter city name"
      />
      <SearchButton onClick={handleSearch}>Search</SearchButton>
    </SearchContainer>
  );
};

export default CitySearch;
