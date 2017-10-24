import Layout from '../components/layout';
import body from './audio.md';
import shader from './audio.frag';

const attach = veda => {
  veda.toggleAudio(true);
  veda.loadFragmentShader(shader);
};

const detach = veda => {
  veda.toggleAudio(false);
};

const article = { body, attach, detach };

export default () => (
  <Layout article={article}/>
);
