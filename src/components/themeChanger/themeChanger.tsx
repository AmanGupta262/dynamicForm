import { Button } from "components/button";
import { Moon, Sun } from "react-feather";
import { ThemeChangerProps } from "types";

const ThemeChanger = ({ isLight = true, handleChange }: ThemeChangerProps) => {
	return (
		<Button variant='icon' onClick={() => handleChange(!isLight)}>
			{isLight ? <Sun size={18} /> : <Moon size={18} />}
		</Button>
	);
};

export default ThemeChanger;
