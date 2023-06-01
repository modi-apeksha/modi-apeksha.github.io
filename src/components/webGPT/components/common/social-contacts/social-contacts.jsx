
import { useConfig } from "../../../hooks/ConfigContext";
import "./social-contacts.scss";

const SocialContact = ({
  showNames = false,
  title = ""
}) => {

  const { socials } = useConfig();

  return (
    <div
      className="social-contacts"
    >
      {title &&
        <div className="title">
          {title}
        </div>
      }
      <div className="social-links">
        {socials.map((el, i) =>
          <a className="contactIcons" href={el.link} key={i}>
            {el.icon && el.icon} {(showNames && el.label) ? el.label : ""}
          </a>
        )}
      </div>
    </div>
  );
}

export default SocialContact;