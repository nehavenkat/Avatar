import React, { useState } from "react";
import Avatars from "./Avatar";
import 'bootstrap/dist/css/bootstrap.min.css';


const App = () => {
  const [Attributes, setAttributes] = useState({
    topType: "LongHairStraight2",
    accessoriesType: "Blank",
    hairColor: "BrownDark",
    facialHairType: "Blank",
    clotheType: "ShirtVNeck",
    clotheColor: "Red",
    eyeType: "Side",
    eyebrowType: "Default",
    mouthType: "Smile",
    avatarStyle: "Transparent",
    skinColor: "Light",
  });
  return (
    <div>
      <Avatars value={Attributes} onChange={setAttributes} />
    </div>
  );
};

export default App;
