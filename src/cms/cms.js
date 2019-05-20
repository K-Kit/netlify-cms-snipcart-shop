import $ from 'jquery'
import React, {createClass} from 'react'
import CMS from 'netlify-cms'
import '@material-ui/core'

import AboutPagePreview from './preview-templates/AboutPagePreview'
import ProductPreview from './preview-templates/ProductPreview'
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
    let plugins = [
      gjsBasicBlocks,
    ];
    this.editor = GrapesJS.init({
      container: "#gjs",
      plugins
    }
    )
  }
  handleChange(e) {
    this.props.onChange(e.target.value.split(',').map((e) => e.trim()));
  }
  componentDidMount() {
    document && document.getElementById(id).append(this.editor.render());
  }
  render() {
    return (
      <Container>
         <Container id="gjs" > </Container>
         {/* <div id="blocks"></div> */}
         </Container>
    )
  }
}

//Component used to Enable netlify CMS to apply the styles added through styled-components
class CSSInjector extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      iframeRef: '',
    }
  }

  componentDidMount() {
    const iframe = document.getElementsByTagName('iframe')[0]
    const iframeHeadElem = iframe && iframe.contentDocument.head
    this.setState({ iframeRef: iframeHeadElem })
  }

  render() {
    return (
      <div>
        {this.state.iframeRef && (
          <StyleSheetManager target={this.state.iframeRef}>
            {this.props.children}
          </StyleSheetManager>
        )}
      </div>
    )
  }
}
const Wrapped = (Preview, props) => {
  return (
    <CSSInjector>
      <Preview {...props} />
    </CSSInjector>
  )
}

// CMS.registerPreviewTemplate('index', props => (
//   <CSSInjector>
//     <IndexPagePreview {...props} />{' '}
//   </CSSInjector>
// ))
CMS.registerPreviewTemplate('about', props => Wrapped(AboutPagePreview, props))
CMS.registerPreviewTemplate('products', props => Wrapped(ProductPreview, props))

  
CMS.registerWidget('grape', props => Wrapped(GEditor, props));
