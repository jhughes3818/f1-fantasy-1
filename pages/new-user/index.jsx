import Link from "next/link";

export default function Welcome() {
  return (
    <div className="grid place-items-center h-screen">
      <div className="w-80">
        <h1 className="text-2xl">Hello 👋</h1>
        <h2 className="pb-4">Let&apos;s go racing.</h2>
        <p className="text-gray-600">
          We&apos;ll start by building a team.
          <br />
          <br />
          You have $30m to spend on drivers.
          <br />
          <br />
          Each race, your drivers will earn points. The price of each driver
          will also go up or down based on their performance.
          <br />
          <br />
          You can build your budget by selling drivers for a profit.
        </p>
        <Link href="/">
          <div className="box-styling bg-blue-500 text-white font-bold text-center mt-4 cursor-pointer">
            <span>Next</span>
          </div>
        </Link>
      </div>
    </div>
  );
}
