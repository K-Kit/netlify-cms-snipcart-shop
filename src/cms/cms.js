import $ from 'jquery'
import React, {createClass} from 'react'
import CMS from 'netlify-cms'
import '@material-ui/core'

import AboutPagePreview from './preview-templates/AboutPagePreview'
import ProductPreview from './preview-templates/ProductPreview'
import styled, { StyleSheetManager } from 'styled-components'
// import GEditor from './GEditor'
import GEditor from "grapesjs-react"
import 'grapesjs/dist/css/grapes.min.css';

class GE extends React.Component {
  componentDidMount() {

    var link = document.createElement( "link" );
    link.href = "https://unpkg.com/grapesjs/dist/css/grapes.min.css"
    link.type = "text/css";
    link.rel = "stylesheet";
    link.media = "screen,print";

    document.getElementsByTagName( "head" )[0].appendChild( link );
  }
  x = <GEditor blocks={[]} />
  render() {
    return this.x
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

  
CMS.registerWidget('grape', props => Wrapped(GE, {...props, blocks:[]}));
