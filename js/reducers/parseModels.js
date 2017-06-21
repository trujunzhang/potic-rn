export type Cloudinary = {
    name: string;
    url: string;
}

export type Topic = {
    id: string;
    name: string;
    slug: string;
    status: string;
    isIgnore: boolean;
    active: boolean;
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


