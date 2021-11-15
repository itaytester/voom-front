import { fireEvent, render, screen } from "@testing-library/react";
import ArticleItem from "./articleItem";

const mockedArticle = {
  _id: "618ceb62960a13b4fe9c98f1",
  source: {
    id: "engadget",
    name: "Engadget",
  },
  author: "Jon Fingas",
  title:
    "Iraqi prime minister say he was the target of a drone assassination attempt",
  description:
    "Drones are apparently turning into assassination tools. According to CBS News and Reuters, Iraqi Prime Minister Mustafa al-Kadhimi says he survived a drone-based assassination attempt today (November 7th) at his home in Baghdad's highly secure Green Zone. The…",
  url: "https://www.engadget.com/iraq-prime-minister-drone-assassination-attempt-182450389.html",
  urlToImage:
    "https://s.yimg.com/os/creatr-uploaded-images/2021-11/55668e30-3ff3-11ec-965f-838a973901a4",
  publishedAt: "2021-11-07T18:24:50.000Z",
  content:
    "Drones are apparently turning into assassination tools. According to CBS News and Reuters, Iraqi Prime Minister Mustafa al-Kadhimi says he survived a drone-based assassination attempt today (November… [+1358 chars]",
};

const component = <ArticleItem article={mockedArticle} isLoading={false} />;

describe("<ArticleItem />", () => {
    test("should render article correctly", () => {
        render(component);
        expect(screen.getByText(mockedArticle.author)).toBeInTheDocument();
        expect(screen.getByText(mockedArticle.source.name)).toBeInTheDocument();
        expect(screen.getByText(mockedArticle.title)).toBeInTheDocument();
        expect(screen.getByText(mockedArticle.description)).toBeInTheDocument();
        expect(screen.getByText(new Date(mockedArticle.publishedAt).toDateString())).toBeInTheDocument();
    });

    test("should show content when button clicked", async () => {
        render(component);
        const expandBtn = screen.getByRole("button", {name: /expand/i})
        fireEvent.click(expandBtn);
        expect(screen.getByText(mockedArticle.content)).toBeInTheDocument();
    });
});
