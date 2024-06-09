"use client";
import { getTweets } from "./actions";
import ListTweetRow from "@/components/list-tweet-row";
import { useState, useEffect } from "react";
import { Tweet } from "@prisma/client";
import ButtonForm from "@/components/button-form";
import ButtonLogOut from "@/components/button-logout";
import ButtonLink from "@/components/button-link";

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
    <div className='h-screen flex flex-col items-stretch mt-10 w-1/2 mx-auto'>
      <div className='flex flex-row gap-2 justify-center items-center mb-5'>
        <ButtonLink url='/tweets/add-tweet' name='트위작성' />
        <ButtonLogOut />
      </div>
      {currentItems.map((tweetContent) => (
        <ListTweetRow key={tweetContent.id} {...tweetContent} />
      ))}
      <div className='flex flex-row gap-4 items-center justify-center'>
        <ButtonForm title='이전 페이지' onClick={handlePrevPage} />
        <ButtonForm title='다음 페이지' onClick={handleNextPage} />
      </div>
    </div>
  );
}
