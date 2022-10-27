export default function TeamPill(props) {
  return (
    <select
      className="border border-grey shadow-lg w-36 px-2 h-9 rounded-full items-center"
      onChange={props.handleChange}
    >
      <option value="mer">Mercedes</option>
      <option value="fer">Ferrari</option>
      <option value="rbr">Red Bull</option>
      <option value="mcl">McLaren</option>
      <option value="amr">Aston Martin</option>
      <option value="atr">Alpha Tauri</option>
      <option value="ars">Alfa Romeo</option>
      <option value="wil">Williams</option>
      <option value="haa">Haas</option>
      <option value="alp">Alpine</option>
    </select>
  );
}
