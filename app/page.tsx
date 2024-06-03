"use client";
import { getTweets } from "./actions";
import ListTweets from "@/components/list-tweets";
import { useState, useEffect } from "react";
import { Tweet } from "@prisma/client";
import FormButton from "@/components/form-button";
import AddTweet from "@/components/add-tweet";

export default function Tweets() {
  const [currentPage, setCurrentPage] = useState(1);
  const [tweets, setTweets] = useState<Tweet[]>([]);
  const itemsPerPage = 5;

  useEffect(() => {
    const fetchTweets = async () => {
      const data = await getTweets();
      setTweets(data);
    };

    fetchTweets();
  }, [currentPage]);
  const currentItems = tweets.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  return (
    <div className='h-screen flex flex-col  items-stretch mt-10 w-1/2 mx-auto'>
      {/* <FormButton title='트윗 작성' onClick={createTweet} /> */}
      <AddTweet />
      {currentItems.map((tweetContent) => (
        <ListTweets key={tweetContent.id} {...tweetContent} />
      ))}
      <div className='flex flex-row gap-4 items-center justify-center'>
        <FormButton title='이전 페이지' onClick={handlePrevPage} />
        <FormButton title='다음 페이지' onClick={handleNextPage} />
      </div>
    </div>
  );
}
