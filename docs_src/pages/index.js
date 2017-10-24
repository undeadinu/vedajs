import Layout from '../components/layout';
import body from './index.md';
import shader from './index.frag';

const article = { body, shader };

export default () => (
  <Layout article={article}/>
);
