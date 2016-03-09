


export class App {
  configureRouter(config, router){
    config.title = 'Aurelia';
    config.map([
      { route: ['','welcome'],  name: 'welcome',  moduleId: './welcome',  nav: true, title:'Welcome' },
      { route: 'room',         name: 'room',    moduleId: './room',    nav: true, title:'Rooms' },
      { route: 'chat',         name: 'chat',    moduleId: './chat',    nav: true, title:'Chat' }

    ]);

    this.router = router;
  }




}
