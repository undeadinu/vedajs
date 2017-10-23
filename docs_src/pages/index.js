import React from 'react';
import Helmet from 'react-helmet';
import { throttle } from 'lodash';
import marked from 'marked';
marked.setOptions({
  gfm: true,
  tables: true,
  breaks: true,
});

import article from './index.md';
const articleHtml = marked(article);

export default class Canvas extends React.Component {
  componentDidMount() {
    const Veda = require('vedajs');
    this.veda = new Veda({
      pixelRatio: 2,
      frameskip: 2,
    });
    this.veda.setCanvas(this.canvas);
    this.veda.loadFragmentShader(`
      precision mediump float;
      uniform float time;
      uniform vec2 mouse;
      uniform vec2 resolution;

      void main() {
        vec2 uv = gl_FragCoord.xy / resolution.xy;
        gl_FragColor = vec4(uv,0.5+0.5*sin(time),1.0);
      }
    `);
    this.veda.play();

    window.addEventListener('resize', this.resize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.resize);
  }

  resize = throttle(() => {
    this.veda.resize(this.container.offsetWidth, this.container.offsetHeight);
  })

  setContainer = el => {
    this.container = el;
  }

  setCanvas = el => {
    this.canvas = el;
  }

  render() {
    return (
      <div>
        <Helmet>
          <meta name="viewport" content="width=device-width, initial-scale=1"/>
        </Helmet>
        <style jsx>{`
          .body {
            position: absolute;
            z-index: 2;
            width: 100%;
          }
          article {
            width: 600px;
            max-width: 90%;
            margin: 0 auto;
            color: white;
            text-shadow: 0 0 10px #000;
          }
          .container {
            position: fixed;
            height: 100%;
            width: 100%;
            background: black;
          }
          .canvas {
            position: absolute;
            height: 100%;
            width: 100%;
            opacity: 0.5;
          }
        `}</style>
        <style global jsx>{`
          body {
            margin: 0;
            padding: 0;
          }
          pre {
            padding: 10px;
            background: #333;
          }
        `}</style>
        <div className="body">
          <article dangerouslySetInnerHTML={{ __html: articleHtml }}/>
        </div>
        <div className="container" ref={this.setContainer}>
          <canvas className="canvas" ref={this.setCanvas}/>
        </div>
      </div>
    );
  }
}
