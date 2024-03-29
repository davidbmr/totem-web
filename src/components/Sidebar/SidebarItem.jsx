import { ListItemButton, ListItemIcon } from "@mui/material";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
// import colorConfigs from "../../configs/colorConfigs";

const SidebarItem = ({ item }) => {
	// const { appState } = useSelector((state) => state.appState);

	return item.sidebarProps && item.path ? (
		<ListItemButton
			component={Link}
			to={item.path}
			sx={{
				"&: hover": {
					backgroundColor: "#0e141f",
				},
				backgroundColor: true === item.state ? "#232c3d" : "unset",
				// paddingY: "12px",
				// paddingX: "24px",
				paddingY: "10px",
				paddingX: "20px",
			}}
		>
			{/* <ListItemIcon
				sx={{
					color: "#fff",
				}}
			>
				{item.sidebarProps.icon && item.sidebarProps.icon}
			</ListItemIcon> */}
			{item.sidebarProps.displayText}
		</ListItemButton>
	) : null;
};

export default SidebarItem;
