export type Cloudinary = {
    name: string;
    url: string;
}


export type User = {
    id: string,
    name: string,
    loginType: string,
    email: string,
    slug: string,
    defaultFolderId: string
}

export type Topic = {
    id: string;
    name: string;
    slug: string;
    status: string;
    isIgnore: boolean;
    active: boolean;
}


export type Folder = {
    id: string;
    name: string;
    description: string;
    slug: string;
    status: string;
    visible: string;
    posts: Any;
}

export type Post = {
    id: string;
    url: string;
    title: string;
    slug: string;
    body: string;
    sourceFrom: string;
    thumbnailUrl: string;
    userId: string;
    author: string;
    status: int;
    postedAt: Date;
};


export function fromParseUser(map: Object): User {
    return {
        id: map.id,
        name: map.get('username'),
        loginType: map.get('loginType'),
        email: map.get('email'),
        defaultFolderId: fromParseFolder(map.get('folders')[0]).id,
        folders: (map.get('folders') || []).map(fromParseFolder)
    };
}

export function fromParseTopic(map: Object): Topic {
    return {
        id: map.id,
        name: map.get('name'),
        slug: map.get('slug'),
        status: map.get('status'),
        isIgnore: map.get('isIgnore'),
        active: map.get('active')
    };
}

export function fromParseFolder(map: Object): Folder {
    return {
        id: map.id,
        name: map.get('name'),
        description: map.get('description'),
        slug: map.get('slug'),
        status: map.get('status'),
        visible: map.get('visible'),
        posts: (map.get('posts') || []).map(fromParsePost)
    };
}


export function fromParseCloudinary(map: Object): Cloudinary {
    return {
        name: map['name'],
        url: map['url']
    };
}

export function fromParsePost(map: Object): Post {
    // console.log("after post: " + JSON.stringify(map));
    return {
        id: map.id,
        url: map.get('url'),
        title: map.get('title'),
        slug: map.get('slug'),
        body: map.get('body'),
        sourceFrom: map.get('sourceFrom'),
        thumbnailUrl: map.get('thumbnailUrl'),
        userId: map.get('userId'),
        author: map.get('author'),
        status: map.get('status') || 2,
        topics: (map.get('topics') || []).map(fromParseTopic),
        cloudinaryUrls: (map.get('cloudinaryUrls') || []).map(fromParseCloudinary),
        postedAt: map.get('postedAt'),
    };
}


