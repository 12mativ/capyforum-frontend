import PostItem from "../components/PostItem";
import Link from "next/link";

export default function Home() {
  return (
    <div
      className='
      flex
      flex-col
      w-full
      h-full
      items-center
      justify-center
    '
    >
      <p>Where did you get to?</p>
      <p>You got into...</p>
      <p className='text-2xl'>CAPYBARA FORUM</p>
      <Link href={'/auth'} className='text-2xl underline'>
        Log in page
      </Link>
    </div>
  )
}
