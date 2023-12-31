import { Button } from "@mui/material";
import { NavBarBoxItem } from "./NavBarBoxItem";
import { useRootContext } from "../Context";

export const SideNavBarTest = () => {
  const RootContext = useRootContext();

  return (
    <div className="side-bar">
      <NavBarBoxItem key={"recent"}>
        <p
          style={{
            padding: "0px 10px",
            flexGrow: 1,
            fontSize: "16px",
            textTransform: "uppercase",
          }}
        >
          Select chapters for the test and start test your knowledge
        </p>
      </NavBarBoxItem>

      <div
        style={{
          display: "flex",
          marginTop: "auto",
          width: "100%",
          justifyContent: "space-evenly",
        }}
      >
        <Button
          sx={{
            backgroundColor: "#E8E8E8",
            color: "black",
            borderRadius: "100px",
            padding: "10px 20px",
          }}
          onClick={() => RootContext?.setTesting(true)}
        >
          Start
        </Button>

        <Button
          sx={{
            backgroundColor: "#E8E8E8",
            color: "black",
            borderRadius: "100px",
            padding: "10px 20px",
          }}
          onClick={() => RootContext?.setReadyTest(false)}
        >
          Cancel
        </Button>
      </div>
    </div>
  );
};
