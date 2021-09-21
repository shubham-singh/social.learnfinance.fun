const DisplayProfileImage = ({
  img,
  className,
}: {
  img: string;
  className: string;
}) => {
  if (img === "") {
    return <div className={className}></div>;
  }
  return <img src={img} className={className} alt="profile" />;
};

export default DisplayProfileImage;
