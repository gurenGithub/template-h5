import html from './test.html';
import Core from './template/core';
import './styles/index.scss';
class Page extends Core {
  constructor(data) {
    super(html, data);
  }
}
let page = new Page({});
page.render({
  $dom: document.body
});
