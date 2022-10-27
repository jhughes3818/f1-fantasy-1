export default function SelectButton(props) {
  return (
    <div className="static">
      <button
        className="bg-[#65B5FF] w-8 h-8 rounded-full text-center absolute right-2 bottom-2 drop-shadow-lg text-white my-0"
        onClick={props.function}
      >
        {props.isSelected === true ? (
          <span className="py-0 my-0 font-bold text-2xl">-</span>
        ) : (
          <span className="py-0 my-0 font-bold tex-2xl">+</span>
        )}
      </button>
    </div>
  );
}
