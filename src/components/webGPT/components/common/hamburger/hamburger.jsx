import "./hamburger.scss";

const Hamburger = ({ isOpen, setOpen, color="#000" }) => {

  const Span = () => <span style={{backgroundColor: color}} />

  return (
    <div
      className={`hamburger-icon ${isOpen ? "open" : "close"}`}
      onClick={() => setOpen(!isOpen)}
    >
      <Span />
      <Span />
      <Span />
    </div>
  );
};

export default Hamburger;
