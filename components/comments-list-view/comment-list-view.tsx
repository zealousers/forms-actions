"use client";
import { useEffect, useState } from "react";
import { getComments } from "./actions";
import { Comment } from "@prisma/client";
import ButtonForm from "@/components/button-form";
import ListCommentRow from "@/components/list-comment-row";

interface CommentsListViewsProps {
  tweetId: number;
}

export default function CommentsListViews({ tweetId }: CommentsListViewsProps) {
  // const [currentPage, setCurrentPage] = useState(1);
  const [comment, setComment] = useState<Comment[]>([]);
  // const itemsPerPage = 10;
  useEffect(() => {
    const fetchComments = async () => {
      const data = await getComments(tweetId);
      setComment(data);
    };
    fetchComments();
  }, [tweetId]);
  // }, [currentPage, tweetId]);
  // const currentItems = comment.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  // const handlePrevPage = () => {
  //   setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  // };
  // const handleNextPage = () => {
  //   setCurrentPage((prevPage) => prevPage + 1);
  // };
  // console.log(currentItems);

  return (
    <div className='h-screen flex flex-col items-stretch mt-5 w-full mx-auto '>
      {/* {currentItems.map((commentContent) => ( */}
      {comment.map((commentContent) => (
        <ListCommentRow key={commentContent.id} {...commentContent} />
      ))}
      {/* <div className='flex flex-row gap-4 items-center'>
        <ButtonForm title='이전 댓글' onClick={handlePrevPage} />
        <ButtonForm title='다음 댓글' onClick={handleNextPage} />
      </div> */}
    </div>
  );
}
