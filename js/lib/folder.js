import Telescope from '../components/lib';
import React from 'react';
var _ = require('underscore');
const Folders = {};


Folders.checkAccessPermission = function (folder, userId, currentUser) {
    if (folder.visible === "Lock" && userId !== currentUser._id) {
        return false;
    }
    return true;
};

Folders.getDefaultFolderName = function () {
    return "Read Later";
};


/**
 * @summary Get a folder's URL
 * @param {Object} folder
 * @param isAbsolute
 */
Folders.getUrl = function (folder, isAbsolute) {
    isAbsolute = typeof isAbsolute === "undefined" ? false : isAbsolute; // default to false
    let prefix = isAbsolute ? Telescope.utils.getSiteUrl() : "";
    return `${prefix}/?cat=${folder.slug}`;
};

Folders.getFolderNames = function (folders) {
    let names = _.pluck(folders, 'name')

    return names
};


export default Folders
