import React from "react";
import styled, { StyleSheetManager } from 'styled-components'
import GrapesJS from 'grapesjs';
import gjsBasicBlocks from 'grapesjs-blocks-basic';

const id="gjs"
const Container = styled.div`
width: 100%;
min-height: 80vh;
border: 3px solid black;
.gjs-editor { 
width: 100%;
z-index: 9999;
min-height: 80vh;
}
`
class GEditor extends React.Component {
    constructor(props) {
      super(props)
      
    }
    handleChange(e) {
      this.props.onChange(e.target.value.split(',').map((e) => e.trim()));
    }
    componentDidMount() {
        
        window.grapesjs = GrapesJS
        let plugins = [
            gjsBasicBlocks,
          ];
          this.editor = GrapesJS.init({
            container: "#gjs",
            plugins
          }
          )
      document.getElementById(id).append(this.editor.render());
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