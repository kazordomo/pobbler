# ROUTER BOILERPLATE

## Vanilla javascript routing using classes.

### Structure
The project files is put in either the component folder or the general folder.
Routing files, general css and so on is put in the general folder,
while the stuff connected to a view is put in the component folder.

### Router
Init the router in the main js file and stuff it with all your routes.
```
new Router({
    home: new Layout(new Page('menu.html'), new Page('home.html'))
}
```
Every time the #url changes the router will call the hashChanged func which
will look through the routes and render the corresponding one.

### Page
The Page class is in charge of loading the view (html).
The html file will be fetched, and the response will be rendered
out on the main element.


### Layout
The Layout class takes multiple Pages and renderes them out on the view.
The Layout runs all of the pages load functions and awaits on them all to
be done before returning the result.
```
new Layout(new Page('menu.html'), new Page('home.html'))
```