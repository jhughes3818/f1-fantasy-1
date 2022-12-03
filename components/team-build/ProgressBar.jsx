export default function ProgressBar(props) {
  return (
    <div className="pb-4">
      <div className=" w-80 h-11 items-center grid relative box-styling">
        <div className="static">
          <h1 className="text-center absolute top-2 px-2">{props.text}</h1>
        </div>
      </div>
    </div>
  );
}
