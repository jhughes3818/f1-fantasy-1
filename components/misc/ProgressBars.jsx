export default function ProgressBars(props) {
  if (props.bars === 1) {
    return (
      <div className="flex w-56">
        <div className="w-1/3 h-1 rounded-full bg-blue-300 mx-1"></div>

        <div className="w-1/3 rounded-full bg-white border border-blue-300 mx-1"></div>
        <div className="w-1/3 rounded-full bg-white border border-blue-300 mx-1"></div>
      </div>
    );
  } else if (props.bars === 2) {
    return (
      <div className="flex w-56">
        <div className="w-1/3 h-1 rounded-full bg-blue-300 mx-1"></div>
        <div className="w-1/3 rounded-full bg-blue-300 mx-1"></div>

        <div className="w-1/3 rounded-full bg-white border border-blue-300 mx-1"></div>
      </div>
    );
  } else if (props.bars === 0) {
    return (
      <div className="flex w-56">
        <div className="w-1/3 h-1 rounded-full bg-white border border-blue-300 mx-1"></div>
        <div className="w-1/3 rounded-full bg-white border border-blue-300 mx-1"></div>
        <div className="w-1/3 rounded-full bg-white border border-blue-300 mx-1"></div>
      </div>
    );
  }
}
