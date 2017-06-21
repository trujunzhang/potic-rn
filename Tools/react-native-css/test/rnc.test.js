import tap from 'babel-tap';
import expect from 'expect';
import reactNativeCSS from '../src/index';

tap.test('Parse CSS', (t) => {
  const data = reactNativeCSS`
    post-title {
          line-height: 22px;
          font-weight: 600;
          font-style: normal;
          color: #000000;
          font-size: 16px;
    }
    post_description {
    line-height: 24px;
    font-weight: 400;
    font-style: normal;
    font-size: 14px;
    color: #656565;
}
  `;

  console.log('data: ' + JSON.stringify(data));

  t.end();
});

