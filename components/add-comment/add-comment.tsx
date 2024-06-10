// "use client";
"use server";
import ButtonForm from "@/components/button-form";
// import { useFormState } from "react-dom";
import LoginUser from "@/components/login-user";
import { CreateComment } from "./actions";

interface AddCommentProps {
  tweetId: number;
}

export default async function AddComment({ tweetId }: AddCommentProps) {
  // const [state, action] = useFormState(CreateComment, null);
  return (
    <div className="flex flex-col items-center justify-center w-full mx-auto">
      <form action={CreateComment} className="w-full flex flex-col gap-3">
        <LoginUser />
        <input type="hidden" name="tweetId" value={tweetId} />
        <textarea
          className="w-full h-24 border-2 border-gray-300 rounded-md p-2 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          id="comment"
          name="comment"
          required
          placeholder="댓글을 작성하세요."
          rows={2}
        ></textarea>
        <div className="flex flex-row gap-3 w-full">
          <ButtonForm title="댓글 작성" />
        </div>
      </form>
    </div>
  );
}
