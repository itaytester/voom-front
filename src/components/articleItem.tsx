import { useState } from "react";
import { styled } from "@mui/material/styles";
import ReactHtmlParser from "react-html-parser";
import {
  Typography,
  Avatar,
  Collapse,
  CardActions,
  CardContent,
  CardMedia,
  CardHeader,
  Card,
  Skeleton,
  IconButton,
  IconButtonProps,
} from "@mui/material";
import { red } from "@mui/material/colors";
import {
  Share,
  ExpandMore as Expand,
  MoreVert,
  Favorite,
} from "@mui/icons-material";
import Article from "../types/article";

interface IExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

interface IProps {
  article: Article | undefined;
  isLoading: boolean;
}

const ExpandMore = styled((props: IExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

const ArticleItem: React.FC<IProps> = ({ article, isLoading }) => {
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card sx={{ width: 345 }}>
      <CardHeader
        avatar={
          isLoading ? (
            <Skeleton
              animation="wave"
              variant="circular"
              width={40}
              height={40}
            />
          ) : (
            <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
              {article?.author?.toLocaleUpperCase()[0]}
            </Avatar>
          )
        }
        action={
          isLoading ? null : (
            <IconButton aria-label="settings">
              <MoreVert />
            </IconButton>
          )
        }
        title={
          isLoading ? (
            <Skeleton
              animation="wave"
              height={10}
              width="80%"
              style={{ marginBottom: 6 }}
            />
          ) : (
            article?.title
          )
        }
        subheader={
          isLoading ? (
            <Skeleton animation="wave" height={10} width="40%" />
          ) : (
            new Date(article?.publishedAt as string).toDateString()
          )
        }
      />
      {isLoading ? (
        <Skeleton sx={{ height: 190 }} animation="wave" variant="rectangular" />
      ) : (
        <CardMedia
          component="img"
          height="194"
          image={article?.urlToImage ?? ""}
          alt="Paella dish"
        />
      )}
          <CardContent>
      {isLoading ? (
""
      ) : (
          <Typography variant="body2" color="text.secondary">
            {ReactHtmlParser(article?.description ?? "")}
          </Typography>
      )}
      </CardContent>
      <CardActions disableSpacing>
        {isLoading ? (
""
        ) : (
          <>
            <div className="news-article-author">
              <Typography
                color="text.secondary"
                noWrap
                component="div"
                variant="caption"
              >
                {article?.author}
              </Typography>
              <Typography noWrap component="div">
                {article?.source?.name}
              </Typography>
            </div>
            <ExpandMore
              className="expand-button"
              expand={expanded}
              onClick={handleExpandClick}
              aria-expanded={expanded}
              aria-label="expand"
            >
              <Expand />
            </ExpandMore>
          </>
        )}
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
        {isLoading ? (""
        ) : (
          <Typography className="expansion-content" paragraph>
            {ReactHtmlParser(article?.content ?? "")}
          </Typography>
          )}
        </CardContent>
      </Collapse>
    </Card>
  );
};

export default ArticleItem;
