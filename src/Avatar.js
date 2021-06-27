import React, { useState, useRef, useEffect } from "react";
import ReactDOM from "react-dom";
import { Piece } from "avataaars";
import Avatar from "avataaars";
import map from "lodash/map";
import FileSaver from "file-saver";
import options from "./options";
import {Button,ColorContainer,StyledAvatar,Pieces,Color,None} from "./style";
import { Container, Row , Col, Card, Tab ,Nav} from 'react-bootstrap';

export default function Avatars(props) {
  const canvasRef = useRef(null);
  const avatarRef = useRef(null);
  const [selectedTab, setSelectedTab] = useState("skinColor");
  const [savedAvatar, setSavedAvatar] = useState([]);
  
  useEffect(() =>{
    getSavedAvatar();
  },[]) // calling the function here

  const pieceClicked = (attr, val) => {
    var newAttributes = {
      ...props.value,
      [attr]: val,
    };
    if (props.onChange) {
      props.onChange(newAttributes);
    }
  };// when ever we try to change the color or hair style we are using the Props value

  const triggerDownload = (imageBlob, fileName) => {
    FileSaver.saveAs(imageBlob, fileName);
  };
// the file is downloded as an png image but saving it as SVG

  const onDownloadPNG = () => {
    const svgNode = ReactDOM.findDOMNode(avatarRef.current);
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const anyWindow = window;
    const DOMURL = anyWindow.URL || anyWindow.webkitURL || window;

    const data = svgNode.outerHTML;
    const img = new Image();
    const svg = new Blob([data], { type: "image/svg+xml" });
    const url = DOMURL.createObjectURL(svg);

    saveAvatarImg(data);// storing in the local database( local storage we can store upto 5mb)

    img.onload = () => {
      ctx.save();
      ctx.scale(2, 2);
      ctx.drawImage(img, 0, 0);
      ctx.restore();
      DOMURL.revokeObjectURL(url);
      canvasRef.current.toBlob((imageBlob) => {
        triggerDownload(imageBlob, "avatar.png");
      });
    };
    img.src = url;
  };

  const getSavedAvatar = () => {
    let temp=[];
    if(localStorage.getItem('savedAvatar')){
      temp=JSON.parse(localStorage.getItem('savedAvatar'));
      setSavedAvatar(temp);
    }
  }; // to get the previouslly saved avatar even after we refresh the browser

  const saveAvatarImg = (svg) => {
    let temp=[];
    if(localStorage.getItem('savedAvatar')){
      temp=JSON.parse(localStorage.getItem('savedAvatar'));
      temp.push({img:svg, id:(temp.length+1)});
    }else{
      temp.push({img:svg, id:(temp.length+1)});
    }
    setSavedAvatar(temp);
    localStorage.setItem('savedAvatar', JSON.stringify(temp));
  };// we are saving the new avatar image 

  return (
    <Container fluid="md" style={{marginTop:100}}>
      <Card>
      <Row className="justify-content-md-center mt-3">
          <Col xs md={6}></Col>
          <Col md="auto"  className="text-right">
              <Button size="sm" onClick={onDownloadPNG} style={{minWidth:100, fontSize:16, backgroundColor:'green'}} variant="danger">Save</Button>{' '}
          </Col>
      </Row>

        <Row className="justify-content-md-center">
          <Col xs lg="2"></Col>
          <Col md="auto">
            <StyledAvatar>
              <Avatar
                ref={avatarRef}
                style={{ width: "200px", height: "200px" }}
                {...props.value}
              />{/* the image which is coming from the Avatar plugin*/}
              
            </StyledAvatar>
          </Col>
          <Col xs lg="2"></Col>
        </Row>


        <Row className="justify-content-md-center">
          <Col xs md="2"></Col>
          <Col md="8">

          <Tab.Container id="left-tabs-example" defaultActiveKey={'Head'}>
              <Row>
                <Col md={3}>
                  <Nav variant="pills" className="flex-column">
                      {map(options, (option) => {
                        return (
                          <Nav.Item key={`nav-${Math.floor(Math.random() * (1000 - 3) + 3)}`} onClick={() => setSelectedTab(option.type)}  type={option.type}>
                            <Nav.Link eventKey={option.label}>{option.label}</Nav.Link>
                          </Nav.Item>
                        );
                      })} {/* Keys help React identify which items have changed, are added, or are removed. Keys should be given to the elements inside the array to give the elements a stable identity */}
                    
                    <Nav.Item key={`nav-last-${Math.floor(Math.random() * (1000 - 2) + 2)}`}>
                      <Nav.Link eventKey="savedAvatar">Saved Avatar</Nav.Link>
                    </Nav.Item>
                  </Nav>
                </Col>
                <Col md={9}>
                  <Tab.Content>
                    {options.map((item, k) => (
                      <>
                      <Tab.Pane eventKey={item.label}>
                         {item.hatColors && item.hats.indexOf(props.value.topType) !== -1 && props.value.topType !== "Hat" && map(item.hatColors, (color, colorName) => {
                              return (
                                <Color
                                  key={`tab-pane-${Math.floor(Math.random() * (1000 - 1) + 1)}`}
                                  style={{
                                    backgroundColor: color,
                                    border:
                                      color === "#FFFFFF"
                                        ? "1px solid #ccc"
                                        : "1px solid " + color,
                                  }}
                                  onClick={() => pieceClicked("hatColor", colorName)}
                                ></Color>
                              );
                            })} {/* to change the color of the skin */}

                            {item.values.map((val) => {
                              var attr = {};
                              attr[item.attribute] = val;
                              if (item.transform) {
                                attr.style = { transform: item.transform };
                              }
                              return (
                                <Pieces key={`hair-${Math.floor(Math.random() * (1000 - 1) + 1)}`} onClick={() => pieceClicked(item.attribute, val)}>
                                 <Piece pieceSize="50" pieceType={item.type} {...attr} />
                                  {(val === "Blank" || val === "NoHair") && (
                                    <None>(None)</None>
                                  )}
                                </Pieces>
                              );
                            })}  {/* getting the styles to be changed to the avatar from the Pieces plugin */}
                      </Tab.Pane>

                       {item.colors && (item.type !== "top" || item.hats.indexOf(props.value.topType) === -1) && props.value.topType !== "Eyepatch" &&  props.value.topType !== "LongHairShavedSides" && props.value.topType !== "LongHairFrida" && (
                          <Tab.Pane eventKey={item.label}>
                            <ColorContainer className="float-left">
                              {map(item.colors, (color, colorName) =>(
                                <Color
                                  key={`color-${Math.floor(Math.random() * (1000 - 1) + 1)}`}
                                  style={{
                                    backgroundColor: color,
                                    margin:'5px',
                                    height:'35px',
                                    width:'35px',
                                    borderRadius:'100px',
                                    border:
                                      color === "#FFFFFF"
                                        ? "1px solid #ccc"
                                        : "1px solid " + color,
                                  }}
                                  onClick={() =>
                                    pieceClicked(item.colorAttribute, colorName)
                                  }></Color>
                              ))}{/*changing the color of the hair*/}
                            </ColorContainer>
                          </Tab.Pane>
                        ) }
                        </>
                    ))}

                    <Tab.Pane eventKey="savedAvatar">
                      <Row>
                        {savedAvatar.map((item, index)=>(
                            <Col key={`abc-${Math.floor(Math.random() * (1000 - 2) + 2)}`} md={2}>
                              <div className="genrated-avatar" dangerouslySetInnerHTML={{__html: item.img}}></div>
                            </Col>
                        ))}
                        {/*the saved images are place here*/}
                      </Row>     
                    </Tab.Pane>
                  </Tab.Content>
                </Col>
              </Row>
            </Tab.Container>
          </Col>
          <Col xs lg="2"></Col>
        </Row>

        <br />
        <br />
        <br />
        <br />
        <br />

      </Card>
      <canvas
        style={{ display: "none" }}
        width="528"
        height="560"
        ref={canvasRef}
      /> 
      {/* with the help of canvas we are generating png image*/}
    </Container>
  );
}
