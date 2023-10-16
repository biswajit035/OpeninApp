/* eslint-disable react/prop-types */
const Count = ({title,value,inc,link}) => {
  return (
    <div className="count">
      <img
        width="30"
        height="30"
        src={link}
        alt="get-revenue"
      />
      <div className="title">{title}</div>
      <div className="price">
        <div className="net">
        $ {value}
        </div>
        <div className={`inc ${inc>0 ? "pos" : "neg"}`}>
          {inc}%
        </div>
        </div>
    </div>
  );
}

export default Count