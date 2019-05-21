import React from "react";
import styled, { StyleSheetManager } from 'styled-components'

import GrapesJS from 'grapesjs';
import gjsBasicBlocks from 'grapesjs-blocks-basic';


const id="gjs"
const Container = styled.div`
width: 100%;
min-height: 80vh;
border: 3px solid black;

`
class GEditor extends React.Component {
    constructor(props) {
      super(props)
      
    }
    handleChange(e) {
      this.props.onChange(e.target.value.split(',').map((e) => e.trim()));
    }
    componentDidMount() {

      var link = document.createElement( "link" );
      link.href = "https://unpkg.com/grapesjs/dist/css/grapes.min.css"
      link.type = "text/css";
      link.rel = "stylesheet";
      link.media = "screen,print";

      document.getElementsByTagName( "head" )[0].appendChild( link );
        
        window.grapesjs = GrapesJS
        let plugins = [
            gjsBasicBlocks,
          ];
          this.editor = GrapesJS.init({
            container: "#gjs",
            plugins
          }
          )
      // document.getElementById(id).append(this.editor.render());
      this.editor.render()
    }
    render() {
      return (
        <Container>
           <Container id="gjs" > </Container>
           </Container>
      )
    }
  }

export default GEditor