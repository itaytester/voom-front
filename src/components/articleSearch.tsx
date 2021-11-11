import { DatePicker } from "@mui/lab";
import { Card, TextField, TextFieldProps } from "@mui/material";
import { useState } from "react";
import ArticleQuery from "../types/articleQuery";
import { DebouncedFunc } from "lodash";

interface IArticleSearchProps {
    debounceArticles: DebouncedFunc<(query: ArticleQuery) => Promise<void>>
}

const ArticleSearhBar: React.FC<IArticleSearchProps> = ({debounceArticles}) => {
  const [words, setWords] = useState<string>("");
  const [from, setFrom] = useState<Date | null>(null);
  const [to, setTo] = useState<Date | null>(null);

  const handleFromChange = (newValue: Date | null) => {
    setFrom(newValue);
    if(newValue?.toString() !== "Invalid Date") debounceArticles({words, to, from: newValue});
  };

  const handleToChange = (newValue: Date | null) => {
    setTo(newValue);
    const validDate = newValue?.toString() !== "Invalid Date";
    const isContradicting = validDate && from && newValue && newValue < from;
    if(validDate && !isContradicting) debounceArticles({words, to: newValue, from});
  };

  const handleWordsChange: React.ChangeEventHandler<
    HTMLTextAreaElement | HTMLInputElement
  > = (e) => {
    const newValue = e.target.value;
    setWords(e.target.value);
    debounceArticles({words: newValue, to, from});
  };

  return (
    <Card className="news-search-bar" variant="outlined">
      <TextField
        label="Keywords"
        placeholder="Enter Keywords"
        variant="outlined"
        value={words}
        onChange={handleWordsChange}
      />
        <DatePicker
          label="From"
          inputFormat="MM/dd/yyyy"
          value={from}
          onChange={handleFromChange}
          renderInput={(params: TextFieldProps) => <TextField {...params} />}
        />

        <DatePicker
          label="To"
          inputFormat="MM/dd/yyyy"
          value={to}
          onChange={handleToChange}
          renderInput={(params: TextFieldProps) => <TextField {...params} />}
        />
    </Card>
  );
};

export default ArticleSearhBar;
