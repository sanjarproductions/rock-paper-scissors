import { useDispatch, useSelector } from "react-redux";

import darkModeIcon from "../../assets/moon.svg";
import lightModeIcon from "../../assets/sun.svg";
import themeActions from "../../redux/actions/themeActions";

import styles from "./theme.module.css";

const ThemeToggle = () => {
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.themeChange);

  const changeTheme = () => {
    dispatch(themeActions());
  };

  return (
    <>
      <div className={styles.theme__toggle}>
        {theme ? (
          <button className={styles.toggle__btn} onClick={changeTheme}>
            <img src={darkModeIcon} alt="" />
          </button>
        ) : (
          <button className={styles.toggle__btn} onClick={changeTheme}>
            <img src={lightModeIcon} alt="" />
          </button>
        )}
      </div>
    </>
  );
};

export default ThemeToggle;
