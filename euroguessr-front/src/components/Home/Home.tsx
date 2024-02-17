import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="grid grid-cols-2 gap-2">
      <Link to="/play">Play page</Link>
      <div></div>
      <div className="bg-white text-black font-eurotype">Eurotype</div>
      <div className="bg-white text-black font-roboto">Roboto</div>
      <div className="bg-yellow">yellow</div>
      <div className="bg-yellow-light">yellow-light</div>
      <div className="bg-purple">purple</div>
      <div className="bg-purple-light">purple-light</div>
      <div className="bg-pink">pink</div>
      <div className="bg-orange">orange</div>
      <div className="bg-blue">blue</div>
      <div className="bg-gray">gray</div>
    </div>
  );
}