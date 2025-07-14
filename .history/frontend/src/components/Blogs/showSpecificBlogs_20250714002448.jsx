const showSpecificBlogs = ({ author, content, picture, title }) => {
  return (
    <div>
        <div><img src={picture} alt="" /></div>
      <div>{title}</div>

    </div>
  );
};