/**
 * @summary Kick off the global namespace for Telescope.
 * @namespace Telescope
 */

'use strict'

const Telescope = {}

Telescope.VERSION = '0.27.5-nova'

// ------------------------------------- Config -------------------------------- //

// ------------------------------------- Components -------------------------------- //

Telescope.components = {}

Telescope.registerComponent = (name, component) => {
    Telescope.components[name] = component;
};

Telescope.getComponent = (name) => {
    return Telescope.components[name];
};

// ------------------------------------- Strings -------------------------------- //

Telescope.strings = {};

// ------------------------------------- Routes -------------------------------- //

Telescope.routes = {
    routes: [],
    add(routeOrRouteArray) {
        const addedRoutes = Array.isArray(routeOrRouteArray) ? routeOrRouteArray : [routeOrRouteArray];
        this.routes = this.routes.concat(addedRoutes);
    }
};

Telescope.userRoutes = {
    routes: [],
    add(routeOrRouteArray) {
        const addedRoutes = Array.isArray(routeOrRouteArray) ? routeOrRouteArray : [routeOrRouteArray];
        this.routes = this.routes.concat(addedRoutes);
    }
};

Telescope.dashRoutes = {
    routes: [],
    add(routeOrRouteArray) {
        const addedRoutes = Array.isArray(routeOrRouteArray) ? routeOrRouteArray : [routeOrRouteArray];
        this.routes = this.routes.concat(addedRoutes);
    }
};

// ------------------------------------- Head Tags -------------------------------- //

Telescope.headtags = {
    meta: [],
    link: [],
    script: []
};

export default Telescope
