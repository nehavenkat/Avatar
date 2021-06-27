import styled, { css } from "styled-components";

export const Pieces = styled.div(
  () => css`
    display: inline-block;
    position: relative;
    overflow: hidden;

    :hover {
      background-color: #cce5ff;
      cursor: pointer;
    }
  `
);

export const Color = styled.div(
  () => css`
    display: inline-block;
    height: 26px;
    width: 23px;
    cursor: pointer;

    [color="#FFFFFF"] {
      border: 1px solid #ccc;
    }
  `
);

export const None = styled.div(
  () => css`
    opacity: 0.2;
    font-size: 11px;
    position: absolute;
    top: 20px;
    left: 9px;
  `
);

export const StyledAvatar = styled.div(
  () => css`
    display: block;
    width: 315px;
    height: 235px;
    padding-left: 20px;
  `
);


export const ColorContainer = styled.div(
  () => css`
    display: flex;
    align-items: center;
    justify-items: center;
    flex-wrap: wrap;
    align-content: center;
    justify-content: center;
  `
);



export const Button = styled.button(
  () => css`
    border-radius: 7px;
    color: #e6e6ee;
    background-color: #001f3f;
    border: 1px solid transparent;
    padding: 5px 7px;
    font-size: 20px;
    letter-spacing: 0.6px;
    margin: 0 5px;
    cursor: s-resize;
    :active {
      cursor: progress;
    }
    :hover {
      text-decoration: none;
      color: #fff;
    }
    > svg {
      fill: #e6e6ee;
      height: 20px; 
    }
    > svg:hover {
      color: #fff;
    }
  `
);
