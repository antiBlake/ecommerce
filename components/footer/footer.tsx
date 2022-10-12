import { Wrapper } from "./footer.styles";
import { useRouter } from "next/router";
import Link from "next/link";
import {
  CalendarViewDayOutlined,
  Home,
  HomeOutlined,
  SearchOutlined,
  SearchRounded,
  VideogameAssetOutlined,
  VideogameAssetRounded,
} from "@material-ui/icons";

const Footer = () => {
  const { pathname, push, replace } = useRouter();
  console.log(pathname);
  return (
    <Wrapper>
      <Link passHref href={"/"}>
        <a>
          {pathname == "/" ? (
            <Home fontSize="large" style={{ color: "black" }} />
          ) : (
            <HomeOutlined fontSize="large" style={{ color: "black" }} />
          )}
        </a>
      </Link>
      <Link passHref href={"/arcade"}>
        <a>
          {pathname == "/arcade" ? (
            <VideogameAssetRounded
              fontSize="large"
              style={{ color: "black" }}
            />
          ) : (
            <VideogameAssetOutlined
              fontSize="large"
              style={{ color: "black" }}
            />
          )}
        </a>
      </Link>
      <Link passHref href={"/explore"}>
        <a>
          {pathname == "/explore" ? (
            <SearchRounded fontSize="large" style={{ color: "black" }} />
          ) : (
            <SearchOutlined fontSize="large" style={{ color: "black" }} />
          )}
        </a>
      </Link>
    </Wrapper>
  );
};

export default Footer;
