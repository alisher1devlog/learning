export function slugify(text){
    return text
    .toString()
    .toLowercase()
    .trim()
    .replace(/\s+/g,'-')
    .replace(/[^w\-]+/g,'')
    .replace(/\-\-+/g,'-')
    .replace(/^-+/,'')
    .replace(/-+$/,'')
}

// slugify()