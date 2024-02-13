export function slugFormat(name:string) {
  console.log('### slugFormat input name: ', name);
  
  // Convert the string to lowercase
  var lowercaseName = name.toLowerCase();

  // Replace spaces with dashes
  var slug = lowercaseName.replace(/\s+/g, '-');

  // Remove any special characters except dashes and alphanumeric characters
  slug = slug.replace(/[^a-z0-9-]+/g, '');

  // Remove leading and trailing dashes
  slug = slug.replace(/^-+|-+$/g, '');

  return slug;
}

export function stringCapFirstLetter(string:string){
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}