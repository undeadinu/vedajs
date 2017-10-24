import Layout from '../components/layout';
import body from './webcam.md';
import shader from './webcam.frag';

const attach = veda => {
  veda.setPixelRatio(4);
  veda.toggleCamera(true);
  veda.loadFragmentShader(shader);
};

const detach = veda => {
  veda.toggleCamera(false);
};

const article = { body, attach, detach };

export default () => (
  <Layout article={article}/>
);
