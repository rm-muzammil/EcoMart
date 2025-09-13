const verifyEmailTemplate = ({ name, url }) => {
  return `<p> Dear ${name}
    
    </p><a href=${url}>verify</a>`;
};
export default verifyEmailTemplate;
