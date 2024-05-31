"use client";
import Link from "next/link";
import { getTweets } from "./actions";
import { korFormatDate } from "@/lib/utils";
import ListTweets from "@/components/list-tweets";
import { useState, useEffect } from "react";
import { Tweet } from "@prisma/client";
import FormButton from "@/components/form-button";

export default function Tweets() {
  // const tweets = await getTweets();
  const [currentPage, setCurrentPage] = useState(1);
  const [tweets, setTweets] = useState([]);
  const itemsPerPage = 5; // 원하는 페이지당 항목 수를 설정합니다.

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
    <div className='h-screen flex flex-col justify-start mt-36'>
      {currentItems.map((tweetContent, index) => (
        <ListTweets key={index} {...tweetContent} />
      ))}
      <div className='flex flex-row gap-4 items-center justify-center'>
        <FormButton title='이전 페이지' onClick={handlePrevPage} />
        <FormButton title='다음 페이지' onClick={handleNextPage} />
      </div>
      {/* <button onClick={handlePrevPage}>이전 페이지</button>
      <button onClick={handleNextPage}>다음 페이지</button> */}
    </div>
  );
}
