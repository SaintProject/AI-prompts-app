"use client"
import { useState, useEffect } from "react";
import debounce from 'lodash.debounce';

import PromptCard from "./PromptCard";

const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className="mt-16 prompt_layout">
      {data.map((post) => (
        <PromptCard 
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  )
}

const Feed = () => {
  const [posts, setPosts] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [searchedResults, setSearchedResults] = useState([]);
  
  const isEmptySearch = searchText === "";

  const debouncedSearch = debounce((term) => {
    const filteredPosts = posts.filter((post) => 
            post.creator.username.toLowerCase().includes(term.toLowerCase()) ||
            post.prompt.toLowerCase().includes(term.toLowerCase()) ||
            post.tag.toLowerCase().includes(term.toLowerCase())
        );
        setSearchedResults(filteredPosts);
  }, 300);


  const handleSearchChange = (e) => {
    const term = e.target.value;
    setSearchText(term);
    debouncedSearch(term);
  }

  const handleTagClick = (tag) => {
    setSearchText(tag);
    debouncedSearch(tag);
  }

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch("/api/prompt");
      const data = await response.json();

      setPosts(data);
    }

    fetchPosts();
  }, []);

  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input 
          type="text"
          placeholder="Seach for a tag or a username"
          value={searchText}
          onChange={handleSearchChange}
          required
          className="search_input peer"
        />
      </form>

      <PromptCardList 
        data={!isEmptySearch ? searchedResults : posts}
        handleTagClick={handleTagClick}
      />
    </section>
  )
}

export default Feed