import { TailSpin, Oval } from "react-loader-spinner";
//import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

export default function Load() {
  return (
    <div className="box-styling bg-blue-500 w-56 text-center">
      <div className="grid place-items-center">
        {/* <TailSpin
          height="20"
          width="20"
          color="#fffff"
          ariaLabel="tail-spin-loading"
          radius="1"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
        /> */}
        <Oval
          height={20}
          width={20}
          color="#ffffff"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
          ariaLabel="oval-loading"
          secondaryColor="#e9e9e9"
          strokeWidth={2}
          strokeWidthSecondary={2}
        />
      </div>
    </div>
  );
}
