function teamBasePrice(team) {
  switch (team) {
    case "Mercedes":
      return 100;
    case "Ferrari":
      return 90;
    case "Red Bull":
      return 80;
    case "Alpine F1 Team":
      return 70;
    case "McLaren":
      return 60;
    case "Aston Martin":
      return 50;
    case "Alfa Romeo":
      return 40;
    case "Haas F1 Team":
      return 30;
    case "Williams":
      return 20;
    case "Alpha Tauri":
      return 10;
    default:
      return 0;
  }
}
