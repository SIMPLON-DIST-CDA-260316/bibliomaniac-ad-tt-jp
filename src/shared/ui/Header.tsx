import logo from "../../assets/logo_biblio.png"

export default function Header() {
  return (
    <>
      <div className="w-full bg-primary flex justify-center pt-6">
        <img src={logo} alt="image du logo" className="h-18"/>
      </div>
    </>
  );
}
