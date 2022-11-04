import Link from "next/link";

export default function CreateLeague() {
  return (
    // <div>
    //   <label className="block text-2xl font-bold text-center mb-3">
    //     League Name
    //   </label>
    //   <input
    //     placeholder="Enter league name"
    //     className="block mb-3 box-styling px-2 w-56 text-center"
    //   ></input>
    //   <button className="button-styling">
    //     <span>Create League</span>
    //   </button>
    // </div>
    <div className="">
      <h1 className="text-3xl font-bold text-center mb-3">Your League</h1>
      <h2 className="text-2xl mb-3">League Name: Test League</h2>
      <h2 className="text-2xl mb-3">League Code: 12345</h2>
      <h3 className="text-xl mb-3">Share league code with friends.</h3>
      <div className="grid place-items-center">
        <Link href="/">
          <span className="button-styling cursor-pointer">
            Return to Dashboard
          </span>
        </Link>
        {/* <button className="button-styling">
          <span>Return to Dashboard</span>
        </button> */}
      </div>
    </div>
  );
}
