export default class Router {
  constructor(routes = []) {
    this.routes = routes;
    this.bind();
  }

  bind() {
    window.addEventListener('hashchange', this.changeHash.bind(this));
    window.addEventListener('load', this.changeHash.bind(this));
  }

  changeHash() {
    const url = window.location.hash || '/';
    const content = document.getElementById('root');
    const route = this.routes.find(
      ({ path, exact }) => (exact ? path === url : this.match(path, url))
    );

    if (content) {
      content.innerHTML = '';

      if (route) {
        const template = document.getElementById(route.template);
        const paramsKeys = route.path.match(/:([^/]+)/g);

        if (template) {
          content.appendChild(document.importNode(template.content, true));
        }

        if (typeof route.controller === 'function') {
          const requestPath = this.match(route.path, url);
          
          requestPath.shift();

          new route.controller(
            requestPath.reduce((params, value, index) => {

              params[paramsKeys[index].replace(':', '')] = value;

              return params;
            }, {})
          );
        }
      }
    }
  }

  match(path, url){
    return url.match(new RegExp(path.replace(/:([^/]+)/g, '([^/]*)')))
  }
}