import './shin';

class Core {
  constructor(tempalte, data) {
    //this.name = './test.htm';
    this.tempalte = tempalte;
    this.data = data || {};
    let me = this;
    this.$refs={} 
    this._refs=[] //私有refs变量
    window[this.getKey()] = function (name) {

      //console.log(name);
      return me[name] ? me[name] : () => {


          console.log(`${name} not found!`)
      };
    }
  }

  getKey() {

    //用于生成uuid
    function S4() {
      return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    }

    function guid() {
      return `__${S4()+S4()+S4()+S4()+S4()+S4()+S4()+S4() }`
    }
    if (this.key) {

      return this.key;
    }
    this.key = guid();

    return this.key;
  }

  onTest(event) {


    console.log('test :%s',event)
    //alert(event)
  }

  render({
    $dom,
    data
  }) {

    let html = this.getHtml(data || this.data);

    if ($dom) {
      $dom.innerHTML = html
    }

    return html;
  }




  getHtml(data) {
    let html = this.getTemplate()(data || this.data);
    return html;
  }

  /*
  格式化模板
  */
  _format(html) {

    
    let __formaters={
      events:this._format_events,
      refs:this._format_refs
    }

    for(let key in __formaters){
      html=  __formaters[key].call(this,html)
    }
    //html= this._format_events(html)
    //html= this._format_refs(html)
    return html;

  }

  _bind(){

  }

  _mounted(){
    
  }

  
  _format_events(html){

    html= html.replace(/@(\w+)="(\w+)\((.*)\)"/gi,
    `on$1="${this.getKey()}('$2')($3)"`)
    return html;
  }

  _format_refs(html){

    let refsReg=/ref="(\w+)"/gim;
    //let regs=   html.match(/ref="(\w+)"/gi)
    let me=this;
    
    html.replace(refsReg,function(ref,$1)
    {
      me._refs.push([$1][0])//记录ref变量
      return `ref="${$1}"`
    })

    //console.log(me.$refs.__list);
    //let result= html.match(refsReg) 
    //console.log(result);
    return html;
  }


  show(){

  }
  
  hide(){

  }

  append($dom){

  }
  
  insert($dom){

  }

  mounted(){

    this._mounted();
  }
  
  getTemplate() {
    return _2.template(this._format(this.tempalte))
  }
}


export default Core;
