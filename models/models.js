const imageDto = {
  url: "",
  alt: "",
};

const blogDto = {
  title: "",
  body: "",
  image: JSON.parse(JSON.stringify(imageDto)),
};

const buttons = {
  label: "",
  route: "",
};

let links = {
  label: "",
  url: "",
};

const homeContentDto = {
  title: "",
  body: "",
  image: JSON.parse(JSON.stringify(imageDto)),
  link: JSON.parse(JSON.stringify(links)),
};

const headerDto = {
  title: "",
  logo: JSON.parse(JSON.stringify(imageDto)),
  buttons: [],
  // buttons: {
  //     homepage: {...buttons},
  //     blogs: {...buttons}
  // }
};

const footerDto = {
  title: "",
  links: [],
  // links: {
  //     linkedin: {...links},
  //     instagram: {...links},
  //     twitter: {...links},
  //     facebook: {...links}
  // }
};

module.exports = {
  imageDto,
  blogDto,
  buttons,
  links,
  headerDto,
  homeContentDto,
  footerDto,
};
